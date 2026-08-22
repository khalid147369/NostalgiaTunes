"use client";

import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { useEffect, useState } from "react";
import { PageBar } from "@/components/ui/page-bar";
import { useRecentlyPlayedPages } from "@/hooks/songs/useRecentlyPlayedPages";

import { Song } from "@/types";
import { usePlayer } from "@/contexts/player-context";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PAGE_SIZE = 6;

export function RecentlyPlayed() {
  const [page, setPage] = useState(0);
  const [data, setData] = useState<Song[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const { mutateAsync, isPending } = useRecentlyPlayedPages();
  const { play, currentSong, isPlaying } = usePlayer();
  const router = useRouter();

  const getPage = async (nextPage = 0) => {
    const { data: response } = await mutateAsync({
      size: PAGE_SIZE,
      page: nextPage,
    });
    const songs = response?.content || [];
    const responseTotalPages = response?.totalPages;
    const totalElements = response?.totalElements;

    setData(songs);
    setPage(response?.number ?? nextPage);
    const computedTotalPages =
      responseTotalPages ??
      (totalElements != null ? Math.ceil(totalElements / PAGE_SIZE) : 0);
    setTotalPages(computedTotalPages);
  };

  useEffect(() => {
    getPage();
  }, []);

  return (
    <section aria-labelledby="recently-played-heading">
      <SectionHeading
        id="recently-played-heading"
        eyebrow="Back in rotation"
        title="Recently played"
        description="The memories you revisited this week."
      />

      <div className="mt-6 -mx-4 px-4 pb-4 [scrollbar-width:thin]">
        <div className="flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {isPending
            ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <div key={i} className="w-44 shrink-0 sm:w-52" />
              ))
            : data.map((song: Song, i) => (
                <motion.div
                  key={song.id}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.45,
                    delay: i * 0.06,
                    ease: "easeOut",
                  }}
                  className="w-44 shrink-0 sm:w-52"
                  onClick={(e) => {
                    const el = e.target as HTMLElement;
                    if (
                      el.closest("button") ||
                      el.closest("a") ||
                      el.closest("[data-no-nav]")
                    )
                      return;
                    router.push(`/song/${song.id}`);
                  }}
                >
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="group flex h-full flex-col gap-3 rounded-2xl border border-border bg-card/60 p-3 backdrop-blur transition-shadow hover:shadow-[0_0_36px_-10px] hover:shadow-primary"
                  >
                    <div className="relative overflow-hidden rounded-xl">
                      <img
                        src={song.cover || "/placeholder.svg"}
                        alt={`${song.title} cover art`}
                        data-no-nav
                        className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      <button
                        type="button"
                        aria-label={
                          currentSong?.id === song.id && isPlaying
                            ? `Pause ${song.title}`
                            : `Play ${song.title}`
                        }
                        className="absolute bottom-2 right-2 flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 shadow-[0_0_20px_-4px] shadow-primary transition-all duration-300 group-hover:opacity-100 hover:scale-110"
                        onClick={(e) => {
                          e.stopPropagation();
                          play(song);
                        }}
                      >
                        {currentSong?.id === song.id && isPlaying ? (
                          <Pause
                            className="size-4 fill-current"
                            aria-hidden="true"
                          />
                        ) : (
                          <Play
                            className="size-4 fill-current"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    </div>

                    <div className="px-1 pb-1">
                      <Link href={`/song/${song.id}`} className="block">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {song.title}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {song.cartoon}
                        </p>
                      </Link>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
        </div>
      </div>

      <PageBar
        page={page}
        totalPages={totalPages}
        onPageChange={getPage}
        disabled={isPending}
      />
    </section>
  );
}
