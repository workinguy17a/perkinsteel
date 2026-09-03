"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CartService from "@/services/cart.service";

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
      <div className="max-w-7xl mx-auto px-4 py-20">
        Loading cart...
      </div>
    );
  }

  if (!cart?.items?.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl mb-6">
          Your cart is empty
        </h1>

        <Link href="/">
          Continue Shopping
        </Link>
      </div>
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
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl mb-10">
        Shopping Cart
      </h1>

      <div className="grid lg:grid-cols-3 gap-10">

        <div className="lg:col-span-2">
          {cart.items.map((item: any) => (
            <div
              key={item.key}
              className="flex gap-6 py-6 border-b"
            >
              <img
                src={
                  item.images?.[0]?.thumbnail ||
                  item.images?.[0]?.src
                }
                alt={item.name}
                className="w-28 h-28 object-cover"
              />

              <div className="flex-1">
                <h3 className="text-lg">
                  {item.name}
                </h3>

                <p className="mt-2">
                  {currency}
                  {formatPrice(
                    item.prices?.price ?? 0
                  )}
                </p>

                <div className="flex items-center gap-3 mt-4">
                  <button
                    type="button"
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

                  <button
                    type="button"
                    onClick={() =>
                      removeItem(item.key)
                    }
                    disabled={
                      updating === item.key
                    }
                    className="ml-5"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl mb-5">
            Cart Totals
          </h2>

          <div className="flex justify-between mb-3">
            <span>Subtotal</span>

            <span>
              {currency}
              {formatPrice(
                cart.totals?.total_items ?? 0
              )}
            </span>
          </div>

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>

            <span>
              {currency}
              {formatPrice(
                cart.totals?.total_price ?? 0
              )}
            </span>
          </div>

          <Link
            href="/checkout"
            className="block text-center mt-8"
          >
            Proceed to Checkout
          </Link>
        </div>

      </div>
    </section>
  );
}