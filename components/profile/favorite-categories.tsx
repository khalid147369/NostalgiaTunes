"use client"

import { motion } from "framer-motion"
import { categoriesNames } from "@/lib/mock-data"
import { SectionHeading } from "./section-heading"

export function FavoriteCategories() {
  return (
    <section aria-labelledby="categories-heading">
      <SectionHeading
        id="categories-heading"
        eyebrow="Worlds you love"
        title="Favorite categories"
        description="The universes that shaped your Saturday mornings."
      />
      <div className="mt-6 flex flex-wrap gap-3">
        {categoriesNames.map((category, i) => (
          <motion.button
            key={i}
            type="button"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            whileHover={{ scale: 1.05 }}
            className="rounded-full border border-border bg-secondary/60 px-5 py-2 text-sm font-medium text-foreground backdrop-blur transition-colors hover:border-primary/50 hover:bg-primary/15 hover:text-primary"
          >
            {category}
          </motion.button>
        ))}
      </div>
    </section>
  )
}