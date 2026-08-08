import {  useQuery} from "@tanstack/react-query";
import { LikeService } from "@/services/like.service";



export function useLastLikedSong() {
  return useQuery({
     queryKey: ["LastSongLiked"],
    queryFn: () => LikeService.getLastLiked()
  });
}
