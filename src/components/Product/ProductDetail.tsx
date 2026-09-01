"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Product } from "@/types/product";
import RelatedProducts from "./RelatedProducts";
import CartService from "@/services/cart.service";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({
  product,
}: ProductDetailProps) {
const [selectedImage, setSelectedImage] = useState(
  product.image
);

const [currentImageIndex, setCurrentImageIndex] = useState(0);

const [thumbnailStart, setThumbnailStart] = useState(0);
const [relatedStart, setRelatedStart] = useState(0);
const [activeTab, setActiveTab] = useState<
  "description" | "specifications" | "shipping" | "reviews"
>("description");

 const gallery = [
  {
    url: product.image,
    alt: product.name,
  },
  ...(product.gallery ?? []).filter(
    (image) => image.url !== product.image
  ),
];

const thumbnailsPerView = 5;

const visibleThumbnails = gallery.slice(
  thumbnailStart,
  thumbnailStart + thumbnailsPerView
);

const [adding, setAdding] =
  useState(false);

const handleAddToCart = async () => {
  try {
    setAdding(true);

    await CartService.addItem(
      product.id,
      quantity
    );

    console.log(
      "Product added to cart"
    );
  } catch (error) {
    console.error(
      "Add to cart error:",
      error
    );
  } finally {
    setAdding(false);
  }
};

  return (
    <main>

      {/* Product */}

      <section className="w-full pb-12">
        <div className="max-w-7xl mx-auto px-4">

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">            

            {/* Product Gallery */}

            <div className="flex gap-4">

            {/* Vertical Thumbnail Slider */}

            {gallery.length > 1 && (
                <div className="flex w-20 shrink-0 flex-col items-center gap-3">

                {/* Thumbnail Previous */}

                <button
                    type="button"
                    aria-label="Previous thumbnails"
                    disabled={thumbnailStart === 0}
                    onClick={() => {
                    setThumbnailStart((prev) =>
                        Math.max(prev - 1, 0)
                    );
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-xl shadow-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
                >
                    ↑
                </button>


                {/* Thumbnail Viewport */}

                <div className="flex flex-col gap-3 overflow-hidden">

                    {visibleThumbnails.map((image, index) => {
                    const actualIndex =
                        thumbnailStart + index;

                    return (
                        <button
                        key={`${image.url}-${actualIndex}`}
                        type="button"
                        onClick={() => {
                            setCurrentImageIndex(actualIndex);
                            setSelectedImage(image.url);
                        }}
                        className={`h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 bg-white transition ${
                            currentImageIndex === actualIndex
                            ? "border-red-600"
                            : "border-gray-200 hover:border-gray-400"
                        }`}
                        >
                        <Image
                            src={image.url}
                            alt={
                            image.alt ||
                            product.name
                            }
                            width={80}
                            height={80}
                            className="h-full w-full object-contain"
                        />
                        </button>
                    );
                    })}

                </div>


                {/* Thumbnail Next */}

                <button
                    type="button"
                    aria-label="Next thumbnails"
                    disabled={
                    thumbnailStart + thumbnailsPerView >=
                    gallery.length
                    }
                    onClick={() => {
                    setThumbnailStart((prev) =>
                        Math.min(
                        prev + 1,
                        gallery.length - thumbnailsPerView
                        )
                    );
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-xl shadow-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
                >
                    ↓
                </button>

                </div>
            )}


            {/* Main Image */}

            <div className="relative flex min-h-[500px] flex-1 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white p-6">

                <Image
                src={selectedImage}
                alt={product.name}
                width={700}
                height={700}
                className="max-h-[500px] w-full object-contain"
                priority
                />


                {/* Main Image Previous */}

                {gallery.length > 1 && (
                <button
                    type="button"
                    aria-label="Previous image"
                    onClick={() => {
                    const newIndex =
                        currentImageIndex === 0
                        ? gallery.length - 1
                        : currentImageIndex - 1;

                    setCurrentImageIndex(newIndex);
                    setSelectedImage(
                        gallery[newIndex].url
                    );

                    // Keep thumbnail slider in sync
                    if (newIndex < thumbnailStart) {
                        setThumbnailStart(newIndex);
                    }

                    if (
                        newIndex >=
                        thumbnailStart + thumbnailsPerView
                    ) {
                        setThumbnailStart(
                        newIndex - thumbnailsPerView + 1
                        );
                    }
                    }}
                    className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl shadow-md transition hover:bg-gray-100"
                >
                    ‹
                </button>
                )}


                {/* Main Image Next */}

                {gallery.length > 1 && (
                <button
                    type="button"
                    aria-label="Next image"
                    onClick={() => {
                    const newIndex =
                        currentImageIndex ===
                        gallery.length - 1
                        ? 0
                        : currentImageIndex + 1;

                    setCurrentImageIndex(newIndex);
                    setSelectedImage(
                        gallery[newIndex].url
                    );

                    // Keep thumbnail slider in sync
                    if (newIndex < thumbnailStart) {
                        setThumbnailStart(newIndex);
                    }

                    if (
                        newIndex >=
                        thumbnailStart + thumbnailsPerView
                    ) {
                        setThumbnailStart(
                        newIndex - thumbnailsPerView + 1
                        );
                    }
                    }}
                    className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl shadow-md transition hover:bg-gray-100"
                >
                    ›
                </button>
                )}

            </div>

            </div>

            {/* Product Information */}

            <div>

              {/* SKU */}

              {product.sku && (
                <div className="mb-2 text-sm text-gray-500">
                  SKU: {product.sku}
                </div>
              )}

              {/* Title */}

              <h1 className="mb-4 text-3xl font-semibold leading-tight lg:text-4xl">
                {product.name}
              </h1>

              {/* Rating */}

              <div className="mb-5 flex items-center gap-3">

                <div className="flex">
                  {Array.from({
                    length: 5,
                  }).map((_, index) => (
                    <span
                      key={index}
                      className={
                        index <
                        Math.round(
                          product.rating ?? 0
                        )
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>

                <span className="text-sm text-gray-500">
                  ({product.reviewCount ?? 0} Reviews)
                </span>

              </div>

              {/* Price */}

              <div className="mb-6">

                {product.salePrice &&
                product.regularPrice &&
                product.salePrice <
                  product.regularPrice ? (
                  <div className="flex items-center gap-3">

                    <span className="text-3xl font-bold text-red-600">
                      {product.currency}
                      {product.salePrice}
                    </span>

                    <span className="text-lg text-gray-400 line-through">
                      {product.currency}
                      {product.regularPrice}
                    </span>

                  </div>
                ) : (
                  <span className="text-3xl font-bold">
                    {product.currency}
                    {product.price}
                  </span>
                )}

              </div>

              {/* Short Description */}

              {product.shortDescription && (
                <div
                  className="mb-6 text-gray-600"
                  dangerouslySetInnerHTML={{
                    __html:
                      product.shortDescription,
                  }}
                />
              )}

              {/* Quantity */}

              <div className="mb-4">

                <label className="mb-2 block text-sm font-medium">
                  Quantity
                </label>

                <div className="flex w-fit items-center rounded-lg border border-gray-300">

                  <button
                    type="button"
                    className="px-4 py-2 text-lg"
                  >
                    −
                  </button>

                  <span className="px-4">
                    1
                  </span>

                  <button
                    type="button"
                    className="px-4 py-2 text-lg"
                  >
                    +
                  </button>

                </div>

              </div>

              {/* Add to Cart */}

              <div className="flex flex-col gap-3 sm:flex-row">

                <button
                  type="button" onClick={handleAddToCart}
  disabled={adding}
                  className="rounded-lg bg-red-700 px-8 py-3 font-semibold text-white transition hover:bg-red-800"
                >
                 
                {adding
                  ? "Adding..."
                  : "Add to Cart"}
                </button>

                <button
                  type="button"
                  className="rounded-lg border border-red-700 px-8 py-3 font-semibold text-red-700 transition hover:bg-red-50"
                >
                  Buy Now
                </button>

              </div>

              {/* Safe Checkout */}

              <div className="mt-6 rounded-lg border border-gray-200 p-4">

                <p className="text-sm font-medium">
                  Guaranteed Safe Checkout
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Secure payment and safe checkout.
                </p>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Product Information Tabs */}

<section className="w-full border-t border-gray-200">
  <div className="max-w-7xl mx-auto px-4 py-10">

    {/* Tab Navigation */}

    <div className="flex flex-wrap gap-8 border-b border-gray-200">

      <button
        type="button"
        onClick={() => setActiveTab("description")}
        className={`pb-4 font-semibold transition ${
          activeTab === "description"
            ? "border-b-2 border-red-600 text-red-600"
            : "text-gray-600 hover:text-red-600"
        }`}
      >
        Description
      </button>

      <button
        type="button"
        onClick={() => setActiveTab("specifications")}
        className={`pb-4 font-semibold transition ${
          activeTab === "specifications"
            ? "border-b-2 border-red-600 text-red-600"
            : "text-gray-600 hover:text-red-600"
        }`}
      >
        Specifications
      </button>

      <button
        type="button"
        onClick={() => setActiveTab("shipping")}
        className={`pb-4 font-semibold transition ${
          activeTab === "shipping"
            ? "border-b-2 border-red-600 text-red-600"
            : "text-gray-600 hover:text-red-600"
        }`}
      >
        Shipping & Returns
      </button>

      <button
        type="button"
        onClick={() => setActiveTab("reviews")}
        className={`pb-4 font-semibold transition ${
          activeTab === "reviews"
            ? "border-b-2 border-red-600 text-red-600"
            : "text-gray-600 hover:text-red-600"
        }`}
      >
        Reviews
      </button>

    </div>


    {/* Tab Content */}

    <div className="mt-8">

      {/* Description */}

      {activeTab === "description" && (
        <div>
          {product.description ? (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: product.description,
              }}
            />
          ) : (
            <p className="text-gray-500">
              No description available.
            </p>
          )}
        </div>
      )}


      {/* Specifications */}

      {activeTab === "specifications" && (
        <div>

          {product.specifications &&
          product.specifications.length > 0 ? (
            <div className="space-y-3">

              {product.specifications.map(
                (spec, index) => (
                  <div
                    key={index}
                    className="flex flex-col border-b border-gray-200 py-3 sm:flex-row"
                  >
                    <div className="w-full font-medium sm:w-1/3">
                      {spec.label}
                    </div>

                    <div className="w-full text-gray-600 sm:w-2/3">
                      {spec.value}
                    </div>
                  </div>
                )
              )}

            </div>
          ) : (
            <p className="text-gray-500">
              No specifications available.
            </p>
          )}

        </div>
      )}


      {/* Shipping & Returns */}

      {activeTab === "shipping" && (
        <div className="prose max-w-none">

          <h3>Shipping</h3>

          <p>
            Shipping information will be displayed here.
          </p>

          <h3>Returns</h3>

          <p>
            Returns and refund information will be
            displayed here.
          </p>

        </div>
      )}


      {/* Reviews */}

      {activeTab === "reviews" && (
        <div>

          <div className="mb-6 flex items-center gap-4">

            <div className="text-3xl font-bold">
              {product.rating?.toFixed(1) ?? "0.0"}
            </div>

            <div>
              <div className="flex text-yellow-500">
                {Array.from({ length: 5 }).map(
                  (_, index) => (
                    <span key={index}>
                      {index <
                      Math.round(
                        product.rating ?? 0
                      )
                        ? "★"
                        : "☆"}
                    </span>
                  )
                )}
              </div>

              <p className="text-sm text-gray-500">
                {product.reviewCount ?? 0} reviews
              </p>
            </div>

          </div>

          <p className="text-gray-500">
            Customer reviews will be displayed here.
          </p>

        </div>
      )}

    </div>

  </div>
</section>

      {/* Related Products */}

<RelatedProducts
  products={product.relatedProducts ?? []}
/>
    </main>
  );
}