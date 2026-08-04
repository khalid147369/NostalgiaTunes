'use client'

import Image from 'next/image'
import { Play } from 'lucide-react'
import { continueListeningSong } from '@/lib/mock-data'
import { usePlayer } from '@/contexts/player-context'
import { Reveal } from '@/components/motion/reveal'

export function ContinueListening() {
  const { play } = usePlayer()
  const song = continueListeningSong

  return (
    <section className="mx-auto -mt-8 max-w-7xl px-4 sm:px-6">
      <Reveal>
        <button
          type="button"
          onClick={() => play(song)}
          className="group flex w-full items-center gap-4 overflow-hidden rounded-2xl border border-border glass p-3 text-left transition-shadow hover:glow-cyan"
        >
          <div className="relative size-16 shrink-0 overflow-hidden rounded-xl">
            <Image
              src={song.cover || '/placeholder.svg'}
              alt={song.title}
              fill
              sizes="64px"
              className="object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-background/40 opacity-0 transition-opacity group-hover:opacity-100">
              <Play className="size-5 fill-current" />
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wide text-cyan">
              Continue listening
            </p>
            <p className="truncate font-display text-base font-semibold">
              {song.title}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {song.cartoon}
            </p>
            <div className="mt-2 h-1 w-full max-w-md overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-primary to-cyan" />
            </div>
          </div>

          <span className="hidden shrink-0 items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-transform group-hover:scale-[1.03] sm:inline-flex">
            <Play className="size-4 fill-current" />
            Resume
          </span>
        </button>
      </Reveal>
    </section>
  )
}
