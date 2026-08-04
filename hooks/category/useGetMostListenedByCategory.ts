import { useMutation } from "@tanstack/react-query";
import { CategoryService } from "@/services/category.service";

export function usegetMostListenedByCategory() {
  return useMutation({
    mutationFn: ({size,category}:{size?:number,category?:number}) => CategoryService.getMostListenedByCategory(size,category),
  });
}