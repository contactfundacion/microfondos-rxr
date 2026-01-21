import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertDonation } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useMyDonations() {
  return useQuery({
    queryKey: [api.donations.listMy.path],
    queryFn: async () => {
      const res = await fetch(api.donations.listMy.path, { credentials: "include" });
      if (res.status === 401) return null;
      if (!res.ok) throw new Error("Failed to fetch donations");
      return api.donations.listMy.responses[200].parse(await res.json());
    },
  });
}

export function useCreateDonation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertDonation) => {
      const validated = api.donations.create.input.parse(data);
      const res = await fetch(api.donations.create.path, {
        method: api.donations.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 401) throw new Error("Must be logged in to donate");
        const error = await res.json();
        throw new Error(error.message || "Failed to create donation");
      }
      
      return api.donations.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.donations.listMy.path] });
      toast({
        title: "Proof Uploaded!",
        description: "Your donation receipt has been submitted for review.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
