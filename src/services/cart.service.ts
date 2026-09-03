const CART_TOKEN_KEY =
  "woo_cart_token";

class CartService {
  private getStoredToken() {
    if (
      typeof window === "undefined"
    ) {
      return null;
    }

    return localStorage.getItem(
      CART_TOKEN_KEY
    );
  }

  private saveToken(
    token: string | null
  ) {
    if (
      typeof window !== "undefined" &&
      token
    ) {
      localStorage.setItem(
        CART_TOKEN_KEY,
        token
      );
    }
  }

  private notifyCartUpdated(cart: any) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("cart-updated", {
        detail: cart,
      })
    );
  }
}

  async getCart() {
    const token =
      this.getStoredToken();

    const response = await fetch(
      "/api/cart",
      {
        method: "GET",
        headers: token
          ? {
              "Cart-Token": token,
            }
          : {},
        cache: "no-store",
      }
    );

    const cartToken =
      response.headers.get(
        "Cart-Token"
      );

    this.saveToken(cartToken);

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data?.message ??
          "Unable to load cart"
      );
    }

    this.notifyCartUpdated(data);

    return data;
  }

  async addItem(
    productId: number,
    quantity = 1
  ) {
    let token =
      this.getStoredToken();

    if (!token) {
      await this.getCart();

      token =
        this.getStoredToken();
    }

    const response = await fetch(
      "/api/cart",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
          ...(token
            ? {
                "Cart-Token":
                  token,
              }
            : {}),
        },
        body: JSON.stringify({
          action: "add",
          id: productId,
          quantity,
        }),
        cache: "no-store",
      }
    );

    const cartToken =
      response.headers.get(
        "Cart-Token"
      );

    this.saveToken(cartToken);

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data?.message ??
          "Unable to add product to cart"
      );
    }

    this.notifyCartUpdated(data);

    return data;
  }

  async updateItem(
  key: string,
  quantity: number
) {
  const token = this.getStoredToken();

  const response = await fetch("/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token
        ? { "Cart-Token": token }
        : {}),
    },
    body: JSON.stringify({
      action: "update",
      key,
      quantity,
    }),
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message ??
        "Unable to update cart"
    );
  }

  this.notifyCartUpdated(data);

  return data;
}

async removeItem(key: string) {
  const token = this.getStoredToken();

  const response = await fetch("/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token
        ? { "Cart-Token": token }
        : {}),
    },
    body: JSON.stringify({
      action: "remove",
      key,
    }),
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message ??
        "Unable to remove product"
    );
  }

  this.notifyCartUpdated(data);

  return data;
}
async checkout(payload: any) {
  const token =
    this.getStoredToken();

  if (!token) {
    throw new Error(
      "Cart session not found"
    );
  }

  const response = await fetch(
    "/api/checkout",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
        "Cart-Token": token,
      },
      body: JSON.stringify(
        payload
      ),
      cache: "no-store",
    }
  );

  const data =
    await response.json();

  if (!response.ok) {
    console.error(
      "Checkout error:",
      data
    );

    throw new Error(
      data?.message ??
        "Unable to place order"
    );
  }

  return data;
}

async updateCustomer(
  billingAddress: any,
  shippingAddress: any
) {
  const token = this.getStoredToken();

  const response = await fetch("/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token
        ? { "Cart-Token": token }
        : {}),
    },
    body: JSON.stringify({
      action: "customer",
      billing_address: billingAddress,
      shipping_address: shippingAddress,
    }),
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message ??
        "Unable to update checkout address"
    );
  }

  this.notifyCartUpdated(data);

  return data;
}

async selectShippingRate(
  packageId: number,
  rateId: string
) {
  const token = this.getStoredToken();

  const response = await fetch("/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token
        ? { "Cart-Token": token }
        : {}),
    },
    body: JSON.stringify({
      action: "shipping",
      package_id: packageId,
      rate_id: rateId,
    }),
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message ??
        "Unable to select shipping method"
    );
  }

  this.notifyCartUpdated(data);

  return data;
}
}

export default new CartService();