'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Compass, Sparkles } from 'lucide-react'

export function NostalgiaCta() {
  return (
    <section className="relative z-10 px-4 py-16 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="glass relative mx-auto max-w-4xl overflow-hidden rounded-3xl px-6 py-14 text-center glow-soft md:px-12"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/30 blur-[90px]"
        />
        <motion.span
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
          className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/25 text-primary"
        >
          <Sparkles className="h-6 w-6" />
        </motion.span>
        <h2 className="mx-auto max-w-xl text-3xl font-bold tracking-tight text-balance md:text-4xl">
          Does this song bring back memories?
        </h2>
        <p className="mx-auto mt-4 max-w-lg leading-relaxed text-pretty text-muted-foreground">
          There are hundreds of openings and endings waiting to take you back.
          Keep exploring the soundtrack of your childhood — one theme at a
          time.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/"
              className="flex items-center gap-2.5 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground glow-primary"
            >
              <Compass className="h-4 w-4" />
              Explore more classics
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
