import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";
import crypto from "crypto";
const STORE_API =
  "https://admin.perkinssteel.com/wp-json/wc/store/v1";

const WC_API =
  "https://admin.perkinssteel.com/wp-json/wc/v3";

function oauthEncode(value: string) {
  return encodeURIComponent(value)
    .replace(/!/g, "%21")
    .replace(/'/g, "%27")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/\*/g, "%2A");
}
export async function GET(request: Request) {
  try {
    const cartToken =
      request.headers.get("Cart-Token");

    const response = await fetch(
      `${STORE_API}/checkout`,
      {
        method: "GET",
        headers: {
          ...(cartToken
            ? { "Cart-Token": cartToken }
            : {}),
        },
        cache: "no-store",
      }
    );

    const data = await response.json();

    return Response.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error(
      "Checkout GET error:",
      error
    );

    return Response.json(
      {
        message:
          "Unable to load checkout",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body =
      await request.json();

    const cookieStore =
      await cookies();

    const sessionToken =
      cookieStore.get(
        "perkins_session"
      )?.value;

    const session =
      sessionToken
        ? await verifySessionToken(
            sessionToken
          )
        : null; 

    const cartToken =
      request.headers.get("Cart-Token");

    const response = await fetch(
      `${STORE_API}/checkout`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
          ...(cartToken
            ? {
                "Cart-Token":
                  cartToken,
              }
            : {}),
        },
        body: JSON.stringify(body),
        cache: "no-store",
      }
    );

    const responseText =
      await response.text();

    console.log(
      "Woo checkout status:",
      response.status
    );

    console.log(
      "Woo checkout response:",
      responseText
    );

    let data: any;

    try {
      data =
        JSON.parse(responseText);
    } catch {
      data = {
        message: responseText,
      };
    }
    if (
        response.ok &&
        data?.order_id &&
        session?.user?.id
      ) {
        try {
          await assignOrderToCustomer(
            data.order_id,
            session.user.id
          );
        } catch (error) {
          console.error(
            "Unable to assign order to customer:",
            error
          );
        }
      }
    return Response.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error(
      "Checkout POST error:",
      error
    );

    return Response.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Checkout failed",
      },
      {
        status: 500,
      }
    );
  }
}

async function assignOrderToCustomer(
  orderId: number,
  customerId: number
) {
  const consumerKey =
    process.env.WC_CONSUMER_KEY;

  const consumerSecret =
    process.env.WC_CONSUMER_SECRET;

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      "WooCommerce credentials are not configured."
    );
  }

  const url =
    `${WC_API}/orders/${orderId}`;

  const oauthParams: Record<string, string> = {
    oauth_consumer_key: consumerKey,

    oauth_nonce:
      crypto.randomBytes(16).toString("hex"),

    oauth_signature_method:
      "HMAC-SHA256",

    oauth_timestamp:
      Math.floor(Date.now() / 1000).toString(),
  };

  const parameterString =
    Object.keys(oauthParams)
      .sort()
      .map(
        (key) =>
          `${oauthEncode(key)}=${oauthEncode(
            oauthParams[key]
          )}`
      )
      .join("&");

  const signatureBaseString = [
    "PUT",
    oauthEncode(url),
    oauthEncode(parameterString),
  ].join("&");

  const signingKey =
    `${oauthEncode(consumerSecret)}&`;

  const oauthSignature = crypto
    .createHmac(
      "sha256",
      signingKey
    )
    .update(signatureBaseString)
    .digest("base64");

  const query =
    new URLSearchParams({
      ...oauthParams,
      oauth_signature:
        oauthSignature,
    });

  const response =
    await fetch(
      `${url}?${query.toString()}`,
      {
        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          customer_id: customerId,
        }),

        cache: "no-store",
      }
    );

  const responseText =
    await response.text();

  if (!response.ok) {
    throw new Error(
      `WooCommerce customer assignment failed: ${responseText}`
    );
  }

  return responseText
    ? JSON.parse(responseText)
    : null;
}