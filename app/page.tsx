import { PlayerProvider } from "@/contexts/player-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MusicPlayer } from "@/components/player/music-player";
import { Hero } from "@/components/home/hero";
import { FeaturedSong } from "@/components/home/featured-song";
import { CategoriesSection } from "@/components/home/categories-section";
import { SongCarousel } from "@/components/home/song-carousel";
import { SongGridSection } from "@/components/home/song-grid-section";
import { MostListened } from "@/components/home/most-listened";

export default function HomePage() {
  return (
    
      <PlayerProvider>
        <div className="relative min-h-screen overflow-x-hidden pb-32">
          <Navbar />

          <main>
            <Hero />

            <FeaturedSong />
            <CategoriesSection />
            <SongCarousel
              id="Trending"
              eyebrow="Everyone is replaying"
              title="Trending right now"
              description="The songs lighting up the community this week."
            />
            <SongGridSection
              id="Recently added"
              eyebrow="Fresh from the vault"
              title="Recently added"
              description="New memories digitized and added to the archive."
            />
            <MostListened />
          </main>

          <Footer />
          <MusicPlayer />
        </div>
      </PlayerProvider>

  );
}
