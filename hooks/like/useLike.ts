import { useMutation, useQuery } from "@tanstack/react-query";
import { LikeService } from "@/services/like.service";



export function useLike() {
  return useMutation({
    mutationFn: (id: number) => LikeService.create(id),
  });
}
