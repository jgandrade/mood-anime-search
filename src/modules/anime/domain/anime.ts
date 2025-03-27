import { AggregateRoot } from "@/core/domain/AggregateRoot";
import type { UniqueEntityID } from "@/core/domain/UniqueEntityID";

interface AnimeProps {
  id: string;
  malId: number;
  title: string;
  synopsis: string;
  genres: string[];
  embedding: number[];
  score: number;
  popularity: number;
  type?: string;
  status?: string;
  season?: string;
  year?: number;
  rating?: string;
  duration?: string;
  episodes?: number;
  broadcast?: string;
  source?: string;
  themes?: string[];
  demographics?: string[];
  studios?: string[];
  producers?: string[];
  titleEnglish?: string;
  titleJapanese?: string;
  titleSynonyms?: string[];
  airing?: boolean;
  background?: string;
  members?: number;
  favorites?: number;
  rank?: number;
  scoredBy?: number;
  imageUrl?: string;
  malUrl?: string;
  updatedAt: Date;
  createdAt: Date;
}

export class Anime extends AggregateRoot<AnimeProps> {
  private constructor(props: AnimeProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: AnimeProps, id?: UniqueEntityID): Anime {
    return new Anime(props, id);
  }

  get malId(): number {
    return this.props.malId;
  }

  get title(): string {
    return this.props.title;
  }

  get synopsis(): string {
    return this.props.synopsis;
  }

  get genres(): string[] {
    return this.props.genres;
  }

  get embedding(): number[] {
    return this.props.embedding;
  }

  get score(): number {
    return this.props.score;
  }

  get popularity(): number {
    return this.props.popularity;
  }

  get type(): string | undefined {
    return this.props.type;
  }

  get status(): string | undefined {
    return this.props.status;
  }

  get season(): string | undefined {
    return this.props.season;
  }

  get year(): number | undefined {
    return this.props.year;
  }

  get rating(): string | undefined {
    return this.props.rating;
  }

  get duration(): string | undefined {
    return this.props.duration;
  }

  get episodes(): number | undefined {
    return this.props.episodes;
  }

  get broadcast(): string | undefined {
    return this.props.broadcast;
  }

  get source(): string | undefined {
    return this.props.source;
  }

  get themes(): string[] | undefined {
    return this.props.themes;
  }

  get demographics(): string[] | undefined {
    return this.props.demographics;
  }

  get studios(): string[] | undefined {
    return this.props.studios;
  }

  get producers(): string[] | undefined {
    return this.props.producers;
  }

  get titleEnglish(): string | undefined {
    return this.props.titleEnglish;
  }

  get titleJapanese(): string | undefined {
    return this.props.titleJapanese;
  }

  get titleSynonyms(): string[] | undefined {
    return this.props.titleSynonyms;
  }

  get airing(): boolean | undefined {
    return this.props.airing;
  }

  get background(): string | undefined {
    return this.props.background;
  }

  get members(): number | undefined {
    return this.props.members;
  }

  get favorites(): number | undefined {
    return this.props.favorites;
  }

  get rank(): number | undefined {
    return this.props.rank;
  }

  get scoredBy(): number | undefined {
    return this.props.scoredBy;
  }

  get imageUrl(): string | undefined {
    return this.props.imageUrl;
  }

  get malUrl(): string | undefined {
    return this.props.malUrl;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
