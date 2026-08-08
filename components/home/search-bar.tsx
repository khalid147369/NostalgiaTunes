"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearchFocus } from "@/providers/searchProvider";
import { usesearch } from "@/hooks/useSearch";
import SearchResults from "../ui/songSearchPanel";
import { useRouter } from "next/navigation";
import { useCategories } from "@/hooks/category/useCategory";
import { Song } from "@/types";



interface SearchBarProps {
  className?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder:string;
  trending:Song[];
}

export function SearchBar({ className, handleChange, value ,placeholder,trending}: SearchBarProps) {
  const [focused, setFocused] = useState(false);

  const { focus } = useSearchFocus();

  const handleSearch = async () => {};

  const suggestions :string[]=trending?.map(s=>s.cartoon);

 
  useEffect(() => {
    setFocused(focus);
  }, [focus]);

  function setValue(s: string): void {
    const event = {
      target: {
        value: s,
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    handleChange(event);
  }

  return (
    <>
      {" "}
      <div className={cn("w-full max-w-xl", className)}>
        <div
          className={cn(
            "flex items-center gap-3 rounded-2xl border border-border glass px-4 py-3 transition-all duration-300",
            focused && "border-primary/50 glow-purple",
          )}
        >
          <Search
            onClick={handleSearch}
            className={cn(
              "size-5 shrink-0 transition-colors",
              focused ? "text-primary" : "text-muted-foreground",
            )}
          />
          <input
            value={value}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            aria-label="Search songs"
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <kbd className="hidden shrink-0 rounded-md border border-border px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:block">
            /
          </kbd>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">Try:</span>
          {suggestions &&suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setValue(s)}
              className="rounded-full border border-border bg-white/5 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-cyan/50 hover:text-foreground"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
