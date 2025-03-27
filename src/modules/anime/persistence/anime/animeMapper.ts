import { UniqueEntityID } from "@/core/domain/UniqueEntityID";
import { Anime } from "../../domain/anime";
import type { AnimeModelProps } from "./model/animeModel";

export class AnimeMapper {
  public static toDomain(raw: AnimeModelProps): Anime {
    return Anime.create(
      {
        id: raw.id,
        malId: raw.malId || 0,
        title: raw.title,
        synopsis: raw.synopsis || "",
        genres: raw.genres || [],
        embedding: raw.embedding || [],
        score: raw.score || 0,
        popularity: raw.popularity || 0,
        type: raw.type,
        status: raw.status,
        season: raw.season,
        year: raw.year,
        rating: raw.rating,
        duration: raw.duration,
        episodes: raw.episodes,
        broadcast: raw.broadcast,
        source: raw.source,
        themes: raw.themes || [],
        demographics: raw.demographics || [],
        studios: raw.studios || [],
        producers: raw.producers || [],
        titleEnglish: raw.titleEnglish,
        titleJapanese: raw.titleJapanese,
        titleSynonyms: raw.titleSynonyms || [],
        airing: raw.airing,
        background: raw.background,
        members: raw.members,
        favorites: raw.favorites,
        rank: raw.rank,
        scoredBy: raw.scoredBy,
        imageUrl: raw.imageUrl,
        malUrl: raw.malUrl,
        updatedAt: raw.updatedAt,
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id)
    );
  }

  public static toPersistence(anime: Anime): AnimeModelProps {
    return {
      id: anime.id.toString(),
      malId: anime.malId,
      title: anime.title,
      synopsis: anime.synopsis,
      genres: anime.genres,
      embedding: anime.embedding,
      score: anime.score,
      popularity: anime.popularity,
      type: anime.type,
      status: anime.status,
      season: anime.season,
      year: anime.year,
      rating: anime.rating,
      duration: anime.duration,
      episodes: anime.episodes,
      broadcast: anime.broadcast,
      source: anime.source,
      themes: anime.themes || [],
      demographics: anime.demographics || [],
      studios: anime.studios || [],
      producers: anime.producers || [],
      titleEnglish: anime.titleEnglish,
      titleJapanese: anime.titleJapanese,
      titleSynonyms: anime.titleSynonyms || [],
      airing: anime.airing,
      background: anime.background,
      members: anime.members,
      favorites: anime.favorites,
      rank: anime.rank,
      scoredBy: anime.scoredBy,
      imageUrl: anime.imageUrl,
      malUrl: anime.malUrl,
      updatedAt: anime.updatedAt,
      createdAt: anime.createdAt,
    };
  }
}
