import { Skeleton } from "@/components/ui/skeleton";

export function SongCardSkeleton() {
  return (
    <div className="flex w-52 shrink-0 flex-col rounded-3xl border border-white/10 bg-slate-950/40 p-4">
      {/* Cover */}
      <Skeleton className="aspect-square w-full rounded-2xl" />

      {/* Title */}
      <Skeleton className="mt-4 h-5 w-3/4" />

      {/* Subtitle */}
      <Skeleton className="mt-2 h-4 w-1/2" />

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between">
        <Skeleton className="h-4 w-10" />
        <Skeleton className="h-4 w-10" />
      </div>
    </div>
  );
}