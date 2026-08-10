import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthService } from "@/services/auth.service";
import { AuthDTO } from "@/types";

type RegisterPayload = AuthDTO | FormData;

export function useRegister() {
  return useMutation({
    mutationFn: (user: RegisterPayload) => AuthService.register(user),
  });
}
