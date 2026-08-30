import { useMutation } from "@tanstack/react-query";
import { CategoryService } from "@/services/category.service";

export function usegetMostListenedByCategory() {
  return useMutation({
    mutationFn: ({
      size,
      category,
      page = 0,
    }: {
      size?: number;
      category?: number;
      page?: number;
    }) => CategoryService.getMostListenedByCategory(size, category, page),
  });
}
