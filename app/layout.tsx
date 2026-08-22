import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";

import "./globals.css";

import Providers from "@/providers/QueryProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import LoadingSkeleton from "@/components/loadingScreen/LoadingSkeleton";
import { SearchFocusProvider } from "@/providers/searchProvider";
import { PlayerProvider } from "@/contexts/player-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://nostalgiatunes.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  verification: {
    google: "1uf-nf3m4e2X6o_ZyrTmqWJP3qDfdrSK4HRpCM3m6lU",
  },

  title: {
    default: "NostalgiaTunes — شارات سبيستون وشارات الكرتون والأنمي",
    template: "%s | NostalgiaTunes",
  },

  description:
    "استمع إلى شارات سبيستون وشارات الكرتون والأنمي التي صنعت ذكريات الطفولة. Discover classic Spacetoon, anime and cartoon openings on NostalgiaTunes.",

  keywords: [
    "NostalgiaTunes",
    "شارات سبيستون",
    "شارات سبيستون",
    "شارات الكرتون",
    "شارات الكرتون",
    "كرتون قديم",
    "شارات الأنمي",
    "Spacetoon songs",
    "Spacetoon openings",
    "anime songs",
    "cartoon songs",
    "cartoon openings",
    "90s nostalgia",
    "2000s anime",
  ],

  authors: [
    {
      name: "NostalgiaTunes",
      url: SITE_URL,
    },
  ],

  creator: "NostalgiaTunes",
  publisher: "NostalgiaTunes",

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    title: "NostalgiaTunes — شارات سبيستون وشارات الكرتون والأنمي",

    description:
      "استمع إلى أجمل شارات سبيستون وشارات الكرتون والأنمي التي صنعت ذكريات الطفولة.",

    url: SITE_URL,

    siteName: "NostalgiaTunes",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NostalgiaTunes — شارات سبيستون وشارات الكرتون",
      },
    ],

    locale: "ar_SA",

    alternateLocale: ["en_US"],

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "NostalgiaTunes — شارات سبيستون وشارات الكرتون والأنمي",

    description: "استمع إلى شارات سبيستون وشارات الكرتون والأنمي القديمة.",

    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,

      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "music",
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0b0f24",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="auto"
      className={`dark bg-background ${inter.variable} ${sora.variable}`}
    >
      <body className="font-sans antialiased">
        <LoadingSkeleton />

        <AuthProvider>
          <PlayerProvider>
            <SearchFocusProvider>
              <Providers>{children}</Providers>
            </SearchFocusProvider>
          </PlayerProvider>
        </AuthProvider>

        <Analytics />
      </body>
    </html>
  );
}
