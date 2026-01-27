import { useQuery } from "@tanstack/react-query";
import {
  fetchProducts,
  fetchProductByHandle,
} from "@/lib/shopify";

export function useProducts(first = 20, query) {
  return useQuery({
    queryKey: ["products", first, query],
    queryFn: () => fetchProducts(first, query),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useProduct(handle) {
  return useQuery({
    queryKey: ["product", handle],
    queryFn: () => fetchProductByHandle(handle),
    staleTime: 1000 * 60 * 5,
    enabled: !!handle,
  });
}
