import type { UniqueEntityID } from "../../../../core/domain/UniqueEntityID";
import { AggregateRoot } from "../../../../core/domain/AggregateRoot";

export interface UserProps {
  supabaseId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User extends AggregateRoot<UserProps> {
  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: UserProps, id?: UniqueEntityID): User {
    return new User(props, id);
  }

  get supabaseId(): string {
    return this.props.supabaseId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
