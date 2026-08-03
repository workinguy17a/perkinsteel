"use client";

import { useState } from "react";

import ProductSlider from "./ProductSlider";
import products from "./products";


export default function NewArrivals() {

  return (
    <section className="featured-products py-16">

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-start mb-8">
            <div>
                <h2 className="text-5xl font-bold text-black mb-4">
                    New Arrivals
                </h2>
                {/* Arrows */}
                <div className="flex gap-3">
                    <button className="carousel-prev w-12 h-12 bg-black text-white rounded-lg">
                        <i className="fas fa-arrow-left"></i>
                    </button>
                    <button className="carousel-next w-12 h-12 bg-black text-white rounded-lg">
                        <i className="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>

         <ProductSlider products={products} />

      </div>

    </section>
  );
}