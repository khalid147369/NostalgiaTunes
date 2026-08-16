"use client";
import { useTrending } from "@/hooks/songs/useTrendingSongs";
import { useCategories } from "@/hooks/category/useCategory";
import { CategoryDTO, Song } from "@/types";
import React, { useEffect, useState } from "react";
import { SongCarousel } from "../song/song-carousel";
import { SearchBar } from "../home/search-bar";
import SearchResults from "../ui/songSearchPanel";
import { useRouter } from "next/navigation";
import { Navbar } from "../layout/navbar";
import { Hero } from "../home/hero";
import { Categoryhero } from "./Categoryhero";
import { useGetCategoryById } from "@/hooks/category/useGetCategoryById";
import { usegetMostListenedByCategory } from "@/hooks/category/useGetMostListenedByCategory";
import { usegetSongsByCategory } from "@/hooks/category/useGetSongsByCategory";

interface singleCategoryInterface {
  id: string;
}
const SingleCategory = ({ id }: singleCategoryInterface) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [category, setCategory] = useState<CategoryDTO>();
  const [mostListenedSong, setMostListenedSong] = useState<Song[]>([]);
  const [SongsByCategory, setSongsByCategory] = useState<Song[]>([]);
  const { mutateAsync, isPending } = useTrending();

  const { mutateAsync: getCategoryAsync } = useGetCategoryById();
  const { mutateAsync: getMostListenedByCategoryAsync } =
    usegetMostListenedByCategory();
  const { mutateAsync: getSongsByCategoryAsync } = usegetSongsByCategory();

  useEffect(() => {
    const getTrending = async () => {
      const { data: response } = await mutateAsync({ category: Number(id) });

      setSongs(response?.content || []);
    };
    getTrending();

    const getCategory = async () => {
      const { data: category } = await getCategoryAsync(Number(id));

      setCategory(category || {});
    };
    getCategory();

    const getMostListened = async () => {
      const { data } = await getMostListenedByCategoryAsync({
        size: 10,
        category: Number(id),
      });

      setMostListenedSong(data.content || []);
    };
    getMostListened();

    const getSongsByCategory = async () => {
      const { data } = await getSongsByCategoryAsync({
        size: 10,
        category: Number(id),
      });

      setSongsByCategory(data.content || []);
    };
    getSongsByCategory();
  }, []);

  return (
    <div className=" flex flex-col justify-between gap-8">
      <Navbar />
      <div className="-mx-5 -mt-5">
        {category && <Categoryhero category={category} />}
      </div>

      <SongCarousel
        eyebrow="Trending right now"
        title="The songs lighting up the community this week."
        songs={songs}
      />

      <SongCarousel
        eyebrow="Most Listened this week"
        title="The songs lighting up the community this week."
        songs={mostListenedSong}
      />

      <SongCarousel
        eyebrow="Related songs"
        title="From the same universe"
        songs={SongsByCategory}
      />
    </div>
  );
};

export default SingleCategory;
