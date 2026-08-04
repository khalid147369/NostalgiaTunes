"use client";

import { motion } from "framer-motion";
import type { Song } from "@/types";
import { SectionHeading } from "@/components/home/section-heading";
import { SongCard } from "@/components/song/song-card";
import { useRecently } from "@/hooks/songs/useRecentlySongs";
import { SongCardSkeleton } from "../loadingScreen/SkeletonCard";

interface SongGridSectionProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
}

export function SongGridSection({
  id,
  eyebrow,
  title,
  description,
}: SongGridSectionProps) {
  const { data, isLoading } = useRecently();

  const songs: Song[] = data?.data.content ?? [];
  return (
    <section
      id={id}
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6"
    >
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
      />
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.05 } },
        }}
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
      >
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <SongCardSkeleton key={i} />
            ))
          : songs.map((song) => (
            song.isNew&&
              <motion.div
                key={song.id}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <SongCard song={song} />
              </motion.div>
            ))}
      </motion.div>
    </section>
  );
}
