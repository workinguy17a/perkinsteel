import crypto from "crypto";

export const runtime = "nodejs";

const WC_API =
  "http://admin.perkinssteel.com/wp-json/wc/v3";

function encode(value: string) {
  return encodeURIComponent(value)
    .replace(/!/g, "%21")
    .replace(/'/g, "%27")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/\*/g, "%2A");
}

function createOAuthUrl(
  endpoint: string
) {
  const consumerKey =
    process.env.WC_CONSUMER_KEY;

  const consumerSecret =
    process.env.WC_CONSUMER_SECRET;

  if (
    !consumerKey ||
    !consumerSecret
  ) {
    throw new Error(
      "WooCommerce credentials missing"
    );
  }

  const url =
    `${WC_API}${endpoint}`;

  const oauthParams: Record<
    string,
    string
  > = {
    oauth_consumer_key:
      consumerKey,

    oauth_nonce:
      crypto
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
    `${encode(
      consumerSecret
    )}&`;

  const signature =
    crypto
      .createHmac(
        "sha256",
        signingKey
      )
      .update(
        signatureBaseString
      )
      .digest("base64");

  const query =
    new URLSearchParams({
      ...oauthParams,
      oauth_signature:
        signature,
    });

  return `${url}?${query.toString()}`;
}

export async function GET() {
  try {
    const url =
      createOAuthUrl(
        "/payment_gateways"
      );

    const response =
      await fetch(url, {
        method: "GET",
        headers: {
          Accept:
            "application/json",
        },
        cache: "no-store",
      });

    const data =
      await response.json();

    if (!response.ok) {
      console.error(
        "Woo payment methods:",
        data
      );

      return Response.json(
        data,
        {
          status:
            response.status,
        }
      );
    }

    const enabledGateways =
      data
        .filter(
          (gateway: any) =>
            gateway.enabled === true
        )
        .sort(
          (
            a: any,
            b: any
          ) =>
            a.order - b.order
        )
        .map(
          (gateway: any) => ({
            id: gateway.id,
            title:
              gateway.title,
            description:
              gateway.description,
          })
        );

    return Response.json(
      enabledGateways
    );
  } catch (error: any) {
    console.error(
      "Payment methods error:",
      error
    );

    return Response.json(
      {
        message:
          error?.message ??
          "Unable to load payment methods",
      },
      {
        status: 500,
      }
    );
  }
}