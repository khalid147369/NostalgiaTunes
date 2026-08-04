import { api } from "./api";

export const ListenService = {

  create(id: number) {
    return api.post(`/listens/${id}`);
  },



};
