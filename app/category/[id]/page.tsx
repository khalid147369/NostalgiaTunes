import SingleCategory from '@/components/singleCategory/SingleCategory';
import { AmbientBackground } from '@/components/ui/ambient-background';
import { MusicPlayer as AbsuluteMusicPlayer } from '@/components/player/music-player'
import React from 'react';
import { Navbar } from '@/components/layout/navbar';



interface CategoryPageProps {
  params: Promise<{ id: string }>
}

export default async  function CategoryPage({ params }: CategoryPageProps){

      const { id } = await params
    return (
        <div className=' p-5'>
                <AmbientBackground />
              
                <SingleCategory id={id}/>
                <AbsuluteMusicPlayer />
        </div>
    );
}

