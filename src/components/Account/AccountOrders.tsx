"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface AccountOrder {
  id: number;
  number: string;
  status: string;
  dateCreated: string;
  currency: string;
  total: string;
  itemCount: number;
}

function formatDate(value: string) {
  if (!value) return "";

  return new Intl.DateTimeFormat("en-AE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function formatStatus(status: string) {
  return status
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

export default function AccountOrders() {
  const [orders, setOrders] = useState<AccountOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrders() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "/api/account/orders",
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message || "Unable to load your orders."
          );
        }

        setOrders(data.orders ?? []);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Unable to load your orders."
        );
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="border border-gray-200 bg-white p-6">
        <p className="text-sm text-gray-600">
          Loading your orders...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-red-200 bg-red-50 p-5">
        <p className="text-sm text-red-700">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0">
      <div className="mb-7">
        <h2 className="text-2xl font-semibold text-black md:text-3xl">
          Orders
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          View your recent and previous orders.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="border border-gray-200 bg-white p-6">
          <p className="text-sm text-gray-600">
            You haven&apos;t placed any orders yet.
          </p>

          <Link
            href="/shop"
            className="mt-5 inline-flex bg-black px-6 py-3 text-xs font-semibold uppercase tracking-wide text-white transition hover:opacity-80"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <>
          {/* Mobile */}
          <div className="flex flex-col gap-4 md:hidden">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-200 bg-white p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500">
                      Order
                    </p>

                    <p className="mt-1 font-semibold text-black">
                      #{order.number}
                    </p>
                  </div>

                  <span className="bg-gray-100 px-3 py-1 text-xs font-medium text-black">
                    {formatStatus(order.status)}
                  </span>
                </div>

                <div className="mt-5 flex flex-col gap-3 border-t border-gray-200 pt-4 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">
                      Date
                    </span>

                    <span className="text-right text-black">
                      {formatDate(order.dateCreated)}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">
                      Items
                    </span>

                    <span className="text-black">
                      {order.itemCount}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">
                      Total
                    </span>

                    <span className="font-semibold text-black">
                      {order.currency}{" "}
                      {Number(order.total || 0).toFixed(2)}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/my-account/orders/${order.id}`}
                  className="mt-5 inline-flex w-full items-center justify-center bg-black px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white transition hover:opacity-80"
                >
                  View Order
                </Link>
              </div>
            ))}
          </div>

          {/* Desktop */}
          <div className="hidden overflow-x-auto border border-gray-200 bg-white md:block">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-black">
                    Order
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-black">
                    Date
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-black">
                    Status
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-black">
                    Total
                  </th>

                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-black">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t border-gray-200"
                  >
                    <td className="px-5 py-5 text-sm font-semibold text-black">
                      #{order.number}
                    </td>

                    <td className="px-5 py-5 text-sm text-gray-600">
                      {formatDate(order.dateCreated)}
                    </td>

                    <td className="px-5 py-5">
                      <span className="inline-flex bg-gray-100 px-3 py-1 text-xs font-medium text-black">
                        {formatStatus(order.status)}
                      </span>
                    </td>

                    <td className="px-5 py-5 text-sm text-black">
                      <span className="font-semibold">
                        {order.currency}{" "}
                        {Number(order.total || 0).toFixed(2)}
                      </span>

                      <span className="block text-xs text-gray-500">
                        {order.itemCount}{" "}
                        {order.itemCount === 1
                          ? "item"
                          : "items"}
                      </span>
                    </td>

                    <td className="px-5 py-5">
                      <Link
                        href={`/my-account/orders/${order.id}`}
                        className="inline-flex bg-black px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:opacity-80"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}