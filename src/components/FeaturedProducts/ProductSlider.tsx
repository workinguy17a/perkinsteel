"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import ProductCard from "@/components/Product/ProductCard";
import { Product } from "@/types/product";

interface ProductSliderProps {
  products: Product[];
  setSwiper?: (swiper: any) => void;
}

export default function ProductSlider({
  products = [],
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
          slidesPerView: 5,
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