import { DomainEvents } from "../../domain/events/DomainEvents";
import {
  Anime,
  AnimeCreatedEvent,
  AnimeCreatedHandler,
  AnimeProps,
} from "../utils/AnimeTestMocks";

describe("Domain Event Flow", () => {
  beforeEach(() => {
    DomainEvents.clearHandlers();
    DomainEvents.clearMarkedAggregates();
  });

  it("should demonstrate the complete flow of domain events from creation to handling", () => {
    // Step 1: Create the event handler
    const animeCreatedHandler = new AnimeCreatedHandler();
    expect(animeCreatedHandler.getHandledEventsCount()).toBe(0);

    // Step 2: Create a new anime entity (this will add a domain event)
    const animeProps: AnimeProps = {
      title: "Attack on Titan",
      synopsis:
        "Humanity fights against giant humanoid creatures called Titans",
      released: false,
    };

    const anime = Anime.create(animeProps);

    // Step 3: Verify the domain event was created but not yet dispatched
    expect(anime.domainEvents.length).toBe(1);
    expect(anime.domainEvents[0]).toBeInstanceOf(AnimeCreatedEvent);
    expect(animeCreatedHandler.getHandledEventsCount()).toBe(0);

    // Step 4: Dispatch the domain events for the aggregate
    DomainEvents.dispatchEventsForAggregate(anime.id);

    // Step 5: Verify the event was handled and the event list was cleared
    expect(anime.domainEvents.length).toBe(0);
    expect(animeCreatedHandler.getHandledEventsCount()).toBe(1);

    // Step 6: Update the entity
    anime.markAsReleased();
    expect(anime.released).toBe(true);

    // Step 7: Create another anime to demonstrate multiple aggregates
    const anotherAnime = Anime.create({
      title: "My Hero Academia",
      synopsis: 'A world where people have superpowers called "Quirks"',
      released: true,
    });

    // Step 8: Verify both aggregates exist but only new events are pending
    expect(anotherAnime.domainEvents.length).toBe(1);
    expect(anime.domainEvents.length).toBe(0);

    // Step 9: Dispatch events for the second aggregate
    DomainEvents.dispatchEventsForAggregate(anotherAnime.id);

    // Step 10: Verify both events have been handled
    expect(animeCreatedHandler.getHandledEventsCount()).toBe(2);
    expect(anotherAnime.domainEvents.length).toBe(0);
  });
});
