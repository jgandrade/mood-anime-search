import { User } from "../../domain/user/User";
import type { UserModelProps } from "./models/userModel";
import { UniqueEntityID } from "../../../../core/domain/UniqueEntityID";

export class UserMapper {
  public static toDomain(raw: UserModelProps): User {
    return User.create(
      {
        supabaseId: raw.supabaseId,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityID(raw.id)
    );
  }

  public static toPersistence(user: User): UserModelProps {
    return {
      id: user.id.toString(),
      supabaseId: user.supabaseId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
