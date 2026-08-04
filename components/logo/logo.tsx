import React from "react";
import Link from "next/link";
import { Disc3 } from "lucide-react";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="relative flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/40">
        <Disc3 className="size-5" />
      </span>
      <span className="font-display text-lg font-bold tracking-tight">
        Nostalgia<span className="text-gradient">Songs</span>
      </span>
    </Link>
  );
};

export default Logo;
