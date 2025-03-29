import type { Anime } from "../../domain/anime";
import type { AnimeModelProps } from "./model/animeModel";
import { db } from "@/db";
import { animes } from "./model/animeModel";
import { eq, sql } from "drizzle-orm";
import { AnimeMapper } from "./animeMapper";

export class AnimeRepository {
  async save(anime: Anime): Promise<void> {
    const persistenceData = AnimeMapper.toPersistence(anime);

    await db.insert(animes).values(persistenceData).onConflictDoUpdate({
      target: animes.id,
      set: persistenceData,
    });
  }

  async findByMalId(malId: number): Promise<Anime | null> {
    const result = await db
      .select()
      .from(animes)
      .where(eq(animes.malId, malId))
      .limit(1);

    const anime = result[0];
    if (!anime) return null;

    return AnimeMapper.toDomain(anime);
  }

  async findById(id: string): Promise<Anime | null> {
    const result = await db
      .select()
      .from(animes)
      .where(eq(animes.id, id))
      .limit(1);

    const anime = result[0];

    if (!anime) return null;

    return AnimeMapper.toDomain(anime);
  }

  async findSimilarByEmbedding(
    embedding: number[],
    limit = 20,
    searchQuery?: string
  ): Promise<Anime[]> {
    const result = await db.execute(sql`
    WITH similarity_scores AS (
      SELECT 
        id,
        mal_id AS "malId",
        title,
        synopsis,
        genres,
        score,
        popularity,
        type,
        status,
        season,
        year,
        rating,
        duration,
        episodes,
        broadcast,
        source,
        themes,
        demographics,
        studios,
        producers,
        title_english AS "titleEnglish",
        title_japanese AS "titleJapanese",
        title_synonyms AS "titleSynonyms",
        airing,
        background,
        members,
        favorites,
        rank,
        scored_by AS "scoredBy",
        image_url AS "imageUrl",
        mal_url AS "malUrl",
        created_at AS "createdAt",
        updated_at AS "updatedAt",
        -- Vector similarity
        (1 - (embedding <=> ${sql.raw(
          `'[${embedding.join(",")}]'::vector`
        )}))::numeric as embedding_similarity,
        -- Title matches
        CASE 
          WHEN LOWER(title) = ANY(${sql.raw(
            `ARRAY[${searchQuery
              ?.split(",")
              .map((t) => `'${t.trim().toLowerCase()}'`)
              .join(",")}]`
          )}) THEN 1.0::numeric
          WHEN LOWER(title_english) = ANY(${sql.raw(
            `ARRAY[${searchQuery
              ?.split(",")
              .map((t) => `'${t.trim().toLowerCase()}'`)
              .join(",")}]`
          )}) THEN 1.0::numeric
          WHEN LOWER(title_japanese) = ANY(${sql.raw(
            `ARRAY[${searchQuery
              ?.split(",")
              .map((t) => `'${t.trim().toLowerCase()}'`)
              .join(",")}]`
          )}) THEN 1.0::numeric
          ELSE 0::numeric
        END as title_boost
      FROM "animes"
    )
    SELECT 
      *,
      LEAST(1::numeric, 
        CASE 
          WHEN title_boost >= 0.8 THEN 1.0::numeric
          ELSE (embedding_similarity * 0.5) + (title_boost * 0.5)
        END
      ) as final_similarity
    FROM similarity_scores
    ORDER BY final_similarity DESC
    LIMIT ${limit}
  `);

    return (result as unknown as AnimeModelProps[]).map((anime) => {
      return AnimeMapper.toDomain(anime);
    });
  }

  async updateEmbedding(id: string, embedding: number[]): Promise<void> {
    await db.update(animes).set({ embedding }).where(eq(animes.id, id));
  }
}
