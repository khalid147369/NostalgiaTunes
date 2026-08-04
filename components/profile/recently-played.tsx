"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { useRecently } from "@/hooks/songs/useRecentlyPlayedSongs";
import { Song } from "@/types";

export function RecentlyPlayed() {
  const { data } = useRecently();

  const songs: Song[] = data?.data.content || [];
  return (
    <section aria-labelledby="recently-played-heading">
      <SectionHeading
        id="recently-played-heading"
        eyebrow="Back in rotation"
        title="Recently played"
        description="The memories you revisited this week."
      />
      <div className="mt-6 -mx-4 overflow-x-auto px-4 pb-4 [scrollbar-width:thin]">
        <ul className="flex gap-4">
          {songs.map((song: Song, i) => (
            <motion.li
              key={song.id}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: "easeOut" }}
              className="w-44 shrink-0 sm:w-52"
            >
              <motion.div
                whileHover={{ y: -6 }}
                className="group flex h-full flex-col gap-3 rounded-2xl border border-border bg-card/60 p-3 backdrop-blur transition-shadow hover:shadow-[0_0_36px_-10px] hover:shadow-primary"
              >
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={song.cover || "/placeholder.svg"}
                    alt={`${song.title} cover art`}
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <button
                    type="button"
                    aria-label={`Play ${song.title}`}
                    className="absolute bottom-2 right-2 flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 shadow-[0_0_20px_-4px] shadow-primary transition-all duration-300 group-hover:opacity-100 hover:scale-110"
                  >
                    <Play className="size-4 fill-current" aria-hidden="true" />
                  </button>
                </div>
                <div className="px-1 pb-1">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {song.title}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {song.cartoon}
                  </p>
                </div>
              </motion.div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
