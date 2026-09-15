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
const childIds = new Set(
  categories.flatMap((category) =>
    (category.children ?? []).map((child) => child.id)
  )
);

const parentCategories = categories.filter(
  (category) => !childIds.has(category.id)
);

  return (
    <aside className="category-filter">

      <div className="filter-block">

          <h3>
              Product Categories
          </h3>

          <ul>
              {parentCategories.map((category) => (
                  <li key={category.id}>
                      <Link
                          href={`/category/${category.slug}`}
                          className={
                              activeSlug === category.slug
                                  ? "active"
                                  : ""
                          }
                      >
                          <span>
                              {category.name}
                          </span>

                          <i className="fa-solid fa-angle-right"></i>
                      </Link>
                  </li>
              ))}
          </ul>

      </div>


      {childCategories.length > 0 && (
          <div className="filter-block">

              <h3>
                  {activeCategory?.name} Collections
              </h3>

              <ul>
                  {childCategories.map((category) => (
                      <li key={category.id}>
                          <Link
                              href={`/category/${category.slug}`}
                          >
                              <span>
                                  {category.name}
                              </span>

                              <i className="fa-solid fa-angle-right"></i>
                          </Link>
                      </li>
                  ))}
              </ul>

          </div>
      )}


      <div className="filter-block price-filter">

          <h3>
              Price Filter
          </h3>

          <div className="price-values">

              <span>
                  {currency}{minPrice}
              </span>

              <span>
                  {currency}{selectedPrice}
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
          />

      </div>

  </aside>
  );
}