import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export interface UserModelProps {
  id: string;
  supabaseId: string;
  createdAt: Date;
  updatedAt: Date;
}

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  supabaseId: text("supabase_id").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const UserModel = users;
