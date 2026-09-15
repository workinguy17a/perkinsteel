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

async function updateWooCustomer(
  customerId: number,
  body: Record<string, any>
) {
  const consumerKey = process.env.WC_CONSUMER_KEY;
  const consumerSecret = process.env.WC_CONSUMER_SECRET;

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      "WooCommerce credentials are not configured."
    );
  }

  const url = `${WC_API}/customers/${customerId}`;

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
    "PUT",
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
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message || "Unable to update customer."
    );
  }

  return data;
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token =
      cookieStore.get("perkins_session")?.value;

    if (!token) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    const session =
      await verifySessionToken(token);

    if (!session) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      );
    }

    const consumerKey =
      process.env.WC_CONSUMER_KEY;

    const consumerSecret =
      process.env.WC_CONSUMER_SECRET;

    if (!consumerKey || !consumerSecret) {
      return NextResponse.json(
        {
          message:
            "WooCommerce credentials are not configured.",
        },
        { status: 500 }
      );
    }

    const url =
      `${WC_API}/customers/${session.user.id}`;

    const oauthParams: Record<string, string> = {
      oauth_consumer_key: consumerKey,
      oauth_nonce:
        crypto.randomBytes(16).toString("hex"),
      oauth_signature_method: "HMAC-SHA256",
      oauth_timestamp:
        Math.floor(Date.now() / 1000).toString(),
    };

    const parameterString =
      Object.keys(oauthParams)
        .sort()
        .map(
          (key) =>
            `${encode(key)}=${encode(
              oauthParams[key]
            )}`
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
        cache: "no-store",
      }
    );

    const customer = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          message:
            customer?.message ||
            "Unable to load customer.",
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      authenticated: true,

      customer: {
        id: customer.id,

        first_name:
          customer.first_name || "",

        last_name:
          customer.last_name || "",

        email:
          customer.email || "",

        billing: customer.billing || {},

        shipping: customer.shipping || {},
      },
    });
  } catch (error) {
    console.error(
      "Customer API error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Unable to load customer.",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies();

    const token =
      cookieStore.get("perkins_session")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthenticated." },
        { status: 401 }
      );
    }

    const session =
      await verifySessionToken(token);

    if (!session) {
      return NextResponse.json(
        { message: "Invalid session." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const billing = body?.billing ?? {};
    const shipping = body?.shipping ?? {};

    const customer =
      await updateWooCustomer(
        session.user.id,
        {
          billing: {
            first_name:
              billing.first_name || "",
            last_name:
              billing.last_name || "",
            company:
              billing.company || "",
            address_1:
              billing.address_1 || "",
            address_2:
              billing.address_2 || "",
            city:
              billing.city || "",
            state:
              billing.state || "",
            postcode:
              billing.postcode || "",
            country:
              billing.country || "",
            email:
              billing.email ||
              session.user.email ||
              "",
            phone:
              billing.phone || "",
          },

          shipping: {
            first_name:
              shipping.first_name || "",
            last_name:
              shipping.last_name || "",
            company:
              shipping.company || "",
            address_1:
              shipping.address_1 || "",
            address_2:
              shipping.address_2 || "",
            city:
              shipping.city || "",
            state:
              shipping.state || "",
            postcode:
              shipping.postcode || "",
            country:
              shipping.country || "",
          },
        }
      );

    return NextResponse.json({
      success: true,

      customer: {
        id: customer.id,
        billing: customer.billing || {},
        shipping: customer.shipping || {},
      },
    });
  } catch (error) {
    console.error(
      "Customer address update error:",
      error
    );

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unable to update addresses.",
      },
      { status: 500 }
    );
  }
}