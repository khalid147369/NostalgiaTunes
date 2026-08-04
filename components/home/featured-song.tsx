"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Bookmark, Heart, Pause, Play, Share2, BookMarked } from "lucide-react";
import { usePlayer } from "@/contexts/player-context";
//import { featuredSong } from '@/lib/mock-data'
import { formatCount } from "@/lib/format";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import { useTrending } from "@/hooks/songs/useTrendingSongs";
import { Song } from "@/types";
import { FeaturedSongSkeleton } from "../loadingScreen/featuredSkeleton";
import { useSave } from "@/hooks/savedSongs/useSave";
import { useUnsave } from "@/hooks/savedSongs/useUnsave";
import Link from "next/link";
import { useEffect, useState } from "react";


export function FeaturedSong() {
   const [featuredSong, setFeaturedSong] = useState<Song>({});
  const { play, currentSong, isPlaying, likedIds, toggleLike, SavedSongIds ,toggleSavedSong } =
    usePlayer();
  const {mutate:save} = useSave();
  const {mutate:unsave} = useUnsave();
  const { mutateAsync ,isPending} = useTrending();


  useEffect(()=>{
    const getTrending= async()=>{
     const {data:response} =await mutateAsync(undefined);
     console.log("data",response.content);
      const songs: Song = response?.content[0] || {};
      

      setFeaturedSong(songs)
    }
    getTrending()
  },[])


  const isActive = currentSong?.id === featuredSong.id;
  const isThisPlaying = isActive && isPlaying;
  const liked = likedIds.has(featuredSong.id);
  const saved = SavedSongIds.has(featuredSong.id);

  if (isPending) {
    return <FeaturedSongSkeleton />;
  }

  const handleSave = ()=>{

    if (saved) {
      unsave(Number(featuredSong.id));
    }else{
      save(Number(featuredSong.id));
    }
        toggleSavedSong(featuredSong.id)
  }

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <Reveal>
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan/90">
          Featured this week
        </span>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-5 overflow-hidden rounded-3xl border border-border glass glow-purple">
          <div className="grid gap-0 lg:grid-cols-[minmax(0,0.9fr)_1fr]">
            {/* Artwork */}
            <div className="relative aspect-square w-full overflow-hidden lg:aspect-auto">
               <Link href={`/song/${featuredSong.id}`}>
               <Image
                src={featuredSong.cover || "/placeholder.svg"}
                alt={`${featuredSong.title} — ${featuredSong.cartoon}`}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent lg:bg-gradient-to-r" />
               </Link>
              
              
              <motion.button
                type="button"
                onClick={() => play(featuredSong)}
                whileTap={{ scale: 0.94 }}
                aria-label={isThisPlaying ? "Pause" : "Play"}
                className="absolute bottom-5 left-5 flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/50"
              >
                {isThisPlaying ? (
                  <Pause className="size-7 fill-current" />
                ) : (
                  <Play className="size-7 translate-x-0.5 fill-current" />
                )}
              </motion.button>
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center gap-5 p-6 sm:p-10">
              <div>
                <p className="text-sm font-medium text-cyan">
                  {featuredSong.cartoon} · {featuredSong.year}
                </p>
                <h3 className="mt-1.5 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl text-right">
                  {featuredSong.title}
                </h3>
              </div>

              <p
                className=" 
  max-w-2xl
  text-xl
  leading-10
  text-zinc-300
  font-light
  text-right"
              >
                {featuredSong.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div>
                  <p className="font-display text-lg font-bold">
                    {formatCount(
                      featuredSong.listens ? featuredSong.listens : 0,
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">Total listens</p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <p className="font-display text-lg font-bold">
                    {formatCount(featuredSong.likes ? featuredSong.likes : 0)}
                  </p>
                  <p className="text-xs text-muted-foreground">Likes</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => play(featuredSong)}
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-transform hover:scale-[1.03]"
                >
                  {isThisPlaying ? (
                    <Pause className="size-4 fill-current" />
                  ) : (
                    <Play className="size-4 fill-current" />
                  )}
                  {isThisPlaying ? "Pause" : "Play now"}
                </button>
                <button
                  type="button"
                  onClick={() => toggleLike(featuredSong.id)}
                  aria-pressed={liked}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:border-primary/50"
                >
                  <Heart
                    className={cn(
                      "size-4",
                      liked ? "fill-primary text-primary" : "",
                    )}
                  />
                  Like
                </button>
                <button
                onClick={handleSave}
                  type="button"
                  aria-label="Save"
                  className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-cyan/50 hover:text-foreground"
                >
                  {saved ? (
                    <Bookmark className="size-4" fill="currentColor" />
                  ) : (
                    <Bookmark className="size-4" />
                  )}{" "}
                </button>

                <button
                  type="button"
                  aria-label="Share"
                  className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-cyan/50 hover:text-foreground"
                >
                  <Share2 className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
