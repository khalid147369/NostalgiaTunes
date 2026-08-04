export function FeaturedSongSkeleton() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 animate-pulse">
      <div className="mb-4 h-3 w-40 rounded bg-slate-800" />

      <div className="overflow-hidden rounded-[2rem] border border-violet-500/20 bg-slate-900">
        <div className="grid lg:grid-cols-2">
          {/* Imagen */}
          <div className="aspect-[16/10] bg-slate-800" />

          {/* Información */}
          <div className="flex flex-col justify-center p-12">
            <div className="mb-6 h-5 w-40 rounded bg-slate-800" />

            <div className="mb-8 h-12 w-72 rounded bg-slate-800" />

            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-slate-800" />
              <div className="h-4 w-5/6 rounded bg-slate-800" />
              <div className="h-4 w-2/3 rounded bg-slate-800" />
            </div>

            <div className="mt-10 flex gap-12">
              <div>
                <div className="mb-2 h-8 w-10 rounded bg-slate-800" />
                <div className="h-3 w-20 rounded bg-slate-800" />
              </div>

              <div>
                <div className="mb-2 h-8 w-10 rounded bg-slate-800" />
                <div className="h-3 w-16 rounded bg-slate-800" />
              </div>
            </div>

            <div className="mt-10 flex gap-4">
              <div className="h-14 w-44 rounded-full bg-slate-800" />
              <div className="h-14 w-28 rounded-full bg-slate-800" />
              <div className="h-14 w-14 rounded-full bg-slate-800" />
              <div className="h-14 w-14 rounded-full bg-slate-800" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}