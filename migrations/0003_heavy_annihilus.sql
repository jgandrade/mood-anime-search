ALTER TABLE "animes" ALTER COLUMN "type" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "animes" ALTER COLUMN "status" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "animes" ALTER COLUMN "season" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "animes" ALTER COLUMN "year" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "animes" ALTER COLUMN "rating" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "animes" ALTER COLUMN "duration" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "animes" ALTER COLUMN "episodes" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "animes" ALTER COLUMN "broadcast" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "animes" ALTER COLUMN "source" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "animes" ALTER COLUMN "themes" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "animes" ALTER COLUMN "demographics" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "animes" ALTER COLUMN "studios" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "animes" ALTER COLUMN "producers" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "animes" ADD COLUMN "title_english" text;--> statement-breakpoint
ALTER TABLE "animes" ADD COLUMN "title_japanese" text;--> statement-breakpoint
ALTER TABLE "animes" ADD COLUMN "title_synonyms" text[];--> statement-breakpoint
ALTER TABLE "animes" ADD COLUMN "airing" boolean;--> statement-breakpoint
ALTER TABLE "animes" ADD COLUMN "background" text;--> statement-breakpoint
ALTER TABLE "animes" ADD COLUMN "members" integer;--> statement-breakpoint
ALTER TABLE "animes" ADD COLUMN "favorites" integer;--> statement-breakpoint
ALTER TABLE "animes" ADD COLUMN "rank" integer;--> statement-breakpoint
ALTER TABLE "animes" ADD COLUMN "scored_by" integer;