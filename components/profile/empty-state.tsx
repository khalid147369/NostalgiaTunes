"use client"

import { motion } from "framer-motion"
import { ListMusic, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "./section-heading"

export function PlaylistsEmptyState() {
  return (
    <section aria-labelledby="playlists-heading">
      <SectionHeading
        id="playlists-heading"
        eyebrow="Mixtapes"
        title="Your playlists"
        description="Collect your favorite openings into one mixtape."
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mt-6 flex flex-col items-center gap-4 rounded-3xl border border-dashed border-border bg-card/40 px-6 py-14 text-center backdrop-blur"
      >
        <motion.span
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="flex size-16 items-center justify-center rounded-full bg-primary/15 text-primary shadow-[0_0_32px_-8px] shadow-primary"
        >
          <ListMusic className="size-7" aria-hidden="true" />
        </motion.span>
        <div>
          <p className="text-lg font-semibold text-foreground">You haven&apos;t created any playlists yet.</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground text-pretty">
            Start a mixtape of the themes that raised you. Your future self will thank you.
          </p>
        </div>
        <Button className="rounded-full px-6 shadow-[0_0_24px_-6px] shadow-primary">
          <Plus className="size-4" aria-hidden="true" />
          Create your first playlist
        </Button>
      </motion.div>
    </section>
  )
}
