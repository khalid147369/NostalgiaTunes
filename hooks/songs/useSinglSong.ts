import { useMutation } from "@tanstack/react-query";
import { SongService } from "@/services/song.service";
import type { AxiosResponse } from "axios";
import { Song } from "@/types";

export function useSinglSong() {
  return useMutation({
    mutationFn: (id: number): Promise<AxiosResponse<Song>> => SongService.getById(id),
  });
}
