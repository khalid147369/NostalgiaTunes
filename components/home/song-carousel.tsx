"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Song } from "@/types";
import { SectionHeading } from "@/components/home/section-heading";
import { SongCard } from "@/components/song/song-card";
import { useTrending } from "@/hooks/songs/useTrendingSongs";
import { SongCardSkeleton } from "@/components/loadingScreen/SkeletonCard";
import { PageBar } from "@/components/ui/page-bar";
interface SongCarouselProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
}

export function SongCarousel({
  id,
  eyebrow,
  title,
  description,
}: SongCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };
  const [data, setdata] = useState<Song[]>([]);
  const [isShowedAll, setIsShowedAll] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const { mutateAsync, isPending } = useTrending();
  const getTrending = async (nextPage = 0, showAll = isShowedAll) => {
    const size = showAll ? 12 : 6;
    const { data: response } = await mutateAsync({
      size,
      page: nextPage,
    });
    const songs = response?.content || [];
    const responseTotalPages = response?.totalPages;
    const totalElements = response?.totalElements;

    setdata(songs);
    setPage(response?.number ?? nextPage);
    setTotalPages(
      responseTotalPages ??
        (totalElements != null ? Math.ceil(totalElements / size) : 0),
    );
  };

  useEffect(() => {
    getTrending();
  }, []);

  const handleShowAll = () => {
    const nextShowAll = !isShowedAll;
    setIsShowedAll(!isShowedAll);
    getTrending(0, nextShowAll);
    console.log(nextShowAll);
  };

  return (
    <section
      id={id}
      className="relative mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6"
    >
      <div className="flex items-end justify-between gap-4">
        <div className="flex-1">
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
            handleShowAll={handleShowAll}
            isShowedAll={isShowedAll}
          />
        </div>
        <div className="mb-6 hidden shrink-0 items-center gap-2 sm:flex">
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scroll("left")}
            className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scroll("right")}
            className="flex size-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="hide-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0"
      >
        {isPending
          ? Array.from({ length: 6 }).map((_, i) => (
              <SongCardSkeleton key={i} />
            ))
          : data.map((song) => (
              <SongCard
                key={song.id}
                song={song}
                className="w-44 shrink-0 snap-start sm:w-52"
              />
            ))}
      </div>
      {isShowedAll && (
        <PageBar
          page={page}
          totalPages={totalPages}
          onPageChange={getTrending}
          disabled={isPending}
        />
      )}
    </section>
  );
}
