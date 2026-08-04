import { useQuery } from "@tanstack/react-query";
import { MetricService } from "@/services/metric.service";

export function useCounts() {
  return useQuery({
    queryKey: ["counts"],

    queryFn: () => MetricService.getAll(),
  });
}
