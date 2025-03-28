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
  private embeddingClient: OpenAI;

  private constructor() {
    this.embeddingClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY_EMBEDDING,
    });

    if (process.env.DEFAULT_OPEN_AI_MODEL === "deepseek-chat") {
      this.client = new OpenAI({
        baseURL: "https://api.deepseek.com",
        apiKey: process.env.OPENAI_API_KEY,
      });
    } else {
      this.client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    }
  }

  public static getInstance(): OpenAiService {
    if (!OpenAiService.instance) {
      OpenAiService.instance = new OpenAiService();
    }
    return OpenAiService.instance;
  }

  public async getEmbedding(text: string): Promise<number[]> {
    try {
      const response = await this.embeddingClient.embeddings.create({
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
      model: process.env.DEFAULT_OPEN_AI_MODEL || "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are an anime geek that provides concise, accurate, and up to date responses.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    console.log(
      "LLM Response:",
      response.choices[0].message.content || "No response"
    );

    return response.choices[0].message.content || "No response";
  }
}
