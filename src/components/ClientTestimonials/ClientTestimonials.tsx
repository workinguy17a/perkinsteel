"use client";

import { useState } from "react";

import TestimonialSlider from "./TestimonialSlider";
import testimonials from "./testimonials";

export default function ClientTestimonials() {

  const [swiper, setSwiper] = useState<any>(null);
  return (
    <section
    className="testimonial-section"
    style={{
        backgroundImage:
            "url(assets/image/outdoor-square.webp)",
    }}
>
    <div className="max-w-7xl mx-auto px-4">

        <div className="testimonial-grid">

            {/* LEFT SIDE */}
            <div className="testi-seewhy reveal fade-right">

                <h4>
                    See Why
                </h4>

                <h3>
                    Our Customer Love Us

                    <span className="seewhy-quote">
                        <img
                            src="assets/image/quote.webp"
                            alt=""
                        />
                    </span>
                </h3>

            </div>


            {/* RIGHT SIDE */}
            <div
                className="testi-slider"
                style={{
                    "--delay": "120ms",
                } as React.CSSProperties}
            >

                <span className="testi-quote">
                    <img
                        src="assets/image/quote.webp"
                        alt=""
                    />
                </span>


                {/* ARROWS */}
                <div className="testi-arrow">

                    <button
                        type="button"
                        onClick={() =>
                            swiper?.slidePrev()
                        }
                        aria-label="Previous testimonial"
                    >
                        <i className="fas fa-arrow-left"></i>
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            swiper?.slideNext()
                        }
                        aria-label="Next testimonial"
                    >
                        <i className="fas fa-arrow-right"></i>
                    </button>

                </div>


                {/* TESTIMONIAL */}
                <TestimonialSlider
                    testimonials={testimonials}
                    setSwiper={setSwiper}
                />
                </div>
        </div>
    </div>
</section>
  );
}

