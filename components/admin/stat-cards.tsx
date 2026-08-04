'use client'

import { useCounts } from '@/hooks/useCounts'
import { motion } from 'framer-motion'
import { Headphones, Heart, MessageSquare, Music, TrendingUp, Users } from 'lucide-react'



export function StatCards() {



  const {data} = useCounts();

const stats = [
  { label: 'Total Songs', value: data?.totalSongs, delta: '+12 this week', icon: Music, tint: 'primary' },
  { label: 'Total Users', value: data?.totalUsers, delta: '+3.1% vs last month', icon: Users, tint: 'accent' },
  { label: 'Total Plays', value: data?.totalPlays, delta: '+18.6% vs last month', icon: Headphones, tint: 'primary' },
  { label: 'Total Likes', value: data?.totalLikes, delta: '+9.4% vs last month', icon: Heart, tint: 'accent' },
  { label: 'Comments', value: data?.totalCommets, delta: '38 pending review', icon: MessageSquare, tint: 'primary' },
] as const

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {stats.map((stat, i) => {
        const Icon = stat.icon
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.45, ease: 'easeOut' }}
            className="glass group relative overflow-hidden rounded-2xl p-5 transition-shadow hover:glow-primary"
          >
            <div
              aria-hidden="true"
              className={
                stat.tint === 'primary'
                  ? 'absolute -right-8 -top-8 size-24 rounded-full bg-primary/20 blur-2xl'
                  : 'absolute -right-8 -top-8 size-24 rounded-full bg-accent/15 blur-2xl'
              }
            />
            <div className="flex items-start justify-between">
              <div
                className={
                  stat.tint === 'primary'
                    ? 'flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary'
                    : 'flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent'
                }
              >
                <Icon className="size-5" />
              </div>
              <TrendingUp className="size-4 text-accent" />
            </div>
            <p className="mt-4 font-heading text-3xl font-bold tracking-tight">{stat.value}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-2 text-xs font-medium text-accent">{stat.delta}</p>
          </motion.div>
        )
      })}
    </div>
  )
}
