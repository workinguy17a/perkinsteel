"use client";
import { useMemo, useState } from "react";

import CategorySidebar from "./CategorySidebar";

import ProductGrid from "@/components/Product/ProductGrid";
import ProductToolbar from "@/components/Product/ProductToolbar";

import Pagination from "@/components/Common/Pagination";

import products from "@/data/products";



export default function CategoryContent() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 3;

const sortedProducts = useMemo(() => {
  const sorted = [...products];

  switch (sortBy) {
    case "price-low-high":
      sorted.sort(
        (a, b) =>
          parseFloat(a.price.replace("$", "")) -
          parseFloat(b.price.replace("$", ""))
      );
      break;

    case "price-high-low":
      sorted.sort(
        (a, b) =>
          parseFloat(b.price.replace("$", "")) -
          parseFloat(a.price.replace("$", ""))
      );
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
}, [sortBy]);

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

  return (
    <section className="cat-pro-section w-full">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex flex-wrap -mx-0.5">
            <div className="w-full lg:w-4/12 px-0.5">
                <aside className="col-span-3">
                    <CategorySidebar />
                </aside>
            </div>

          {/* Products */}
          <div className="w-full lg:w-8/12 px-0.5">
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