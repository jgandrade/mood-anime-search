import { OpenAiService } from "./openAiService";
import { GroqAiService } from "./groqAiService";

export type AIProvider = "openai" | "groq";

export class AIService {
  private static instance: AIService;
  private openAiService: OpenAiService;
  private groqAiService: GroqAiService;
  private defaultProvider: AIProvider;

  private constructor() {
    this.openAiService = OpenAiService.getInstance();
    this.groqAiService = GroqAiService.getInstance();
    this.defaultProvider =
      (process.env.DEFAULT_AI_PROVIDER as AIProvider) || "openai";
  }

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  public async getEmbedding(text: string): Promise<number[]> {
    // Currently only OpenAI supports embeddings
    return this.openAiService.getEmbedding(text);
  }

  public async getCompletion(
    prompt: string,
    provider?: AIProvider
  ): Promise<string> {
    const selectedProvider = provider || this.defaultProvider;

    switch (selectedProvider) {
      case "openai":
        return this.openAiService.getCompletion(prompt);
      case "groq":
        return this.groqAiService.getCompletion(prompt);
      default:
        throw new Error(`Unsupported AI provider: ${selectedProvider}`);
    }
  }

  public setDefaultProvider(provider: AIProvider): void {
    this.defaultProvider = provider;
  }
}
