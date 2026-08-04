export function MostListenedSkeleton() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 animate-pulse">
      <div className="mb-2 h-3 w-32 rounded bg-slate-800" />

      <div className="mb-4 h-10 w-96 rounded bg-slate-800" />

      <div className="mb-10 h-5 w-[520px] rounded bg-slate-800" />

      <div className="overflow-hidden rounded-3xl border border-border">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between border-b border-border px-8 py-6 last:border-none"
          >
            <div className="flex items-center gap-6">
              <div className="h-8 w-6 rounded bg-slate-800" />

              <div className="h-16 w-16 rounded-xl bg-slate-800" />

              <div>
                <div className="mb-3 h-5 w-40 rounded bg-slate-800" />
                <div className="h-4 w-28 rounded bg-slate-800" />
              </div>
            </div>

            <div className="flex items-center gap-10">
              <div className="h-4 w-16 rounded bg-slate-800" />
              <div className="h-6 w-6 rounded-full bg-slate-800" />
              <div className="h-4 w-12 rounded bg-slate-800" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}