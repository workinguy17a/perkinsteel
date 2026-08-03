"use client";

interface ProductToolbarProps {
  totalProducts: number;
  view?: "grid" | "list";
  sortBy?: string;
  onViewChange?: (view: "grid" | "list") => void;
  onSortChange?: (sort: string) => void;
}

export default function ProductToolbar({
  totalProducts,
  view = "grid",
  sortBy = "latest",
  onViewChange,
  onSortChange,
}: ProductToolbarProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 md:flex-row md:items-center md:justify-between">

      {/* Product Count */}
      <p className="text-sm text-gray-600">
        Showing{" "}
        <span className="font-semibold text-gray-900">
          {totalProducts}
        </span>{" "}
        Products
      </p>

      <div className="flex flex-wrap items-center gap-4">

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => onSortChange?.(e.target.value)}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm focus:border-orange-500 focus:outline-none"
        >
          <option value="latest">Latest</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="name-asc">Name: A - Z</option>
          <option value="name-desc">Name: Z - A</option>
        </select>
      </div>
    </div>
  );
}