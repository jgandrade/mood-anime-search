import { AggregateRoot } from "../../domain/AggregateRoot";
import type { IDomainEvent } from "../../domain/events/IDomainEvent";
import { UniqueEntityID } from "../../domain/UniqueEntityID";

export class TestEvent implements IDomainEvent {
  public dateTimeOccurred: Date;
  public eventId: string;

  constructor(public readonly id: UniqueEntityID) {
    this.dateTimeOccurred = new Date();
    this.eventId = Math.random().toString();
  }

  getAggregateId(): UniqueEntityID {
    return this.id;
  }
}

export class TestAggregate extends AggregateRoot<any> {
  private constructor(id?: UniqueEntityID) {
    super(id);
  }

  public static create(id?: UniqueEntityID): TestAggregate {
    return new TestAggregate(id);
  }

  public addTestEvent(): void {
    const testEvent = new TestEvent(this.id);
    this.addDomainEvent(testEvent);
  }
}
