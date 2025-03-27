import { Anime } from "../anime";
import { UniqueEntityID } from "@/core/domain/UniqueEntityID";
import { v4 as uuidv4 } from "uuid";

interface JikanPagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

interface JikanImage {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

interface JikanImages {
  jpg: JikanImage;
  webp: JikanImage;
}

interface JikanTrailer {
  youtube_id: string;
  url: string;
  embed_url: string;
  images: {
    image_url: string;
    small_image_url: string;
    medium_image_url: string;
    large_image_url: string;
    maximum_image_url: string;
  };
}

interface JikanTitle {
  type: string;
  title: string;
}

interface JikanAired {
  from: string;
  to: string;
  prop: {
    from: {
      day: number;
      month: number;
      year: number;
    };
    to: {
      day: number;
      month: number;
      year: number;
    };
  };
  string: string;
}

interface JikanBroadcast {
  day: string;
  time: string;
  timezone: string;
  string: string;
}

interface JikanEntity {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface JikanAnime {
  mal_id: number;
  url: string;
  images: JikanImages;
  trailer: JikanTrailer;
  approved: boolean;
  titles: JikanTitle[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: JikanAired;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: JikanBroadcast;
  producers: JikanEntity[];
  licensors: JikanEntity[];
  studios: JikanEntity[];
  genres: JikanEntity[];
  explicit_genres: JikanEntity[];
  themes: JikanEntity[];
  demographics: JikanEntity[];
}

interface JikanResponse {
  pagination: JikanPagination;
  data: JikanAnime[];
}

export class JikanService {
  private readonly baseUrl = "https://api.jikan.moe/v4";

  private mapJikanAnimeToAnimeProps(jikanAnime: JikanAnime) {
    return {
      id: uuidv4(),
      malId: jikanAnime.mal_id,
      malUrl: jikanAnime.url,
      imageUrl: jikanAnime.images.jpg.large_image_url,
      title: jikanAnime.title,
      synopsis: jikanAnime.synopsis,
      genres: jikanAnime.genres.map((genre) => genre.name),
      score: jikanAnime.score,
      popularity: jikanAnime.popularity,
      type: jikanAnime.type,
      status: jikanAnime.status,
      season: jikanAnime.season,
      year: jikanAnime.year,
      rating: jikanAnime.rating,
      duration: jikanAnime.duration,
      episodes: jikanAnime.episodes,
      broadcast: jikanAnime.broadcast.string,
      source: jikanAnime.source,
      themes: jikanAnime.themes.map((theme) => theme.name),
      demographics: jikanAnime.demographics.map((demo) => demo.name),
      studios: jikanAnime.studios.map((studio) => studio.name),
      producers: jikanAnime.producers.map((producer) => producer.name),
      titleEnglish: jikanAnime.title_english,
      titleJapanese: jikanAnime.title_japanese,
      titleSynonyms: jikanAnime.title_synonyms,
      airing: jikanAnime.airing,
      background: jikanAnime.background,
      members: jikanAnime.members,
      favorites: jikanAnime.favorites,
      rank: jikanAnime.rank,
      scoredBy: jikanAnime.scored_by,
      embedding: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async getTopAnime(limit = 25, page = 1): Promise<Anime[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/top/anime?limit=${limit}&page=${page}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: JikanResponse = await response.json();

      return data.data.map((jikanAnime) => {
        const props = this.mapJikanAnimeToAnimeProps(jikanAnime);
        return Anime.create(props, new UniqueEntityID(props.id));
      });
    } catch (error) {
      console.error("Error fetching top anime from Jikan:", error);
      return [];
    }
  }

  async searchAnime(query: string, page = 1, limit = 10): Promise<Anime[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/anime?q=${encodeURIComponent(
          query
        )}&page=${page}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: JikanResponse = await response.json();

      return data.data.map((jikanAnime) => {
        const props = this.mapJikanAnimeToAnimeProps(jikanAnime);
        return Anime.create(props, new UniqueEntityID(props.id));
      });
    } catch (error) {
      console.error("Error fetching anime from Jikan:", error);
      return [];
    }
  }

  async getAnimeById(malId: number): Promise<Anime | null> {
    try {
      const response = await fetch(`${this.baseUrl}/anime/${malId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { data }: { data: JikanAnime } = await response.json();
      const props = this.mapJikanAnimeToAnimeProps(data);
      return Anime.create(props, new UniqueEntityID(props.id));
    } catch (error) {
      console.error("Error fetching anime from Jikan:", error);
      return null;
    }
  }
}
