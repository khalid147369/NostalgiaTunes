import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthService } from "@/services/auth.service";
import { AuthDTO } from "@/types";

export function useRegister() {
  return useMutation({
    mutationFn: (user: AuthDTO) => AuthService.register(user),
  });
}
