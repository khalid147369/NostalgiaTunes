import type { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  "https://nostalgiatunes.com";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const CATEGORY_IDS = [1, 2, 3, 4, 5, 6];

function normalizeUrl(path: string) {
  return `${SITE_URL.replace(/\/$/, "")}${path}`;
}

async function getSongs() {
  console.error("========== SITEMAP: FETCHING SONGS ==========");

  if (!API_URL) {
    console.error("========== SITEMAP: API_URL NO EXISTE ==========");
    return [];
  }

  const url = `${API_URL}/songs/getAll?size=1000`;

  console.error("========== SITEMAP API URL ==========");
  console.error(url);

  try {
    const response = await fetch(url, {
      cache: "no-store",
    });

    console.error("========== SITEMAP STATUS ==========");
    console.error(response.status);

    if (!response.ok) {
      console.error("Sitemap API error:", response.status);
      return [];
    }

    const result = await response.json();

    console.error("========== SITEMAP RESULT ==========");
    console.error(JSON.stringify(result));

    return result.content ?? [];
  } catch (error) {
    console.error("========== SITEMAP FETCH ERROR ==========");
    console.error(error);

    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  console.error("========== SITEMAP EXECUTING ==========");

  const songs = await getSongs();

  console.error("========== SONG COUNT ==========");
  console.error(songs.length);

  const home: MetadataRoute.Sitemap = [
    {
      url: normalizeUrl("/"),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  const categories: MetadataRoute.Sitemap = CATEGORY_IDS.map((id) => ({
    url: normalizeUrl(`/category/${id}`),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const songPages: MetadataRoute.Sitemap = songs
    .filter((song: { id?: number }) => song.id)
    .map((song: { id: number; fechaCreacion?: string }) => ({
      url: normalizeUrl(`/song/${song.id}`),
      lastModified: song.fechaCreacion
        ? new Date(song.fechaCreacion)
        : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  return [...home, ...categories, ...songPages];
}
