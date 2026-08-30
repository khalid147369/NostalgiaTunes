import { api } from "./api";

export const CategoryService = {
  getAll() {
    return api.get("/categories/getAll");
  },

  getById(id: number) {
    return api.get(`/categories/getById/${id}`);
  },

  getMostListenedByCategory(
    size?: number,
    category?: number,
    page: number = 0,
  ) {
    return api.get(
      `/songs/getAll?category=${category}&sort=numEscuchas,desc&size=${size}&page=${page}`,
    );
  },

  getSongsByCategory(size?: number, category?: number, page: number = 0) {
    return api.get(
      `/songs/getAll?category=${category}&size=${size}&page=${page}`,
    );
  },

  create(category: any) {
    return api.post("/categories", category);
  },

  update(id: number, category: any) {
    return api.put(`/categories/${id}`, category);
  },

  delete(id: number) {
    return api.delete(`/categories/${id}`);
  },
};
