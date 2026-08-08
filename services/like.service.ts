import { api } from "./api";

export const LikeService = {
  create(id: number) {
    return api.post(`/likes/${id}`);
  },

  getLastLiked() {
    return api.get(`/likes/lastLikedSong`);
  },
  getMostLikedSongs() {
    return api.get(`/likes/mostLikedSongs`);
  },

  delete(id: number) {
    return api.delete(`/likes/${id}`);
  },
};
