import { api } from "./api";

export const LikeService = {

  create(id: number) {
    return api.post(`/likes/${id}`);
  },

  delete(id: number) {
    return api.delete(`/likes/${id}`);
  },

};
