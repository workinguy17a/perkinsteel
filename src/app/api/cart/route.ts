const STORE_API =
  "http://admin.perkinssteel.com/wp-json/wc/store/v1";

export async function GET(request: Request) {
  const cartToken = request.headers.get("Cart-Token");

  const response = await fetch(`${STORE_API}/cart`, {
    method: "GET",
    headers: cartToken
      ? { "Cart-Token": cartToken }
      : {},
    cache: "no-store",
  });

  const data = await response.json();

  const headers = new Headers();

  const newCartToken =
    response.headers.get("Cart-Token");

  if (newCartToken) {
    headers.set("Cart-Token", newCartToken);
  }

  return Response.json(data, {
    status: response.status,
    headers,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const cartToken =
      request.headers.get("Cart-Token");

    let endpoint = "";
    let payload: any = {};

    if (body.action === "add") {
      endpoint = "/cart/add-item";

      payload = {
        id: Number(body.id),
        quantity: Number(body.quantity ?? 1),
      };
    }

    if (body.action === "update") {
      endpoint = "/cart/update-item";

      payload = {
        key: body.key,
        quantity: Number(body.quantity),
      };
    }

    if (body.action === "remove") {
      endpoint = "/cart/remove-item";

      payload = {
        key: body.key,
      };
    }

    if (body.action === "customer") {
      endpoint = "/cart/update-customer";

      payload = {
        billing_address: body.billing_address,
        shipping_address: body.shipping_address,
      };
    }

    if (body.action === "shipping") {
      endpoint = "/cart/select-shipping-rate";

      payload = {
        package_id: body.package_id,
        rate_id: body.rate_id,
      };
    }

    if (!endpoint) {
      return Response.json(
        {
          message: "Invalid cart action",
          received: body,
        },
        {
          status: 400,
        }
      );
    }

    const response = await fetch(
      `${STORE_API}${endpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(cartToken
            ? {
                "Cart-Token": cartToken,
              }
            : {}),
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      }
    );

    const responseText =
      await response.text();

    console.log(
      "Woo cart status:",
      response.status
    );

    console.log(
      "Woo cart response:",
      responseText
    );

    let data: any;

    try {
      data = JSON.parse(responseText);
    } catch {
      data = {
        message: responseText,
      };
    }

    const headers = new Headers();

    const newCartToken =
      response.headers.get("Cart-Token");

    if (newCartToken) {
      headers.set(
        "Cart-Token",
        newCartToken
      );
    }

    return Response.json(data, {
      status: response.status,
      headers,
    });
  } catch (error) {
    console.error(
      "Cart route error:",
      error
    );

    return Response.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Cart request failed",
      },
      {
        status: 500,
      }
    );
  }
}