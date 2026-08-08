import { useMutation, useQuery } from "@tanstack/react-query";
import { SongService } from "@/services/song.service";

export function useRecently() {
  return useMutation({

    mutationFn: (size: number | undefined) => SongService.getRecentlyAdded(size),
  });
}
