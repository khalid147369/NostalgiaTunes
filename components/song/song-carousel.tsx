'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Headphones, Heart, Play } from 'lucide-react'
import type { Song } from '@/types'
import { SongCard } from './song-card'
import { useSinglSong } from '@/hooks/songs/useSinglSong'

function formatCompact(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toString()
}

interface SongCarouselProps {
  eyebrow: string
  title: string
  songs: Song[]
}

export function SongCarousel({ eyebrow, title, songs }: SongCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  const scrollBy = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' })
  }

console.log("songs",songs);
  return (
    <section aria-label={title} className="relative z-10 px-4 py-10 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold tracking-[0.25em] text-accent uppercase">
              {eyebrow}
            </p>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              {title}
            </h2>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Scroll left"
              className="glass flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-transform hover:scale-105"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Scroll right"
              className="glass flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-transform hover:scale-105"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {songs.length!==0 &&
          songs?.map((song, i) => (
            <SongCard
            key={song.id}
            song={song}
            className="w-44 shrink-0 snap-start sm:w-52"
          />
          ))}
        </div>
      </div>
    </section>
  )
}
