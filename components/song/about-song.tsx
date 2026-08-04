'use client'

import { motion } from 'framer-motion'
import { Clapperboard, Globe, Music4, Sparkles, Tv } from 'lucide-react'
import type { Song } from '@/types'

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().substring(0,2)}`
}

interface AboutSongProps {
  song: Song

}

export function AboutSong({ song }: AboutSongProps) {
  const facts = [
    { icon: Tv, label: 'Original TV Series', value: song.cartoon },
    { icon: Clapperboard, label: 'Category', value: song.category },
    { icon: Globe, label: 'Language', value: 'Japanese' },
    {
      icon: Music4,
      label: 'Duration',
      value: formatDuration(song.duration),
    },
  ]

  return (
    <section className="relative z-10 px-4 py-8 md:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="glass grid gap-10 rounded-3xl p-7 md:grid-cols-[1.4fr_1fr] md:p-10"
        >
          <div className="flex flex-col gap-5">
            <p className="text-xs font-semibold tracking-[0.25em] text-accent uppercase">
              About the Song
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-balance md:text-3xl">
              القصة وراء الافتتاح
            </h2>
            <p className="leading-relaxed text-muted-foreground">
              {song.aboutStory}
            </p>
            <div className="flex items-start gap-3 rounded-2xl bg-secondary/50 p-4" dir='rtl'>
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <p className="text-lg leading-relaxed text-muted-foreground">
                <span className="font-semibold text-foreground">معلومة عامة : </span><br/>
                {song.trivia}
              </p>
            </div>
          </div>

          <dl className="flex flex-col justify-center gap-4">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card/40 px-5 py-4"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                  <fact.icon className="h-4 w-4" />
                </span>
                <div>
                  <dt className="text-xs text-muted-foreground">
                    {fact.label}
                  </dt>
                  <dd className="font-semibold">{fact.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  )
}
