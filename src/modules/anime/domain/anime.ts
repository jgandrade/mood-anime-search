import { AggregateRoot } from "@/core/domain/AggregateRoot";
import type { UniqueEntityID } from "@/core/domain/UniqueEntityID";

interface AnimeDomainProps {
  id: string;
  malId: number;
  title: string;
  synopsis: string | null;
  genres: string[] | null;
  embedding: number[];
  score: number | null;
  popularity: number | null;
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
  titleEnglish: string | null;
  titleJapanese: string | null;
  titleSynonyms: string[] | null;
  airing: boolean | null;
  background: string | null;
  members: number | null;
  favorites: number | null;
  rank: number | null;
  scoredBy: number | null;
  imageUrl: string | null;
  malUrl: string | null;
  updatedAt: Date;
  createdAt: Date;
}

export class Anime extends AggregateRoot<AnimeDomainProps> {
  private constructor(props: AnimeDomainProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: AnimeDomainProps, id?: UniqueEntityID): Anime {
    return new Anime(props, id);
  }

  get malId(): number {
    return this.props.malId;
  }

  get title(): string {
    return this.props.title;
  }

  get synopsis(): string | null {
    return this.props.synopsis;
  }

  get genres(): string[] | null {
    return this.props.genres;
  }

  get embedding(): number[] {
    return this.props.embedding;
  }

  get score(): number | null {
    return this.props.score;
  }

  get popularity(): number | null {
    return this.props.popularity;
  }

  get type(): string | null {
    return this.props.type;
  }

  get status(): string | null {
    return this.props.status;
  }

  get season(): string | null {
    return this.props.season;
  }

  get year(): number | null {
    return this.props.year;
  }

  get rating(): string | null {
    return this.props.rating;
  }

  get duration(): string | null {
    return this.props.duration;
  }

  get episodes(): number | null {
    return this.props.episodes;
  }

  get broadcast(): string | null {
    return this.props.broadcast;
  }

  get source(): string | null {
    return this.props.source;
  }

  get themes(): string[] | null {
    return this.props.themes;
  }

  get demographics(): string[] | null {
    return this.props.demographics;
  }

  get studios(): string[] | null {
    return this.props.studios;
  }

  get producers(): string[] | null {
    return this.props.producers;
  }

  get titleEnglish(): string | null {
    return this.props.titleEnglish;
  }

  get titleJapanese(): string | null {
    return this.props.titleJapanese;
  }

  get titleSynonyms(): string[] | null {
    return this.props.titleSynonyms;
  }

  get airing(): boolean | null {
    return this.props.airing;
  }

  get background(): string | null {
    return this.props.background;
  }

  get members(): number | null {
    return this.props.members;
  }

  get favorites(): number | null {
    return this.props.favorites;
  }

  get rank(): number | null {
    return this.props.rank;
  }

  get scoredBy(): number | null {
    return this.props.scoredBy;
  }

  get imageUrl(): string | null {
    return this.props.imageUrl;
  }

  get malUrl(): string | null {
    return this.props.malUrl;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
