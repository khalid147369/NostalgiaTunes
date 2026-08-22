import { useMutation } from "@tanstack/react-query";
import { SongService } from "@/services/song.service";

export function useRecentlyPlayedPages() {
  return useMutation({
    mutationFn: ({ size = 6, page = 0 }: { size?: number; page?: number } = {}) =>
      SongService.getRecentlyPlayed(size, page),
  });
}
