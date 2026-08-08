import { useMutation } from "@tanstack/react-query";
import { CommentService } from "@/services/comment.service";

export function useSendComment() {
  return useMutation({
    mutationFn: ({ id, text }: { id: number; text: { text: string } }) =>
      CommentService.create(id, text),
  });
}
