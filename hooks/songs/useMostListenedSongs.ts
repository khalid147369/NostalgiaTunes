import { useMutation, useQuery } from "@tanstack/react-query";
import { SongService } from "@/services/song.service";

export function useMostListended() {
  return useQuery({
    queryKey: ["songs", "trending"],

    queryFn: () => SongService.getMostListened(),
  });
}

export function useMostListendedPages() {
  return useMutation({
    mutationFn: ({ size = 7, page = 0 }: { size?: number; page?: number } = {}) =>
      SongService.getMostListened(size, page),
  });
}
