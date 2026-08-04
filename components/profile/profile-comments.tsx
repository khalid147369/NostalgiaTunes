"use client"

import { motion } from "framer-motion"
import { comments, profile } from "@/lib/mock-data"
import { SectionHeading } from "./section-heading"

export function ProfileComments() {
  return (
    <section aria-labelledby="comments-heading">
      <SectionHeading
        id="comments-heading"
        eyebrow="Shared memories"
        title="Recent comments"
        description="What you told the community about the songs you love."
      />
      <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {comments.map((comment, i) => (
          <motion.li
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.07, ease: "easeOut" }}
          >
            <motion.article
              whileHover={{ y: -4 }}
              className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card/60 p-5 backdrop-blur transition-shadow hover:shadow-[0_0_32px_-10px] hover:shadow-primary"
            >
              <div className="flex items-center gap-3">
                <img
                  src={profile.avatar || "/placeholder.svg"}
                  alt=""
                  className="size-9 rounded-full border border-primary/40 object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">@{profile.username}</p>
                  <p className="truncate text-xs text-accent">on {comment.song}</p>
                </div>
              </div>
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground text-pretty">
                &ldquo;{comment.text}&rdquo;
              </p>
              <p className="text-xs text-muted-foreground/70">{comment.date}</p>
            </motion.article>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
