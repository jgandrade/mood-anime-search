import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  real,
  vector,
  boolean,
} from "drizzle-orm/pg-core";
import type { InferSelectModel } from "drizzle-orm";

export const animes = pgTable("animes", {
  id: uuid("id").primaryKey().defaultRandom(),
  malId: integer("mal_id").notNull().unique(),
  title: text("title").notNull(),
  synopsis: text("synopsis"),
  genres: text("genres").array().default([]),
  embedding: vector("embedding", { dimensions: 1536 }).notNull(),
  score: real("score"),
  popularity: integer("popularity"),
  type: text("type"),
  status: text("status"),
  season: text("season"),
  year: integer("year"),
  rating: text("rating"),
  duration: text("duration"),
  episodes: integer("episodes"),
  broadcast: text("broadcast"),
  source: text("source"),
  themes: text("themes").array().default([]),
  demographics: text("demographics").array().default([]),
  studios: text("studios").array().default([]),
  producers: text("producers").array().default([]),
  titleEnglish: text("title_english"),
  titleJapanese: text("title_japanese"),
  titleSynonyms: text("title_synonyms").array().default([]),
  airing: boolean("airing"),
  background: text("background"),
  members: integer("members"),
  favorites: integer("favorites"),
  rank: integer("rank"),
  scoredBy: integer("scored_by"),
  imageUrl: text("image_url"),
  malUrl: text("mal_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type AnimeModelProps = InferSelectModel<typeof animes>;

export const AnimeModel = animes;
