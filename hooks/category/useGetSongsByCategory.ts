import { useMutation } from "@tanstack/react-query";
import { CategoryService } from "@/services/category.service";

export function usegetSongsByCategory() {
  return useMutation({
    mutationFn: ({
      size,
      category,
      page = 0,
    }: {
      size?: number;
      category?: number;
      page?: number;
    }) => CategoryService.getSongsByCategory(size, category, page),
  });
}
