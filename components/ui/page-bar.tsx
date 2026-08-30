"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PageBarProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export function PageBar({
  page,
  totalPages,
  onPageChange,
  disabled = false,
}: PageBarProps) {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Pagination"
      dir="ltr"
      className="mt-6 flex items-center justify-center gap-2"
    >
      <button
        type="button"
        aria-label="Previous page"
        disabled={disabled || page === 0}
        onClick={() => onPageChange(page - 1)}
        className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronLeft className="size-4" />
      </button>
      <span className="min-w-20 text-center text-sm tabular-nums text-muted-foreground">
        Page {page + 1} of {totalPages}
      </span>

      <button
        type="button"
        aria-label="Next page"
        disabled={disabled || page >= totalPages - 1}
        onClick={() => onPageChange(page + 1)}
        className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  );
}
