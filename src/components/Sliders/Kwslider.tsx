"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

interface KitchenwareCategorySliderProps {
  childCategories: any[];
}

export default function KitchenwareCategorySlider({
  childCategories,
}: KitchenwareCategorySliderProps) {
  return (
    <section className="kw-collection">
      <div className="max-w-7xl mx-auto px-4">

        {/* Desktop */}
        <div className="kw-collection-desktop">

          {childCategories.map((category, index) => (
            <div
              key={category.id}
              className="kwcollection-card reveal fade-up"
              style={{
                "--delay": `${index * 80}ms`,
              } as React.CSSProperties}
            >
              <a href={`/category/${category.slug}`}>

                <span className="black-bg">
                  <img
                    src={category.image.url}
                    alt={category.image.alt || category.name}
                    className="kw-category-image"
                  />
                </span>

                <h3>{category.name}</h3>

              </a>
            </div>
          ))}

        </div>


        {/* Tablet / Mobile */}
        <div className="kw-collection-mobile">

          <Swiper
            spaceBetween={16}
            slidesPerView={3.25}
            breakpoints={{
              480: {
                slidesPerView: 3.2,
                spaceBetween: 18,
              },
              640: {
                slidesPerView: 3.2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4.2,
                spaceBetween: 22,
              },
            }}
          >
            {childCategories.map((category) => (
              <SwiperSlide key={category.id}>

                <div className="kwcollection-card">

                  <a href={`/category/${category.slug}`}>

                    <span className="black-bg">
                      <img
                        src={category.image.url}
                        alt={category.image.alt || category.name}
                        className="kw-category-image"
                      />
                    </span>

                    <h3>{category.name}</h3>

                  </a>

                </div>

              </SwiperSlide>
            ))}
          </Swiper>

        </div>

      </div>
    </section>
  );
}