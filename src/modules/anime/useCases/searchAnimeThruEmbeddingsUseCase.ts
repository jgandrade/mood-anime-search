import type { Anime } from "../domain/anime";
import { Result } from "@/core/logic/Result";
import type { UseCase } from "@/core/domain/UseCase";
import { OpenAiService } from "../domain/services/openAiService";
import { AnimeRepository } from "../persistence/anime/animeRepository";

interface SearchAnimeThruEmbeddingsDTO {
  userInput: string;
}

type Response = Result<Anime[]>;

export class SearchAnimeThruEmbeddingsUseCase
  implements UseCase<SearchAnimeThruEmbeddingsDTO, Response>
{
  private readonly openAiService: OpenAiService;
  private readonly animeRepository: AnimeRepository;

  constructor() {
    this.openAiService = OpenAiService.getInstance();
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
      const prompt = `Based on the following user query: "${userInput}", recommend 10 anime titles that would be most relevant. 
      Consider factors like genre, themes, and overall appeal. 
      Return ONLY a JSON array of anime titles, nothing else. Example: ["Anime Title 1", "Anime Title 2", ...]`;

      const llmResponse = await this.openAiService.getCompletion(prompt);

      console.log("LLM Response:", llmResponse);
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
      const embedding = await this.openAiService.getEmbedding(combinedTitles);

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
