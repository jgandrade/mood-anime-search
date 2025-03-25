import { DomainEvents } from "../../../../domain/events/DomainEvents";
import { TestEvent, TestAggregate } from "../../../utils/DomainEventTestMocks";

describe("DomainEvents", () => {
  afterEach(() => {
    DomainEvents.clearHandlers();
    DomainEvents.clearMarkedAggregates();
  });

  test("should register and trigger event handlers", () => {
    const aggregate = TestAggregate.create();
    const eventHandler = jest.fn();
    DomainEvents.register(eventHandler, TestEvent.name);

    aggregate.addTestEvent();
    DomainEvents.dispatchEventsForAggregate(aggregate.id);

    expect(eventHandler).toHaveBeenCalledTimes(1);
    expect(eventHandler.mock.calls[0][0]).toBeInstanceOf(TestEvent);
  });

  test("should mark aggregate for dispatch", () => {
    const aggregate = TestAggregate.create();
    const eventHandler = jest.fn();
    DomainEvents.register(eventHandler, TestEvent.name);

    aggregate.addTestEvent();
    DomainEvents.markAggregateForDispatch(aggregate);
    DomainEvents.dispatchEventsForAggregate(aggregate.id);

    expect(eventHandler).toHaveBeenCalledTimes(1);
  });

  test("should not dispatch events for unregistered event types", () => {
    const aggregate = TestAggregate.create();
    const eventHandler = jest.fn();
    DomainEvents.register(eventHandler, "UnrelatedEvent");

    aggregate.addTestEvent();
    DomainEvents.dispatchEventsForAggregate(aggregate.id);

    expect(eventHandler).not.toHaveBeenCalled();
  });

  test("should clear events after dispatch", () => {
    const aggregate = TestAggregate.create();
    const eventHandler = jest.fn();
    DomainEvents.register(eventHandler, TestEvent.name);

    aggregate.addTestEvent();
    expect(aggregate.domainEvents.length).toBe(1);

    DomainEvents.dispatchEventsForAggregate(aggregate.id);

    expect(aggregate.domainEvents.length).toBe(0);
    expect(eventHandler).toHaveBeenCalledTimes(1);
  });

  test("should not double dispatch events", () => {
    const aggregate = TestAggregate.create();
    const eventHandler = jest.fn();
    DomainEvents.register(eventHandler, TestEvent.name);

    aggregate.addTestEvent();
    DomainEvents.dispatchEventsForAggregate(aggregate.id);
    DomainEvents.dispatchEventsForAggregate(aggregate.id); // Second dispatch should have no effect

    expect(eventHandler).toHaveBeenCalledTimes(1);
  });

  test("should clear all handlers", () => {
    const aggregate = TestAggregate.create();
    const eventHandler = jest.fn();
    DomainEvents.register(eventHandler, TestEvent.name);

    DomainEvents.clearHandlers();
    aggregate.addTestEvent();
    DomainEvents.dispatchEventsForAggregate(aggregate.id);

    expect(eventHandler).not.toHaveBeenCalled();
  });
});
