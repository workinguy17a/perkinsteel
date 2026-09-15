"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Product } from "@/types/product";
import CartService from "@/services/cart.service";


interface Props {
    product: Product;
}


export default function ProductCard({
    product,
}: Props) {

    const [adding, setAdding] = useState(false);
    const [added, setAdded] = useState(false);


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
        <div className="product-card">

            {/* IMAGE */}
            <div className="product-image">

                <Link
                    href={`/product/${product.slug}`}
                    className="product-image-link"
                >
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="
                            (max-width: 480px) 100vw,
                            (max-width: 767px) 50vw,
                            (max-width: 1199px) 33vw,
                            25vw
                        "
                        className="product-card-img"
                    />
                </Link>

            </div>


            {/* CONTENT */}
            <div className="prd-info">

                <Link
                    href={`/product/${product.slug}`}
                    className="product-title-link"
                >
                    <h3 className="product-title">
                        {product.name}
                    </h3>
                </Link>


                <div className="price-add-cart">

                    {/* PRICE */}
                    <div className="prd-price">

                        {hasSale ? (
                            <>
                                <span className="saleprice">
                                    {product.currency}
                                    {product.salePrice!.toFixed(2)}
                                </span>

                                <span className="regprice old-price">
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

                    </div>


                    {/* ADD TO CART */}
                    <button
                        type="button"
                        onClick={handleAddToCart}
                        disabled={adding}
                        className={`prd-add-to-cart ${
                            added ? "is-added" : ""
                        }`}
                    >
                        {adding
                            ? "Adding..."
                            : added
                            ? "Added ✓"
                            : "Add to Cart"
                        }
                    </button>

                </div>

            </div>

        </div>
    );
}