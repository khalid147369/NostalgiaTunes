'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'

export function AmbientBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        left: `${(i * 37 + 13) % 100}%`,
        top: `${(i * 53 + 7) % 100}%`,
        size: 2 + ((i * 7) % 3),
        delay: (i % 8) * 0.9,
        duration: 6 + (i % 5) * 2,
        cyan: i % 4 === 0,
      })),
    []
  )

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Blurred gradient orbs */}
      <div className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />
      <div className="absolute top-1/3 -left-48 h-[28rem] w-[28rem] rounded-full bg-primary/15 blur-[120px]" />
      <div className="absolute top-2/3 -right-48 h-[30rem] w-[30rem] rounded-full bg-accent/10 blur-[130px]" />

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className={`absolute rounded-full ${p.cyan ? 'bg-accent/60' : 'bg-primary/60'}`}
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.15, 0.7, 0.15],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
