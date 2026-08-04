
import { AmbientBackground } from '@/components/ui/ambient-background'
import { MusicPlayer as AbsuluteMusicPlayer } from '@/components/player/music-player'

import { PlayerProvider } from '@/contexts/player-context'
import SingleSong from '@/components/song/single-song'


interface SongPageProps {
  params: Promise<{ id: string }>
}



export default async function SongPage({ params }: SongPageProps) {
  const { id } = await params





  return (
    <PlayerProvider>
    <AmbientBackground />
    <SingleSong songId={Number(id)}/>
    <AbsuluteMusicPlayer />
    </PlayerProvider>
  )
}
