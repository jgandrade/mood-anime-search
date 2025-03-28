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
      const prompt = `Recommend 10 anime titles based on the user's query: "${userInput}". Follow these guidelines:

      1. **Intent Detection**:
        - If the query describes *mood/theme* (e.g., "uplifting," "make me cry"), prioritize tonal fit using genre conventions (e.g., "Slice of Life" for relaxing shows).
        - If the query references *character traits* (e.g., "white-haired and powerful"), include anime with iconic characters matching the description.
        - For *vague/creative queries* (e.g., "squatters area like hell"), infer tropes (dystopian/urban decay) and match accordingly.

      2. **Relevance Ranking**:
        - Prioritize widely recognized titles unless the query implies niche preferences.
        - Avoid spoilers or over-literal interpretations (e.g., "hell" can mean dystopian or metaphorical suffering).

      3. **Output**: 
        - ONLY return a JSON array of 10 titles, ordered by relevance. Example: ["Title 1", "Title 2"].

      Do NOT force exact matches; adapt to the query's spirit.`;

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
