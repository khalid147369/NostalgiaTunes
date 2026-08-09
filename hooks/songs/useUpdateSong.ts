import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SongService } from "@/services/song.service";

export function useUpdateSong() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, song }: { id: number; song: FormData }) =>
      SongService.update(id, song),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["songs"] });
    },
  });
}
