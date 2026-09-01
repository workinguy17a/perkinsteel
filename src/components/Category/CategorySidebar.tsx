"use client";

import Link from "next/link";

import { Category } from "@/types/category";

interface CategorySidebarProps {
  categories: Category[];
  activeSlug: string;
  minPrice: number;
  maxPrice: number;
  selectedPrice: number;

  onPriceChange: (value: number) => void;

  currency: string;
}

export default function CategorySidebar({
  categories,
  activeSlug,
  minPrice,
  maxPrice,
  selectedPrice,
  onPriceChange,
  currency,
}: CategorySidebarProps) {

const activeCategory = categories.find(
  (category) => category.slug === activeSlug
);

const childCategories = activeCategory?.children ?? [];


  return (
    <aside className="space-y-6">

      {/* Product Categories */}

      <div className="rounded-xl border border-gray-200 bg-white p-5">

        <h3 className="mb-4 border-b pb-3 text-lg font-semibold">
          Product Categories
        </h3>

        <ul className="space-y-3">

          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/category/${category.slug}`}
                className={`flex items-center justify-between text-sm transition hover:text-red-600 ${
                  activeSlug === category.slug
                    ? "font-semibold text-red-600"
                    : ""
                }`}
              >
                <span>{category.name}</span>

                <span>›</span>
              </Link>
            </li>
          ))}

        </ul>

      </div>

      {/* Children Collections */}

      {childCategories.length > 0 && (
      <div className="rounded-xl border border-gray-200 bg-white p-5">

        <h3 className="mb-4 border-b pb-3 text-lg font-semibold">
          {activeCategory?.name} Collections
        </h3>

        <ul className="space-y-3">
          {childCategories.map((category) => (

              <li key={category.id}>
                <Link
                  href={`/category/${category.slug}`}
                  className="flex items-center justify-between text-sm hover:text-red-600"
                >
                  <span>{category.name}</span>

                  <span>›</span>
                </Link>
              </li>

            ))}

          </ul>

        </div>
      )}

      {/* Price Filter */}

      <div className="rounded-xl border border-gray-200 bg-white p-5">

        <h3 className="mb-5 border-b pb-3 text-lg font-semibold">
          Price Filter
        </h3>

        <div className="mb-3 flex justify-between text-sm">
          <span>
            {currency}
            {minPrice}
          </span>

          <span>
            {currency}
            {selectedPrice}
          </span>
        </div>

        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={selectedPrice}
          onChange={(e) =>
            onPriceChange(Number(e.target.value))
          }
          className="w-full accent-red-600"
        />


      </div>

    </aside>
  );
}