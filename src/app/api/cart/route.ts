import { NextResponse } from "next/server";

const STORE_API = "http://admin.perkinssteel.com/wp-json/wc/store/v1";

export async function GET() {
  const response = await fetch(`${STORE_API}/cart`, {
    method: "GET",
    cache: "no-store",
  });

  const data = await response.json();

  const nextResponse = NextResponse.json(data, {
    status: response.status,
  });

  const cartToken = response.headers.get("Cart-Token");

  if (cartToken) {
    nextResponse.headers.set("Cart-Token", cartToken);
  }

  return nextResponse;
}

export async function POST(request: Request) {
  const body = await request.json();
  const cartToken = request.headers.get("Cart-Token");

  const nonce = request.headers.get("Nonce");

const response = await fetch(`${STORE_API}/cart/add-item`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    ...(cartToken ? { "Cart-Token": cartToken } : {}),
    ...(nonce ? { Nonce: nonce } : {}),
  },
  body: JSON.stringify(body),
  cache: "no-store",
});

  const data = await response.json();

  const nextResponse = NextResponse.json(data, {
    status: response.status,
  });

  const newCartToken = response.headers.get("Cart-Token");

  if (newCartToken) {
    nextResponse.headers.set("Cart-Token", newCartToken);
  }

  return nextResponse;
}