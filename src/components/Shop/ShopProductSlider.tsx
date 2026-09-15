"use client";

import { useState } from "react";

import ProductSlider from "@/components/FeaturedProducts/ProductSlider";
import { Product } from "@/types/product";

interface Props {
  products: Product[];
  desktopSlides?: number;
  arrowsLeft?: boolean;
}

export default function ShopProductSlider({
  products,
  desktopSlides = 4,
  arrowsLeft = false,
}: Props) {
  const [swiper, setSwiper] = useState<any>(null);

  return (
    <div className="w-full min-w-0">

        <div className={`mb-5 flex justify-end gap-3 arrow-wrap ${
            arrowsLeft ? "justify-start" : "justify-end"}`}>
            <button
            type="button"
            onClick={() => swiper?.slidePrev()}
            aria-label="Previous products"
            className={`flex h-12 w-12 items-center justify-center rounded-lg text-white ${
            arrowsLeft ? "bg-black" : "bg-tred"}`}
            >
            <i className="fas fa-arrow-left" />
            </button>

            <button
            type="button"
            onClick={() => swiper?.slideNext()}
            aria-label="Next products"
            className={`flex h-12 w-12 items-center justify-center rounded-lg text-white ${
            arrowsLeft ? "bg-black" : "bg-tred"}`}
            >
            <i className="fas fa-arrow-right" />
            </button>
        </div>

        <ProductSlider
            products={products}
            desktopSlides={desktopSlides}
            setSwiper={setSwiper}
        />

    </div>
  );
}