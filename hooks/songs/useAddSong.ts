import { useMutation } from "@tanstack/react-query";
import { SongService } from "@/services/song.service";

export function useAddSong() {
  return useMutation({
    mutationFn: (song: FormData) => SongService.create(song),
  });
}
