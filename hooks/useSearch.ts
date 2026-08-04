import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthService } from "@/services/auth.service";
import { SearchDTO } from "@/types";
import { SearchService } from "@/services/search.service";

export function usesearch() {
  return useMutation({
    mutationFn: (search:SearchDTO) => SearchService.searchByTitleAndCartoon(search),
  });
}
