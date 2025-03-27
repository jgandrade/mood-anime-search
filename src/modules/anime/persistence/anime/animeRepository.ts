import type { Anime } from "../../domain/anime";
import { db } from "@/db";
import { animes } from "./model/animeModel";
import { eq, sql, ilike, or } from "drizzle-orm";
import { AnimeMapper } from "./animeMapper";

type RawAnimeResult = {
  id: string;
  mal_id: number;
  title: string;
  synopsis: string;
  genres: string[];
  score: number;
  popularity: number;
  type: string | null;
  status: string | null;
  season: string | null;
  year: number | null;
  rating: string | null;
  duration: string | null;
  episodes: number | null;
  broadcast: string | null;
  source: string | null;
  themes: string[] | null;
  demographics: string[] | null;
  studios: string[] | null;
  producers: string[] | null;
  title_english: string | null;
  title_japanese: string | null;
  title_synonyms: string[] | null;
  airing: boolean | null;
  background: string | null;
  members: number | null;
  favorites: number | null;
  rank: number | null;
  scored_by: number | null;
  image_url: string | null;
  mal_url: string | null;
  created_at: Date;
  updated_at: Date;
  similarity: number;
};

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

    const mappedAnime = {
      ...anime,
      type: anime.type ?? undefined,
      status: anime.status ?? undefined,
      season: anime.season ?? undefined,
      year: anime.year ?? undefined,
      rating: anime.rating ?? undefined,
      duration: anime.duration ?? undefined,
      episodes: anime.episodes ?? undefined,
      broadcast: anime.broadcast ?? undefined,
      source: anime.source ?? undefined,
      themes: anime.themes ?? undefined,
      demographics: anime.demographics ?? undefined,
      studios: anime.studios ?? undefined,
      producers: anime.producers ?? undefined,
      titleEnglish: anime.titleEnglish ?? undefined,
      titleJapanese: anime.titleJapanese ?? undefined,
      titleSynonyms: anime.titleSynonyms ?? undefined,
      airing: anime.airing ?? undefined,
      background: anime.background ?? undefined,
      members: anime.members ?? undefined,
      favorites: anime.favorites ?? undefined,
      rank: anime.rank ?? undefined,
      scoredBy: anime.scoredBy ?? undefined,
      imageUrl: anime.imageUrl ?? undefined,
      malUrl: anime.malUrl ?? undefined,
    };

    return AnimeMapper.toDomain(mappedAnime);
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
          mal_id,
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
          title_english,
          title_japanese,
          title_synonyms,
          airing,
          background,
          members,
          favorites,
          rank,
          scored_by,
          image_url,
          mal_url,
          created_at,
          updated_at,
          -- Vector similarity (semantic understanding)
          (1 - (embedding <=> ${sql.raw(
            `'[${embedding.join(",")}]'::vector`
          )}))::numeric as embedding_similarity,
          -- Title matches (exact matching + popularity)
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
            WHEN title_boost >= 0.8 THEN 1.0::numeric -- Exact title match takes precedence
            ELSE (embedding_similarity * 0.6) + (title_boost * 0.4) -- 60% weight to semantic understanding, 40% to title matches
          END
        ) as final_similarity
      FROM similarity_scores
      ORDER BY final_similarity DESC
      LIMIT ${limit}
    `);

    const rawResults = result as unknown as (RawAnimeResult & {
      final_similarity: number;
    })[];
    return rawResults.map((anime) => {
      const mappedAnime = {
        id: anime.id,
        malId: anime.mal_id,
        title: anime.title,
        synopsis: anime.synopsis,
        genres: anime.genres,
        score: anime.score,
        popularity: anime.popularity,
        type: anime.type ?? undefined,
        status: anime.status ?? undefined,
        season: anime.season ?? undefined,
        year: anime.year ?? undefined,
        rating: anime.rating ?? undefined,
        duration: anime.duration ?? undefined,
        episodes: anime.episodes ?? undefined,
        broadcast: anime.broadcast ?? undefined,
        source: anime.source ?? undefined,
        themes: anime.themes ?? undefined,
        demographics: anime.demographics ?? undefined,
        studios: anime.studios ?? undefined,
        producers: anime.producers ?? undefined,
        titleEnglish: anime.title_english ?? undefined,
        titleJapanese: anime.title_japanese ?? undefined,
        titleSynonyms: anime.title_synonyms ?? undefined,
        airing: anime.airing ?? undefined,
        background: anime.background ?? undefined,
        members: anime.members ?? undefined,
        favorites: anime.favorites ?? undefined,
        rank: anime.rank ?? undefined,
        scoredBy: anime.scored_by ?? undefined,
        imageUrl: anime.image_url ?? undefined,
        malUrl: anime.mal_url ?? undefined,
        embedding: [],
        createdAt: anime.created_at,
        updatedAt: anime.updated_at,
        similarity: anime.final_similarity,
      };

      return AnimeMapper.toDomain(mappedAnime);
    });
  }

  async updateEmbedding(id: string, embedding: number[]): Promise<void> {
    await db.update(animes).set({ embedding }).where(eq(animes.id, id));
  }
}
