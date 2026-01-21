import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useFundraisers() {
  return useQuery({
    queryKey: [api.fundraisers.list.path],
    queryFn: async () => {
      const res = await fetch(api.fundraisers.list.path);
      if (!res.ok) throw new Error("Failed to fetch fundraisers");
      return api.fundraisers.list.responses[200].parse(await res.json());
    },
  });
}

export function useFundraiser(id: number) {
  return useQuery({
    queryKey: [api.fundraisers.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.fundraisers.get.path, { id });
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch fundraiser");
      return api.fundraisers.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}
