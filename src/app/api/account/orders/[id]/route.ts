import crypto from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/auth";

export const runtime = "nodejs";

const WC_API =
  "https://admin.perkinssteel.com/wp-json/wc/v3";

function encode(value: string) {
  return encodeURIComponent(value)
    .replace(/!/g, "%21")
    .replace(/'/g, "%27")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/\*/g, "%2A");
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    /*
     * Verify logged-in customer.
     */
    const cookieStore = await cookies();
    const token = cookieStore.get("perkins_session")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthenticated." },
        { status: 401 }
      );
    }

    const session = await verifySessionToken(token);

    if (!session) {
      return NextResponse.json(
        { message: "Invalid session." },
        { status: 401 }
      );
    }

    if (!/^\d+$/.test(id)) {
      return NextResponse.json(
        { message: "Invalid order." },
        { status: 400 }
      );
    }

    const consumerKey = process.env.WC_CONSUMER_KEY;
    const consumerSecret = process.env.WC_CONSUMER_SECRET;

    if (!consumerKey || !consumerSecret) {
      return NextResponse.json(
        {
          message:
            "WooCommerce credentials are not configured.",
        },
        { status: 500 }
      );
    }

    /*
     * Get the requested WooCommerce order.
     */
    const url = `${WC_API}/orders/${id}`;

    const oauthParams: Record<string, string> = {
      oauth_consumer_key: consumerKey,
      oauth_nonce: crypto.randomBytes(16).toString("hex"),
      oauth_signature_method: "HMAC-SHA256",
      oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    };

    const parameterString = Object.keys(oauthParams)
      .sort()
      .map(
        (key) =>
          `${encode(key)}=${encode(oauthParams[key])}`
      )
      .join("&");

    const signatureBaseString = [
      "GET",
      encode(url),
      encode(parameterString),
    ].join("&");

    const signingKey = `${encode(consumerSecret)}&`;

    const oauthSignature = crypto
      .createHmac("sha256", signingKey)
      .update(signatureBaseString)
      .digest("base64");

    const query = new URLSearchParams({
      ...oauthParams,
      oauth_signature: oauthSignature,
    });

    const response = await fetch(
      `${url}?${query.toString()}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const text = await response.text();

    let order: any = null;

    if (text) {
      try {
        order = JSON.parse(text);
      } catch {
        console.error(
          "WooCommerce order invalid JSON:",
          text
        );
      }
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          message:
            order?.message || "Unable to load order.",
        },
        { status: response.status }
      );
    }

    /*
     * CRITICAL:
     * The order must belong to the logged-in customer.
     */
    if (
      Number(order.customer_id) !==
      Number(session.user.id)
    ) {
      return NextResponse.json(
        { message: "Order not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: order.id,
      number: order.number,
      status: order.status,
      dateCreated: order.date_created,

      currency: order.currency,

      paymentMethod:
        order.payment_method_title || "",

      subtotal:
        order.line_items?.reduce(
          (total: number, item: any) =>
            total + Number(item.subtotal || 0),
          0
        ) ?? 0,

      discountTotal: order.discount_total,
      shippingTotal: order.shipping_total,
      totalTax: order.total_tax,
      total: order.total,

      customerNote: order.customer_note,

      billing: order.billing,
      shipping: order.shipping,

      lineItems:
        order.line_items?.map((item: any) => ({
          id: item.id,
          productId: item.product_id,
          variationId: item.variation_id,
          name: item.name,
          quantity: item.quantity,
          subtotal: item.subtotal,
          total: item.total,
          sku: item.sku,
          image: item.image
            ? {
                src: item.image.src || "",
                alt: item.image.alt || item.name,
              }
            : null,
        })) ?? [],
    });
  } catch (error) {
    console.error(
      "Account order detail API error:",
      error
    );

    return NextResponse.json(
      { message: "Unable to load order." },
      { status: 500 }
    );
  }
}