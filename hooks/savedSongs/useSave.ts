import { useMutation } from "@tanstack/react-query";
import { SavedSongService } from "@/services/saved.song.service";

export function useSave() {
  return useMutation({
    mutationFn: (id: number) => SavedSongService.create(id),
  });
}
