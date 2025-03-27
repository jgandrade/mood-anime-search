import type { SQSClient } from "./client";
import type { Message } from "aws-sdk/clients/sqs";

type EventHandler<T = unknown> = (payload: T) => Promise<void>;
type MessageBody = {
  type: string;
  payload: unknown;
  metadata: {
    timestamp: string;
    correlationId: string;
  };
};

export class MessageConsumer {
  private handlers: Map<string, EventHandler> = new Map();
  private isRunning = false;

  constructor(private sqsClient: SQSClient) {}

  registerHandler<T>(eventType: string, handler: EventHandler<T>) {
    this.handlers.set(eventType, handler as EventHandler);
  }

  async start() {
    this.isRunning = true;

    while (this.isRunning) {
      try {
        await this.sqsClient.consume(async (message: Message) => {
          try {
            await this.processMessage(message);
          } catch (error) {
            console.error("Failed to process message:", {
              messageId: message.MessageId,
              error: error instanceof Error ? error.message : "Unknown error",
            });
            throw error;
          }
        });
      } catch (error) {
        console.error("Consumer error:", error);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  }

  stop() {
    this.isRunning = false;
  }

  private async processMessage(message: Message) {
    if (!message.Body) {
      throw new Error("Empty message body");
    }

    const eventType = message.MessageAttributes?.eventType?.StringValue;
    if (!eventType) {
      throw new Error("Missing eventType attribute");
    }

    let body: MessageBody;
    try {
      body = JSON.parse(message.Body);
    } catch (error) {
      throw new Error(
        `Invalid message body: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }

    const handler = this.handlers.get(eventType);
    if (!handler) {
      console.warn(`No handler registered for event type: ${eventType}`);
      return;
    }

    await handler(body.payload);
  }
}
