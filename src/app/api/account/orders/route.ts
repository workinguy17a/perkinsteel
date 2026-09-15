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

export async function GET() {
  try {
    /*
     * 1. Verify logged-in customer.
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

    const customerId = session.user.id;

    /*
     * 2. WooCommerce credentials.
     */
    const consumerKey = process.env.WC_CONSUMER_KEY;
    const consumerSecret = process.env.WC_CONSUMER_SECRET;

    if (!consumerKey || !consumerSecret) {
      return NextResponse.json(
        { message: "WooCommerce credentials are not configured." },
        { status: 500 }
      );
    }

    /*
     * 3. Build WooCommerce REST request.
     */
    const url = `${WC_API}/orders`;

    const oauthParams: Record<string, string> = {
      oauth_consumer_key: consumerKey,
      oauth_nonce: crypto.randomBytes(16).toString("hex"),
      oauth_signature_method: "HMAC-SHA256",
      oauth_timestamp: Math.floor(Date.now() / 1000).toString(),

      // WooCommerce query parameters must participate
      // in the OAuth signature.
      customer: String(customerId),
      per_page: "20",
      orderby: "date",
      order: "desc",
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

    const signingKey =
      `${encode(consumerSecret)}&`;

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

    let data: any = null;

    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        console.error(
          "WooCommerce orders invalid JSON:",
          text
        );
      }
    }

    if (!response.ok) {
      console.error(
        "WooCommerce orders error:",
        response.status,
        data || text
      );

      return NextResponse.json(
        {
          message:
            data?.message ||
            "Unable to load your orders.",
        },
        { status: response.status }
      );
    }

    if (!Array.isArray(data)) {
      return NextResponse.json(
        { message: "Invalid WooCommerce orders response." },
        { status: 500 }
      );
    }

    /*
     * Only return what the frontend needs.
     */
    const orders = data.map((order: any) => ({
      id: order.id,
      number: order.number,
      status: order.status,
      dateCreated: order.date_created,
      currency: order.currency,
      total: order.total,
      itemCount:
        order.line_items?.reduce(
          (total: number, item: any) =>
            total + Number(item.quantity || 0),
          0
        ) ?? 0,
    }));

    return NextResponse.json({
      orders,
    });
  } catch (error) {
    console.error("Account orders API error:", error);

    return NextResponse.json(
      { message: "Unable to load your orders." },
      { status: 500 }
    );
  }
}