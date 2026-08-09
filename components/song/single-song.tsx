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
import { useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Navbar } from "../layout/navbar";
import { useTrending } from "@/hooks/songs/useTrendingSongs";

interface SongId {
  songId: number;
}

const SingleSong = ({ songId }: SongId) => {
  const [song, setSong] = useState<Song>();
  const [relatedSongs, setRelatedSongs] = useState<Song[]>([]);
  const [trendingSongs, setTrendingSongs] = useState<Song[]>([]);
  const { mutateAsync, isPending } = useSinglSong();
  const { mutateAsync: trending } = useTrending();
  const { mutateAsync: relatedSongsMute } = useFilterSong();

  const getSong = async () => {
    const { data } = await mutateAsync(songId);
    console.log("==============", data);
    setSong(data);
  };

  const getRelatedSongs = async () => {
    if (song?.category == null) return;

    console.log("category Song", song?.category?.toString());
    const { data } = await relatedSongsMute({
      column: SongFilters.category,
      size: 10,
      value:
        CategorySlug[
          song.category.toString() as keyof typeof CategorySlug
        ].toString(),
    });
    setRelatedSongs(data);

    return data;
  };

  const getTrendingSongs = async () => {
    const { data } = await trending(undefined);

    console.log(data.content);
    setTrendingSongs(data.content);
  };

  useEffect(() => {
    getSong();
    getTrendingSongs();
  }, []);

  useEffect(() => {
    getRelatedSongs();
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
              songs={relatedSongs.content || []}
            />
            {alsoLikeSongs && (
              <SongCarousel
                eyebrow="Keep the memory playing"
                title="You may also like"
                songs={alsoLikeSongs}
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
