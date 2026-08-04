import { useQuery } from "@tanstack/react-query";
import { PanelService } from "@/services/panel.service";

export function useGetAllUsers() {
  return useQuery({
    queryKey: ["users"],

    queryFn: () => PanelService.getAllUsers(),
  });
}
