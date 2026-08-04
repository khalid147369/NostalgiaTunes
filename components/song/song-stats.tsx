'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Bookmark, Headphones, Heart, MessageCircle } from 'lucide-react'
import type { Song } from '@/types'

function formatCompact(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toString()
}

function AnimatedCounter({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1400
    const start = performance.now()
    let frame: number
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, target])

  return (
    <span ref={ref} className="text-3xl font-bold tracking-tight md:text-4xl">
      {formatCompact(value)}
    </span>
  )
}

interface SongStatsProps {
  song: Song
}

export function SongStats({ song }: SongStatsProps) {
  const items = [
    { id: 'likes', label: 'Likes', value: song.likes, icon: Heart },
    {
      id: 'listens',
      label: 'Total Listens',
      value: song.listens,
      icon: Headphones,
    },
    { id: 'comments', label: 'Comments', value: song.totalComments, icon: MessageCircle },
    { id: 'favorites', label: 'Favorites', value: song.totalSaves, icon: Bookmark },
  ]

  return (
    <section aria-label="Song statistics" className="relative z-10 px-4 py-14 md:px-6">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 lg:grid-cols-4">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
            whileHover={{ y: -4 }}
            className="glass flex flex-col items-start gap-4 rounded-3xl p-6"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/20 text-primary">
              <item.icon className="h-5 w-5" />
            </span>
            <div className="flex flex-col gap-1">
              <AnimatedCounter target={item.value} />
              <span className="text-sm text-muted-foreground">
                {item.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
