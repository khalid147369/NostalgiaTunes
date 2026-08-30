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
  const [trendingPage, setTrendingPage] = useState(0);
  const [trendingTotalPages, setTrendingTotalPages] = useState(0);
  const [mostListenedPage, setMostListenedPage] = useState(0);
  const [mostListenedTotalPages, setMostListenedTotalPages] = useState(0);
  const [categoryPage, setCategoryPage] = useState(0);
  const [categoryTotalPages, setCategoryTotalPages] = useState(0);
  const { mutateAsync, isPending } = useTrending();

  const { mutateAsync: getCategoryAsync } = useGetCategoryById();
  const { mutateAsync: getMostListenedByCategoryAsync } =
    usegetMostListenedByCategory();
  const { mutateAsync: getSongsByCategoryAsync } = usegetSongsByCategory();

  const getTrending = async (nextPage = 0) => {
    const { data: response } = await mutateAsync({
      category: Number(id),
      size: 6,
      page: nextPage,
    });

    setSongs(response?.content || []);
    setTrendingPage(response?.number ?? nextPage);
    setTrendingTotalPages(response?.totalPages ?? 0);
  };

  useEffect(() => {
    getTrending();

    const getCategory = async () => {
      const { data: category } = await getCategoryAsync(Number(id));

      setCategory(category || {});
    };
    getCategory();

    const getMostListened = async () => {
      const { data } = await getMostListenedByCategoryAsync({
        size: 6,
        category: Number(id),
      });

      setMostListenedSong(data.content || []);
      setMostListenedPage(data.number ?? 0);
      setMostListenedTotalPages(data.totalPages ?? 0);
    };
    getMostListened();

    const getSongsByCategory = async () => {
      const { data } = await getSongsByCategoryAsync({
        size: 6,
        category: Number(id),
      });

      setSongsByCategory(data.content || []);
      setCategoryPage(data.number ?? 0);
      setCategoryTotalPages(data.totalPages ?? 0);
    };
    getSongsByCategory();
  }, []);

  return (
    <div className=" flex flex-col justify-between gap-8">
      <Navbar />
      <div className="-mx-5 -mt-5">
        {category && <Categoryhero category={category} />}
      </div>

      {songs.length > 0 && (
        <SongCarousel
          eyebrow="Trending right now"
          title="The songs Trending this week."
          songs={songs}
          page={trendingPage}
          totalPages={trendingTotalPages}
          onPageChange={getTrending}
          disabled={isPending}
        />
      )}

      {mostListenedSong.length > 0 && (
        <SongCarousel
          eyebrow="Most Listened this week"
          title="The songs lighting up the community this week."
          songs={mostListenedSong}
          page={mostListenedPage}
          totalPages={mostListenedTotalPages}
          onPageChange={async (nextPage) => {
            const { data } = await getMostListenedByCategoryAsync({
              size: 6,
              category: Number(id),
              page: nextPage,
            });
            setMostListenedSong(data.content || []);
            setMostListenedPage(data.number ?? nextPage);
            setMostListenedTotalPages(data.totalPages ?? 0);
          }}
          disabled={false}
        />
      )}

      {SongsByCategory.length > 0 && (
        <SongCarousel
          eyebrow="Related songs"
          title="From the same universe"
          songs={SongsByCategory}
          page={categoryPage}
          totalPages={categoryTotalPages}
          onPageChange={async (nextPage) => {
            const { data } = await getSongsByCategoryAsync({
              size: 6,
              category: Number(id),
              page: nextPage,
            });
            setSongsByCategory(data.content || []);
            setCategoryPage(data.number ?? nextPage);
            setCategoryTotalPages(data.totalPages ?? 0);
          }}
          disabled={false}
        />
      )}
    </div>
  );
};

export default SingleCategory;
