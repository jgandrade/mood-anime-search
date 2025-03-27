import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SearchAnimeThruEmbeddingsUseCase } from "../useCases/searchAnimeThruEmbeddingsUseCase";

export class AnimeController {
  private readonly searchAnimeThruEmbeddingUseCase: SearchAnimeThruEmbeddingsUseCase;

  constructor() {
    this.searchAnimeThruEmbeddingUseCase =
      new SearchAnimeThruEmbeddingsUseCase();
  }

  public async searchAnimeThruEmbedding(
    req: NextRequest
  ): Promise<NextResponse> {
    try {
      const body = await req.json();
      const { userInput } = body;

      if (!userInput) {
        return NextResponse.json(
          { error: "User Input is required" },
          { status: 400 }
        );
      }

      const result = await this.searchAnimeThruEmbeddingUseCase.execute({
        userInput,
      });

      if (result.isFailure) {
        return NextResponse.json({ error: result.getError() }, { status: 400 });
      }

      return NextResponse.json({ anime: result.getValue() }, { status: 201 });
    } catch (error) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }
}
