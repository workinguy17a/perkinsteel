"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

//import { Navigation } from "swiper/modules";

import ProductCard from "./ProductCard";

export default function ProductSlider({ 
  products, 
  setSwiper, 
}: any) {
  return (
    <Swiper
      onSwiper={setSwiper}
      spaceBetween={25}
      loop
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
      {products.map((product: any) => (
        <SwiperSlide key={product.id}>
          <ProductCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}