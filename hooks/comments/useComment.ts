import { useMutation } from "@tanstack/react-query";
import { CommentService } from "@/services/comment.service";

export function useGetComments() {
  return useMutation({
    mutationFn: (id: number) => CommentService.getAll(id),
  });
}
