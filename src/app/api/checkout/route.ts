const STORE_API =
  "http://admin.perkinssteel.com/wp-json/wc/store/v1";

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