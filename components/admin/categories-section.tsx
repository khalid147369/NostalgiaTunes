"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Music, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
//import { categories } from '@/lib/mock-data'
import { SectionHeader } from "./section-header";
import { useCategories } from "@/hooks/category/useCategory";
import { CategoryDTO } from "@/types";
import { timeAgo } from "@/lib/utils";

export function CategoriesSection() {
  const { data } = useCategories();
  const categories: CategoryDTO[] = data?.data || [];

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Choose Your Universe"
        title="Categories"
        description="The worlds your community grew up in. Each one holds hundreds of themes waiting to be remembered."
        action={
          <Button className="glow-primary rounded-full bg-primary px-5 text-primary-foreground hover:bg-primary/90">
            <Plus className="size-4" />
            New Category
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories?.map((category, i) => (
          
          <motion.article
            key={category.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.45, ease: "easeOut" }}
            className="glass group relative overflow-hidden rounded-2xl transition-shadow hover:glow-primary"
          >
            <div className="relative h-36 overflow-hidden">
              <Image
                src={category.imageUrl || "/placeholder.svg"}
                alt=""
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent"
                aria-hidden="true"
              />
              <span className="absolute left-3 top-3 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-accent backdrop-blur-md">
                {category.songCount} songs
              </span>
            </div>
            <div className="p-5 pt-2">
              <h3 className="font-heading text-lg font-bold">
                {category.nombre}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {category.descripcion}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Music className="size-3.5" />
                  Updated {timeAgo(category.updatedAt)}
                </span>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-lg text-muted-foreground hover:bg-primary/15 hover:text-foreground"
                    aria-label={`Edit ${category.nombre}`}
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-lg text-muted-foreground hover:bg-destructive/15 hover:text-destructive"
                    aria-label={`Delete ${category.nombre}`}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
