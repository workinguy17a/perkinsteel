"use client";

import { useState } from "react";

import ProductSlider from "./ProductSlider";
import { Product } from "@/types/product";

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

export default function FeaturedProducts({
  categories,
}: FeaturedProductsProps) {
  const [activeTab, setActiveTab] = useState(
    categories[0]?.category.slug ?? ""
  );

  const [swiper, setSwiper] = useState<any>(null);

  if (!categories.length) {
    return null;
  }

  const activeCategory = categories.find(
    (item) => item.category.slug === activeTab
  );

  return (
    <section className="featured-products reveal fade-up">
      <div className="max-w-7xl mx-auto px-4">

        <div className="featured-products-head">

          <div className="featured-products-heading">

            <span className="featured-eyebrow">
              Explore Our Collection
            </span>

            <h2>
              Featured Products
            </h2>

          </div>

          <div className="featured-controls">

            <button
              type="button"
              onClick={() => swiper?.slidePrev()}
              className="carousel-prev"
              aria-label="Previous products"
            >
              <i className="fas fa-arrow-left"></i>
            </button>

            <button
              type="button"
              onClick={() => swiper?.slideNext()}
              className="carousel-next"
              aria-label="Next products"
            >
              <i className="fas fa-arrow-right"></i>
            </button>

          </div>

        </div>


        <div className="featured-tabs-wrap">

          <div className="tabs">

            {categories.map((item) => {

              const isActive =
                activeTab === item.category.slug;

              return (
                <button
                  key={item.category.id}
                  type="button"
                  onClick={() =>
                    setActiveTab(item.category.slug)
                  }
                  className={`featured-tab ${
                    isActive ? "activecat" : ""
                  }`}
                >
                  {item.category.name}
                </button>
              );
            })}

          </div>

        </div>


        <div
          key={activeTab}
          className="featured-slider-content"
        >
          <ProductSlider
            products={activeCategory?.products ?? []}
            setSwiper={setSwiper}
          />
        </div>

      </div>
    </section>
  );
}