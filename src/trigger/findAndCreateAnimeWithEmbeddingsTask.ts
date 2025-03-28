import { task } from "@trigger.dev/sdk/v3";
import { JikanService } from "@/modules/anime/domain/services/jikanService";
import { AnimeRepository } from "@/modules/anime/persistence/anime/animeRepository";
import { OpenAiService } from "@/modules/anime/domain/services/openAiService";
import type { Anime } from "@/modules/anime/domain/anime";

const jikanService = new JikanService();
const animeRepository = new AnimeRepository();
const openAiService = OpenAiService.getInstance();

export const findAndCreateAnimeWithEmbeddingsTask = task({
  id: "find-and-create-anime-with-embeddings",
  run: async () => {
    console.log("Starting to fetch and create anime with embeddings...");
    try {
      let page = 1;
      let hasMore = true;
      let totalProcessed = 0;
      const batchSize = 25;

      while (hasMore) {
        console.log(`Fetching top anime page ${page}...`);
        const topAnime = await jikanService.getTopAnime(batchSize, page);

        if (!topAnime || topAnime.length === 0) {
          hasMore = false;
          break;
        }

        console.log(`Fetched ${topAnime.length} anime from page ${page}`);

        for (const anime of topAnime) {
          const existingAnime = await animeRepository.findByMalId(anime.malId);

          if (existingAnime) {
            console.log(`Anime ${anime.title} already exists, skipping...`);
            continue;
          }

          const richText = buildRichText(anime);
          const embedding = await openAiService.getEmbedding(richText);
          anime.props.embedding = embedding;

          await animeRepository.save(anime);
          console.log(`Processed and saved anime: ${anime.title}`);
          totalProcessed++;
        }

        if (topAnime.length < batchSize) {
          hasMore = false;
        }

        page++;

        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      console.log(`Successfully processed ${totalProcessed} anime in total`);
    } catch (error) {
      console.error("Error processing top anime:", error);
      throw error;
    }
  },
});

function buildRichText(anime: Anime): string {
  const core = [
    anime.title,
    anime.titleEnglish,
    anime.titleJapanese,
    anime.synopsis,
    `${anime.genres?.join(", ")}`,
    `${anime.themes?.join(", ")}`,
    anime.type,
    anime.status,
    `${anime.studios?.join(", ")}`,
    anime.source,
    anime.background,
  ]
    .filter(Boolean)
    .join(" | ");

  return `${core}`;
}
