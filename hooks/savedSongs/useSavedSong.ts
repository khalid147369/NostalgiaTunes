import { useQuery } from "@tanstack/react-query";
import { SavedSongService } from "@/services/saved.song.service";

export function useSavedSongs() {
  return useQuery({
    queryKey: ["songs"],

    queryFn: () => SavedSongService.getAll(),
  });
}
