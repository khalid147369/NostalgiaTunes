"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Pause, Play } from "lucide-react";
//import { mostListenedSongs } from '@/lib/mock-data'
import { usePlayer } from "@/contexts/player-context";
import { formatCount, formatDuration } from "@/lib/format";
import { SectionHeading } from "@/components/home/section-heading";
import { cn } from "@/lib/utils";
import { useMostListended } from "@/hooks/songs/useMostListenedSongs";
import { useMostListendedPages } from "@/hooks/songs/useMostListenedSongs";
import { Song } from "@/types";
import { MostListenedSkeleton } from "../loadingScreen/MostListened";
import Link from "next/link";
import { PageBar } from "@/components/ui/page-bar";
import { useEffect, useState } from "react";

export function MostListened() {
  const { play, currentSong, isPlaying, likedIds, toggleLike } = usePlayer();
  const { data: initialData, isLoading: isInitialLoading } = useMostListended();
  const { mutateAsync, isPending } = useMostListendedPages();
  const [mostListenedSongs, setMostListenedSongs] = useState<Song[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setMostListenedSongs(initialData?.data.content ?? []);
    setTotalPages(initialData?.data.totalPages ?? 0);
  }, [initialData]);

  const getMostListened = async (nextPage = 0, showAll = false) => {
    const { data } = await mutateAsync({
      size: showAll ? 12 : 7,
      page: nextPage,
    });
    setMostListenedSongs(data?.content ?? []);
    setPage(data?.number ?? nextPage);
    setTotalPages(data?.totalPages ?? 0);
  };

  if (isInitialLoading) {
    return <MostListenedSkeleton />;
  }

  return (
    <section
      id="Most listened"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6"
    >
      <SectionHeading
        eyebrow="Hall of fame"
        title="Most listened of all time"
        description="The themes the community keeps coming back to, ranked by pure nostalgia."
      />

      <div className="overflow-hidden rounded-2xl border border-border glass">
        {mostListenedSongs.map((song, i) => {
          const isActive = currentSong?.id === song.id;
          const isThisPlaying = isActive && isPlaying;
          const liked = likedIds.has(String(song.id));
          return (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={cn(
                "group flex items-center gap-4 border-b border-border px-4 py-3 transition-colors last:border-0 hover:bg-white/5 sm:px-5",
                isActive && "bg-primary/10",
              )}
            >
              <span
                className={cn(
                  "w-6 text-center font-display text-lg font-bold",
                  i < 3 ? "text-gradient" : "text-muted-foreground",
                )}
              >
                {i + 1}
              </span>

              <button
                type="button"
                onClick={() => play(song)}
                aria-label={isThisPlaying ? "Pause" : "Play"}
                className="relative size-12 shrink-0 overflow-hidden rounded-lg"
              >
                <Image
                  src={song.cover || "/placeholder.svg"}
                  alt={song.title}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-background/50">
                  {isThisPlaying ? (
                    <Pause className="size-4 fill-current" />
                  ) : (
                    <Play className="size-4 translate-x-0.5 fill-current" />
                  )}
                </span>
              </button>

              <Link href={`/song/${song.id}`}>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-sm font-semibold">
                    {song.title}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {song.cartoon}
                  </p>
                </div>

                <span className="hidden text-xs text-muted-foreground sm:block">
                  {formatCount(song.listens)} plays
                </span>
              </Link>
              <button
                type="button"
                onClick={() => toggleLike(song.id)}
                aria-label="Like"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Heart
                  className={cn(
                    "size-4",
                    liked ? "fill-primary text-primary" : "",
                  )}
                />
              </button>

              <span className="hidden w-10 text-right text-xs tabular-nums text-muted-foreground md:block">
                {formatDuration(song.duration)}
              </span>
            </motion.div>
          );
        })}
      </div>
      {totalPages > 1 && (
        <PageBar
          page={page}
          totalPages={totalPages}
          onPageChange={getMostListened}
          disabled={isPending}
        />
      )}
    </section>
  );
}
