import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthService } from "@/services/auth.service";
import { UserReqDto } from "@/types";

export function useUpdateUser() {
  return useMutation({
    mutationFn: (user: UserReqDto | FormData) => AuthService.update(user),
  });
}
