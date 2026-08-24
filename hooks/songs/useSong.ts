import { useQuery } from "@tanstack/react-query";
import { SongService } from "@/services/song.service";
import { SearchService } from "@/services/search.service";

export function useSongs(size: number = 10, page: number = 0, search = "") {
  return useQuery({
    queryKey: ["songs", "all", { size, page, search }],

    queryFn: () =>
      search
        ? SearchService.searchByTitleAndCartoon({ text: search }, size, page)
        : SongService.getAll(size, page),
  });
}
