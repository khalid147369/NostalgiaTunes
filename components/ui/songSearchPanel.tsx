"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Music2 } from "lucide-react";
import { type Song, type CategoryDTO, Categoryies, CategorySlug } from "@/types";

interface SearchResultsProps {
  open: boolean;
  songs: Song[];
  categories?: CategoryDTO[];
  selectedCategory?: number | null;
  onSelectCategory?: (id: number | null) => void;
  onSelectSong: (song: Song) => void;
}



export default function SearchResults({
  open,
  songs,
  categories,
  selectedCategory,
  onSelectCategory,
  onSelectSong,
}: SearchResultsProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="relative left-0 right-0 -top-20 z-50 mt-3 overflow-hidden rounded-3xl border border-violet-500/20 bg-[#0f172a]/95 backdrop-blur-xl shadow-[0_0_50px_rgba(139,92,246,.2)] "
        >
          {/* Categorías */}
          <div className="border-b border-white/5 p-4">
            <div className="flex gap-2 overflow-x-auto scrollbar-none">
              {categories&& <button
                onClick={() => onSelectCategory?.(null)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  selectedCategory == null
                    ? "bg-violet-600 text-white"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                All
              </button>}
              

              {categories &&categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => onSelectCategory?.(Number(category.id))}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition ${
                    selectedCategory === Number(category.id)
                      ? "bg-cyan-500 text-black"
                      : "bg-white/5 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  {category.nombre}
                </button>
              ))}
            </div>
          </div>

          {/* Resultados */}
          <div className="max-h-[420px] overflow-y-auto">
            {songs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                <Music2 className="mb-4 h-10 w-10 opacity-50" />
                <p>No songs found</p>
              </div>
            ) : (
              songs.map((song) => (
                <button
                  key={song.id}
                  onClick={() => onSelectSong(song)}
                  className="group flex w-full items-center gap-4 border-b border-white/5 px-5 py-3 transition hover:bg-white/5"
                >
                  <div className="relative h-14 w-14 overflow-hidden rounded-xl">
                    <Image
                      src={song.cover}
                      alt={song.title}
                      fill
                      className="object-cover transition group-hover:scale-105"
                    />
                  </div>

                  <div className="min-w-0 flex-1 text-left">
                    <p className="truncate font-semibold text-white">
                      {song.title}
                    </p>

                    <p className="truncate text-sm text-gray-400">
                      {song.cartoon}
                    </p>
                  </div>

                  <div className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-300">
                    {CategorySlug[song.category]}
                  </div>
                </button>
              ))
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}