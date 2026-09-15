import crypto from "crypto";

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
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await params;

    const requestUrl = new URL(request.url);
    const orderKey =
      requestUrl.searchParams.get("key");

    if (!orderKey) {
      return Response.json(
        {
          message: "Order key is required",
        },
        {
          status: 400,
        }
      );
    }

    const consumerKey =
      process.env.WC_CONSUMER_KEY;

    const consumerSecret =
      process.env.WC_CONSUMER_SECRET;

    if (!consumerKey || !consumerSecret) {
      return Response.json(
        {
          message:
            "WooCommerce credentials missing",
        },
        {
          status: 500,
        }
      );
    }

    const url =
      `${WC_API}/orders/${id}`;

    const oauthParams: Record<
      string,
      string
    > = {
      oauth_consumer_key:
        consumerKey,

      oauth_nonce: crypto
        .randomBytes(16)
        .toString("hex"),

      oauth_signature_method:
        "HMAC-SHA256",

      oauth_timestamp:
        Math.floor(
          Date.now() / 1000
        ).toString(),
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

    const signature = crypto
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
          signature,
      });

    const wooResponse =
      await fetch(
        `${url}?${query.toString()}`,
        {
          method: "GET",

          headers: {
            Accept:
              "application/json",
          },

          cache: "no-store",
        }
      );

    const text =
      await wooResponse.text();

    console.log(
      "Woo order status:",
      wooResponse.status
    );

    console.log(
      "Woo order response:",
      text
    );

    let order: any;

    try {
      order = JSON.parse(text);
    } catch {
      return Response.json(
        {
          message:
            "WooCommerce returned an invalid response",
          status:
            wooResponse.status,
          response: text,
        },
        {
          status: 502,
        }
      );
    }

    if (!wooResponse.ok) {
      return Response.json(
        {
          message:
            order?.message ||
            "Unable to load WooCommerce order",
          wooStatus:
            wooResponse.status,
        },
        {
          status: wooResponse.status,
        }
      );
    }

    // Security check
    if (
      order.order_key !== orderKey
    ) {
      return Response.json(
        {
          message:
            "Invalid order key",
        },
        {
          status: 403,
        }
      );
    }

    return Response.json({
      id: order.id,

      status:
        order.status,

      date_created:
        order.date_created,

      currency:
        order.currency,

      payment_method_title:
        order.payment_method_title,

      billing:
        order.billing,

      shipping:
        order.shipping,

      line_items:
        order.line_items,

      shipping_lines:
        order.shipping_lines,

      discount_total:
        order.discount_total,

      shipping_total:
        order.shipping_total,

      total_tax:
        order.total_tax,

      total:
        order.total,
    });
  } catch (error) {
    console.error(
      "Order API error:",
      error
    );

    return Response.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unable to load order",
      },
      {
        status: 500,
      }
    );
  }
}