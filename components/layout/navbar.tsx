"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Disc3, Menu, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "../logo/logo";
import { useUser } from "@/hooks/auth/useUser";
import AvatarMenu from "../AvatarMenu/AvatarMenu";
import { NavbarSkeleton } from "../loadingScreen/navBarSkeleton";
import { useRouter } from "next/navigation";
import { useSearchFocus } from "@/providers/searchProvider";

const links = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/#Categories" },
  { label: "Trending", href: "/#Trending" },
  { label: "Favorites", href: "/profile/#favorite-songs-heading" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const { setFocus, focus } = useSearchFocus();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const { user, loading, logout } = useUser();
  if (loading) {
    return <NavbarSkeleton />;
  }
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6"
    >
      <nav
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-2xl border border-transparent px-4 py-2.5 transition-all duration-300 sm:px-5",
          scrolled && "glass-strong border-border glow-purple",
        )}
      >
        <Logo />

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.label==="Favorites"&& !user?"/register":link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              (router.push("#search"), setFocus(!focus));
            }}
            type="button"
            aria-label="Search"
            className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
          >
            <Search className="size-4" />
          </button>
          {user ? (
            <AvatarMenu user={user} logout={logout} />
          ) : (
            <Link
              href="/login"
              className="hidden rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition-transform hover:scale-[1.03] sm:inline-flex"
            >
              Sign in
            </Link>
          )}

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex size-9 items-center justify-center rounded-full border border-border text-foreground md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-2 max-w-7xl rounded-2xl border border-border glass-strong p-2 md:hidden"
        >
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.label==="Favorites"&& !user?"/register":link.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}

          <div className="mt-2 border-t border-border pt-2">
            {user ? (
              <>
                <p className="px-4 py-2 text-xs text-muted-foreground">
                  Signed in as{" "}
                  <span className="font-medium text-foreground">
                    {user.nombre}
                  </span>
                </p>
                <Link
                  href="/profile"
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                >
                  Profile
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="block w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-rose-300 transition-colors hover:bg-rose-950/30"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="mt-1 block rounded-xl bg-foreground px-4 py-3 text-sm font-semibold text-background transition-transform hover:scale-[1.01]"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </motion.div>
      ) : null}
    </motion.header>
  );
}
