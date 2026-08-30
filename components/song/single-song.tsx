"use client";
import React, { useEffect, useState } from "react";

import { SongHero } from "./song-hero";
import { SongStats } from "./song-stats";
import { AboutSong } from "./about-song";
import { useSinglSong } from "@/hooks/songs/useSinglSong";
import { CategorySlug, Song, SongFilters } from "@/types";
import { NostalgiaCta } from "./nostalgia-cta";
import { SongCarousel } from "@/components/song/song-carousel";
import { CommentsSection } from "@/components/song/comments-section";
import { useFilterSong } from "@/hooks/songs/useFilterSong";
import { Navbar } from "../layout/navbar";
import { useTrending } from "@/hooks/songs/useTrendingSongs";

interface SingleSongProps {
  songId: number;
  initialSong?: Song | null;
}

const SingleSong = ({ songId, initialSong }: SingleSongProps) => {
  const [song, setSong] = useState<Song | undefined>(initialSong ?? undefined);
  const [relatedSongs, setRelatedSongs] = useState<Song[]>([]);
  const [trendingSongs, setTrendingSongs] = useState<Song[]>([]);
  const [relatedPage, setRelatedPage] = useState(0);
  const [relatedTotalPages, setRelatedTotalPages] = useState(0);
  const [trendingPage, setTrendingPage] = useState(0);
  const [trendingTotalPages, setTrendingTotalPages] = useState(0);
  const { mutateAsync, isPending } = useSinglSong();
  const { mutateAsync: trending } = useTrending();
  const { mutateAsync: relatedSongsMute } = useFilterSong();

  const getSong = async () => {
    try {
      const { data } = await mutateAsync(songId);
      setSong(data);
      console.log("song:   ", data);
      const categorySource = data?.category;
      const parsedCategory = Number(categorySource);

      if (!Number.isFinite(parsedCategory) || parsedCategory <= 0) {
        setRelatedSongs([]);
        setRelatedPage(0);
        setRelatedTotalPages(0);
        return;
      }

      const { data: relatedData } = await relatedSongsMute({
        column: SongFilters.category,
        size: 6,
        page: 0,
        value: String(parsedCategory),
      });

      const pageData = relatedData?.content ?? [];
      setRelatedSongs(pageData);
      setRelatedPage(relatedData?.number ?? 0);
      setRelatedTotalPages(relatedData?.totalPages ?? 0);
    } catch (error) {
      console.error("Error loading song details:", error);
    }
  };

  const getRelatedSongs = async (
    nextPage = 0,
    categoryValueOverride?: number | string | null,
  ) => {
    const categorySource = categoryValueOverride ?? song?.category;

    if (categorySource == null) {
      setRelatedSongs([]);
      setRelatedPage(nextPage);
      setRelatedTotalPages(0);
      return null;
    }


    const { data: relatedData } = await relatedSongsMute({
      column: SongFilters.category,
      size: 6,
      page: nextPage,
      value: String(categorySource),
    });

    const pageData = relatedData?.content ?? [];
    setRelatedSongs(pageData);
    setRelatedPage(relatedData?.number ?? nextPage);
    setRelatedTotalPages(relatedData?.totalPages ?? 0);

    return relatedData;
  };

  const getTrendingSongs = async (nextPage = 0) => {
    const { data } = await trending({ size: 6, page: nextPage });
    setTrendingSongs(data?.content ?? []);
    setTrendingPage(data?.number ?? nextPage);
    setTrendingTotalPages(data?.totalPages ?? 0);
  };

  useEffect(() => {
    const loadSong = async () => {
      await getSong();
      await getTrendingSongs();
    };

    loadSong();
  }, [songId]);

  useEffect(() => {
    if (song?.category == null) return;

  const parsedCategory = CategorySlug[song?.category as CategorySlug];


    console.log("parsedCategory=0000000000000",parsedCategory);
    if (!Number.isFinite(parsedCategory) || Number(parsedCategory) <= 0) {
      setRelatedSongs([]);
      setRelatedPage(0);
      setRelatedTotalPages(0);
      return;
    }

    getRelatedSongs(0, parsedCategory);
  }, [song]);

  const alsoLikeSongs = trendingSongs;
  return (
    <>
      {song && (
        <div>
          <Navbar />
          <main className="relative z-10">
            <SongHero song={song} />

            <SongStats song={song} />
            <AboutSong song={song} />
            <CommentsSection song={song} />

            <SongCarousel
              eyebrow="From the same universe"
              title="Related songs"
              songs={relatedSongs}
              page={relatedPage}
              totalPages={relatedTotalPages}
              onPageChange={getRelatedSongs}
            />
            {alsoLikeSongs && (
              <SongCarousel
                eyebrow="Keep the memory playing"
                title="You may also like"
                songs={alsoLikeSongs}
                page={trendingPage}
                totalPages={trendingTotalPages}
                onPageChange={getTrendingSongs}
              />
            )}
            <NostalgiaCta />
          </main>
          <footer className="relative z-10 border-t border-border px-4 py-8 text-center text-sm text-muted-foreground">
            NostalgiaSongs — the soundtrack of a generation.
          </footer>
        </div>
      )}
    </>
  );
};

export default SingleSong;
