"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import TestimonialCard from "./TestimonialCard";

export default function TestimonialSlider({
  testimonials,
  setSwiper,
}: any) {
  return (
    <Swiper
      onSwiper={setSwiper}
      slidesPerView={1}
      spaceBetween={30}
      loop
    >
      {testimonials.map((testimonial: any) => (
        <SwiperSlide key={testimonial.id}>
          <TestimonialCard testimonial={testimonial} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}