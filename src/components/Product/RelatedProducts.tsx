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
    <section className="w-full py-12">

      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}

        <div className="mb-8 flex items-end justify-between">

          <div>
            <h2 className="text-2xl font-semibold">
              Related Products
            </h2>

            <p className="mt-2 text-gray-500">
              You may also like these products
            </p>
          </div>

          {/* Navigation */}

          {products.length > 4 && (
            <div className="flex gap-2">

              <button
                type="button"
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                aria-label="Previous products"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-xl transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ‹
              </button>

              <button
                type="button"
                onClick={scrollNext}
                disabled={!canScrollNext}
                aria-label="Next products"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-xl transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ›
              </button>

            </div>
          )}

        </div>


        {/* Carousel */}

        <div
          className="overflow-hidden"
          ref={emblaRef}
        >

          <div className="flex">

            {products.map((product) => (
              <div
                key={product.id}
                className="min-w-0 shrink-0 basis-full pr-4 sm:basis-1/2 lg:basis-1/4"
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