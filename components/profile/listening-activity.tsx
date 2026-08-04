"use client"

import type { ComponentType } from "react"
import { motion } from "framer-motion"
import { Bookmark, Heart, MessageCircle, Play } from "lucide-react"
import { activity } from "@/lib/mock-data"
import { SectionHeading } from "./section-heading"

const icons: Record<string, ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>> = {
  play: Play,
  like: Heart,
  save: Bookmark,
  comment: MessageCircle,
}

export function ListeningActivity() {
  return (
    <section aria-labelledby="activity-heading">
      <SectionHeading
        id="activity-heading"
        eyebrow="Your journey"
        title="Listening activity"
        description="A trail of the memories you brought back to life."
      />
      <ol className="relative mt-8 flex flex-col gap-8 border-l border-border pl-8">
        {activity.map((item, i) => {
          const Icon = icons[item.type]
          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
              className="relative"
            >
              <span className="absolute -left-[45px] flex size-7 items-center justify-center rounded-full border border-primary/40 bg-background text-primary shadow-[0_0_16px_-4px] shadow-primary">
                <Icon className="size-3.5" aria-hidden="true" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{item.when}</p>
              <p className="mt-1 text-sm text-foreground">
                {item.action} <span className="font-semibold text-primary">{item.subject}</span>
              </p>
            </motion.li>
          )
        })}
      </ol>
    </section>
  )
}
