"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CartService from "@/services/cart.service";
import InnerBanner from "@/components/Common/InnerBanner/InnerBanner";

export default function CartPage() {
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] =
    useState<string | null>(null);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const data = await CartService.getCart();
      setCart(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (
    key: string,
    quantity: number
  ) => {
    if (quantity < 1) return;

    try {
      setUpdating(key);

      const data =
        await CartService.updateItem(
          key,
          quantity
        );

      setCart(data);
    } catch (error) {
      console.error(error);
    } finally {
      setUpdating(null);
    }
  };

  const removeItem = async (
    key: string
  ) => {
    try {
      setUpdating(key);

      const data =
        await CartService.removeItem(key);

      setCart(data);
    } catch (error) {
      console.error(error);
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <>
      <InnerBanner
        title="Cart"
        breadcrumbs={[
          {
            label: "Home",
            href: "/",
          },
          {
            label:
              "Cart",
          },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 py-20">
        Loading cart...
      </div>
      </>
    );
  }

  if (!cart?.items?.length) {
    return (
      <>
      <InnerBanner
        title="Cart"
        breadcrumbs={[
          {
            label: "Home",
            href: "/",
          },
          {
            label:
              "Cart",
          },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl mb-6">
          Your cart is empty
        </h1>

        <Link href="/">
          Continue Shopping
        </Link>
      </div>
      </>
    );
  }

  const currency =
    cart.totals?.currency_symbol ?? "$";

  const minorUnit =
    cart.totals?.currency_minor_unit ?? 2;

  const formatPrice = (
    value: string | number
  ) => {
    return (
      Number(value) /
      Math.pow(10, minorUnit)
    ).toFixed(minorUnit);
  };

  return (
    <>
    <InnerBanner
        title="Cart"
        breadcrumbs={[
          {
            label: "Home",
            href: "/",
          },
          {
            label:
              "Cart",
          },
        ]}
      />
    <section className="cart-page">

  <div className="max-w-7xl mx-auto px-4">

    {/* =========================================
        PAGE HEADER
    ========================================= */}

    <div className="cart-page-header reveal fade-up">

      <div>
        <span className="cart-page-eyebrow">
          YOUR CART
        </span>

        <h1>Shopping Cart</h1>
      </div>

      <div className="cart-item-count">
        {cart.items.length}
        {cart.items.length === 1 ? " Item" : " Items"}
      </div>

    </div>


    {/* =========================================
        CART LAYOUT
    ========================================= */}

    <div className="cart-layout">

      {/* =========================================
          CART PRODUCTS
      ========================================= */}

      <div className="cart-products reveal fade-right">

        {/* TABLE HEADER */}

        <div className="cart-table-header">

          <div>Product</div>

          <div>Price</div>

          <div>Quantity</div>

          <div>Total</div>

          <div></div>

        </div>


        {/* CART ITEMS */}

        <div className="cart-items">

          {cart.items.map((item: any) => {

            const price =
              item.prices?.price ?? 0;

            const lineTotal =
              price * item.quantity;

            return (

              <div
                key={item.key}
                className="cart-item"
              >

                {/* PRODUCT */}

                <div className="cart-product">

                  <div className="cart-product-image">

                    <img
                      src={
                        item.images?.[0]?.thumbnail ||
                        item.images?.[0]?.src
                      }
                      alt={item.name}
                    />

                  </div>


                  <div className="cart-product-info">

                    <h3>
                      {item.name}
                    </h3>

                    {/* MOBILE PRICE */}

                    <div className="cart-mobile-price">
                      {currency}
                      {formatPrice(price)}
                    </div>

                  </div>

                </div>


                {/* PRICE */}

                <div className="cart-item-price">
                  {currency}
                  {formatPrice(price)}
                </div>


                {/* QUANTITY */}

                <div className="cart-quantity">

                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    disabled={
                      updating === item.key
                    }
                    onClick={() =>
                      updateQuantity(
                        item.key,
                        item.quantity - 1
                      )
                    }
                  >
                    −
                  </button>


                  <span>
                    {item.quantity}
                  </span>


                  <button
                    type="button"
                    aria-label="Increase quantity"
                    disabled={
                      updating === item.key
                    }
                    onClick={() =>
                      updateQuantity(
                        item.key,
                        item.quantity + 1
                      )
                    }
                  >
                    +
                  </button>

                </div>


                {/* LINE TOTAL */}

                <div className="cart-line-total">
                  {currency}
                  {formatPrice(lineTotal)}
                </div>


                {/* REMOVE */}

                <button
                  type="button"
                  className="cart-remove"
                  aria-label={`Remove ${item.name}`}
                  onClick={() =>
                    removeItem(item.key)
                  }
                  disabled={
                    updating === item.key
                  }
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>

              </div>

            );

          })}

        </div>


        {/* CONTINUE SHOPPING */}

        <div className="cart-products-footer">

          <Link
            href="/shop"
            className="continue-shopping"
          >
            <i className="fa-solid fa-arrow-left"></i>

            Continue Shopping
          </Link>

        </div>

      </div>


      {/* =========================================
          ORDER SUMMARY
      ========================================= */}

      <aside
        className="cart-summary reveal fade-left"
        style={
          {
            "--delay": "100ms",
          } as React.CSSProperties
        }
      >

        <div className="cart-summary-header">
          <h2>Cart Totals</h2>
        </div>


        <div className="cart-summary-body">

          {/* SUBTOTAL */}

          <div className="cart-summary-row">

            <span>Subtotal</span>

            <strong>
              {currency}
              {formatPrice(
                cart.totals?.total_items ?? 0
              )}
            </strong>

          </div>


          {/* SHIPPING */}

          <div className="cart-summary-row">

            <span>Shipping</span>

            <span className="cart-shipping-text">
              Calculated at checkout
            </span>

          </div>


          <div className="cart-summary-divider"></div>


          {/* TOTAL */}

          <div className="cart-summary-total">

            <span>Total</span>

            <strong>
              {currency}
              {formatPrice(
                cart.totals?.total_price ?? 0
              )}
            </strong>

          </div>


          {/* CHECKOUT */}

          <Link
            href="/checkout"
            className="cart-checkout-btn"
          >
            Proceed to Checkout

            <i className="fa-solid fa-arrow-right"></i>
          </Link>


          {/* SECURE CHECKOUT */}

          <div className="cart-secure-checkout">

            <i className="fa-solid fa-lock"></i>

            <span>
              Secure & encrypted checkout
            </span>

          </div>

        </div>

      </aside>

    </div>

  </div>

</section>
</>
  );
}