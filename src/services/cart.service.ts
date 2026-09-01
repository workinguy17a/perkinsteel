const CART_TOKEN_KEY = "woo_cart_token";
const CART_NONCE_KEY = "woo_cart_nonce";

class CartService {
  private getStoredToken() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(CART_TOKEN_KEY);
  }

  private getStoredNonce() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(CART_NONCE_KEY);
  }

  private saveCartHeaders(response: Response) {
    if (typeof window === "undefined") return;

    const cartToken = response.headers.get("Cart-Token");
    const nonce = response.headers.get("Nonce");

    if (cartToken) {
      localStorage.setItem(CART_TOKEN_KEY, cartToken);
    }

    if (nonce) {
      localStorage.setItem(CART_NONCE_KEY, nonce);
    }
  }

  async getCart() {
    const response = await fetch("/api/cart", {
      method: "GET",
      cache: "no-store",
    });

    this.saveCartHeaders(response);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message ?? "Unable to load cart");
    }

    return data;
  }

  async addItem(productId: number, quantity = 1) {
    let token = this.getStoredToken();
    let nonce = this.getStoredNonce();

    if (!token || !nonce) {
      await this.getCart();
      token = this.getStoredToken();
      nonce = this.getStoredNonce();
    }

    const response = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "Cart-Token": token } : {}),
        ...(nonce ? { Nonce: nonce } : {}),
      },
      body: JSON.stringify({
        id: productId,
        quantity,
      }),
      cache: "no-store",
    });

    this.saveCartHeaders(response);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message ?? "Unable to add product to cart");
    }

    return data;
  }
}

export default new CartService();