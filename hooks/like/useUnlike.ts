import { useMutation, useQuery } from "@tanstack/react-query";
import { LikeService } from "@/services/like.service";



export function useUnlike() {
  return useMutation({
    mutationFn: (id: number) => LikeService.delete(id),
  });
}
