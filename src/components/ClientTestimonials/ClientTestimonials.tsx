"use client";

import { useState } from "react";

import TestimonialSlider from "./TestimonialSlider";
import testimonials from "./testimonials";

export default function ClientTestimonials() {

  const [swiper, setSwiper] = useState<any>(null);
  return (
    <section className="testimonial-section" style={{backgroundImage:"url(assets/image/outdoor-square.webp)"}}>
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap -mx-0.5">
                <div className="w-full lg:w-4/12">
                    <div className="testi-seewhy">
                        <h4>See Why</h4>
                        <h3>Our Customer Love Us<span className="seewhy-quote">
                            <img src="assets/image/quote.webp" alt="quote" />
                        </span></h3>
                    </div>
                </div>
                
                <div className="w-full lg:w-8/12"> 
                    <div className="testi-slider">
                        <span className="testi-quote">
                            <img src="assets/image/quote.webp" alt="quote" />
                        </span>
                        {/* Separate Arrows */}
                        <div className="flex gap-3 testi-arrow">
                            <button
                            onClick={() => swiper?.slidePrev()}
                            className="w-12 h-12 bg-white rounded-lg flex items-center justify-center"
                            >
                            <i className="fas fa-arrow-left"></i>
                            </button>

                            <button
                            onClick={() => swiper?.slideNext()}
                            className="w-12 h-12 bg-white rounded-lg flex items-center justify-center"
                            >
                            <i className="fas fa-arrow-right"></i>
                            </button>
                        </div>
                        <TestimonialSlider
                            testimonials={testimonials}
                            setSwiper={setSwiper}
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}

