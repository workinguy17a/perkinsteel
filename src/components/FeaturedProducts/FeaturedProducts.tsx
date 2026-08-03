"use client";

import { useState } from "react";

import ProductSlider from "./ProductSlider";
import products from "./products";

const tabs = [
  "all",
  "knives",
  "kitchenware",
  "linen",
  "uniforms",
  "janitorials",
];

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("all");
  const [swiper, setSwiper] = useState<any>(null);

  return (
    <section className="featured-products py-16">

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-start mb-8">
            <div>
                <h2 className="text-5xl font-bold text-black mb-4">
                    Featured Products
                </h2>
                <div className="tabs flex flex-wrap items-center gap-4">
                {tabs.map((tab) => (

                    <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-full px-6 py-2 capitalize

                    ${
                        activeTab === tab
                        ? "bg-black text-white"
                        : "bg-gray-200"
                    }`}
                    >
                    {tab}
                    </button>
                ))}
                </div>
                {/* Arrows */}
                <div className="flex gap-3">
                    <button onClick={() => swiper?.slidePrev()} className="carousel-prev w-12 h-12 bg-black text-white rounded-lg">
                        <i className="fas fa-arrow-left"></i>
                    </button>
                    <button onClick={() => swiper?.slideNext()} className="carousel-next w-12 h-12 bg-black text-white rounded-lg">
                        <i className="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>

        <ProductSlider
          products={products[activeTab as keyof typeof products]}  setSwiper={setSwiper} 
        />

      </div>

    </section>
  );
}