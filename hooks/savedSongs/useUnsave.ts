import { useMutation } from "@tanstack/react-query";
import { SavedSongService } from "@/services/saved.song.service";

export function useUnsave() {
  return useMutation({
    mutationFn: (id: number) => SavedSongService.delete(id),
  });
}
