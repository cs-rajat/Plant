import { useQuery } from "@tanstack/react-query";



export function useFeaturedFoods() {
  return useQuery({
    queryKey: ["featuredFoods"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/foods/featured`);
      if (!res.ok) throw new Error("Failed to fetch featured foods");
      return res.json();
    },
    staleTime: 1000 * 60 * 2,
  });
}
