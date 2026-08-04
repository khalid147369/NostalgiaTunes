'use client'
import type { Metadata } from "next";
import { ProfileNav } from "@/components/profile/profile-nav";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileStats } from "@/components/profile/profile-stats";
import { FavoriteCategories } from "@/components/profile/favorite-categories";
import { RecentlyPlayed } from "@/components/profile/recently-played";
import { FavoriteSongs } from "@/components/profile/favorite-songs";
import { ListeningActivity } from "@/components/profile/listening-activity";
import { ProfileComments } from "@/components/profile/profile-comments";
import { PlaylistsEmptyState } from "@/components/profile/empty-state";
import { useUser } from "@/hooks/useUser";

export const metadata: Metadata = {




  title: "Retro Kid — Profile | NostalgiaSongs",
  description:
    "Your nostalgic profile on NostalgiaSongs: stats, favorite songs, and the memories you replayed.",
};
const Profile = () => {

  
  const {user} = useUser();

  console.log(user);
    return (
        <div className="relative min-h-svh overflow-hidden bg-background">
              {/* Ambient background matching the Home hero */}
              <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <img
                  src="/images/auth-bg.png"
                  alt=""
                  className="absolute inset-0 size-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/85 to-background" />
                <div className="absolute -top-32 left-1/4 size-96 rounded-full bg-primary/15 blur-[120px]" />
                <div className="absolute top-1/2 right-0 size-80 rounded-full bg-accent/10 blur-[120px]" />
              </div>
        
              <ProfileNav />
        
              <main className="relative mx-auto flex max-w-6xl flex-col gap-16 px-4 pb-24 pt-32 md:gap-20 md:px-6">
                <ProfileHeader user={user} />
                <ProfileStats user={user} />
                <FavoriteCategories />
                <RecentlyPlayed />
                <FavoriteSongs />
                <ListeningActivity />
                <PlaylistsEmptyState />
                <ProfileComments />
              </main>
            </div>
    );
}

export default Profile;
