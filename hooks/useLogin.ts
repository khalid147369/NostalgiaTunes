import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthService } from "@/services/auth.service";
import { AuthDTO } from "@/types";

export function useLogin() {
  return useMutation({
    mutationFn: (user: AuthDTO) => AuthService.login(user),
  });
}
