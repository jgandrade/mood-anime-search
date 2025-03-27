import { NextResponse } from "next/server";
import { SQSClient } from "@/utils/sqs/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const sqs = SQSClient.getInstance();

    const result = await sqs.publish("domain.event", body);

    return NextResponse.json({ messageId: result.MessageId });
  } catch (error) {
    console.error("SQS Error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
