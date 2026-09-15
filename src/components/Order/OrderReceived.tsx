"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

interface Props {
  orderId: string;
  orderKey: string;
}

export default function OrderReceived({
  orderId,
  orderKey,
}: Props) {
  const [order, setOrder] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const response = await fetch(
            `/api/orders/${orderId}?key=${encodeURIComponent(
                orderKey
            )}`,
            {
                cache: "no-store",
            }
            );

            const text = await response.text();

            let data: any = null;

            if (text) {
            try {
                data = JSON.parse(text);
            } catch {
                console.error(
                "Invalid order API response:",
                text
                );
            }
            }

            if (!response.ok) {
            throw new Error(
                data?.message ||
                `Unable to load order (${response.status})`
            );
            }

            if (!data) {
            throw new Error(
                "Order API returned an empty response."
            );
            }

        setOrder(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Unable to load order"
        );
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId, orderKey]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        Loading your order...
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">
          Unable to load order
        </h1>

        <p className="mt-2 text-gray-600">
          {error}
        </p>
      </div>
    );
  }

  const formatPrice = (
    value: string | number
  ) => {
    return `${order.currency} ${Number(
      value || 0
    ).toFixed(2)}`;
  };

  return (
    <main className="bg-white">

      {/* SUCCESS */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-5xl px-4">

          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-600">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-10 w-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-[#a71920]">
              Order Confirmed
            </p>

            <h1 className="mt-2 text-3xl font-bold lg:text-4xl">
              Thank you for your order!
            </h1>

            <p className="mt-3 text-gray-600">
              Your order has been received and is
              now being processed.
            </p>
          </div>


          {/* ORDER META */}

          <div className="mt-10 flex flex-col border border-gray-200 sm:flex-row">

            <div className="flex-1 border-b border-gray-200 p-5 sm:border-b-0 sm:border-r">
              <span className="text-xs uppercase text-gray-500">
                Order Number
              </span>

              <strong className="mt-1 block">
                #{order.id}
              </strong>
            </div>

            <div className="flex-1 border-b border-gray-200 p-5 sm:border-b-0 sm:border-r">
              <span className="text-xs uppercase text-gray-500">
                Date
              </span>

              <strong className="mt-1 block">
                {new Date(
                  order.date_created
                ).toLocaleDateString()}
              </strong>
            </div>

            <div className="flex-1 p-5">
              <span className="text-xs uppercase text-gray-500">
                Payment
              </span>

              <strong className="mt-1 block">
                {order.payment_method_title ||
                  "N/A"}
              </strong>
            </div>

          </div>


          {/* ORDER DETAILS */}

          <div className="mt-10 border border-gray-200">

            <div className="border-b border-gray-200 bg-gray-50 px-5 py-4 sm:px-6">
              <h2 className="text-xl font-bold">
                Order Details
              </h2>
            </div>


            {/* PRODUCTS */}

            <div className="divide-y divide-gray-200">

              {order.line_items?.map(
                (item: any) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 px-5 py-5 sm:px-6"
                  >
                    <div>
                      <h3 className="font-semibold">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Quantity:{" "}
                        {item.quantity}
                      </p>
                    </div>

                    <strong>
                      {formatPrice(
                        item.total
                      )}
                    </strong>
                  </div>
                )
              )}

            </div>


            {/* TOTALS */}

            <div className="border-t border-gray-200 bg-gray-50 px-5 py-5 sm:px-6">

              <div className="flex justify-between py-2 text-sm">
                <span>Subtotal</span>

                <strong>
                  {formatPrice(
                    order.line_items?.reduce(
                      (
                        total: number,
                        item: any
                      ) =>
                        total +
                        Number(
                          item.subtotal
                        ),
                      0
                    ) ?? 0
                  )}
                </strong>
              </div>

              <div className="flex justify-between py-2 text-sm">
                <span>Shipping</span>

                <strong>
                  {formatPrice(
                    order.shipping_total
                  )}
                </strong>
              </div>

              <div className="flex justify-between py-2 text-sm">
                <span>Tax</span>

                <strong>
                  {formatPrice(
                    order.total_tax
                  )}
                </strong>
              </div>

              {Number(
                order.discount_total
              ) > 0 && (
                <div className="flex justify-between py-2 text-sm">
                  <span>Discount</span>

                  <strong>
                    -
                    {formatPrice(
                      order.discount_total
                    )}
                  </strong>
                </div>
              )}

              <div className="mt-3 flex justify-between border-t border-gray-300 pt-4 text-lg">
                <span className="font-bold">
                  Total
                </span>

                <strong className="text-[#a71920]">
                  {formatPrice(
                    order.total
                  )}
                </strong>
              </div>

            </div>

          </div>


          {/* ADDRESSES */}

          <div className="mt-10 flex flex-col gap-6 lg:flex-row">

            <AddressBlock
              title="Billing Address"
              address={order.billing}
              showContact
            />

            <AddressBlock
              title="Shipping Address"
              address={order.shipping}
            />

          </div>


          {/* ACTION */}

          <div className="mt-10 text-center">
            <Link
              href="/shop"
              className="inline-flex min-h-12 items-center justify-center bg-[#a71920] px-8 text-sm font-semibold text-white transition hover:bg-[#89151b]"
            >
              Continue Shopping
            </Link>
          </div>

        </div>
      </section>

    </main>
  );
}


function AddressBlock({
  title,
  address,
  showContact = false,
}: {
  title: string;
  address: any;
  showContact?: boolean;
}) {
  if (!address) return null;

  return (
    <div className="flex-1 border border-gray-200">

      <div className="border-b border-gray-200 bg-gray-50 px-5 py-4">
        <h2 className="font-bold">
          {title}
        </h2>
      </div>

      <div className="space-y-1 p-5 text-sm leading-6 text-gray-600">

        <p className="font-semibold text-black">
          {address.first_name}{" "}
          {address.last_name}
        </p>

        {address.company && (
          <p>{address.company}</p>
        )}

        {address.address_1 && (
          <p>{address.address_1}</p>
        )}

        {address.address_2 && (
          <p>{address.address_2}</p>
        )}

        <p>
          {[
            address.city,
            address.state,
            address.postcode,
          ]
            .filter(Boolean)
            .join(", ")}
        </p>

        {address.country && (
          <p>{address.country}</p>
        )}

        {showContact &&
          address.phone && (
            <p className="pt-2">
              <strong>Phone:</strong>{" "}
              {address.phone}
            </p>
          )}

        {showContact &&
          address.email && (
            <p>
              <strong>Email:</strong>{" "}
              {address.email}
            </p>
          )}

      </div>
    </div>
  );
}