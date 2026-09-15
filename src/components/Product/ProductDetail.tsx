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
const [quantity, setQuantity] = useState(1);

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

const [added, setAdded] =
  useState(false);

const [cartError, setCartError] =
  useState("");

const handleAddToCart =
  async () => {
    try {
      setAdding(true);
      setAdded(false);
      setCartError("");

      await CartService.addItem(
        product.id,
        quantity
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

      setCartError(
        error instanceof Error
          ? error.message
          : "Unable to add product to cart"
      );
    } finally {
      setAdding(false);
    }
  };

  return (
    <main>

      {/* Product */}

      <section className="product-detail-main">

    <div className="max-w-7xl mx-auto px-4">

        <div className="product-detail-grid">

            {/* =========================================
                PRODUCT GALLERY
            ========================================= */}

            <div className="product-gallery reveal fade-right">

                {/* MAIN IMAGE */}
                <div className="product-main-image">

                    <Image
                        src={selectedImage}
                        alt={product.name}
                        width={800}
                        height={800}
                        className="product-main-img"
                        priority
                    />


                    {/* PREVIOUS IMAGE */}
                    {gallery.length > 1 && (
                        <button
                            type="button"
                            className="product-gallery-arrow product-gallery-prev"
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

                                if (newIndex < thumbnailStart) {
                                    setThumbnailStart(newIndex);
                                }

                                if (
                                    newIndex >=
                                    thumbnailStart + thumbnailsPerView
                                ) {
                                    setThumbnailStart(
                                        Math.max(
                                            newIndex - thumbnailsPerView + 1,
                                            0
                                        )
                                    );
                                }

                            }}
                        >
                            <i className="fa-solid fa-chevron-left"></i>
                        </button>
                    )}


                    {/* NEXT IMAGE */}
                    {gallery.length > 1 && (
                        <button
                            type="button"
                            className="product-gallery-arrow product-gallery-next"
                            aria-label="Next image"
                            onClick={() => {

                                const newIndex =
                                    currentImageIndex === gallery.length - 1
                                        ? 0
                                        : currentImageIndex + 1;

                                setCurrentImageIndex(newIndex);

                                setSelectedImage(
                                    gallery[newIndex].url
                                );

                                if (newIndex < thumbnailStart) {
                                    setThumbnailStart(newIndex);
                                }

                                if (
                                    newIndex >=
                                    thumbnailStart + thumbnailsPerView
                                ) {
                                    setThumbnailStart(
                                        Math.max(
                                            newIndex - thumbnailsPerView + 1,
                                            0
                                        )
                                    );
                                }

                            }}
                        >
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    )}

                </div>


                {/* =========================================
                    THUMBNAILS
                ========================================= */}

                {gallery.length > 1 && (

                    <div className="product-thumbnail-slider">

                        {/* PREVIOUS THUMBNAILS */}
                        <button
                            type="button"
                            className="thumbnail-arrow"
                            aria-label="Previous thumbnails"
                            disabled={thumbnailStart === 0}
                            onClick={() => {
                                setThumbnailStart((prev) =>
                                    Math.max(prev - 1, 0)
                                );
                            }}
                        >
                            <i className="fa-solid fa-chevron-left"></i>
                        </button>


                        <div className="product-thumbnails">

                            {visibleThumbnails.map((image, index) => {

                                const actualIndex =
                                    thumbnailStart + index;

                                return (

                                    <button
                                        key={`${image.url}-${actualIndex}`}
                                        type="button"
                                        className={`product-thumbnail ${
                                            currentImageIndex === actualIndex
                                                ? "active"
                                                : ""
                                        }`}
                                        onClick={() => {

                                            setCurrentImageIndex(
                                                actualIndex
                                            );

                                            setSelectedImage(
                                                image.url
                                            );

                                        }}
                                    >

                                        <Image
                                            src={image.url}
                                            alt={
                                                image.alt ||
                                                product.name
                                            }
                                            width={130}
                                            height={100}
                                            className="product-thumbnail-img"
                                        />

                                    </button>

                                );

                            })}

                        </div>


                        {/* NEXT THUMBNAILS */}
                        <button
                            type="button"
                            className="thumbnail-arrow"
                            aria-label="Next thumbnails"
                            disabled={
                                thumbnailStart +
                                thumbnailsPerView >=
                                gallery.length
                            }
                            onClick={() => {

                                setThumbnailStart((prev) =>
                                    Math.min(
                                        prev + 1,
                                        Math.max(
                                            gallery.length -
                                            thumbnailsPerView,
                                            0
                                        )
                                    )
                                );

                            }}
                        >
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>

                    </div>

                )}

            </div>


            {/* =========================================
                PRODUCT INFORMATION
            ========================================= */}

            <div
                className="product-detail-info reveal fade-left"
                style={
                    {
                        "--delay": "100ms",
                    } as React.CSSProperties
                }
            >

                {/* SKU */}
                {product.sku && (
                    <div className="product-detail-sku">
                        SKU : {product.sku}
                    </div>
                )}


                {/* TITLE */}
                <h1 className="product-detail-title">
                    {product.name}
                </h1>


                {/* RATING */}
                <div className="product-detail-rating">

                    <div className="product-rating-stars">

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
                                        ? "active"
                                        : ""
                                }
                            >
                                ★
                            </span>

                        ))}

                    </div>

                    <span className="product-review-count">
                        {product.reviewCount ?? 0} Reviews
                    </span>

                </div>


                {/* PRICE */}
                <div className="product-detail-price">

                    {product.salePrice &&
                    product.regularPrice &&
                    product.salePrice <
                        product.regularPrice ? (

                        <>
                            <span className="product-sale-price">
                                {product.currency}
                                {product.salePrice.toFixed(2)}
                            </span>

                            <span className="product-regular-price">
                                {product.currency}
                                {product.regularPrice.toFixed(2)}
                            </span>
                        </>

                    ) : (

                        <span className="product-sale-price">
                            {product.currency}
                            {(product.regularPrice ??
                                product.price
                            ).toFixed(2)}
                        </span>

                    )}

                </div>


                {/* SHORT DESCRIPTION */}
                {product.shortDescription && (

                    <div
                        className="product-short-description"
                        dangerouslySetInnerHTML={{
                            __html:
                                product.shortDescription,
                        }}
                    />

                )}


                {/* =========================================
                    PURCHASE AREA
                ========================================= */}

                <div className="product-purchase-area">

                    <label className="product-quantity-label">
                        Quantity
                    </label>


                    <div className="product-purchase-row">

                        {/* QUANTITY */}
                        <div className="product-quantity">

                            <button
                                type="button"
                                aria-label="Decrease quantity"
                                onClick={() =>
                                    setQuantity((prev) =>
                                        Math.max(1, prev - 1)
                                    )
                                }
                            >
                                −
                            </button>


                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) =>
                                    setQuantity(
                                        Math.max(
                                            1,
                                            Number(
                                                e.target.value
                                            ) || 1
                                        )
                                    )
                                }
                            />


                            <button
                                type="button"
                                aria-label="Increase quantity"
                                onClick={() =>
                                    setQuantity(
                                        (prev) => prev + 1
                                    )
                                }
                            >
                                +
                            </button>

                        </div>


                        {/* ADD TO CART */}
                        <button
                            type="button"
                            className="product-add-cart"
                            onClick={handleAddToCart}
                            disabled={adding}
                        >
                            {adding
                                ? "Adding..."
                                : added
                                ? "Added ✓"
                                : "Add to Cart"
                            }
                        </button>


                        {/* BUY NOW */}
                        <button
                            type="button"
                            className="product-buy-now"
                        >
                            Buy Now
                        </button>

                    </div>


                    {cartError && (
                        <p className="product-cart-error">
                            {cartError}
                        </p>
                    )}

                </div>


                {/* =========================================
                    SAFE CHECKOUT
                ========================================= */}

                <div className="product-safe-checkout">

                    <div className="safe-checkout-title">

                        <i className="fa-solid fa-shield-halved"></i>

                        <span>
                            Guaranteed Safe Checkout
                        </span>

                    </div>

                    <p>
                        All data is SSL encrypted &
                        securely transmitted.
                    </p>

                </div>

            </div>

        </div>

    </div>

</section>

      {/* Product Information Tabs */}

<section className="product-tabs-section">

  <div className="max-w-7xl mx-auto px-4">

    {/* =========================================
        TAB NAVIGATION
    ========================================= */}

    <div
      className="product-tabs-nav reveal fade-up"
      role="tablist"
      aria-label="Product information"
    >

      <button
        type="button"
        role="tab"
        aria-selected={activeTab === "description"}
        onClick={() => setActiveTab("description")}
        className={`product-tab-btn ${
          activeTab === "description" ? "active" : ""
        }`}
      >
        Description
      </button>


      <button
        type="button"
        role="tab"
        aria-selected={activeTab === "specifications"}
        onClick={() => setActiveTab("specifications")}
        className={`product-tab-btn ${
          activeTab === "specifications" ? "active" : ""
        }`}
      >
        Specifications
      </button>


      <button
        type="button"
        role="tab"
        aria-selected={activeTab === "shipping"}
        onClick={() => setActiveTab("shipping")}
        className={`product-tab-btn ${
          activeTab === "shipping" ? "active" : ""
        }`}
      >
        Shipping & Returns
      </button>


      <button
        type="button"
        role="tab"
        aria-selected={activeTab === "reviews"}
        onClick={() => setActiveTab("reviews")}
        className={`product-tab-btn ${
          activeTab === "reviews" ? "active" : ""
        }`}
      >
        Reviews
      </button>

    </div>


    {/* =========================================
        TAB CONTENT
    ========================================= */}

    <div
      className="products-tab-details reveal fade-up"
      style={
        {
          "--delay": "100ms",
        } as React.CSSProperties
      }
    >

      {/* DESCRIPTION */}

      {activeTab === "description" && (

        <div
          key="description"
          className="product-tab-panel"
          role="tabpanel"
        >

          {product.description ? (

            <div
              className="product-description-content"
              dangerouslySetInnerHTML={{
                __html: product.description,
              }}
            />

          ) : (

            <p className="product-tab-empty">
              No description available.
            </p>

          )}

        </div>

      )}


      {/* SPECIFICATIONS */}

      {activeTab === "specifications" && (

        <div
          key="specifications"
          className="product-tab-panel"
          role="tabpanel"
        >

          {product.specifications &&
          product.specifications.length > 0 ? (

            <div className="product-specifications">

              {product.specifications.map(
                (spec, index) => (

                  <div
                    key={index}
                    className="product-spec-row"
                  >

                    <div className="product-spec-label">
                      {spec.label}
                    </div>

                    <div className="product-spec-value">
                      {spec.value}
                    </div>

                  </div>

                )
              )}

            </div>

          ) : (

            <p className="product-tab-empty">
              No specifications available.
            </p>

          )}

        </div>

      )}


      {/* SHIPPING */}

      {activeTab === "shipping" && (

        <div
          key="shipping"
          className="product-tab-panel product-shipping-content"
          role="tabpanel"
        >

          <div className="product-info-block">

            <h3>Shipping</h3>

            <p>
              Shipping information will be displayed here.
            </p>

          </div>


          <div className="product-info-block">

            <h3>Returns</h3>

            <p>
              Returns and refund information will be
              displayed here.
            </p>

          </div>

        </div>

      )}


      {/* REVIEWS */}

      {activeTab === "reviews" && (

        <div
          key="reviews"
          className="product-tab-panel"
          role="tabpanel"
        >

          <div className="product-review-summary">

            <div className="product-review-score">
              {product.rating?.toFixed(1) ?? "0.0"}
            </div>


            <div className="product-review-info">

              <div className="product-review-stars">

                {Array.from({
                  length: 5,
                }).map((_, index) => (

                  <span key={index}>
                    {index <
                    Math.round(
                      product.rating ?? 0
                    )
                      ? "★"
                      : "☆"}
                  </span>

                ))}

              </div>

              <p>
                {product.reviewCount ?? 0} reviews
              </p>

            </div>

          </div>


          <p className="product-tab-empty">
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


{(
  product.productUspBar?.length ||
  product.uspImage?.url
) && (

  <section className="product-usp-section">

    <div className="mx-auto max-w-7xl px-4">

      <div className="product-usp-wrap">

        {/* =========================================
            USP LIST
        ========================================= */}

        {product.productUspBar &&
          product.productUspBar.length > 0 && (

            <div className="product-usp-content reveal fade-right">

              {product.productUspBar.map(
                (item, index) => (

                  <div
                    key={index}
                    className="product-usp-item"
                  >

                    {item.icon.url && (

                      <div className="product-usp-icon">

                        <Image
                          src={item.icon.url}
                          alt={
                            item.icon.alt ||
                            item.title
                          }
                          fill
                          className="product-usp-icon-img"
                        />

                      </div>

                    )}


                    <div className="product-usp-text">

                      <h3>
                        {item.title}
                      </h3>

                      {item.text && (
                        <p>
                          {item.text}
                        </p>
                      )}

                    </div>

                  </div>

                )
              )}

            </div>

          )}


        {/* =========================================
            USP IMAGE
        ========================================= */}

        {product.uspImage?.url && (

          <div
            className="product-usp-image reveal fade-left"
            style={
              {
                "--delay": "100ms",
              } as React.CSSProperties
            }
          >

            <Image
              src={product.uspImage.url}
              alt={
                product.uspImage.alt ||
                product.name
              }
              fill
              sizes="
                (max-width: 767px) 100vw,
                (max-width: 1023px) 50vw,
                50vw
              "
              className="product-usp-main-img"
            />

          </div>

        )}

      </div>

    </div>

  </section>

)}
    </main>
  );
}