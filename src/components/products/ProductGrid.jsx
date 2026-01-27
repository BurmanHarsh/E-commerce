import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Package } from "lucide-react";

export function ProductGrid({ limit = 12, query, title }) {
  const { data: products, isLoading, error } = useProducts(limit, query);

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Failed to load products</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        {title && (
          <h2 className="font-display text-3xl md:text-4xl font-bold">
            {title}
          </h2>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: limit }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-[3/4] rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-5 w-1/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16">
        <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
        <h3 className="font-display text-xl font-semibold mb-2">
          No products found
        </h3>
        <p className="text-muted-foreground">
          Products will appear here once they're added to the store.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {title && (
        <h2 className="font-display text-3xl md:text-4xl font-bold">
          {title}
        </h2>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, index) => (
          <ProductCard
            key={product.node.id}
            product={product}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
