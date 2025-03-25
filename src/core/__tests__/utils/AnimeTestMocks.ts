import { AggregateRoot } from "../../domain/AggregateRoot";
import { DomainEvents } from "../../domain/events/DomainEvents";
import { IDomainEvent } from "../../domain/events/IDomainEvent";
import { IHandle } from "../../domain/events/IHandle";
import { UniqueEntityID } from "../../domain/UniqueEntityID";

export class AnimeCreatedEvent implements IDomainEvent {
  dateTimeOccurred: Date;

  constructor(public readonly animeId: UniqueEntityID) {
    this.dateTimeOccurred = new Date();
  }

  getAggregateId(): UniqueEntityID {
    return this.animeId;
  }
}

export interface AnimeProps {
  title: string;
  synopsis: string;
  released: boolean;
}

export class Anime extends AggregateRoot<AnimeProps> {
  get title(): string {
    return this.props.title;
  }

  get synopsis(): string {
    return this.props.synopsis;
  }

  get released(): boolean {
    return this.props.released;
  }

  private constructor(props: AnimeProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: AnimeProps, id?: UniqueEntityID): Anime {
    const anime = new Anime(props, id);

    if (!id) {
      anime.addDomainEvent(new AnimeCreatedEvent(anime.id));
    }

    return anime;
  }

  public markAsReleased(): void {
    if (!this.props.released) {
      this.props.released = true;
    }
  }
}

export class AnimeCreatedHandler implements IHandle<AnimeCreatedEvent> {
  private handledEvents: AnimeCreatedEvent[] = [];

  constructor() {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.onAnimeCreated.bind(this) as (event: IDomainEvent) => void,
      AnimeCreatedEvent.name
    );
  }

  onAnimeCreated(event: AnimeCreatedEvent): void {
    console.log(`Anime created with ID: ${event.animeId.toString()}`);
    this.handledEvents.push(event);
  }

  getHandledEventsCount(): number {
    return this.handledEvents.length;
  }
}
