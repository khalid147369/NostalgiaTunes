import { useMutation } from "@tanstack/react-query";
import { SongService } from "@/services/song.service";

export function useTrending() {
  return useMutation({
    mutationFn: ({
      category,
      size,
      page,
    }: { category?: number; size?: number; page?: number } = {}) =>
      SongService.getTrending(category, size, page),
  });
}
