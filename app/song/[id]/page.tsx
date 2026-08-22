import type { Metadata } from "next";

import { AmbientBackground } from "@/components/ui/ambient-background";
import { MusicPlayer as AbsuluteMusicPlayer } from "@/components/player/music-player";
import { PlayerProvider } from "@/contexts/player-context";
import SingleSong from "@/components/song/single-song";
import type { Song as SongType } from "@/types";

interface SongPageProps {
  params: Promise<{ id: string }>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://nostalgiatunes.com";

async function getSong(id: string): Promise<SongType | null> {
  try {
    const response = await fetch(`${API_URL}/songs/getSingle/${id}`, {
      next: {
        revalidate: 3600,
      },
    });

    if (!response.ok) {
      return null;
    }

    const result = await response.json();

    // Si tu Spring devuelve { data: {...} }
    return (result.data ?? result) as unknown as SongType;
  } catch (error) {
    console.error("Error fetching song:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: SongPageProps): Promise<Metadata> {
  const { id } = await params;

  const song = await getSong(id);

  if (!song) {
    return {
      title: "Song Not Found | NostalgiaTunes — الشارة غير موجودة",
      description:
        "We couldn't find the song you're looking for. — لم نتمكن من العثور على الشارة التي تبحث عنها.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${(song as any).titulo ?? song.title} | ${song.cartoon} | NostalgiaTunes`;

  const description =
    (song as any).descripcion ||
    song.description ||
    `Listen to ${(song as any).titulo ?? song.title} | ${song.cartoon} on NostalgiaTunes. Discover classic songs from Spacetoon, anime and cartoons. — استمع إلى ${(song as any).titulo ?? song.title} | ${song.cartoon} على NostalgiaTunes. اكتشف الشارات الكلاسيكية من سبيستون والأنمي والرسوم المتحركة.`;

  const image =
    (song as any).imagen ??
    song.cover ??
    song.imageUrl ??
    `${SITE_URL}/og-image.jpg`;

  const url = `${SITE_URL}/song/${(song as any).id ?? song.id}`;

  return {
    title,
    description,

    keywords: [
      (song as any).titulo ?? song.title,
      song.cartoon,
      (song as any).creador ?? undefined,
      "NostalgiaTunes",
      "Spacetoon",
      "CartoonNetwork",
      "Space Power",
      "cartoon songs",
      "anime songs",
      "شارات سبيستون",
      "شارات كرتون",
      "شارات الأنمي",
    ].filter((k): k is string => Boolean(k)),

    alternates: {
      canonical: url,
    },

    openGraph: {
      title,
      description,
      url,
      siteName: "NostalgiaTunes",
      type: "music.song",
      locale: "ar_SA",
      alternateLocale: ["en_US"],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: (song as any).titulo ?? song.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function SongPage({ params }: SongPageProps) {
  const { id } = await params;
  const song = await getSong(id);

  return (
    <PlayerProvider>
      <AmbientBackground />

      <SingleSong
        songId={Number(id)}
        initialSong={(song ?? undefined) as unknown as SongType}
      />

      <AbsuluteMusicPlayer />
    </PlayerProvider>
  );
}
