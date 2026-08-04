"use client";

import { motion } from "framer-motion";
//import { categories } from '@/lib/mock-data'
import { SectionHeading } from "@/components/home/section-heading";
import { CategoryCard } from "@/components/home/category-card";
import { useCategories } from "@/hooks/category/useCategory";
import { Category, CategoryDTO } from "@/types";
import Link from "next/link";

export function CategoriesSection() {
  const { data } = useCategories();
  const categories: CategoryDTO[] = data?.data || [];

  return (
    <section
      id="categories"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6"
    >
      <SectionHeading
        eyebrow="Choose your universe"
        title="Every channel had a sound"
        description="Jump back into the worlds you grew up in. Each one holds hundreds of themes waiting to be remembered."
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.06,
            },
          },
        }}
        className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
      >
        {categories.map((category, i) => (
          <motion.div
            key={category.id}
            variants={{
              hidden: {
                opacity: 0,
                y: 24,
              },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                },
              },
            }}
            className={
              i === 0
                ? "col-span-2 row-span-2 md:col-span-1 md:row-span-2 lg:col-span-2"
                : ""
            }
          >
            <CategoryCard
              category={category}
              className={i === 0 ? "h-full min-h-52" : "h-60"}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
