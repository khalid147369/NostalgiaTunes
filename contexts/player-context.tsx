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
import Link from "next/link";
import { Bookmark, Heart } from "lucide-react";
import type { Song } from "@/types";
import { useUser } from "@/hooks/auth/useUser";
import { useListen } from "@/hooks/Listen/useLike";
import { useRouter } from "next/navigation";

interface PlayerContextValue {
  currentSong: Song | null;
  isPlaying: boolean;

  currentTime: number;

  likedIds: Set<string>;
  SavedSongIds: Set<string>;
  play(song: Song): void;
  pause(): void;
  resume(): void;
  seek(seconds: number): void;
  toggle(): void;
  next(): void;
  previous(): void;
  toggleLike(id: string | number): void;
  toggleSavedSong(id: string | number): void;
  close(): void;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

function AuthPromptBar({
  action,
  onClose,
}: {
  action: "like" | "save";
  onClose: () => void;
}) {
  const isSave = action === "save";

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex justify-center px-4">
      <div className="pointer-events-auto flex w-full max-w-lg items-center gap-3 rounded-2xl border border-white/10 bg-[#0f1220]/90 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <div className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
          {isSave ? (
            <Bookmark className="h-5 w-5" />
          ) : (
            <Heart className="h-5 w-5" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground">
            {isSave ? "Save your favorites" : "Like the songs you love"}
          </p>
          <p className="text-xs text-muted-foreground">
            Sign in to keep your music collection and favorites synced.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 px-3 py-2 text-xs font-medium text-muted-foreground transition hover:text-foreground"
          >
            Later
          </button>
          <Link
            href="/register"
            className="rounded-full bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Join now
          </Link>
        </div>
      </div>
    </div>
  );
}

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const { user, loading } = useUser();
  const router = useRouter();

  const [likedIds, setLikedIds] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set<string>();

    const storedLikes = localStorage.getItem("likes");
    if (!storedLikes) return new Set<string>();

    try {
      const parsedLikes: unknown = JSON.parse(storedLikes);
      if (Array.isArray(parsedLikes)) {
        return new Set<string>(parsedLikes.map((v) => String(v)));
      }
      return new Set<string>();
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
      if (Array.isArray(parsedSaves)) {
        return new Set<string>(parsedSaves.map((v) => String(v)));
      }
      return new Set<string>();
    } catch {
      return new Set<string>();
    }
  });

  const audioRef = useRef<HTMLAudioElement>(null);
  const listenedSongIdsRef = useRef(new Set<string>());
  const pendingListenIdsRef = useRef(new Set<string>());
  const playedSecondsRef = useRef(0);
  const lastAudioTimeRef = useRef(0);
  const authPromptTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [authPrompt, setAuthPrompt] = useState<{
    action: "like" | "save";
    visible: boolean;
  }>({
    action: "like",
    visible: false,
  });
  const { mutate: recordListen } = useListen();

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
      playedSecondsRef.current = 0;
      lastAudioTimeRef.current = 0;
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

    playedSecondsRef.current = 0;
    lastAudioTimeRef.current = 0;
    setCurrentSong(null);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    const songId = currentSong?.id;
    if (!songId || !isPlaying || playedSecondsRef.current < 6) return;

    const songIdString = String(songId);
    if (
      listenedSongIdsRef.current.has(songIdString) ||
      pendingListenIdsRef.current.has(songIdString)
    ) {
      return;
    }

    pendingListenIdsRef.current.add(songIdString);
    recordListen(Number(songId), {
      onSuccess: () => {
        listenedSongIdsRef.current.add(songIdString);
        pendingListenIdsRef.current.delete(songIdString);
      },
      onError: () => {
        pendingListenIdsRef.current.delete(songIdString);
      },
    });
  }, [currentSong?.id, currentTime, isPlaying, recordListen]);

  const next = () => {
    // TODO
  };

  const previous = () => {
    // TODO
  };

  const showAuthPrompt = useCallback((action: "like" | "save") => {
    setAuthPrompt({ action, visible: true });

    if (authPromptTimerRef.current) {
      clearTimeout(authPromptTimerRef.current);
    }

    authPromptTimerRef.current = setTimeout(() => {
      setAuthPrompt((prev) => ({ ...prev, visible: false }));
    }, 4200);
  }, []);

  const toggleLike = useCallback(
    (id: string | number) => {
      if (!user && !loading) {
        showAuthPrompt("like");
        return;
      }

      const sid = String(id);

      setLikedIds((prev) => {
        const next = new Set(prev);

        if (next.has(sid)) {
          next.delete(sid);
        } else {
          next.add(sid);
        }
        localStorage.setItem("likes", JSON.stringify([...next]));
        return next;
      });
    },
    [user, loading, router],
  );

  const toggleSavedSong = useCallback(
    (id: string | number) => {
      if (!user && !loading) {
        showAuthPrompt("save");
        return;
      }

      const sid = String(id);

      setSavedsongIds((prev) => {
        const next = new Set(prev);

        if (next.has(sid)) {
          next.delete(sid);
        } else {
          next.add(sid);
        }
        localStorage.setItem("SavedSongs", JSON.stringify([...next]));
        return next;
      });
    },
    [user, loading, router],
  );

  useEffect(() => {
    return () => {
      if (authPromptTimerRef.current) {
        clearTimeout(authPromptTimerRef.current);
      }
    };
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
    [
      currentSong,
      isPlaying,
      currentTime,
      likedIds,
      play,
      toggleLike,
      SavedSongIds,
      toggleSavedSong,
    ],
  );

  return (
    <PlayerContext.Provider value={value}>
      {children}

      <audio
        ref={audioRef}
        onTimeUpdate={() => {
          if (audioRef.current) {
            const audioTime = audioRef.current.currentTime;
            const elapsed = audioTime - lastAudioTimeRef.current;
            if (elapsed > 0 && elapsed <= 1.5) {
              playedSecondsRef.current += elapsed;
            }
            lastAudioTimeRef.current = audioTime;
            setCurrentTime(audioTime);
          }
        }}
        onSeeking={() => {
          if (audioRef.current) {
            lastAudioTimeRef.current = audioRef.current.currentTime;
          }
        }}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
          playedSecondsRef.current = 0;
          lastAudioTimeRef.current = 0;
        }}
      />

      {authPrompt.visible && (
        <AuthPromptBar
          action={authPrompt.action}
          onClose={() => setAuthPrompt((prev) => ({ ...prev, visible: false }))}
        />
      )}
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
