import { AggregateRoot } from "../../../domain/AggregateRoot";
import { DomainEvents } from "../../../domain/events/DomainEvents";
import { UniqueEntityID } from "../../../domain/UniqueEntityID";
import { TestAggregateRoot, TestDomainEvent } from "../../utils/mocks";

describe("AggregateRoot", () => {
  let aggregateRoot: TestAggregateRoot;
  let mockConsoleInfo: jest.SpyInstance;

  beforeEach(() => {
    aggregateRoot = new TestAggregateRoot();
    mockConsoleInfo = jest.spyOn(console, "info").mockImplementation();
    jest.spyOn(DomainEvents, "markAggregateForDispatch").mockImplementation();
  });

  afterEach(() => {
    mockConsoleInfo.mockRestore();
    jest.clearAllMocks();
  });

  it("should initialize with empty domain events", () => {
    expect(aggregateRoot.domainEvents).toHaveLength(0);
  });

  it("should add domain event and mark for dispatch", () => {
    const event = new TestDomainEvent();
    aggregateRoot.addTestEvent(event);

    expect(aggregateRoot.domainEvents).toHaveLength(1);
    expect(aggregateRoot.domainEvents[0]).toBe(event);
    expect(DomainEvents.markAggregateForDispatch).toHaveBeenCalledWith(
      aggregateRoot
    );
  });

  it("should clear domain events", () => {
    const event1 = new TestDomainEvent();
    const event2 = new TestDomainEvent();

    aggregateRoot.addTestEvent(event1);
    aggregateRoot.addTestEvent(event2);
    expect(aggregateRoot.domainEvents).toHaveLength(2);

    aggregateRoot.clearEvents();
    expect(aggregateRoot.domainEvents).toHaveLength(0);
  });

  it("should log domain event creation", () => {
    const event = new TestDomainEvent();
    aggregateRoot.addTestEvent(event);

    expect(mockConsoleInfo).toHaveBeenCalledWith(
      "[Domain Event Created]:",
      "TestAggregateRoot",
      "==>",
      "TestDomainEvent"
    );
  });

  it("should maintain unique entity ID", () => {
    const id = new UniqueEntityID();
    const rootWithId = new TestAggregateRoot(id);

    expect(rootWithId.id).toBe(id);
  });
});
