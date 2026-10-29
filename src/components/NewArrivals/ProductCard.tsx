import Image from "next/image";
import Link from "next/link";

import { Product } from "@/types/product";
import ProductActionButton, { isKnifeProduct } from "@/components/Product/ProductActionButton";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: any) {
  return (
    <div className="product-card min-w-[260px] bg-[#f8f8f8] rounded-3xl p-4">
        <div>
            <Link href={`/product/${product.slug}`}>
            <Image 
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="mx-auto h-56 object-contain"
            />
            <h3 className="mt-6 text-[18px] leading-7">
                {product.name}
            </h3>
            </Link>
            <div className="price-add-cart flex justify-between items-center mt-5">
                {isKnifeProduct(product) && <span className="prd-price font-bold text-3xl">
                    {new Intl.NumberFormat("ar-AE", {
                        style: "currency",
                        currency: "AED",
                    }).format(product.price)}
                </span>}
                <ProductActionButton
                    product={product}
                    className="prd-add-to-cart bg-red-700 text-white px-6 py-3 rounded-lg"
                />
            </div>
        </div>
    </div>    
  );
}
