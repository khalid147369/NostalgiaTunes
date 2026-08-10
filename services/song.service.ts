import { Song, SongFilters } from "@/types";
import { api } from "./api";

export const SongService = {
  getAll() {
    return api.get("/songs/getAll");
  },

  getTrending(category?: number, size: number = 10, page: number = 0) {
    return api.get(
      `/songs/trending?size=${size}&page=${page}${category ? `&category=${category}` : ""}`,
    );
  },

  getRecentlyAdded(size = 10, page = 0) {
    return api.get(`/songs/getAll?isNew=true&size=${size}&page=${page}`);
  },

  getRecentlyPlayed() {
    return api.get("/users/recentlyPlayedSongs");
  },

  getMostListened(size = 7, page = 0) {
    return api.get(
      `/songs/getAll?sort=numEscuchas,desc&size=${size}&page=${page}`,
    );
  },

  filterSongs(
    column: SongFilters = SongFilters.title,
    direction: string = "desc",
    size: number = 10,
    FilterValue: string = "",
  ) {
    return api.get(`/songs/getAll?${column}=${FilterValue}&size=${size}`);
  },
  getById(id: number) {
    return api.get(`/songs/getSingle/${id}`);
  },

  create(song: FormData) {
    return api.post<Song>("/songs", song);
  },

  update(id: number, song: any) {
    return api.put(`/songs/${id}`, song);
  },

  delete(id: number) {
    return api.delete(`/songs/${id}`);
  },
};
