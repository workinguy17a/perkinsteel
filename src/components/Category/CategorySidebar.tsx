"use client";
import Link from "next/link";

const productCategories = [
  "Knives",
  "Kitchenware",
  "Linen & Towels",
  "Uniforms",
  "Janitorials",
];

const kitchenwareCollections = [
  "Bakeware",
  "Cutlery",
  "Drinkware",
  "Food Storage",
  "Kitchen Essentials",
  "Porcelain",
  "Table Service",
];



export default function CategorySidebar() {
  return (
    <aside className="space-y-6">

      {/* Product Categories */}

      <div className="rounded-xl border border-gray-200 bg-white p-5">

        <h3 className="mb-4 border-b pb-3 text-lg font-semibold">
          Product Categories
        </h3>

        <ul className="space-y-3">

          {productCategories.map((category) => (
            <li key={category}>
              <Link
                href="#"
                className="flex items-center justify-between text-sm hover:text-red-600"
              >
                <span>{category}</span>

                <span>›</span>
              </Link>
            </li>
          ))}

        </ul>

      </div>

      {/* Kitchenware Collections */}

      <div className="rounded-xl border border-gray-200 bg-white p-5">

        <h3 className="mb-4 border-b pb-3 text-lg font-semibold">
          Kitchenware Collections
        </h3>

        <ul className="space-y-3">

          {kitchenwareCollections.map((collection) => (
            <li key={collection}>
              <Link
                href="#"
                className="flex items-center justify-between text-sm hover:text-red-600"
              >
                <span>{collection}</span>

                <span>›</span>
              </Link>
            </li>
          ))}

        </ul>

      </div>

      {/* Price Filter */}

      <div className="rounded-xl border border-gray-200 bg-white p-5">

        <h3 className="mb-5 border-b pb-3 text-lg font-semibold">
          Price Filter
        </h3>

        <div className="flex justify-between text-sm mb-3">
          <span>AED 0</span>
          <span>AED 500+</span>
        </div>

        <input
          type="range"
          min="0"
          max="500"
          defaultValue="150"
          className="w-full accent-red-600"
        />

        <button className="mt-5 w-full rounded-lg bg-red-700 py-2 text-white hover:bg-red-800 transition">
          Filter
        </button>

      </div>

    </aside>
  );
}