"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Sparkles } from "lucide-react";
import { usePlayer } from "@/contexts/player-context";
import { formatCount } from "@/lib/format";
import { FloatingParticles } from "@/components/background/floating-particles";
import { SearchBar } from "@/components/home/search-bar";
import { useCounts } from "@/hooks/useCounts";
import { CategoryDTO, Song, Stats } from "@/types";
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

export function Categoryhero({ category }: { category: CategoryDTO }) {
  const [value, setValue] = useState("");
  const [trending, setTrending] = useState<Song[]>([]);
  const router = useRouter();

  const [songs, setsongs] = useState([]);

  const { play } = usePlayer();
  const { mutateAsync: getTrendingAsync } = useTrending();
  const { mutateAsync } = usesearch();

  const stats = [
    {
      value: `${category.songCount ?? 0}+`,
      label: `${category.nombre} Nostalgic songs`,
    },
    { value: "6", label: "Universes" },
  ];
  const featuredSong = trending[0] || {};

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!value.trim()) {
        setsongs([]);
        return;
      }
      let data;
      if (category) {
        data = await mutateAsync({
          text: value,
          category: category.id.toString(),
        });
      } else {
        data = await mutateAsync({ text: value });
      }

      setsongs(data.data.content);
    }, 300);

    return () => clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    const getTrending = async () => {
      const { data } = await getTrendingAsync({ category: Number(category.id) });
      setTrending(data.content);
    };
    getTrending();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <section className="relative min-h-[92vh] overflow-visible">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={category.imageUrl ?? "/covers/hero.png"}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-60"
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
            I remember this song from
            <br />
            <span className="text-gradient glow-text"> {category.nombre} </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
            id="search"
          >
            Relive the opening and ending themes of {category.nombre} cartoons that
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
            <div className="relative w-full max-w-xl">
              <SearchBar
                handleChange={handleChange}
                value={value}
                placeholder={`Search a ${category.nombre} song you loved...`}
                trending={trending}
              />
              <SearchResults
                open={value.length > 0}
                songs={songs}
                onSelectSong={(song: Song) => {
                  router.push(`/song/${song.id}`);
                }}
              />
            </div>
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
