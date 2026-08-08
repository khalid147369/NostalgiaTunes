'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { formatNumber, songs } from '@/lib/mock-data'
import { SectionHeader } from './section-header'
import { useMostLikedSongs } from '@/hooks/songs/useMostLikedSongs'
import { Song } from '@/types'

export function FavoritesSection() {
 // const ranked = [...songs].sort((a, b) => b.likes - a.likes).slice(0, 6)

  const {data} = useMostLikedSongs();
  const songs : Song[] = data?.data?.content ?? [];
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Hall of Fame"
        title="Most Favorited"
        description="The themes the community keeps coming back to, ranked by pure nostalgia."
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="glass overflow-hidden rounded-2xl"
      >
        <ol>
          {songs.map((song, i) => (
            <li
              key={song.id}
              className="flex items-center gap-4 border-b border-border px-5 py-4 transition-colors last:border-0 hover:bg-secondary/40"
            >
              <span className="w-6 text-center font-heading text-lg font-bold text-accent">{i + 1}</span>
              <Image
                src={song.cover || '/placeholder.svg'}
                alt={`${song.title} cover art`}
                width={48}
                height={48}
                className="size-12 shrink-0 rounded-xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{song.title}</p>
                <p className="truncate text-sm text-muted-foreground">{song.cartoon}</p>
              </div>
              <span className="flex shrink-0 items-center gap-1.5 text-sm text-muted-foreground">
                <Heart className="size-4 text-primary" />
                {formatNumber(song.likes)}
              </span>
            </li>
          ))}
        </ol>
      </motion.div>
    </div>
  )
}
