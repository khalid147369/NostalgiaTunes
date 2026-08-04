import { useMutation} from "@tanstack/react-query";
import { ListenService } from "@/services/listen.service";



export function useListen() {
  return useMutation({
    mutationFn: (id: number) => ListenService.create(id),
  });
}
