"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Headphones, Heart } from "lucide-react";
import { Badge } from "@/components/ui/adminUi/badge";
import { formatNumber, songs } from "@/lib/mock-data";
import { SectionHeader } from "./section-header";
import { StatCards } from "./stat-cards";
import { useRecently } from "@/hooks/songs/useRecentlySongs";
import { useTrending } from "@/hooks/songs/useTrendingSongs";
import { useMostListended } from "@/hooks/songs/useMostListenedSongs";
import { Song } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export function OverviewSection() {
  const [recentlySong, setRecentlySong] = useState<Song[]>([]);

  const topSongs = [...songs].sort((a, b) => b.listens - a.listens).slice(0, 5);

  const { mutateAsync: recentlyAdedSongs } = useRecently();
  const { data: mostListenedSongs } = useMostListended();

  const mostListened: Song[] = mostListenedSongs?.data.content || [];
  const getRecentlySongs = async () => {
    const { data } = await recentlyAdedSongs(undefined);
    setRecentlySong(data?.content ?? []);
  };
  useEffect(() => {
    getRecentlySongs();
  }, []);
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Featured This Week"
        title="Welcome back, Akira"
        description="Here is how the archive is doing. The community listened to 934K themes this month."
      />

      <StatCards />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.45, ease: "easeOut" }}
          className="glass overflow-hidden rounded-2xl xl:col-span-2"
        >
          <div className="flex items-center justify-between px-5 pt-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Hall of Fame
              </p>
              <h2 className="font-heading text-lg font-bold">
                Most listened of all time
              </h2>
            </div>
          </div>
          <ol className="mt-3">
            {mostListened.map((song, i) => (
              <li
                key={song.id}
                className="flex items-center gap-4 border-b border-border px-5 py-3.5 transition-colors last:border-0 hover:bg-secondary/40"
              >
                <span className="w-6 text-center font-heading text-lg font-bold text-accent">
                  {i + 1}
                </span>
                <Link href={`/song/${song.id}`}>
                  <Image
                    src={song.cover || "/placeholder.svg"}
                    alt={`${song.title} cover art`}
                    width={44}
                    height={44}
                    className="size-11 shrink-0 rounded-xl object-cover"
                  />
                </Link>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{song.title}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    {song.cartoon}
                  </p>
                </div>
                <span className="hidden shrink-0 items-center gap-1.5 text-sm text-muted-foreground sm:flex">
                  <Headphones className="size-4" />
                  {formatNumber(song.listens)}
                </span>
                <span className="hidden shrink-0 items-center gap-1.5 text-sm text-muted-foreground md:flex">
                  <Heart className="size-4" />
                  {formatNumber(song.likes)}
                </span>
              </li>
            ))}
          </ol>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.45, ease: "easeOut" }}
          className="glass relative overflow-hidden rounded-2xl p-5"
        >
          <div
            aria-hidden="true"
            className="absolute -right-10 -top-10 size-40 rounded-full bg-primary/25 blur-3xl"
          />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Fresh From The Vault
          </p>
          <h2 className="font-heading text-lg font-bold">Recently added</h2>
          <p className="mb-4 mt-1 text-sm text-muted-foreground">
            New memories digitized this week.
          </p>
          <ul className="space-y-3">
            {recentlySong.map(
              (song) =>
                song.isNew && (
                  <li key={song.id} className="flex items-center gap-3">
                    <Link href={`/song/${song.id}`}>
                      <Image
                        src={song.cover || "/placeholder.svg"}
                        alt={`${song.title} cover art`}
                        width={40}
                        height={40}
                        className="size-10 shrink-0 rounded-lg object-cover"
                      />
                    </Link>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {song.title}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {song.cartoon}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="rounded-full border-accent/30 bg-accent/10 px-2 text-xs text-accent"
                    >
                      NEW
                    </Badge>
                  </li>
                ),
            )}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
