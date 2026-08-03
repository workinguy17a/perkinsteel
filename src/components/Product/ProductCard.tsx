import Image from "next/image";
import Link from "next/link";

import { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <article className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-lg">

      <Link href={`/product/${product.slug}`}>

        <div className="relative aspect-square overflow-hidden">

          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />

        </div>

      </Link>

      <div className="p-5">

        {product.category && (
          <p className="mb-2 text-sm uppercase tracking-wide text-gray-500">
            {product.category}
          </p>
        )}

        <Link href={`/product/${product.slug}`}>
          <h3 className="line-clamp-2 text-lg font-semibold text-gray-900 hover:text-orange-500">
            {product.name}
          </h3>
        </Link>

        <div className="mt-4 flex items-center justify-between">

          <span className="text-xl font-bold">
            {new Intl.NumberFormat("ar-AE", {
    style: "currency",
    currency: "AED",
  }).format(product.price)}
          </span>

          <button className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-500">
            Add to Cart
          </button>

        </div>

      </div>

    </article>
  );
}