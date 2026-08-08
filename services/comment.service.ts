import { api } from "./api";

export const CommentService = {
  getAll(id: number) {
    return api.get(`/comments/${id}`);
  },

    getUserComments() {
    return api.get(`/comments/userComments`);
  },

  create(id: number, text: { text: string }) {
    return api.post(`/comments/${id}`, text);
  },

  update(id: number, text: string) {
    return api.put(`/comments/${id}`, text);
  },

  delete(id: number) {
    return api.delete(`/comments/${id}`);
  },
};
