import type { Anime } from "../domain/anime";
import { Result } from "@/core/logic/Result";
import type { UseCase } from "@/core/domain/UseCase";
import { AIService } from "../domain/services/aiService";
import { AnimeRepository } from "../persistence/anime/animeRepository";

interface SearchAnimeThruEmbeddingsDTO {
  userInput: string;
}

type Response = Result<{
  bySimilarity: Anime[];
  byPopularity: Anime[];
  byRating: Anime[];
}>;

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
        return Result.fail<{
          bySimilarity: Anime[];
          byPopularity: Anime[];
          byRating: Anime[];
        }>("User input is required");
      }

      // 1. Get anime recommendations from LLM
      const prompt = `Recommend 10 anime titles based on the user's query: "${userInput}". Follow these guidelines:

  1. **Exact Match Check**: 
    - If the query is an exact anime title (e.g., "Sousou no Frieren"), include it as the first result, then add 9 thematically similar titles.

  2. **Intent Detection** (if no exact match):
    - For *mood/theme* (e.g., "uplifting"), prioritize tonal fit.
    - For *character traits*, match iconic characters.
    - For *vague queries*, infer tropes (e.g., "hell" → dystopian).

  3. **Output**: 
    - STRICTLY ONLY return a JSON array of 10 titles, ordered by relevance.
    - NEVER include explanations, notes, or markdown (e.g., no "\`\`\`json").
    - Example valid output: ["Title 1", "Title 2", ..., "Title 10"]
    `;

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
        50,
        userInput
      );

      // Create separate sorted arrays
      const bySimilarity = [...results].sort(
        (a, b) => (Number(b.similarity) || 0) - (Number(a.similarity) || 0)
      );

      const byPopularity = [...results].sort(
        (a, b) => (Number(a.popularity) || 0) - (Number(b.popularity) || 0)
      );

      const byRating = [...results].sort(
        (a, b) => (Number(b.score) || 0) - (Number(a.score) || 0)
      );

      return Result.ok({
        bySimilarity,
        byPopularity,
        byRating,
      });
    } catch (error) {
      return Result.fail<{
        bySimilarity: Anime[];
        byPopularity: Anime[];
        byRating: Anime[];
      }>(`Failed to search anime: ${error}`);
    }
  }
}
