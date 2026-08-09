import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SongService } from "@/services/song.service";

export function useDeleteSong() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => SongService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["songs"] });
    },
  });
}
