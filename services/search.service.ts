import { SearchDTO } from "@/types";
import { api } from "./api";

export const SearchService = {
  searchByTitleAndCartoon(search: SearchDTO, size = 10, page = 0) {
    const params = new URLSearchParams({
      text: search.text,
      size: String(size),
      page: String(page),
    });

    if (search.category) params.set("category", search.category);

    return api.get(`/songs/search?${params.toString()}`);
  },
};
