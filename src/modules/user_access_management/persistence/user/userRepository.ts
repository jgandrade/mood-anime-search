import { eq } from "drizzle-orm";
import { db } from "../../../../db";
import { UserMapper } from "./userMapper";
import { UserModel } from "./models/userModel";
import type { User } from "../../domain/user/User";

export class UserRepository {
  async findById(id: string): Promise<User | null> {
    const result = await db
      .select()
      .from(UserModel)
      .where(eq(UserModel.id, id))
      .limit(1);

    const user = result[0];
    return user ? UserMapper.toDomain(user) : null;
  }

  async findBySupabaseId(supabaseId: string): Promise<User | null> {
    const result = await db
      .select()
      .from(UserModel)
      .where(eq(UserModel.supabaseId, supabaseId))
      .limit(1);

    const user = result[0];
    return user ? UserMapper.toDomain(user) : null;
  }

  async save(user: User): Promise<void> {
    const persistenceData = UserMapper.toPersistence(user);

    await db.insert(UserModel).values(persistenceData).onConflictDoUpdate({
      target: UserModel.id,
      set: persistenceData,
    });
  }

  async delete(id: string): Promise<void> {
    await db.delete(UserModel).where(eq(UserModel.id, id));
  }
}
