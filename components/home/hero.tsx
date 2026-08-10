"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Sparkles } from "lucide-react";
import { usePlayer } from "@/contexts/player-context";
import { formatCount } from "@/lib/format";
import { FloatingParticles } from "@/components/background/floating-particles";
import { SearchBar } from "@/components/home/search-bar";
import { useCounts } from "@/hooks/useCounts";
import { Song, Stats } from "@/types";
import { useTrending } from "@/hooks/songs/useTrendingSongs";
import { useEffect, useState } from "react";
import { usesearch } from "@/hooks/useSearch";
import { useRouter } from "next/navigation";
import { useCategories } from "@/hooks/category/useCategory";
import SearchResults from "../ui/songSearchPanel";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [value, setValue] = useState("");
  const [featuredSongs, setFeaturedSongs] = useState<Song[]>([]);

  const router = useRouter();

  const [songs, setsongs] = useState([]);

  const { data: ctgs } = useCategories();
  const categories = ctgs?.data || [];

  const { data } = useCounts();
  const { play } = usePlayer();
  const { mutateAsync: getTrendingAsync } = useTrending();
  const { mutateAsync } = usesearch();

  const stats = [
    { value: `${data?.totalSongs}+`, label: "Nostalgic songs" },
    { value: "6", label: "Universes" },
    { value: `${data?.totalPlays}`, label: "Memories replayed" },
  ];
  const featuredSong = featuredSongs[0] || {};

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!value.trim()) {
        setsongs([]);
        return;
      }
      let data;
      if (selectedCategory) {
        data = await mutateAsync({
          text: value,
          category: selectedCategory.toString(),
        });
      } else {
        data = await mutateAsync({ text: value });
      }

      setsongs(data.data.content);
    }, 300);

    return () => clearTimeout(timer);
  }, [value, selectedCategory]);

  useEffect(() => {
    const getTrending = async () => {
      const { data } = await getTrendingAsync({});
      console.log(data.content);
      setFeaturedSongs(data.content);
    };
    getTrending();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <section className="relative min-h-[92vh] overflow-visible">
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/covers/hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-125 object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
      </div>

      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute -left-32 top-24 size-96 rounded-full bg-primary/25 blur-[120px]"
      />
      <div
        aria-hidden
        className="absolute right-0 top-40 size-80 rounded-full bg-cyan/20 blur-[120px]"
      />

      <FloatingParticles />

      <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-4 pb-24 pt-32 sm:px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.h1
            variants={item}
            className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl"
          >
            I remember
            <br />
            <span className="text-gradient glow-text">this song...</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
            id="search"
          >
            Relive the opening and ending themes of the cartoons and anime that
            raised you. Every melody is a doorway back to a Saturday morning in
            the late 90s.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              onClick={() => play(featuredSong)}
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/40 transition-transform hover:scale-[1.03]"
            >
              <Play className="size-4 fill-current" />
              Play the memory
            </button>
            <a
              href="#categories"
              className="inline-flex items-center gap-2 rounded-full border border-border glass px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/50"
            >
              Explore universes
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-10">
            <SearchBar
              handleChange={handleChange}
              value={value}
              trending={featuredSongs}
              placeholder="Search a cartoon, anime or song you loved..."
            />
            <SearchResults
              open={value.length > 0}
              songs={songs}
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onSelectSong={(song: Song) => {
                router.push(`/song/${song.id}`);
              }}
            />
          </motion.div>

          <motion.div
            variants={item}
            className="mt-12 flex flex-wrap gap-8 border-t border-border pt-6"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
            <div className="ml-auto hidden items-center gap-2 self-end text-xs text-muted-foreground sm:flex">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-cyan" />
              </span>
              {formatCount(featuredSong.listens)} listening now
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
