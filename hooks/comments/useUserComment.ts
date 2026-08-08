import { useQuery } from "@tanstack/react-query";
import { CommentService } from "@/services/comment.service";

export function useGetUserComments() {
  return useQuery({
    queryKey: ["userComments"],
    queryFn: () => CommentService.getUserComments(),
  });
}


