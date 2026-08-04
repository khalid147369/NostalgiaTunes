import type { Category, Song } from '@/types'

export interface User {
  id: string
  username: string
  email: string
  descreption: string
  categoryName: string
  totalLikes: number
  totalSongsSaved:number
  totalComments:number
  fotoPerfil?:String
  role: 'Admin' | 'Moderator' | 'Member'
  status: 'active' | 'suspended'
  initials: string
}



export const playsOverTime = [
  { month: 'Jan', plays: 420_000, likes: 32_000 },
  { month: 'Feb', plays: 512_000, likes: 41_000 },
  { month: 'Mar', plays: 468_000, likes: 38_500 },
  { month: 'Apr', plays: 640_000, likes: 52_000 },
  { month: 'May', plays: 720_000, likes: 61_400 },
  { month: 'Jun', plays: 812_000, likes: 70_100 },
  { month: 'Jul', plays: 934_000, likes: 84_600 },
]

export const categoryPlays = [
  { name: 'Adventure', plays: 2_870_000 },
  { name: 'Action', plays: 2_310_000 },
  { name: 'Magical', plays: 1_640_000 },
  { name: 'Slice of Life', plays: 1_210_000 },
  { name: 'Sports', plays: 980_000 },
  { name: 'Mystery', plays: 720_000 },
]


export const categories: Category[] = [
  {
    id: 'c1',
    slug: 'spacetoon',
    name: 'Spacetoon',
    tagline: 'The planets of your childhood',
    cover: '/covers/spacetoon.jpg',
    accent: 'purple',
    songCount: 128,
  },
  {
    id: 'c2',
    slug: 'cartoon-network',
    name: 'Cartoon Network',
    tagline: 'After-school legends',
    cover: '/covers/cartoonNetwork.webp',
    accent: 'cyan',
    songCount: 96,
  },
  {
    id: 'c3',
    slug: 'mbc3',
    name: 'MBC3',
    tagline: 'Where dreams had a theme song',
    cover: '/covers/MBC3_removedBackround.png',
    accent: 'purple',
    songCount: 74,
  },
  {
    id: 'c5',
    slug: 'spacepower',
    name: 'Space Power',
    tagline: 'Slime-orange nostalgia',
    cover: '/covers/spacePower.jpeg',
    accent: 'purple',
    songCount: 58,
  },
  {
    id: 'c6',
    slug: 'anime',
    name: 'Anime',
    tagline: 'Openings that gave you chills',
    cover: '/covers/anime.webp',
    accent: 'cyan',
    songCount: 214,
  },
  {
    id: 'c7',
    slug: 'another-channels',
    name: 'Another Channels',
    tagline: 'The ones that started it all',
    cover: '/covers/detective.png',
    accent: 'purple',
    songCount: 89,
  },
]

export const songs: Song[] = [
  {
    id: 's1',
    title: 'Cha-La Head-Cha-La',
    cartoon: 'Dragon Warriors',
    category: 'anime',
    cover: '/covers/featured.png',
    duration: 228,
    year: 1999,
    listens: 1284932,
    likes: 98432,
    description:
      'The anthem that made an entire generation believe they could go beyond their limits. One listen and you are ten years old again, fists clenched, ready to save the world before dinner.',
    isNew: false,
    status:'archived'
  },
  {
    id: 's2',
    title: 'Gotta Catch the Feeling',
    cartoon: 'Pocket Monsters',
    category: 'anime',
    cover: '/covers/electric.png',
    duration: 174,
    year: 1998,
    listens: 2043221,
    likes: 154002,
    description:
      'An unstoppable sing-along that turned every car ride into an adventure across tall grass and small towns.',
    isNew: true,
    status: 'published'
  },
  {
    id: 's3',
    title: 'Digital Horizon',
    cartoon: 'Digital Monsters',
    category: 'anime',
    cover: '/covers/digital.png',
    duration: 201,
    year: 2000,
    listens: 872331,
    likes: 71204,
    description:
      'A soaring opening about courage, friendship and being chosen. The synths still give goosebumps.',
    isNew: true,
    status: 'draft',
  },
  {
    id: 's4',
    title: 'City of Clues',
    cartoon: 'The Great Detective',
    category: 'another-channels',
    cover: '/covers/detective.png',
    duration: 246,
    year: 1997,
    listens: 543120,
    likes: 41022,
    description:
      'A moody, jazzy theme wrapped in neon rain. Mystery never sounded this cool.',
      status: 'published'
  },
  {
    id: 's5',
    title: 'Field of Dreams',
    cartoon: 'Champions XI',
    category: 'spacepower',
    cover: '/covers/soccer.png',
    duration: 189,
    year: 2001,
    listens: 665989,
    likes: 52890,
    description:
      'Every kid who ever chased a ball at sunset heard this song playing in their head.',
    isNew: true,
    status: 'published'
  },
  {
    id: 's6',
    title: 'Galaxy Express',
    cartoon: 'Star Voyagers',
    category: 'spacetoon',
    cover: '/covers/space.png',
    duration: 212,
    year: 1999,
    listens: 431204,
    likes: 33019,
    description:
      'A cosmic lullaby that carried you between worlds on Saturday mornings.',
      status: 'published'
  },
  {
    id: 's7',
    title: 'Steel Heart',
    cartoon: 'Mecha Guardian',
    category: 'cartoon-network',
    cover: '/covers/robot.png',
    duration: 233,
    year: 2002,
    listens: 389442,
    likes: 29711,
    description:
      'Thunder, chrome and courage. The theme for every giant robot that protected our imagination.',
      status: 'published'
  },
  {
    id: 's8',
    title: 'Starlight Ribbon',
    cartoon: 'Magic Guardian',
    category: 'mbc3',
    cover: '/covers/magic.png',
    duration: 197,
    year: 2000,
    listens: 712045,
    likes: 61233,
    description:
      'Sparkles, transformations and a melody that made ordinary afternoons feel enchanted.',
    isNew: true,
    status: 'published'
  },
  {
    id: 's9',
    title: 'Neighborhood Bell',
    cartoon: 'Blue Robot Cat',
    category: 'mbc3',
    cover: '/covers/blue-cat.png',
    duration: 165,
    year: 1998,
    listens: 998120,
    likes: 84500,
    description:
      'The gentle, hopeful theme about a friend from the future and a pocket full of wonders.',
      status: 'published'
  },
]




export const featuredSong: Song = songs[0]

export const trendingSongs: Song[] = [
  songs[1],
  songs[2],
  songs[4],
  songs[7],
  songs[8],
  songs[3],
]
export const profile = {
  username: "retro_kid_98",
  displayName: "Retro Kid",
  bio: "I grew up watching classic cartoons. Every opening theme is a time machine back to Saturday mornings.",
  avatar: "/covers/image.png",
}
export const comments = [
  {
    id: "c1",
    song: "Rising Spirit",
    text: "This opening still gives me chills. Instant time travel to 1998.",
    date: "3 days ago",
    initials: 'RR',
    author: 'retro_rewinder',
    status: 'pending',
  },
  {
    id: "c2",
    song: "Moonlight Case",
    text: "The saxophone in this intro is pure nostalgia. Nobody does it like this anymore.",
    date: "1 week ago",
    initials: 'BO',
    author: 'retro_rewinder',
    status: 'pending',
  },
  {
    id: "c3",
    song: "Neighborhood Bell",
    text: "My whole childhood in 90 seconds. I still know every word.",
    date: "2 weeks ago",
    initials: 'BR',
    author: 'retro_rewinder',
    status: 'pending',
  },
]

export const favoriteSongs = [
  {
    id: "fs1",
    title: "Rising Spirit",
    category: "Anime",
    cover: "/covers/blue-cat.png",
    plays: "2M",
    likes: "154K",
  },
  {
    id: "fs2",
    title: "Moonlight Case",
    category: "Spacetoon",
    cover: "/covers/detective.png",
    plays: "998.1K",
    likes: "88.4K",
  },
  {
    id: "fs3",
    title: "Starlight Ribbon",
    category: "Anime",
    cover: "/covers/electric.png",
    plays: "712K",
    likes: "61.2K",
  },
  {
    id: "fs4",
    title: "Digital Horizon",
    category: "Jetix",
    cover: "/covers/digital.png",
    plays: "872.3K",
    likes: "71.2K",
  },
  {
    id: "fs5",
    title: "Gotta Catch the Feeling",
    category: "Cartoon Network",
    cover: "/covers/magic.png",
    plays: "2M",
    likes: "154K",
  },
  {
    id: "fs6",
    title: "Neighborhood Bell",
    category: "Classic Cartoons",
    cover: "/covers/robot.png",
    plays: "998.1K",
    likes: "61.2K",
  },
]
export const activity = [
  {
    id: "a1",
    when: "Yesterday",
    action: "Played",
    subject: "Dragon Warriors Opening",
    type: "play" as const,
  },
  {
    id: "a2",
    when: "2 days ago",
    action: "Liked",
    subject: "Night Detective Opening",
    type: "like" as const,
  },
  {
    id: "a3",
    when: "Last week",
    action: "Saved",
    subject: "Pocket Monsters Theme",
    type: "save" as const,
  },
  {
    id: "a4",
    when: "Last week",
    action: "Commented on",
    subject: "Starlight Ribbon",
    type: "comment" as const,
  },
]
export const recentlyPlayed = [
  {
    id: "rp1",
    title: "Rising Spirit",
    show: "Dragon Warriors",
    cover: "/covers/blue-cat.png",
  },
  {
    id: "rp2",
    title: "Moonlight Case",
    show: "Night Detective",
    cover: "/covers/detective.png",
  },
  {
    id: "rp3",
    title: "Gotta Catch the Feeling",
    show: "Pocket Monsters",
    cover: "/covers/electric.png",
  },
  {
    id: "rp4",
    title: "Digital Horizon",
    show: "Digital Monsters",
    cover: "/covers/digital.png",
  },
  {
    id: "rp5",
    title: "Starlight Ribbon",
    show: "Magic Guardian",
    cover: "/covers/magic.png",
  },
  {
    id: "rp6",
    title: "Neighborhood Bell",
    show: "Blue Robot Cat",
    cover: "/covers/robot.png",
  },
]
export const recentlyAddedSongs: Song[] = songs.filter((s) => s.isNew)

export const mostListenedSongs: Song[] = [...songs]
  .sort((a, b) => b.listens - a.listens)
  .slice(0, 6)
export const categoriesNames: String[] = [...categories]
  .map((a) => a.name)
  

export const continueListeningSong = songs[5]

export function formatNumber(value: number): string {
  if (value >= 1_000_000) {
    const v = value / 1_000_000
    return `${v % 1 === 0 ? v.toFixed(0) : v.toFixed(1)}M`
  }
  if (value >= 1_000) {
    const v = value / 1_000
    return `${v % 1 === 0 ? v.toFixed(0) : v.toFixed(1)}K`
  }
  return value?.toString()
}

export type SongStatus = 'published' | 'draft' | 'archived'
