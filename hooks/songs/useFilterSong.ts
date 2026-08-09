import { useMutation } from "@tanstack/react-query";
import { SongService } from "@/services/song.service";
import type { AxiosResponse } from "axios";
import { Song, SongFilters } from "@/types";

type FilterSongParams = {
  column?: SongFilters;
  direction?: string;
  size?: number;
  value?: string;
};
export function useFilterSong() {
  return useMutation({
    mutationFn: (params: FilterSongParams): Promise<AxiosResponse<Song[]>> =>
      SongService.filterSongs(
        params.column,
        params.direction,
        params.size,
        params.value,
      ),
  });
}
