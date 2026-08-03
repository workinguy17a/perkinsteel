"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import KwCollectionCard from "./KwCollectionCard";

interface collection {
  id: number;
  name: string;
  image: string;
}

export default function KwCollectionSlider({
  collections,
}: {
  collections: collection[];
}) {
  return (
    <Swiper
      modules={[Navigation]}
      navigation
      spaceBetween={25}
      breakpoints={{
        320: {
          slidesPerView: 2,
        },
        640: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 5,
        },
        1200: {
          slidesPerView: 6,
        },
        1440: {
          slidesPerView: 8,
        },
      }}
    >
      {collections.map((collection) => (
        <SwiperSlide key={collection.id}>
          <KwCollectionCard collection={collection} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}