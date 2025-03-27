import type { NextRequest } from "next/server";
import { AnimeController } from "@/modules/anime/infrastructure/animeController";

export async function POST(req: NextRequest) {
  const controller = new AnimeController();
  return controller.searchAnimeThruEmbedding(req);
}
