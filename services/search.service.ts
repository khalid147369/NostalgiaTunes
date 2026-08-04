import { SearchDTO, SongFilters } from "@/types";
import { api } from "./api";

export const SearchService = {
  searchByTitleAndCartoon(search: SearchDTO) {
    return api.get(
      `/songs/search?text=${search.text}${search.category ? "&category=" + search.category : ""}`,
    );
  },
};
