import { SQS } from "aws-sdk";

export class SQSClient {
  private static instance: SQSClient;
  private sqs: SQS;

  private constructor() {
    this.sqs = new SQS({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
      },
    });
  }

  public static getInstance(): SQSClient {
    if (!SQSClient.instance) {
      SQSClient.instance = new SQSClient();
    }
    return SQSClient.instance;
  }

  async publish<T>(eventType: string, payload: T) {
    return this.sqs
      .sendMessage({
        QueueUrl: process.env.AWS_SQS_QUEUE_URL || "",
        MessageBody: JSON.stringify({
          type: eventType,
          payload,
          metadata: {
            timestamp: new Date().toISOString(),
            correlationId: crypto.randomUUID(),
          },
        }),
        MessageAttributes: {
          eventType: {
            DataType: "String",
            StringValue: eventType,
          },
        },
      })
      .promise();
  }

  async consume(handler: (message: SQS.Message) => Promise<void>) {
    while (true) {
      try {
        const result = await this.sqs
          .receiveMessage({
            QueueUrl: process.env.AWS_SQS_QUEUE_URL || "",
            MaxNumberOfMessages: 10,
            WaitTimeSeconds: 20,
            AttributeNames: ["All"],
            MessageAttributeNames: ["All"],
          })
          .promise();

        const messages = result.Messages || [];

        for (const message of messages) {
          try {
            await handler(message);
            await this.deleteMessage(message.ReceiptHandle || "");
          } catch (error) {
            console.error("Error processing message:", error);
          }
        }
      } catch (error) {
        console.error("Error receiving messages:", error);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  }

  private async deleteMessage(receiptHandle: string) {
    await this.sqs
      .deleteMessage({
        QueueUrl: process.env.AWS_SQS_QUEUE_URL || "",
        ReceiptHandle: receiptHandle,
      })
      .promise();
  }
}
