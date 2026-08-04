import { useQuery } from "@tanstack/react-query";
import { SongService } from "@/services/song.service";

export function useMostListended() {
  return useQuery({
    queryKey: ["songs", "trending"],

    queryFn: () => SongService.getMostListened(),
  });
}
