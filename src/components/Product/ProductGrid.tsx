import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
  view?: "grid" | "list";
}

export default function ProductGrid({
  products,
  view = "grid",
}: ProductGridProps) {
  if (!products.length) {
    return (
      <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-gray-200 bg-white">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-800">
            No Products Found
          </h3>
          <p className="mt-2 text-gray-500">
            Try changing your filters or browse another category.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
    className={
      view === "grid"
        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        : "grid grid-cols-1 gap-6"
    }
  >
    {products.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
      />
    ))}
  </div>
  );
}