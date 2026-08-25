"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Heart,
  ListMusic,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  X,
} from "lucide-react";

import { usePlayer } from "@/contexts/player-context";
import { formatDuration } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function MusicPlayer() {
  const {
    currentSong,
    isPlaying,
    currentTime,
    toggle,
    seek,
    likedIds,
    toggleLike,
    close,
  } = usePlayer();

  const duration = currentSong?.duration ?? 0;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  return (
    <AnimatePresence>
      {currentSong ? (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 sm:px-6 sm:pb-5"
        >
          <div className="relative mx-auto flex max-w-6xl items-center gap-3 rounded-2xl border border-border glass-strong px-3 py-2.5 glow-purple sm:gap-5 sm:px-5 sm:py-3">
            {/* Track info */}

            <div className="flex min-w-0 flex-1 items-center gap-3">
              <div className="relative size-12 shrink-0 overflow-hidden rounded-xl sm:size-14">
                <Image
                  src={currentSong.cover || "/placeholder.svg"}
                  alt={currentSong.title}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
                {isPlaying ? (
                  <span className="absolute inset-0 flex items-end justify-center gap-0.5 bg-background/30 pb-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-0.5 rounded-full bg-cyan"
                        animate={{ height: [4, 12, 4] }}
                        transition={{
                          duration: 0.8,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.15,
                        }}
                      />
                    ))}
                  </span>
                ) : null}
              </div>
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-semibold">
                  {currentSong.title}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {currentSong.cartoon}
                </p>
              </div>
              <button
                type="button"
                onClick={() => toggleLike(currentSong.id)}
                aria-label="Like"
                className="ml-1 hidden shrink-0 sm:block"
              >
                <Heart
                  className={cn(
                    "size-4 transition-all",
                    likedIds.has(String(currentSong.id))
                      ? "fill-primary text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                />
              </button>
            </div>

            {/* Controls + progress */}
            <div className="flex flex-[1.4] flex-col items-center gap-1.5">
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  aria-label="Shuffle"
                  className="hidden text-muted-foreground transition-colors hover:text-foreground sm:block"
                >
                  <Shuffle className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label="Previous"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <SkipBack className="size-5 fill-current" />
                </button>
                <button
                  type="button"
                  onClick={toggle}
                  aria-label={isPlaying ? "Pause" : "Play"}
                  className="flex size-10 items-center justify-center rounded-full bg-foreground text-background transition-transform hover:scale-105"
                >
                  {isPlaying ? (
                    <Pause className="size-5 fill-current" />
                  ) : (
                    <Play className="size-5 translate-x-0.5 fill-current" />
                  )}
                </button>
                <button
                  type="button"
                  aria-label="Next"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <SkipForward className="size-5 fill-current" />
                </button>
                <button
                  type="button"
                  aria-label="Repeat"
                  className="hidden text-muted-foreground transition-colors hover:text-foreground sm:block"
                >
                  <Repeat className="size-4" />
                </button>
              </div>

              <div className="hidden w-full items-center gap-2 sm:flex">
                <span className="text-[10px] tabular-nums text-muted-foreground">
                  {formatDuration(currentTime)}
                </span>

                <div className="relative flex-1">
                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-cyan"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <input
                    type="range"
                    min={0}
                    max={duration}
                    value={currentTime}
                    onChange={(e) => seek(Number(e.target.value))}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  />
                </div>

                <span className="text-[10px] tabular-nums text-muted-foreground">
                  {formatDuration(duration)}
                </span>
              </div>
            </div>

            {/* Extras */}
            <div className="hidden flex-1 items-center justify-end gap-3 lg:flex">
              <button
                type="button"
                aria-label="Queue"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <ListMusic className="size-4" />
              </button>
              <Volume2 className="size-4 text-muted-foreground" />
              <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-2/3 rounded-full bg-foreground/70" />
              </div>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close player"
              className="absolute right-3 top-1 flex size-8 items-center justify-center rounded-full border border-white/20 bg-primary text-primary-foreground shadow-lg shadow-primary/40 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:right-3 sm:top-1 sm:size-6"
            >
              <X className="size-4 sm:size-3" />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
