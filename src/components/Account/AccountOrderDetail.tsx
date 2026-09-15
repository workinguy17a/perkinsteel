"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface OrderAddress {
  first_name?: string;
  last_name?: string;
  company?: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
  email?: string;
  phone?: string;
}

interface OrderItem {
  id: number;
  productId: number;
  variationId: number;
  name: string;
  quantity: number;
  subtotal: string;
  total: string;
  sku?: string;
  image?: {
    src: string;
    alt: string;
  } | null;
}

interface Order {
  id: number;
  number: string;
  status: string;
  dateCreated: string;

  currency: string;

  paymentMethod: string;

  subtotal: number;
  discountTotal: string;
  shippingTotal: string;
  totalTax: string;
  total: string;

  customerNote?: string;

  billing: OrderAddress;
  shipping: OrderAddress;

  lineItems: OrderItem[];
}

interface Props {
  orderId: string;
}

function formatPrice(
  currency: string,
  value: string | number
) {
  return `${currency} ${Number(value || 0).toFixed(2)}`;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-AE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

function formatStatus(value: string) {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

export default function AccountOrderDetail({
  orderId,
}: Props) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrder() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/account/orders/${orderId}`,
          {
            credentials: "include",
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message || "Unable to load order."
          );
        }

        setOrder(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Unable to load order."
        );
      } finally {
        setLoading(false);
      }
    }

    loadOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="border border-gray-200 bg-white p-6">
        <p className="text-sm text-gray-600">
          Loading order...
        </p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div>
        <div className="border border-red-200 bg-red-50 p-5">
          <p className="text-sm text-red-700">
            {error || "Order not found."}
          </p>
        </div>

        <Link
          href="/my-account/orders"
          className="mt-5 inline-flex bg-black px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white"
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0">
      <div className="mb-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-black md:text-3xl">
              Order #{order.number}
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Placed on {formatDate(order.dateCreated)}
            </p>
          </div>

          <span className="bg-gray-100 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-black">
            {formatStatus(order.status)}
          </span>
        </div>
      </div>

      {/* Products */}
      <div className="border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-5 py-4">
          <h3 className="text-lg font-semibold text-black">
            Order Details
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {order.lineItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 p-5"
            >
              {item.image?.src && (
                <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-gray-100">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt || item.name}
                    fill
                    sizes="80px"
                    className="object-contain"
                  />
                </div>
              )}

              <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium text-black">
                    {item.name}
                  </p>

                  {item.sku && (
                    <p className="mt-1 text-xs text-gray-500">
                      SKU: {item.sku}
                    </p>
                  )}

                  <p className="mt-1 text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold text-black">
                  {formatPrice(
                    order.currency,
                    item.total
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="border-t border-gray-200 p-5">
          <div className="ml-auto flex max-w-[420px] flex-col gap-3 text-sm">
            <TotalRow
              label="Subtotal"
              value={formatPrice(
                order.currency,
                order.subtotal
              )}
            />

            {Number(order.discountTotal) > 0 && (
              <TotalRow
                label="Discount"
                value={`-${formatPrice(
                  order.currency,
                  order.discountTotal
                )}`}
              />
            )}

            <TotalRow
              label="Shipping"
              value={formatPrice(
                order.currency,
                order.shippingTotal
              )}
            />

            {Number(order.totalTax) > 0 && (
              <TotalRow
                label="Tax"
                value={formatPrice(
                  order.currency,
                  order.totalTax
                )}
              />
            )}

            <div className="mt-2 flex items-center justify-between gap-5 border-t border-gray-200 pt-4">
              <span className="font-semibold text-black">
                Total
              </span>

              <span className="text-lg font-bold text-black">
                {formatPrice(
                  order.currency,
                  order.total
                )}
              </span>
            </div>

            {order.paymentMethod && (
              <TotalRow
                label="Payment method"
                value={order.paymentMethod}
              />
            )}
          </div>
        </div>
      </div>

      {/* Addresses */}
      <div className="mt-6 flex flex-col gap-6 md:flex-row">
        <AddressBlock
          title="Billing Address"
          address={order.billing}
        />

        <AddressBlock
          title="Shipping Address"
          address={order.shipping}
        />
      </div>

      {order.customerNote && (
        <div className="mt-6 border border-gray-200 bg-white p-5">
          <h3 className="font-semibold text-black">
            Order Note
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            {order.customerNote}
          </p>
        </div>
      )}

      <Link
        href="/my-account/orders"
        className="mt-7 inline-flex bg-black px-6 py-3 text-xs font-semibold uppercase tracking-wide text-white transition hover:opacity-80"
      >
        Back to Orders
      </Link>
    </div>
  );
}

function TotalRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between gap-5">
      <span className="text-gray-500">
        {label}
      </span>

      <span className="text-right font-medium text-black">
        {value}
      </span>
    </div>
  );
}

function AddressBlock({
  title,
  address,
}: {
  title: string;
  address: OrderAddress;
}) {
  const hasAddress =
    address?.first_name ||
    address?.last_name ||
    address?.address_1 ||
    address?.city;

  return (
    <div className="w-full border border-gray-200 bg-white p-5">
      <h3 className="text-lg font-semibold text-black">
        {title}
      </h3>

      {!hasAddress ? (
        <p className="mt-4 text-sm text-gray-500">
          No address available.
        </p>
      ) : (
        <div className="mt-4 text-sm leading-6 text-gray-600">
          <p className="font-medium text-black">
            {[address.first_name, address.last_name]
              .filter(Boolean)
              .join(" ")}
          </p>

          {address.company && <p>{address.company}</p>}
          {address.address_1 && <p>{address.address_1}</p>}
          {address.address_2 && <p>{address.address_2}</p>}

          {(address.city ||
            address.state ||
            address.postcode) && (
            <p>
              {[
                address.city,
                address.state,
                address.postcode,
              ]
                .filter(Boolean)
                .join(", ")}
            </p>
          )}

          {address.country && <p>{address.country}</p>}

          {address.email && (
            <p className="mt-3">
              Email: {address.email}
            </p>
          )}

          {address.phone && (
            <p>Phone: {address.phone}</p>
          )}
        </div>
      )}
    </div>
  );
}