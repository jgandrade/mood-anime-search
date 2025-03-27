import OpenAI from "openai";

interface OpenAIError {
  response?: {
    status: number;
  };
  message?: string;
}

export class OpenAiService {
  private static instance: OpenAiService;
  private client: OpenAI;

  private constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  public static getInstance(): OpenAiService {
    if (!OpenAiService.instance) {
      OpenAiService.instance = new OpenAiService();
    }
    return OpenAiService.instance;
  }

  public async getEmbedding(text: string): Promise<number[]> {
    try {
      const response = await this.client.embeddings.create({
        model: "text-embedding-3-small",
        input: text,
      });

      return response.data[0].embedding;
    } catch (error: unknown) {
      const openAIError = error as OpenAIError;
      if (openAIError?.response?.status === 429) {
        throw new Error(
          "We're experiencing high demand right now. Please try again in a few minutes or contact support if the issue persists."
        );
      }
      if (openAIError?.response?.status === 401) {
        throw new Error(
          "Authentication error. Please check your API key configuration."
        );
      }
      throw new Error(
        `Failed to generate embedding: ${
          openAIError?.message || "Unknown error"
        }`
      );
    }
  }

  public async getCompletion(prompt: string): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: "gpt-4-0125-preview",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that provides concise and accurate responses.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0].message.content || "";
  }
}
