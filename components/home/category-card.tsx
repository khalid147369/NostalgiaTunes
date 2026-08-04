'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { Category, CategoryDTO } from '@/types'
import { cn } from '@/lib/utils'


export function CategoryCard({
  category,
  className,
}: {
  category: CategoryDTO
  className?: string
}) {
  const isCyan = true



  
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={cn('group relative', className)}
    >

      <Link
        href={`/category/${category.id}`}
        className={cn(
          'relative flex h-full flex-col justify-end overflow-hidden rounded-2xl border border-border p-5 transition-shadow duration-300',
          isCyan ? 'hover:glow-cyan' : 'hover:glow-purple',
        )}
      >
        <Image
          src={category.imageUrl || '/placeholder.svg'}
          alt=""
          fill
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 300px"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-t to-transparent',
            isCyan
              ? 'from-[oklch(0.18_0.06_220/0.95)] via-[oklch(0.18_0.06_220/0.55)]'
              : 'from-[oklch(0.18_0.06_300/0.95)] via-[oklch(0.18_0.06_300/0.55)]',
          )}
        />

        <div className="relative flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg font-bold tracking-tight">
              {category.nombre}
            </h3>
            <p className="text-xs text-white/70">{category.descripcion}</p>
            <p className="mt-2 text-[11px] font-medium uppercase tracking-wide text-white/60">
              {category.songCount} songs
            </p>
          </div>
          <span
            className={cn(
              'flex size-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur transition-colors',
              isCyan ? 'group-hover:bg-cyan/80' : 'group-hover:bg-primary/80',
            )}
          >
            <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
