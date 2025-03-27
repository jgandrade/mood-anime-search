CREATE TABLE "animes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"mal_id" integer NOT NULL,
	"title" text NOT NULL,
	"synopsis" text NOT NULL,
	"genres" text[] NOT NULL,
	"embedding" vector(1536) NOT NULL,
	"score" real NOT NULL,
	"popularity" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "animes_mal_id_unique" UNIQUE("mal_id")
);
