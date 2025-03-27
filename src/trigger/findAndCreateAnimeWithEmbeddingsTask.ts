import { task } from "@trigger.dev/sdk/v3";
import { JikanService } from "@/modules/anime/domain/services/jikanService";
import { AnimeRepository } from "@/modules/anime/persistence/anime/animeRepository";
import { OpenAiService } from "@/modules/anime/domain/services/openAiService";
import type { Anime } from "@/modules/anime/domain/anime";

const jikanService = new JikanService();
const animeRepository = new AnimeRepository();
const openAiService = OpenAiService.getInstance();

interface TextItem {
  label: string;
  value: string | number | undefined;
  prefix?: string;
}

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

        // If we got less than the batch size, we've reached the end
        if (topAnime.length < batchSize) {
          hasMore = false;
        }

        page++;

        // Add a small delay between pages to avoid rate limiting
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
  const sections = [
    {
      title: "Core Information",
      items: [
        { label: "Title", value: anime.title },
        { label: "English Title", value: anime.titleEnglish },
        { label: "Japanese Title", value: anime.titleJapanese },
        { label: "Alternative Titles", value: anime.titleSynonyms?.join(", ") },
        { label: "Type", value: anime.type },
        { label: "Status", value: anime.status },
        { label: "Rating", value: anime.rating },
        { label: "Duration", value: anime.duration },
        { label: "Episodes", value: anime.episodes },
        { label: "Broadcast", value: anime.broadcast },
        { label: "Source", value: anime.source },
        { label: "Currently Airing", value: anime.airing?.toString() },
      ] as TextItem[],
    },
    // Content with enhanced context
    {
      title: "Content",
      items: [
        {
          label: "Synopsis",
          value: `This anime is about: ${anime.synopsis}`,
          prefix: "Synopsis:",
        },
        {
          label: "Background",
          value: anime.background
            ? `Background Information: ${anime.background}`
            : undefined,
          prefix: "Background:",
        },
      ] as TextItem[],
    },
    // Categories with enhanced context
    {
      title: "Categories",
      items: [
        {
          label: "Genres",
          value: `This anime belongs to the following genres: ${anime.genres.join(
            ", "
          )}`,
          prefix: "Genres:",
        },
        {
          label: "Themes",
          value: anime.themes?.length
            ? `Themes explored in this anime: ${anime.themes.join(", ")}`
            : undefined,
          prefix: "Themes:",
        },
        {
          label: "Demographics",
          value: anime.demographics?.length
            ? `Target audience: ${anime.demographics.join(", ")}`
            : undefined,
          prefix: "Demographics:",
        },
      ] as TextItem[],
    },
    // Production with enhanced context
    {
      title: "Production",
      items: [
        {
          label: "Studios",
          value: anime.studios?.length
            ? `Produced by: ${anime.studios.join(", ")}`
            : undefined,
          prefix: "Studios:",
        },
        {
          label: "Producers",
          value: anime.producers?.length
            ? `Production companies: ${anime.producers.join(", ")}`
            : undefined,
          prefix: "Producers:",
        },
        {
          label: "Season",
          value: anime.season ? `Released in ${anime.season}` : undefined,
          prefix: "Season:",
        },
        {
          label: "Year",
          value: anime.year ? `Released in ${anime.year}` : undefined,
          prefix: "Year:",
        },
      ] as TextItem[],
    },
    // Statistics with enhanced context
    {
      title: "Statistics",
      items: [
        {
          label: "Score",
          value: `User rating: ${anime.score}/10`,
          prefix: "Rating:",
        },
        {
          label: "Popularity",
          value: `Popularity rank: #${anime.popularity}`,
          prefix: "Popularity:",
        },
        {
          label: "Rank",
          value: anime.rank ? `Overall rank: #${anime.rank}` : undefined,
          prefix: "Rank:",
        },
        {
          label: "Members",
          value: anime.members
            ? `Number of members: ${anime.members.toLocaleString()}`
            : undefined,
          prefix: "Members:",
        },
        {
          label: "Favorites",
          value: anime.favorites
            ? `Number of favorites: ${anime.favorites.toLocaleString()}`
            : undefined,
          prefix: "Favorites:",
        },
        {
          label: "Scored By",
          value: anime.scoredBy
            ? `Rated by ${anime.scoredBy.toLocaleString()} users`
            : undefined,
          prefix: "Scored By:",
        },
      ] as TextItem[],
    },
  ];

  // Build the text with enhanced structure and context
  const text = sections
    .map((section) => {
      const items = section.items
        .filter((item) => item.value)
        .map((item) => {
          // Use the prefix if available, otherwise use the label
          const prefix = item.prefix || `${item.label}:`;
          return `${prefix} ${item.value}`;
        })
        .join("\n");

      return items ? `${section.title}:\n${items}` : "";
    })
    .filter(Boolean)
    .join("\n\n");

  // Add genre-specific keywords and themes
  const genreKeywords = anime.genres
    .map((genre) => {
      const keywords =
        {
          Action: "action-packed, fighting, battles, combat",
          Adventure: "adventure, journey, exploration, quest",
          Comedy: "comedy, funny, humorous, laughter",
          Drama: "drama, emotional, serious, character development",
          Fantasy: "fantasy, magic, supernatural, mystical",
          Horror: "horror, scary, frightening, supernatural",
          Mecha: "mecha, robots, machines, technology",
          Mystery: "mystery, detective, investigation, suspense",
          Romance: "romance, love, relationships, romantic",
          "Sci-Fi": "science fiction, futuristic, technology, space",
          "Slice of Life":
            "slice of life, everyday life, realistic, daily activities",
          Sports: "sports, athletics, competition, teamwork",
          Thriller: "thriller, suspense, tension, excitement",
          Psychological:
            "psychological, mind games, mental, psychological thriller",
          Supernatural: "supernatural, paranormal, otherworldly, mystical",
          Military: "military, war, armed forces, combat",
          Police: "police, law enforcement, crime, investigation",
          School: "school, education, students, academic",
          Seinen: "seinen, mature, adult themes, sophisticated",
          Shoujo: "shoujo, romance, relationships, emotional",
          Shounen: "shounen, action, adventure, coming of age",
        }[genre] || genre;

      return `${genre} (${keywords})`;
    })
    .join(", ");

  // Add a genre context section
  const genreContext = `\n\nGenre Context:\nThis anime is categorized as: ${genreKeywords}`;

  // Add a relevance section
  const relevanceSection = `\n\nRelevance Context:\nThis anime is a ${
    anime.type || "series"
  } that ${
    anime.status === "Currently Airing"
      ? "is currently airing"
      : "has finished airing"
  }. It is rated ${anime.rating || "N/A"} and has a score of ${
    anime.score
  }/10 from ${anime.scoredBy?.toLocaleString() || "0"} users.`;

  return text + genreContext + relevanceSection;
}
