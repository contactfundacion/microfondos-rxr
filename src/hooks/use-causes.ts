import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useCauses() {
  return useQuery({
    queryKey: [api.causes.list.path],
    queryFn: async () => {
      const res = await fetch(api.causes.list.path);
      if (!res.ok) throw new Error("Failed to fetch causes");
      return api.causes.list.responses[200].parse(await res.json());
    },
  });
}

export function useCause(id: number) {
  return useQuery({
    queryKey: [api.causes.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.causes.get.path, { id });
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch cause");
      return api.causes.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}
