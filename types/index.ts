export enum CategorySlug {
  Spacetoon = 1,
  Spacepower = 2,
  CartoonNetwork = 3,
  Anime = 4,
  AnotherChannels = 5,
  MBC3 = 6,
}

export interface CategoryDTO {
  id: string;
  nombre: string;
  descripcion: string;
  imageUrl: string;
  updatedAt: string;
  songCount: number;
}

export interface Category {
  id: string;
  slug: CategorySlug;
  name: string;
  tagline: string;
  cover: string;
  accent: "purple" | "cyan";
  songCount: number;
}

export type SongStatus = "published" | "draft" | "archived";

export interface Song {
  id: string;
  title: string;
  cartoon: string;
  category: CategorySlug;
  cover: string;
  duration: number;
  year: number;
  listens: number;
  likes: number;
  description: string;
  audioUrl: string;
  aboutStory: string;
  trivia: string;
  isNew: boolean;
  status: SongStatus;
  totalSaves: number;
  totalComments: number;
}

export enum SongFilters {
  id = "id",
  title = "titulo",
  cartoon = "cartoon",
  category = "category",
  cover = "imagen",
  duration = "duracion",
  year = "anoEmision",
  listens = "numEscuchas",
  likes = "numlikes",
  description = "descripcion",
  audioUrl = "url",
  isNew = "isNew",
  status = "estado",
  creater = "creador",
  fechaCreacion = "fechaCreacion",
  language = "language",
}

export enum Categoryies {
  id = "id",
  title = "titulo",
  cartoon = "cartoon",
  category = "category",
  cover = "imagen",
  duration = "duracion",
}

export interface AuthDTO {
  nombre?: string;
  email: string;
  password: string;
}

export interface SearchDTO {
  text: string;
  category?: string;
}

export interface UserDTO {
  id: number;
  nombre: string;
  email: string;
  role: "ADMIN" | "USER";
  descreption: string;
  categoryName: string;
  totalLikes: number;
  totalSongsSaved: number;
  totalComments: number;
  fotoPerfil?: String;
}

export interface UserReqDto {
  nombre: string;
  email: string;
  descreption: string;
  category: number;
  fotoPerfil?: File | string;
}

export interface Stats {
  totalSongs: number;
  totalUsers: number;
  totalPlays: number;
  totalLikes: number;
  totalCommets: number;
}

export interface Comment {
  avatar?: number;
  creator: string;
  date: string;
  id: number;
  songId?: number;
  songName?: string;
  text: string;
  userId?: string;
  likes?: number;
  initials?: string;
  state?: boolean;
}

export interface SongDto {
  title: string;
  cartoon: string;
  category: number;
  imageFile: File;
  audioFile: File;
}