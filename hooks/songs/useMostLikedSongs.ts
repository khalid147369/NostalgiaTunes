import { useQuery } from "@tanstack/react-query";
import { LikeService } from "@/services/like.service";

export function useMostLikedSongs() {
  return useQuery({
    queryKey: ["MostLikedsongs"],

    queryFn: () => LikeService.getMostLikedSongs(),
  });
}
