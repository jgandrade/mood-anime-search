import type { Anime } from "../domain/anime";
import { Result } from "@/core/logic/Result";
import type { UseCase } from "@/core/domain/UseCase";
import { AnimeRepository } from "../persistence/anime/animeRepository";

interface FindAnimeByIdDTO {
  animeId: string;
}

type Response = Result<Anime>;

export class FindAnimeByIdUseCase
  implements UseCase<FindAnimeByIdDTO, Response>
{
  private readonly animeRepository: AnimeRepository;

  constructor() {
    this.animeRepository = new AnimeRepository();
  }

  public async execute(request: FindAnimeByIdDTO): Promise<Response> {
    try {
      const { animeId } = request;

      if (!animeId) {
        return Result.fail<Anime>("Anime ID is required");
      }
      const results = await this.animeRepository.findById(animeId);

      if (!results) {
        return Result.fail<Anime>("Anime not found");
      }

      return Result.ok<Anime>(results);
    } catch (error) {
      return Result.fail<Anime>(`Failed to find anime: ${error}`);
    }
  }
}
