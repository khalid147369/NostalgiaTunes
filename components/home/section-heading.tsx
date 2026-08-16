"use client";

import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  handleShowAll?: () => void;
  isShowedAll?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  actionLabel = "See all",
  actionHref = "#",
  handleShowAll,
  isShowedAll,
}: SectionHeadingProps) {
  return (
    <Reveal className="mb-6 flex items-end justify-between gap-6">
      <div className="space-y-1.5">
        {eyebrow ? (
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan/90">
            {eyebrow}
          </span>
        ) : null}
        <h2 className="font-display text-2xl font-bold tracking-tight text-balance sm:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {handleShowAll ? (
        <div
          onClick={handleShowAll}
          className=" cursor-pointer group hidden shrink-0 items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground sm:inline-flex"
        >
          {isShowedAll ? (
            <>
              <span>Show Less</span>
              <ArrowDown className="size-4 transition-transform group-hover:translate-x-0.5" />
            </>
          ) : (
            <>
              <span>{actionLabel}</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </div>
      ) : null}
    </Reveal>
  );
}
