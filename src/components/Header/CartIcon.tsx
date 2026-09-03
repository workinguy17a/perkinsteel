"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import CartService from "@/services/cart.service";

export default function CartIcon() {
  const [cartCount, setCartCount] =
    useState(0);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cart =
          await CartService.getCart();

        setCartCount(
          cart?.items_count ?? 0
        );
      } catch (error) {
        console.error(
          "Unable to load cart:",
          error
        );
      }
    };

    const handleCartUpdated = (
      event: Event
    ) => {
      const customEvent =
        event as CustomEvent;

      setCartCount(
        customEvent.detail
          ?.items_count ?? 0
      );
    };

    loadCart();

    window.addEventListener(
      "cart-updated",
      handleCartUpdated
    );

    return () => {
      window.removeEventListener(
        "cart-updated",
        handleCartUpdated
      );
    };
  }, []);

  return (
    <Link
        href="/cart"
        className="relative"
        >
      <i className="fa fa-shopping-bag"></i>

      {cartCount > 0 && (
        <span className="cart-count">
          {cartCount}
        </span>
      )}
    </Link>
  );
}