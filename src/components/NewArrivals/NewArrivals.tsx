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
  return (
    <section className="featured-products py-16">

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-start mb-8">
            <div>
                <h2 className="text-5xl font-bold text-black mb-4">
                    New Arrivals
                </h2>
                {/* Arrows */}
                <div className="flex gap-3">
                    <button onClick={() => swiper?.slidePrev()} className="carousel-prev w-12 h-12 bg-black text-white rounded-lg">
                        <i className="fas fa-arrow-left"></i>
                    </button>
                    <button onClick={() => swiper?.slideNext()} className="carousel-next w-12 h-12 bg-black text-white rounded-lg">
                        <i className="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>

        <ProductSlider products={products} setSwiper={setSwiper}  />

      </div>

    </section>
  );
}