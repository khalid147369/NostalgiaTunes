import type { MetadataRoute } from "next";

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
  if (!API_URL) {
    console.error("NEXT_PUBLIC_API_URL no está configurada");
    return [];
  }

  try {
    const response = await fetch(`${API_URL}/songs/getAll?size=1000`, {
      next: {
        revalidate: 3600,
      },
    });

    if (!response.ok) {
      console.error(
        "Error obteniendo canciones para sitemap:",
        response.status,
      );

      return [];
    }

    const result = await response.json();

    return result.data ?? [];
  } catch (error) {
    console.error("Error obteniendo canciones para sitemap:", error);

    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const songs = await getSongs();

  // Página principal
  const home: MetadataRoute.Sitemap = [
    {
      url: normalizeUrl("/"),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  // Categorías
  const categories: MetadataRoute.Sitemap = CATEGORY_IDS.map((id) => ({
    url: normalizeUrl(`/category/${id}`),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Canciones
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
