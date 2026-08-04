"use client";

export function NavbarSkeleton() {
  return (
    <header className="border-b border-white/10 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 animate-pulse rounded-full bg-slate-800" />

          <div className="space-y-2">
            <div className="h-5 w-36 animate-pulse rounded bg-slate-800" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden items-center gap-12 lg:flex">
          <div className="h-5 w-14 animate-pulse rounded bg-slate-800" />
          <div className="h-5 w-20 animate-pulse rounded bg-slate-800" />
          <div className="h-5 w-20 animate-pulse rounded bg-slate-800" />
          <div className="h-5 w-20 animate-pulse rounded bg-slate-800" />
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 animate-pulse rounded-full bg-slate-800" />

          <div className="flex h-12 w-32 animate-pulse items-center rounded-full border border-slate-800 px-2">
            <div className="h-9 w-9 rounded-full bg-slate-700" />
            <div className="ml-3 h-4 w-14 rounded bg-slate-700" />
          </div>
        </div>
      </div>
    </header>
  );
}
