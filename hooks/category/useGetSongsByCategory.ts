import { useMutation } from "@tanstack/react-query";
import { CategoryService } from "@/services/category.service";

export function usegetSongsByCategory() {
  return useMutation({
    mutationFn: ({size,category}:{size?:number,category?:number}) => CategoryService.getSongsByCategory(size,category),
  });
}