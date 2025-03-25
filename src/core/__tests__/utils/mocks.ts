import type { IDomainEvent } from "../../domain/events/IDomainEvent";
import type { UseCase } from "../../domain/UseCase";
import { AggregateRoot } from "../../domain/AggregateRoot";
import { UniqueEntityID } from "../../domain/UniqueEntityID";
import { Entity } from "../../domain/Entity";

export class TestAggregateRoot extends AggregateRoot<any> {
  constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  public addTestEvent(event: IDomainEvent): void {
    this.addDomainEvent(event);
  }
}

export class TestDomainEvent implements IDomainEvent {
  dateTimeOccurred: Date;

  getAggregateId(): UniqueEntityID {
    return new UniqueEntityID();
  }

  constructor() {
    this.dateTimeOccurred = new Date();
  }
}

export class TestEntity extends Entity<{ value: string }> {}

export class ExampleUseCase implements UseCase<string, number> {
  execute(request?: string): number {
    return request ? request.length : 0;
  }
}
