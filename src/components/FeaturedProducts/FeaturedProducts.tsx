"use client";

import { useMemo, useState } from "react";

import ProductSlider from "./ProductSlider";
import { Product } from "@/types/product";
import { HomepageFeaturedCategory } from "@/types/homepage";

interface FeaturedProductsProps {
  categories: {
    category: {
      id: number;
      name: string;
      slug: string;
    };
    products: Product[];
  }[];
}


export interface FeaturedProductCategory {
  id: number;
  name: string;
  slug: string;
}


export default function FeaturedProducts({
  categories,
}: FeaturedProductsProps) {
  const [activeTab, setActiveTab] = useState(
  categories[0]?.category.slug ?? ""
);

const activeCategory = categories.find(
  (item) =>
    item.category.slug === activeTab
);
const [swiper, setSwiper] = useState<any>(null);

  

  if (!categories.length) {
    return null;
  }


  return (
    
    <section className="featured-products py-16">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex justify-between items-start mb-8">
          <div>

            <h2 className="text-5xl font-bold text-black mb-4">
              Featured Products
            </h2>

            <div className="tabs flex flex-wrap items-center gap-4">
               {categories.map((item) => (
                <button
                   key={item.category.id}
                  onClick={() => setActiveTab(item.category.slug)}
                  className={`rounded-full px-6 py-2 capitalize ${
                    activeTab === item.category.slug
                      ? "bg-black text-white"
                      : "bg-gray-200"
                  }`}
                >
                   {item.category.name}
                </button>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => swiper?.slidePrev()}
                className="carousel-prev w-12 h-12 bg-black text-white rounded-lg"
              >
                <i className="fas fa-arrow-left"></i>
              </button>

              <button
                onClick={() => swiper?.slideNext()}
                className="carousel-next w-12 h-12 bg-black text-white rounded-lg"
              >
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>

          </div>
        </div>

        
        <ProductSlider
          products={activeCategory?.products ?? []}  setSwiper={setSwiper} 
        />

      </div>
    </section>
  );
}