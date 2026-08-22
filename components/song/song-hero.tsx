"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Bookmark, Heart, Play, Pause, Share2 } from "lucide-react";
import type { Song } from "@/types";
import { usePlayer } from "@/contexts/player-context";
import { useLike } from "@/hooks/like/useLike";
import { useUnlike } from "@/hooks/like/useUnlike";
import { useSave } from "@/hooks/savedSongs/useSave";
import { useUnsave } from "@/hooks/savedSongs/useUnsave";
import { useListen } from "@/hooks/Listen/useLike";

interface SongHeroProps {
  song: Song;
}

export function SongHero({ song }: SongHeroProps) {
  const {
    play,
    pause,
    isPlaying,
    currentSong,
    likedIds,
    toggleLike,
    toggleSavedSong,
    SavedSongIds,
  } = usePlayer();

  const { mutate: like } = useLike();
  const { mutate: unlike } = useUnlike();

  const { mutate: save } = useSave();
  const { mutate: unsave } = useUnsave();

  const { mutate: listen } = useListen();

  const liked = likedIds.has(String(song.id));
  const saved = SavedSongIds.has(String(song.id));

  const handleLike = () => {
    if (liked) {
      unlike(Number(song.id));
    } else {
      like(Number(song.id));
    }
    toggleLike(song.id);
  };

  const handleSave = () => {
    if (saved) {
      unsave(Number(song.id));
    } else {
      save(Number(song.id));
    }
    toggleSavedSong(song.id);
  };

  return (
    <section className="relative pt-32 pb-8 md:pt-40">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-[auto_1fr] md:gap-14 md:px-6">
        {/* Artwork */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-[320px] md:max-w-[420px] lg:max-w-[500px]"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 scale-110 rounded-3xl bg-primary/30 blur-[80px]"
          />
          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="overflow-hidden rounded-3xl border border-border glow-soft"
          >
            <Image
              src={song.cover || "/placeholder.svg"}
              alt={`${song.title} cover artwork`}
              width={500}
              height={500}
              priority
              className="h-auto w-full object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="flex flex-col items-start gap-5"
        >
          <p className="text-sm font-semibold tracking-[0.25em] text-accent uppercase">
            Featured This Week
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <span className="glass rounded-full px-3.5 py-1.5 text-xs font-semibold text-foreground">
              {song.category}
            </span>
            <span className="text-sm font-medium text-accent">
              {song.cartoon} &middot; {song.year}
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-balance md:text-6xl">
            {song.title}
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {song.description}
          </p>

          {/* Primary actions */}
          <div className="mt-2 flex flex-wrap items-center gap-3">
            {isPlaying && currentSong?.id === song.id ? (
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground glow-primary"
                onClick={() => pause()}
              >
                <Pause className="h-4 w-4 fill-current" />
                Pause
              </motion.button>
            ) : (
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground glow-primary"
                onClick={() => {
                  (play(song), listen(Number(song.id)));
                }}
              >
                <Play className="h-4 w-4 fill-current" />
                Play now
              </motion.button>
            )}

            <motion.button
              type="button"
              onClick={handleLike}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              aria-pressed={liked}
              className={`glass flex items-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold transition-colors ${
                liked ? "text-primary" : "text-foreground"
              }`}
            >
              <Heart
                className={`h-4 w-4 ${liked ? "fill-primary text-primary" : ""}`}
              />
              {liked ? "Liked" : "Like"}
            </motion.button>

            <motion.button
              type="button"
              onClick={handleSave}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              aria-pressed={saved}
              aria-label={saved ? "Remove from favorites" : "Save to favorites"}
              className={`glass flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
                saved ? "text-accent" : "text-foreground"
              }`}
            >
              <Bookmark
                className={`h-4 w-4 ${saved ? "fill-accent text-accent" : ""}`}
              />
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Share this song"
              className="glass flex h-12 w-12 items-center justify-center rounded-full text-foreground"
            >
              <Share2 className="h-4 w-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
