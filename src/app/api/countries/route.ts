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

export async function GET() {
  try {
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
      `${WC_API}/data/countries`;

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

    const response =
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
      await response.text();

    let data: any;

    try {
      data =
        JSON.parse(text);
    } catch {
      data = {
        message: text,
      };
    }

    console.log(
      "Countries status:",
      response.status
    );

    console.log(
      "Countries response:",
      data
    );

    return Response.json(
      data,
      {
        status:
          response.status,
      }
    );
  } catch (error: any) {
    console.error(
      "Countries error:",
      error
    );

    return Response.json(
      {
        message:
          error?.message ??
          "Unable to load countries",
      },
      {
        status: 500,
      }
    );
  }
}