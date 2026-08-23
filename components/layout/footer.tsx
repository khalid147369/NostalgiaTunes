import Link from "next/link";
import { AtSign, Disc3, Radio, Rss, Send } from "lucide-react";
import { CategorySlug } from "@/types";

const columns = [
  {
    title: "Explore",
    links: ["Trending", "Recently added", "Most listened", "Categories"],
  },
  {
    title: "Universes",
    links: ["Spacetoon", "CartoonNetwork", "Anime", "Spacepower", "MBC3","AnotherChannels"],
  },
  {
    title: "Company",
    links: ["About", "Our story", "Contact", "Careers"],
  },
];

const socials = [
  { icon: AtSign, label: "Follow us" },
  { icon: Send, label: "Newsletter" },
  { icon: Radio, label: "Live radio" },
  { icon: Rss, label: "RSS feed" },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2 space-y-4">
            <Link href="#" className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/40">
                <Disc3 className="size-5" />
              </span>
              <span className="font-display text-lg font-bold tracking-tight">
                Nostalgia<span className="text-gradient">Tunes</span>
              </span>
            </Link>
            <p className="max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
              A magical archive of the cartoon and anime songs that scored our
              childhoods. Press play and remember.
            </p>
            <div className="flex items-center gap-2 pt-1">
              {socials.map(({ icon: Icon, label }) => (
                <Link
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                >
                  <Icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="space-y-3">
              <h3 className="font-display text-sm font-semibold">
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    {col.title === "Universes" ? (
                      <Link
                        href={`/category/${CategorySlug[link as keyof typeof CategorySlug]}`}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link}
                      </Link>
                    ) : (
                      <Link
                        href={`/#${link}`}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Nostalgia Songs. Made for everyone who
            grew up in front of a TV.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
