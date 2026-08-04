import { useQuery } from "@tanstack/react-query";
import { SongService } from "@/services/song.service";

export function useSongs() {
  return useQuery({
    queryKey: ["songs"],

    queryFn: () => SongService.getAll(),
  });
}
