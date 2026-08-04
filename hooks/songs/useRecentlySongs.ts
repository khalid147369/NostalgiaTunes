import { useQuery } from "@tanstack/react-query";
import { SongService } from "@/services/song.service";

export function useRecently() {
  return useQuery({
    queryKey: ["songs", "recently"],

    queryFn: () => SongService.getRecentlyAdded(),
  });
}
