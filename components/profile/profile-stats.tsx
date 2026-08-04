"use client"

import type { ComponentType } from "react"
import { motion } from "framer-motion"
import { Heart, Headphones, MessageCircle, Music, Star } from "lucide-react"
import { stats } from "@/lib/mock-data"
import { UserDTO } from "@/types"

const icons: Record<string, ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>> = {
  heart: Heart,
  music: Music,
  headphones: Headphones,
  message: MessageCircle,
  star: Star,
}

export function ProfileStats({user}:{user:UserDTO}) {

     const stats = [
    { id: "likes", label: "Total Likes", value: user.totalLikes, icon: "heart" },
    { id: "saved", label: "Songs Saved", value: user.totalSongsSaved, icon: "music" },
    { id: "time", label: "Listening Time", value: "186h", icon: "headphones" },
    { id: "comments", label: "Comments", value: user.totalComments, icon: "message" },
    { id: "category", label: "Favorite Category", value: user.categoryName, icon: "star" },
  ] as const

  return (
    <section aria-label="Profile statistics">
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat, i) => {
          const Icon = icons[stat.icon]
          return (
            <motion.li
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card/60 p-5 backdrop-blur transition-shadow hover:shadow-[0_0_32px_-10px] hover:shadow-primary"
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-2xl font-bold tracking-tight text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </motion.li>
          )
        })}
      </ul>
    </section>
  )
}

