"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Song } from "@/types";

interface PlayerContextValue {
  currentSong: Song | null;
  isPlaying: boolean;

  currentTime: number;

  likedIds: Set<string>;
  SavedSongIds : Set<string>;
  play(song: Song): void;
  pause(): void;
  resume(): void;
  seek(seconds: number): void;
  toggle(): void;
  next(): void;
  previous(): void;
  toggleLike(id: string): void;
  toggleSavedSong(id: string): void;
  close(): void;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const [likedIds, setLikedIds] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set<string>();

    const storedLikes = localStorage.getItem("likes");
    if (!storedLikes) return new Set<string>();

    try {
      const parsedLikes: unknown = JSON.parse(storedLikes);
      return new Set<string>(Array.isArray(parsedLikes) ? parsedLikes : []);
    } catch {
      return new Set<string>();
    }
  });

    const [SavedSongIds, setSavedsongIds] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set<string>();

    const storedSaves = localStorage.getItem("SavedSongs");
    if (!storedSaves) return new Set<string>();

    try {
      const parsedSaves: unknown = JSON.parse(storedSaves);
      return new Set<string>(Array.isArray(parsedSaves) ? parsedSaves : []);
    } catch {
      return new Set<string>();
    }
  });

  const audioRef = useRef<HTMLAudioElement>(null);

  const play = useCallback(
    (song: Song) => {
      if (!audioRef.current) return;

      // Si es la misma canción, solo pausa o reanuda
      if (currentSong?.id === song.id) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          audioRef.current.play();
          setIsPlaying(true);
        }
        return;
      }

      // Si es una canción distinta
      audioRef.current.src = song.audioUrl ?? "";
      audioRef.current.play();

      setCurrentSong(song);
      setCurrentTime(0);
      setIsPlaying(true);
    },
    [currentSong, isPlaying],
  );

  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const resume = async () => {
    if (!audioRef.current) return;

    await audioRef.current.play();
    setIsPlaying(true);
  };

  const toggle = () => {
    if (isPlaying) {
      pause();
    } else {
      resume();
    }
  };

  const seek = (seconds: number) => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = seconds;
    setCurrentTime(seconds);
  };

  const close = () => {
    audioRef.current?.pause();

    if (audioRef.current) {
      audioRef.current.src = "";
    }

    setCurrentSong(null);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const next = () => {
    // TODO
  };

  const previous = () => {
    // TODO
  };

  const toggleLike = useCallback((id: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      localStorage.setItem("likes", JSON.stringify([...next]));
      return next;
    });
  }, []);

    const toggleSavedSong = useCallback((id: string) => {
    setSavedsongIds((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      localStorage.setItem("SavedSongs", JSON.stringify([...next]));
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      currentSong,
      isPlaying,
      currentTime,
      likedIds,
      SavedSongIds,
      play,
      pause,
      resume,
      seek,
      next,
      previous,
      toggle,
      toggleLike,
      toggleSavedSong,
      close,
    }),
    [currentSong, isPlaying, currentTime, likedIds, play, toggleLike,SavedSongIds,toggleSavedSong],
  );

  return (
    <PlayerContext.Provider value={value}>
      {children}

      <audio
        ref={audioRef}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
          }
        }}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
        }}
      />
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);

  if (!ctx) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }

  return ctx;
}
