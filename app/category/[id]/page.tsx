import SingleCategory from "@/components/singleCategory/SingleCategory";
import { AmbientBackground } from "@/components/ui/ambient-background";
import { MusicPlayer as AbsuluteMusicPlayer } from "@/components/player/music-player";
import React from "react";
import { Navbar } from "@/components/layout/navbar";
import Loading from "@/app/loading";
import type { Metadata } from "next";
import type { CategoryDTO as CategoryType } from "@/types";

interface CategoryPageProps {
  params: Promise<{ id: string }>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://nostalgiatunes.com";

async function getCategory(id: string): Promise<CategoryType | null> {
  try {
    const response = await fetch(`${API_URL}/categories/getById/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;

    const result = await response.json();
    return result.data ?? result;
  } catch (err) {
    console.error("Error fetching category:", err);
    return null;
  }
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { id } = await params;
  const category = await getCategory(id);

  if (!category) {
    return {
      title: "Categoría no encontrada | NostalgiaTunes",
      description: "No hemos podido encontrar la categoría que estás buscando.",
      robots: { index: false, follow: false },
    };
  }

  const name = (category as any).name ?? (category as any).nombre ?? "Category";
  const description =
    (category as any).tagline ??
    `Explore songs from the ${name} category on NostalgiaTunes. — استكشف الشارات من فئة ${name} على NostalgiaTunes.`;
  const image = (category as any).cover ?? `${SITE_URL}/og-image.jpg`;
  const url = `${SITE_URL}/category/${(category as any).id}`;

  return {
    title: `${name} | NostalgiaTunes`,
    description,
    keywords: [
      name,
      (category as any).tagline,
      "NostalgiaTunes",
      "categories",
      "cartoon songs",
      "anime songs",
      "cartoonNetwork songs",
      "Spacetoon songs",
      "SpacePower songs",
      "MBC3 songs",
    ].filter((k): k is string => Boolean(k)),
    alternates: { canonical: url },
    openGraph: {
      title: `${name} | NostalgiaTunes`,
      description,
      url,
      siteName: "NostalgiaTunes",
      type: "website",
      locale: "ar_SA",
      alternateLocale: ["en_US"],
      images: [{ url: image, width: 1200, height: 630, alt: name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | NostalgiaTunes`,
      description,
      images: [image],
    },
    robots: { index: true, follow: true },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;
  return (
    <div className=" p-5">
      <AmbientBackground />
      <Loading />
      <SingleCategory id={id} />
      <AbsuluteMusicPlayer />
    </div>
  );
}
