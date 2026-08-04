import { useMutation } from "@tanstack/react-query";
import { CategoryService } from "@/services/category.service";

export function useGetCategoryById() {
  return useMutation({
    mutationFn: (id: number) => CategoryService.getById(id),
  });
}
