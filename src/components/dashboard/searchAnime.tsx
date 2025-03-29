"use client";

import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimeProps {
  id: string;
  malId: number;
  title: string;
  synopsis: string;
  genres: string[];
  score: number;
  popularity: number;
  type?: string;
  status?: string;
  season?: string;
  year?: number;
  rating?: string;
  duration?: string;
  episodes?: number;
  broadcast?: string;
  source?: string;
  themes?: string[];
  demographics?: string[];
  studios?: string[];
  producers?: string[];
  titleEnglish?: string;
  titleJapanese?: string;
  titleSynonyms?: string[];
  airing?: boolean;
  background?: string;
  members?: number;
  favorites?: number;
  rank?: number;
  scoredBy?: number;
  imageUrl?: string;
  malUrl?: string;
  createdAt: string;
  updatedAt: string;
}

interface AnimeResponse {
  _id: {
    value: string;
  };
  props: AnimeProps;
  _domainEvents: unknown[];
}

interface SearchResponse {
  bySimilarity: AnimeProps[];
  byPopularity: AnimeProps[];
  byRating: AnimeProps[];
}

const AnimeCard = memo(
  ({ anime }: { anime: AnimeProps }) => (
    <Card className="group pt-0 h-full overflow-hidden hover:shadow-lg transition-all duration-300 bg-background border-secondary">
      {anime.imageUrl && (
        <div className="relative h-64 w-full overflow-hidden">
          <img
            loading="lazy"
            src={anime.imageUrl}
            alt={anime.title}
            className="object-cover w-full h-full transform group-hover:scale-105 transition-all duration-300"
          />
          <div className="absolute bottom-3 left-3 z-20 flex gap-2 flex-wrap">
            {anime.genres.slice(0, 3).map((genre) => (
              <span
                key={genre}
                className="px-2 py-1 text-xs bg-background/80 text-foreground 
                          rounded-full border border-border"
              >
                {genre}
              </span>
            ))}
            {anime.genres.length > 3 && (
              <span
                className="px-2 py-1 text-xs bg-background/80 text-foreground 
                            rounded-full border border-border"
              >
                +{anime.genres.length - 3}
              </span>
            )}
          </div>
        </div>
      )}
      <CardHeader className="space-y-1 p-4 bg-background">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg font-semibold line-clamp-1 text-foreground">
            {anime.malUrl ? (
              <a
                href={anime.malUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                {anime.title}
              </a>
            ) : (
              anime.title
            )}
          </CardTitle>
          <div className="flex items-center gap-1.5 min-w-fit">
            <svg
              className="w-4 h-4 text-yellow-400 fill-current"
              viewBox="0 0 24 24"
            >
              <title>Score</title>
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span className="font-medium text-foreground">
              {anime.score.toFixed(1)}
            </span>
          </div>
        </div>
        {anime.titleEnglish && anime.titleEnglish !== anime.title && (
          <p className="text-sm text-muted-foreground line-clamp-1">
            {anime.titleEnglish}
          </p>
        )}
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-4 bg-background">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {anime.synopsis}
        </p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Type:</span>
            <span className="font-medium text-foreground">
              {anime.type || "N/A"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Episodes:</span>
            <span className="font-medium text-foreground">
              {anime.episodes || "N/A"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Status:</span>
            <span className="font-medium text-foreground">
              {anime.status || "N/A"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Year:</span>
            <span className="font-medium text-foreground">
              {anime.year || "N/A"}
            </span>
          </div>
        </div>
        {anime.studios && anime.studios.length > 0 && (
          <div className="pt-2 border-t border-border">
            <div className="flex flex-wrap gap-1.5">
              {anime.studios.map((studio) => (
                <span
                  key={studio}
                  className="px-2 py-0.5 text-xs bg-primary/10 text-primary 
                          rounded-full hover:bg-primary/20 transition-colors"
                >
                  {studio}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  ),
  (prevProps, nextProps) => prevProps.anime.id === nextProps.anime.id
);

const AnimatedCard = memo(
  ({ anime, index }: { anime: AnimeProps; index: number }) => {
    return (
      <motion.div
        key={anime.id}
        initial={{ opacity: 1, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: Math.min(index * 0.1, 1) }}
      >
        <AnimeCard anime={anime} />
      </motion.div>
    );
  }
);

export function SearchAnime() {
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<
    "similarity" | "popularity" | "rating"
  >("similarity");
  const [results, setResults] = useState<SearchResponse>({
    bySimilarity: [],
    byPopularity: [],
    byRating: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  const maxCharacters = 150;
  const [displayCount, setDisplayCount] = useState(20);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const wordCount = value
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0).length;

      if (wordCount <= maxCharacters) {
        setQuery(value);
      }
    },
    []
  );

  const handleSearch = useCallback(
    async (retry = false) => {
      if (!debouncedQuery.trim()) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/anime/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userInput: debouncedQuery }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to search anime");
        }

        const data = await response.json();
        setResults({
          bySimilarity: data.anime.bySimilarity.map(
            (item: AnimeResponse) => item.props
          ),
          byPopularity: data.anime.byPopularity.map(
            (item: AnimeResponse) => item.props
          ),
          byRating: data.anime.byRating.map(
            (item: AnimeResponse) => item.props
          ),
        });
        setRetryCount(0);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Something went wrong";
        setError(errorMessage);

        if (errorMessage.includes("high demand") && retryCount < maxRetries) {
          setTimeout(
            () => {
              setRetryCount((prev) => prev + 1);
              handleSearch(true);
            },
            2000 * (retryCount + 1)
          );
        }
      } finally {
        setIsLoading(false);
      }
    },
    [debouncedQuery, retryCount]
  );

  const characterCount = useMemo(() => query.length, [query]);
  const isNearLimit = useMemo(
    () => characterCount > maxCharacters * 0.8,
    [characterCount]
  );
  const isAtLimit = useMemo(
    () => characterCount >= maxCharacters,
    [characterCount]
  );

  const displayedResults = useMemo(() => {
    const currentResults =
      results[
        `by${
          activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
        }` as keyof SearchResponse
      ];
    return currentResults
      .slice(0, displayCount)
      .map((anime, index) => (
        <AnimatedCard key={anime.id} anime={anime} index={index} />
      ));
  }, [results, displayCount, activeTab]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="space-y-2">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Describe your mood... (e.g., need motivation, feeling romantic, want to laugh)"
              value={query}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className={cn(
                "pr-12",
                isNearLimit &&
                  "border-yellow-500/50 focus-visible:border-yellow-500/50",
                isAtLimit && "border-red-500/50 focus-visible:border-red-500/50"
              )}
            />
            <motion.div
              className="absolute right-4 top-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <span
                className={cn(
                  "text-sm font-medium",
                  isAtLimit
                    ? "text-red-500"
                    : isNearLimit
                      ? "text-yellow-500"
                      : "text-muted-foreground"
                )}
              >
                {characterCount}/{maxCharacters}
              </span>
            </motion.div>
          </div>
          <Button
            onClick={() => handleSearch()}
            disabled={isLoading || !query.trim()}
            className="min-w-[100px]"
          >
            {isLoading ? (
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <RefreshCw className="w-4 h-4 animate-spin" />
                Searching...
              </motion.div>
            ) : (
              "Search"
            )}
          </Button>
        </div>
      </div>

      {(results.bySimilarity.length > 0 ||
        results.byPopularity.length > 0 ||
        results.byRating.length > 0) && (
        <div className="flex gap-2 border-b border-border">
          <Button
            variant={activeTab === "similarity" ? "default" : "ghost"}
            onClick={() => setActiveTab("similarity")}
            className="rounded-none border-b-2 border-transparent"
          >
            By Relevance
          </Button>
          <Button
            variant={activeTab === "popularity" ? "default" : "ghost"}
            onClick={() => setActiveTab("popularity")}
            className="rounded-none border-b-2 border-transparent"
          >
            Most Popular
          </Button>
          <Button
            variant={activeTab === "rating" ? "default" : "ghost"}
            onClick={() => setActiveTab("rating")}
            className="rounded-none border-b-2 border-transparent"
          >
            Highest Rated
          </Button>
        </div>
      )}

      {error && (
        <motion.div
          className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-950/50 text-red-500 rounded-lg border border-red-200 dark:border-red-800"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <AlertCircle className="w-5 h-5" />
          <div>
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
            {error.includes("high demand") && retryCount < maxRetries && (
              <motion.p
                className="text-sm mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Retrying in {2 * (retryCount + 1)} seconds...
              </motion.p>
            )}
          </div>
        </motion.div>
      )}

      <div className="grid gap-4 md:grid-cols-2">{displayedResults}</div>

      {results[
        `by${
          activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
        }` as keyof SearchResponse
      ].length > displayCount && (
        <Button
          onClick={() => setDisplayCount((prev) => prev + 20)}
          className="w-full mt-4"
        >
          Load More
        </Button>
      )}
    </div>
  );
}
