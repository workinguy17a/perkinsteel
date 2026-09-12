"use client";

import { useState } from "react";

import ProductSlider from "@/components/FeaturedProducts/ProductSlider";
import { Product } from "@/types/product";

interface LatestProductsProps {
  products: Product[];
}

export default function NewArrivals({
  products,
}: LatestProductsProps) {
  const [swiper, setSwiper] = useState<any>(null);

  if (!products.length) {
    return null;
  }

  return (
    <section className="new-arrivals reveal fade-up">

      <div className="max-w-7xl mx-auto px-4">

        <div className="new-arrivals-head">

          <div className="new-arrivals-heading">

            <span className="new-arrivals-eyebrow">
              Just In
            </span>

            <h2>
              New Arrivals
            </h2>

          </div>

          <div className="new-arrivals-controls">

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

        <div className="new-arrivals-slider">
          <ProductSlider
            products={products}
            setSwiper={setSwiper}
          />
        </div>

      </div>

    </section>
  );
}