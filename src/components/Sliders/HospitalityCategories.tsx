"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface HospitalityCategoriesProps {
    categories: any[];
}

export default function HospitalityCategories({
    categories,
}: HospitalityCategoriesProps) {

    if (!categories?.length) return null;

    return (
        <section className="hos-section">

            <div className="max-w-7xl mx-auto px-4">

                {/* Heading */}
                <div className="section-title reveal fade-up">

                    <span className="section-eyebrow">
                        Explore Our Range
                    </span>

                    <h3>
                        Hospitality Essentials
                    </h3>

                </div>


                {/* DESKTOP GRID */}
                <div className="hos-desktop-grid">

                    {categories.map((category, index) => (

                        <div
                            key={category.id}
                            className="hos-card reveal fade-up"
                            style={{
                                "--delay": `${100 + index * 90}ms`,
                            } as React.CSSProperties}
                        >

                            <HospitalityCard
                                category={category}
                            />

                        </div>

                    ))}

                </div>


                {/* TABLET / MOBILE SLIDER */}
                <div className="hos-mobile-slider">

                    <Swiper
                        spaceBetween={12}
                        slidesPerView={1.25}
                        breakpoints={{
                            480: {
                                slidesPerView: 1.5,
                                spaceBetween: 14,
                            },

                            640: {
                                slidesPerView: 1.8,
                                spaceBetween: 16,
                            },

                            768: {
                                slidesPerView: 2.2,
                                spaceBetween: 16,
                            },
                        }}
                    >

                        {categories.map((category) => (

                            <SwiperSlide key={category.id}>

                                <HospitalityCard
                                    category={category}
                                />

                            </SwiperSlide>

                        ))}

                    </Swiper>

                </div>

            </div>

        </section>
    );
}


/* Reusable Card */

function HospitalityCard({
    category,
}: {
    category: any;
}) {

    return (
        <a
            href={`/category/${category.slug}`}
            className="hos-wrap"
        >

            {category.image?.url && (

                <img
                    src={category.image.url}
                    alt={
                        category.image.alt ||
                        category.name
                    }
                />

            )}

            <div className="hos-overlay"></div>

            <h4>

                {category.name}

                <i className="fa-solid fa-arrow-right"></i>

            </h4>

        </a>
    );
}