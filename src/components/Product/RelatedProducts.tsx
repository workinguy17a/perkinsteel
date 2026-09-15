"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

interface Props {
  products: Product[];
}

export default function RelatedProducts({
  products,
}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
  });

  const [canScrollPrev, setCanScrollPrev] =
    useState(false);

  const [canScrollNext, setCanScrollNext] =
    useState(false);

  const updateButtons = useCallback(() => {
    if (!emblaApi) return;

    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    updateButtons();

    emblaApi.on("select", updateButtons);
    emblaApi.on("reInit", updateButtons);

    return () => {
      emblaApi.off("select", updateButtons);
      emblaApi.off("reInit", updateButtons);
    };
  }, [emblaApi, updateButtons]);

  const scrollPrev = () => {
    emblaApi?.scrollPrev();
  };

  const scrollNext = () => {
    emblaApi?.scrollNext();
  };

  if (!products.length) {
    return null;
  }

  return (
    <section className="related-products-section reveal fade-up">

  <div className="max-w-7xl mx-auto px-4">

    {/* HEADER */}
    <div className="related-products-header">

      <div className="related-products-heading">

        <h2>
          Related Products
        </h2>

        <p>
          You may also like these products
        </p>

      </div>


      {/* NAVIGATION */}
      {products.length > 4 && (

        <div className="related-products-navigation">

          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous products"
            className="related-nav-btn"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>


          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next products"
            className="related-nav-btn"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>

        </div>

      )}

    </div>


    {/* CAROUSEL */}
    <div
      className="related-products-carousel"
      ref={emblaRef}
    >

      <div className="related-products-track">

        {products.map((product) => (

          <div
            key={product.id}
            className="related-product-slide"
          >

            <ProductCard
              product={product}
            />

          </div>

        ))}

      </div>

    </div>

  </div>

</section>
  );
}