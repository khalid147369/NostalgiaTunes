import { useMutation, useQuery } from "@tanstack/react-query";
import { SongService } from "@/services/song.service";

export function useRecently() {
  return useMutation({

    mutationFn: ({ size, page = 0 }: { size?: number; page?: number } = {}) =>
      SongService.getRecentlyAdded(size, page),
  });
}
