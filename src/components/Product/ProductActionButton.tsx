"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import CartService from "@/services/cart.service";
import ContactForm from "@/components/Contact/ContactForm";
import { Product } from "@/types/product";

interface Props {
  product: Product;
  quantity?: number;
  className: string;
  enquiryClassName?: string;
  enquiryOpensModal?: boolean;
}

export function isKnifeProduct(product: Product) {
  return (
    (product.categorySlugs?.some(
      (slug) => slug.toLowerCase() === "knives"
    ) ?? false) || product.category?.toLowerCase() === "knives"
  );
}

export default function ProductActionButton({
  product,
  quantity = 1,
  className,
  enquiryClassName = "",
  enquiryOpensModal = false,
}: Props) {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [cartError, setCartError] = useState("");

  useEffect(() => {
    if (!enquiryOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setEnquiryOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [enquiryOpen]);

  const handleAddToCart = async () => {
    try {
      setAdding(true);
      setCartError("");
      await CartService.addItem(product.id, quantity);
      setAdded(true);
      window.setTimeout(() => setAdded(false), 2000);
    } catch (error) {
      setCartError(
        error instanceof Error ? error.message : "Unable to add product to cart"
      );
    } finally {
      setAdding(false);
    }
  };

  const isKnife = isKnifeProduct(product);

  return (
    <>
      {isKnife ? (
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={adding}
          className={className}
        >
          {adding ? "Adding..." : added ? "Added ✓" : "Add to Cart"}
        </button>
      ) : enquiryOpensModal ? (
        <button
          type="button"
          onClick={() => setEnquiryOpen(true)}
          className={`${className} ${enquiryClassName}`.trim()}
        >
          Enquiry Now
        </button>
      ) : (
        <Link
          href={`/product/${product.slug}`}
          className={`${className} ${enquiryClassName}`.trim()}
        >
          Enquiry Now
        </Link>
      )}

      {cartError && <p className="product-cart-error">{cartError}</p>}

      {enquiryOpen && typeof document !== "undefined" && createPortal((
        <div
          className="product-enquiry-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setEnquiryOpen(false);
          }}
        >
          <section
            aria-labelledby="product-enquiry-title"
            aria-modal="true"
            role="dialog"
            className="product-enquiry-dialog"
          >
            <button
              type="button"
              aria-label="Close enquiry form"
              className="product-enquiry-close"
              onClick={() => setEnquiryOpen(false)}
            >
              ×
            </button>
            <h2 id="product-enquiry-title">Enquire about {product.name}</h2>
            <p>Share your details and our team will get back to you.</p>
            <ContactForm
              initialMessage={`I would like to enquire about ${product.name} (SKU: ${product.sku || "not provided"}).`}
            />
          </section>
        </div>
      ), document.body)}
    </>
  );
}
