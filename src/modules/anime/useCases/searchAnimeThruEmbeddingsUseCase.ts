import type { Anime } from "../domain/anime";
import { Result } from "@/core/logic/Result";
import type { UseCase } from "@/core/domain/UseCase";
import { AIService } from "../domain/services/aiService";
import { AnimeRepository } from "../persistence/anime/animeRepository";

interface SearchAnimeThruEmbeddingsDTO {
  userInput: string;
}

type Response = Result<Anime[]>;

export class SearchAnimeThruEmbeddingsUseCase
  implements UseCase<SearchAnimeThruEmbeddingsDTO, Response>
{
  private readonly aiService: AIService;
  private readonly animeRepository: AnimeRepository;

  constructor() {
    this.aiService = AIService.getInstance();
    this.animeRepository = new AnimeRepository();
  }

  public async execute(
    request: SearchAnimeThruEmbeddingsDTO
  ): Promise<Response> {
    try {
      const { userInput } = request;

      if (!userInput) {
        return Result.fail<Anime[]>("User input is required");
      }

      // 1. Get anime recommendations from LLM
      const prompt = `Recommend 10 anime titles based on the user query: "${userInput}". The query may describe anime, characters, themes, scenarios, or mood. Always return 10 relevant titles. If no exact match, suggest similar ones. Return ONLY a JSON array, nothing else. Example: ["Anime Title 1", "Anime Title 2", ...]`;

      const llmResponse = await this.aiService.getCompletion(prompt);

      let recommendedTitles: string[] = [];

      try {
        // Parse the LLM response as JSON array
        recommendedTitles = JSON.parse(llmResponse);
      } catch (error) {
        // If parsing fails, try to extract titles from text response
        recommendedTitles = llmResponse
          .split("\n")
          .map((line) => line.replace(/^\d+\.\s*/, "").trim())
          .filter((line) => line.length > 0)
          .slice(0, 10);
      }

      // 2. Create embedding for all titles combined
      const combinedTitles = recommendedTitles.join(", ");
      const embedding = await this.aiService.getEmbedding(combinedTitles);

      // 3. Use the embedding to find similar anime
      const results = await this.animeRepository.findSimilarByEmbedding(
        embedding,
        20,
        userInput
      );

      return Result.ok<Anime[]>(results);
    } catch (error) {
      return Result.fail<Anime[]>(`Failed to search anime: ${error}`);
    }
  }
}
