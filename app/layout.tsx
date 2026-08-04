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
  title: "Nostalgia Songs — Relive the music of your childhood",
  description:
    "A magical journey through the classic cartoon and anime opening & ending songs of the late 90s and early 2000s. I remember this song...",
  generator: "v0.app",
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
      className={`dark bg-background ${inter.variable} ${sora.variable} `}
    >
      <body className="font-sans antialiased">
         <LoadingSkeleton/> 
         <PlayerProvider>
          <SearchFocusProvider>
           <AuthProvider>
          <Providers>{children}</Providers>
        </AuthProvider>
         </SearchFocusProvider>
         </PlayerProvider>
         
       

        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
