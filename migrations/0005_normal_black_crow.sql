ALTER TABLE "animes" ALTER COLUMN "synopsis" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "animes" ALTER COLUMN "genres" SET DEFAULT '{}';--> statement-breakpoint
ALTER TABLE "animes" ALTER COLUMN "genres" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "animes" ALTER COLUMN "score" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "animes" ALTER COLUMN "popularity" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "animes" ALTER COLUMN "themes" SET DEFAULT '{}';--> statement-breakpoint
ALTER TABLE "animes" ALTER COLUMN "demographics" SET DEFAULT '{}';--> statement-breakpoint
ALTER TABLE "animes" ALTER COLUMN "studios" SET DEFAULT '{}';--> statement-breakpoint
ALTER TABLE "animes" ALTER COLUMN "producers" SET DEFAULT '{}';--> statement-breakpoint
ALTER TABLE "animes" ALTER COLUMN "title_synonyms" SET DEFAULT '{}';