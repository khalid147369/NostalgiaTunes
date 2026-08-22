"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Pause, Play, Headphones } from "lucide-react";
import type { Song } from "@/types";
import { usePlayer } from "@/contexts/player-context";
import { formatCount } from "@/lib/format";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useLike } from "@/hooks/like/useLike";
import { useUnlike } from "@/hooks/like/useUnlike";
import { useListen } from "@/hooks/Listen/useLike";

interface SongCardProps {
  song: Song;
  className?: string;
}

export function SongCard({ song, className }: SongCardProps) {
  const { play, currentSong, isPlaying, likedIds, toggleLike } = usePlayer();
  const isActive = currentSong?.id === song.id;
  const isThisPlaying = isActive && isPlaying;
  let liked = likedIds.has(String(song.id));

  const { mutate: like } = useLike();
  const { mutate: unlike } = useUnlike();

  const { mutate: listen } = useListen();

  const handleLike = () => {
    if (liked) {
      unlike(Number(song.id));
    } else {
      like(Number(song.id));
    }
    toggleLike(song.id);
  };

  const handlePlay = () => {
    play(song);
    if (!isThisPlaying) {
      listen(Number(song.id));
    }
  };
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border glass p-3 transition-shadow duration-300 hover:glow-purple",
        className,
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-xl">
        <Link href={`/song/${song.id}`}>
          <Image
            src={song.cover || "/placeholder.svg"}
            alt={`${song.title} — ${song.cartoon}`}
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
        </Link>
        {song.isNew ? (
          <span className="absolute left-2 top-2 rounded-full bg-cyan/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-cyan-foreground">
            New
          </span>
        ) : null}

        <button
          type="button"
          onClick={handlePlay}
          aria-label={
            isThisPlaying ? `Pause ${song.title}` : `Play ${song.title}`
          }
          className={cn(
            "absolute bottom-2 right-2 flex size-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/40 transition-all duration-300",
            "translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100",
            isActive && "translate-y-0 opacity-100",
          )}
        >
          {isThisPlaying ? (
            <Pause className="size-5 fill-current" />
          ) : (
            <Play className="size-5 translate-x-0.5 fill-current" />
          )}
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 px-1 pb-1 pt-3">
        <div className="min-w-0">
          <h3 className="truncate font-display text-sm font-semibold text-foreground text-right">
            {song.title}
          </h3>
          <p className="truncate text-xs text-muted-foreground">
            {song.cartoon}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between pt-1">
          <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
            <Headphones className="size-3.5 text-cyan" />
            {formatCount(song.listens ?? 0)}
          </span>
          <button
            type="button"
            onClick={handleLike}
            aria-label={liked ? "Unlike" : "Like"}
            aria-pressed={liked}
            className="inline-flex items-center gap-1 text-[11px] text-muted-foreground transition-colors hover:text-primary"
          >
            <Heart
              className={cn(
                "size-3.5 transition-all",
                liked ? "fill-primary text-primary" : "text-muted-foreground",
              )}
            />
            {formatCount(song.likes + (liked ? 1 : 0))}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
