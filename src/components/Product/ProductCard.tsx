"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Product } from "@/types/product";
import CartService from "@/services/cart.service";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {

  const [adding, setAdding] =
  useState(false);

const [added, setAdded] =
  useState(false);

const handleAddToCart = async () => {
  try {
    setAdding(true);

    await CartService.addItem(
      product.id,
      1
    );

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  } catch (error) {
    console.error(
      "Add to cart error:",
      error
    );
  } finally {
    setAdding(false);
  }
};

const hasSale =
  product.salePrice != null &&
  product.regularPrice != null &&
  product.salePrice < product.regularPrice;

  return (
    <div className="product-card flex h-full min-w-0 flex-col">

  {/* IMAGE */}
  <div className="product-image relative aspect-[4/3] overflow-hidden">
    <Link
      href={`/product/${product.slug}`}
      className="block h-full"
    >
      <Image
        src={product.image}
        alt={product.name}
        fill
        className="object-contain p-2 transition duration-500 group-hover:scale-105 sm:p-3"
      />
    </Link>
  </div>

  {/* CONTENT */}
  <div className="prd-info flex flex-1 flex-col pt-3 sm:pt-4">

    <Link href={`/product/${product.slug}`}>
      <h3 className="min-h-[48px] text-sm leading-6 sm:min-h-[52px] sm:text-base lg:min-h-[56px] lg:text-[18px] lg:leading-7">
        {product.name}
      </h3>
    </Link>

    <div className="price-add-cart mt-auto flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">

      {/* PRICE */}
      <span className="prd-price flex items-center font-bold">
        {hasSale ? (
          <>
            <span className="saleprice">
              {product.currency}
              {product.salePrice!.toFixed(2)}
            </span>

            <span className="regprice line-through ">
              {product.currency}
              {product.regularPrice!.toFixed(2)}
            </span>
          </>
        ) : (
          <span className="regprice">
            {product.currency}
            {(product.regularPrice ?? product.price).toFixed(2)}
          </span>
        )}
      </span>

      {/* ADD TO CART */}
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={adding}
        className="prd-add-to-cart w-full rounded-lg bg-red-700 px-4 py-2.5 text-sm text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-5 sm:py-3"
      >
        {adding
          ? "Adding..."
          : added
          ? "Added ✓"
          : "Add to Cart"}
      </button>

    </div>

  </div>

</div>
  );
}