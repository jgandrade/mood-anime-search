ALTER TABLE "animes" ADD COLUMN "type" text NOT NULL;--> statement-breakpoint
ALTER TABLE "animes" ADD COLUMN "status" text NOT NULL;--> statement-breakpoint
ALTER TABLE "animes" ADD COLUMN "season" text NOT NULL;--> statement-breakpoint
ALTER TABLE "animes" ADD COLUMN "year" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "animes" ADD COLUMN "rating" text NOT NULL;--> statement-breakpoint
ALTER TABLE "animes" ADD COLUMN "duration" text NOT NULL;--> statement-breakpoint
ALTER TABLE "animes" ADD COLUMN "episodes" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "animes" ADD COLUMN "broadcast" text NOT NULL;--> statement-breakpoint
ALTER TABLE "animes" ADD COLUMN "source" text NOT NULL;--> statement-breakpoint
ALTER TABLE "animes" ADD COLUMN "themes" text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "animes" ADD COLUMN "demographics" text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "animes" ADD COLUMN "studios" text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "animes" ADD COLUMN "producers" text[] NOT NULL;