"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Bookmark, Headphones, Heart, Play } from "lucide-react"
import { SectionHeading } from "./section-heading"
import { cn } from "@/lib/utils"
import { usePlayer } from "@/contexts/player-context"
import { useSavedSongs } from "@/hooks/savedSongs/useSavedSong"
import { Song } from "@/types"

export function FavoriteSongs() {
  const [liked, setLiked] = useState<Record<string, boolean>>({ fs1: true, fs3: true })
  const [saved, setSaved] = useState<Record<string, boolean>>({ fs1: true })

  const { toggleSavedSong, likedIds,toggleLike,SavedSongIds } = usePlayer();

  const { data } = useSavedSongs();

  useEffect(() => {
    setLiked((prev) => {
      const nextLiked = { ...prev };
      likedIds.forEach((id) => {
        nextLiked[id] = true;
      });
      return nextLiked;
    });
  }, [likedIds]);
  
    useEffect(() => {
    setSaved((prev) => {
      const nextSaved = { ...prev };
      SavedSongIds.forEach((id) => {
        nextSaved[id] = true;
      });
      return nextSaved;
    });
  }, [SavedSongIds]);
console.log(liked);
  const favoriteSongs: Song[] = data?.data ?? [];


const visibleSongs = favoriteSongs.filter(
  (song) => saved[song.id] !== false
);

  return (
    <section aria-labelledby="favorite-songs-heading">
      <SectionHeading
        id="favorite-songs-heading"
        eyebrow="Your treasures"
        title="Favorite songs"
        description="Every melody is a doorway back to a Saturday morning."
      />
      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleSongs.map((song, i) => (
          <motion.li
            key={song.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.06, ease: "easeOut" }}
          >
            <motion.article
              whileHover={{ y: -5 }}
              className="group flex h-full gap-4 rounded-2xl border border-border bg-card/60 p-3 backdrop-blur transition-shadow hover:shadow-[0_0_36px_-10px] hover:shadow-primary"
            >
              <div className="relative shrink-0 overflow-hidden rounded-xl">
                <img
                  src={song.cover || "/placeholder.svg"}
                  alt={`${song.title} artwork`}
                  className="size-24 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
                <div>
                  <h3 className="truncate text-sm font-semibold text-foreground">{song.title}</h3>
                  <p className="mt-0.5 inline-flex rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-[11px] font-medium text-accent">
                    {song.category}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Headphones className="size-3.5" aria-hidden="true" />
                    {song.listens}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      aria-label={liked[song.id] ? `Unlike ${song.title}` : `Like ${song.title}`}
                      aria-pressed={liked[song.id] ?? false}
                      onClick={() => {setLiked((s) => ({ ...s, [song.id]: !s[song.id] })),toggleLike(song.id)}}
                      className={cn(
                        "flex size-8 items-center justify-center rounded-full transition-colors",
                        liked[song.id]
                          ? "text-destructive"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                      )}
                    >
                      <Heart className={cn("size-4", liked[song.id] && "fill-current")} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      aria-label={saved[song.id] ? `Unsave ${song.title}` : `Save ${song.title}`}
                      aria-pressed={saved[song.id] ?? false}
                      onClick={() =>{toggleSavedSong(song.id),setSaved((s) => ({ ...s, [song.id]: !s[song.id] }))} }
                      className={cn(
                        "flex size-8 items-center justify-center rounded-full transition-colors"
                      )}
                    >
                      <Bookmark className={cn("size-4", liked[song.id] && "fill-current")} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      aria-label={`Play ${song.title}`}
                      className="ml-1 flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_0_16px_-4px] shadow-primary transition-transform hover:scale-110"
                    >
                      <Play className="size-3.5  fill-current" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}