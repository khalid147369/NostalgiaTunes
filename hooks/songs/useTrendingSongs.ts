import { useMutation } from "@tanstack/react-query";
import { SongService } from "@/services/song.service";

export function useTrending() {
  return useMutation({
    mutationFn: (category?:number) => SongService.getTrending(category),
  });
}
