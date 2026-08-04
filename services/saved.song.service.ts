import { api } from "./api";

export const SavedSongService = {
  getAll() {
    return api.get("/savedSongs");
  },

  create(id: number) {
    return api.post(`/savedSongs/${id}`);
  },

  delete(id: number) {
    return api.delete(`/savedSongs/${id}`);
  },
};
