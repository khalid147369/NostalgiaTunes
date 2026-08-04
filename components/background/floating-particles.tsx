'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'

/** Deterministic pseudo-random so SSR and client render identically. */
function seeded(seed: number) {
  let value = seed
  return () => {
    value = (value * 9301 + 49297) % 233280
    return value / 233280
  }
}

interface Particle {
  left: number
  top: number
  size: number
  duration: number
  delay: number
  cyan: boolean
  opacity: number
}

export function FloatingParticles({ count = 26 }: { count?: number }) {
  const particles = useMemo<Particle[]>(() => {
    const rand = seeded(1337)
    return Array.from({ length: count }, () => ({
      left: rand() * 100,
      top: rand() * 100,
      size: 2 + rand() * 6,
      duration: 6 + rand() * 10,
      delay: rand() * 6,
      cyan: rand() > 0.55,
      opacity: 0.15 + rand() * 0.5,
    }))
  }, [count])

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full blur-[1px]"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.cyan
              ? 'oklch(0.82 0.14 200)'
              : 'oklch(0.7 0.2 300)',
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 18, 0],
            opacity: [p.opacity, p.opacity * 1.8, p.opacity],
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
