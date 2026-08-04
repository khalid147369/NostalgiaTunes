import { SongFilters } from "@/types";
import { api } from "./api";

export const SongService = {

  getAll() {
    return api.get("/songs/getAll");
  },

  getTrending(category?:number) {
    return api.get(`/songs/trending${category? `?category=${category}`:""}`);
  },

  getRecentlyAdded() {
    return api.get("/songs/getAll?isNew=true");
  },

    getRecentlyPlayed() {
    return api.get("/users/recentlyPlayedSongs");
  },

  getMostListened() {
    return api.get("/songs/getAll?sort=listens,desc&size=7");
  },

  filterSongs(column:SongFilters=SongFilters.title,direction:string='desc',size:number=10) {
    return api.get(`/songs/getAll?sort=${column},${direction}&size=${size}`);
  },
  getById(id:number){
    return api.get(`/songs/getSingle/${id}`);
  },

  create(song:any){
    return api.post("/songs",song);
  },

  update(id:number,song:any){
    return api.put(`/songs/${id}`,song);
  },

  delete(id:number){
    return api.delete(`/songs/${id}`);
  }

}