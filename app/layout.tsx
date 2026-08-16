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

export const metadata: Metadata = {
  metadataBase: new URL("https://nostalgiatunes.com"),
  
  title: {
    default: "NostalgiaTunes — Relive the music of your childhood | نوستالجيا تيونز",
    template: "%s | NostalgiaTunes",
  },
  
  description:
    "A magical journey through classic anime & cartoon songs (EN/AR). إكتشف واستمع إلى أفضل الأغاني الشارات الكرتونية التي صنعت الذكريات.",

  keywords: [
    "NostalgiaTunes",
    "anime songs",
    "cartoon openings",
    "90s nostalgia",
    "2000s anime",
    "أغاني سبيستون",
    "كرتون قديم",
    "شارات الكرتون",
    "نوستالجيا",
  ],

  alternates: {
    canonical: "https://nostalgiatunes.com",
    languages: {
      en: "https://nostalgiatunes.com",
      ar: "https://nostalgiatunes.com",
    },
  },

  openGraph: {
    title: "NostalgiaTunes — Relive the music of your childhood",
    description:
      "A magical journey through classic cartoon and anime songs. رحلة سحرية عبر أجمل أغاني الكرتون والأنمي.",
    url: "https://nostalgiatunes.com",
    siteName: "NostalgiaTunes",
    images: [
      {
        url: "/og-image.jpg", // Asegúrate de colocar esta imagen en tu carpeta public/
        width: 1200,
        height: 630,
        alt: "NostalgiaTunes Preview",
      },
    ],
    locale: "en_US",
    alternateLocale: ["ar_SA"],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "NostalgiaTunes — Relive the music of your childhood",
    description: "A magical journey through classic cartoon and anime songs.",
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
    },
  },
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
      lang="en"
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
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}