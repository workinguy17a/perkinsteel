import OrderReceived from "@/components/Order/OrderReceived";

interface Props {
  searchParams: Promise<{
    order?: string;
    key?: string;
  }>;
}

export default async function OrderReceivedPage({
  searchParams,
}: Props) {
  const { order, key } =
    await searchParams;

  if (!order || !key) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">
          Invalid order
        </h1>

        <p className="mt-2 text-gray-600">
          We could not find your order details.
        </p>
      </div>
    );
  }

  return (
    <OrderReceived
      orderId={order}
      orderKey={key}
    />
  );
}