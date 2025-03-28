"use client";

import { useState } from "react";
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

export function SearchAnime() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AnimeProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  const maxCharacters = 150;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const characters = e.target.value
      .split(/\s+/)
      .filter((character) => character.length > 0);
    if (characters.length <= maxCharacters) {
      setQuery(e.target.value);
    }
  };

  const handleSearch = async (retry = false) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/anime/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput: query }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to search anime");
      }

      const data = await response.json();
      setResults(data.anime.map((item: AnimeResponse) => item.props));
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
  };

  const characterCount = query.split("").length;
  const isNearLimit = characterCount > maxCharacters * 0.8;
  const isAtLimit = characterCount >= maxCharacters;

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

      <div className="grid gap-4 md:grid-cols-2">
        {results.map((anime, index) => (
          <motion.div
            key={anime.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full overflow-hidden pt-0">
              {anime.imageUrl && (
                <div className="relative h-56 w-full">
                  <img
                    src={anime.imageUrl}
                    alt={anime.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">
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
                {anime.titleEnglish && anime.titleEnglish !== anime.title && (
                  <p className="text-sm text-muted-foreground">
                    {anime.titleEnglish}
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {anime.synopsis}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {anime.genres.map((genre) => (
                    <span
                      key={genre}
                      className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Score: {anime.score.toFixed(1)}</span>
                    <span>Rank: #{anime.rank}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Popularity: {anime.popularity.toLocaleString()}</span>
                    <span>Members: {anime.members?.toLocaleString()}</span>
                  </div>
                  {anime.type && (
                    <div className="flex justify-between">
                      <span>Type: {anime.type}</span>
                      <span>Episodes: {anime.episodes}</span>
                    </div>
                  )}
                  {anime.status && (
                    <div className="flex justify-between">
                      <span>Status: {anime.status}</span>
                      <span>Year: {anime.year}</span>
                    </div>
                  )}
                  {anime.studios && anime.studios.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Studios:</span>
                      <div className="flex flex-wrap gap-1">
                        {anime.studios.map((studio) => (
                          <span
                            key={studio}
                            className="px-2 py-0.5 text-xs bg-secondary/10 text-secondary-foreground rounded-full"
                          >
                            {studio}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
