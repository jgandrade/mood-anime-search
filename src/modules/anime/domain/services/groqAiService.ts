import Groq from "groq-sdk";

interface GroqError {
  response?: {
    status: number;
  };
  message?: string;
}

export class GroqAiService {
  private static instance: GroqAiService;
  private client: Groq;

  private constructor() {
    this.client = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }

  public static getInstance(): GroqAiService {
    if (!GroqAiService.instance) {
      GroqAiService.instance = new GroqAiService();
    }
    return GroqAiService.instance;
  }

  public async getCompletion(prompt: string): Promise<string> {
    try {
      const chatCompletion = await this.client.chat.completions.create({
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
        model: "llama-3.3-70b-versatile",
        temperature: 1,
        max_completion_tokens: 1024,
        top_p: 1,
        stream: false,
      });

      return chatCompletion.choices[0]?.message?.content || "";
    } catch (error: unknown) {
      const groqError = error as GroqError;
      if (groqError?.response?.status === 429) {
        throw new Error(
          "We're experiencing high demand right now. Please try again in a few minutes or contact support if the issue persists."
        );
      }
      if (groqError?.response?.status === 401) {
        throw new Error(
          "Authentication error. Please check your API key configuration."
        );
      }
      throw new Error(
        `Failed to generate completion: ${
          groqError?.message || "Unknown error"
        }`
      );
    }
  }
}
