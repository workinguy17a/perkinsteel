"use client";
import { useMemo, useState } from "react";

import CategorySidebar from "./CategorySidebar";

import ProductGrid from "@/components/Product/ProductGrid";
import ProductToolbar from "@/components/Product/ProductToolbar";

import Pagination from "@/components/Common/Pagination";
import { Product } from "@/types/product";
import { Category } from "@/types/category";

//import products from "@/data/products";
interface Props {
  products: Product[];
  category: Category;
  categories: Category[];
}



export default function CategoryContent({
    products,
    category,
  categories,
}: Props)  {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 24;
  const minPrice = Math.min(...products.map((p) => p.price));
const maxPrice = Math.max(...products.map((p) => p.price));

const [selectedPrice, setSelectedPrice] = useState(maxPrice);

const filteredProducts = useMemo(() => {
  return products.filter(
    (product) => product.price <= selectedPrice
  );
}, [products, selectedPrice]);

const sortedProducts = useMemo(() => {
  const sorted = [...filteredProducts];

  switch (sortBy) {
    case "price-low-high":
      sorted.sort((a, b) => a.price - b.price);
      break;

    case "price-high-low":
      sorted.sort((a, b) => b.price - a.price);
      break;

    case "name-asc":
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case "name-desc":
      sorted.sort((a, b) => b.name.localeCompare(a.name));
      break;

    default:
      break;
  }

  return sorted;
}, [filteredProducts, sortBy]);

// Total Pages
  const totalPages = Math.ceil(
    sortedProducts.length / productsPerPage
  );

  // Current Page Products
  const paginatedProducts = useMemo(() => {
  const start = (currentPage - 1) * productsPerPage;

  return sortedProducts.slice(
    start,
    start + productsPerPage
  );
}, [sortedProducts, currentPage]);
console.log(products.map(p => p.price));
  return (
    <section className="cat-pro-section w-full">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex flex-wrap -mx-0.5">
            <div className="w-full lg:w-3/12 px-0.5">
                <aside className="col-span-3">
                    <CategorySidebar
                      categories={categories}
                      activeSlug={category.slug}
                      minPrice={minPrice}
                      maxPrice={maxPrice}
                      selectedPrice={selectedPrice}
                      onPriceChange={setSelectedPrice}
                      currency={products[0]?.currency ?? "£"}
                    />
                </aside>
            </div>

          {/* Products */}
          <div className="w-full lg:w-9/12 px-0.5">
            <div className="pro-list">
                <ProductToolbar
                  totalProducts={sortedProducts.length}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                />
              <ProductGrid
                products={paginatedProducts}
                view={view}
              />

              <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}