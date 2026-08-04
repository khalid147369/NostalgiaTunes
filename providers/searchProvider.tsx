"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

interface SearchFocusContextType {
  focus: boolean;
  setFocus: (value: boolean) => void;
}

const SearchFocusContext = createContext<SearchFocusContextType | null>(null);

export function SearchFocusProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [focus, setFocus] = useState(false);

  return (
    <SearchFocusContext.Provider value={{ focus, setFocus }}>
      {children}
    </SearchFocusContext.Provider>
  );
}

export function useSearchFocus() {
  const context = useContext(SearchFocusContext);

  if (!context) {
    throw new Error(
      "useSearchFocus debe usarse dentro de SearchFocusProvider"
    );
  }

  return context;
}