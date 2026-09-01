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

  return (
    <div className="product-card min-w-[260px] bg-[#f8f8f8] rounded-3xl p-4">

      <Link href={`/product/${product.slug}`}>

        <div className="product-image aspect-square overflow-hidden">

          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />

        </div>

      </Link>

      <div className="prd-info">

        <Link href={`/product/${product.slug}`}>
          <h3 className="mt-6 text-[18px] leading-7">
            {product.name}
          </h3>
        </Link>

        <div className="price-add-cart flex justify-between items-center mt-5">

          <span className="prd-price font-bold text-3xl">
            {new Intl.NumberFormat("ar-AE", {
    style: "currency",
    currency: "AED",
  }).format(product.price)}
          </span>
          <button  className="prd-add-to-cart bg-red-700 text-white px-6 py-3 rounded-lg"
            type="button"
            onClick={handleAddToCart}
            disabled={adding}
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