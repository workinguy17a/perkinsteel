"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import ProductCard from "@/components/Product/ProductCard";
import { Product } from "@/types/product";

interface ProductSliderProps {
  products: Product[];
  desktopSlides?: number;
  setSwiper?: (swiper: any) => void;
}

export default function ProductSlider({
  products = [],desktopSlides = 5,
  setSwiper,
}: ProductSliderProps) {
  if (!products.length) {
    return (
      <div className="py-10 text-center">
        No Products Found
      </div>
    );
  }

  return (
    <Swiper
      onSwiper={setSwiper}
      spaceBetween={25}
      loop={products.length > 5}
      breakpoints={{
        360: {
          slidesPerView: 2,
        },

        768: {
          slidesPerView: 3,
        },

        1024: {
          slidesPerView: 4,
        },

        1440: {
          slidesPerView: desktopSlides,
        },
      }}
    >
      {products.map((product) => (
        <SwiperSlide key={product.id}>
          <ProductCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}