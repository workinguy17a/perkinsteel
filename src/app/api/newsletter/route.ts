import { NextResponse } from "next/server";

const WORDPRESS_URL =
  process.env.WORDPRESS_URL ||
  "https://admin.perkinssteel.com";

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const email =
      typeof body.email === "string"
        ? body.email.trim()
        : "";

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required.",
        },
        {
          status: 400,
        }
      );
    }

    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/newsletter/v2/subscriptions`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
        }),

        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(
        "Newsletter API error:",
        data
      );

      return NextResponse.json(
        {
          success: false,
          message:
            data?.message ||
            "Unable to subscribe.",
        },
        {
          status: response.status,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Thank you for subscribing.",
      data,
    });
  } catch (error) {
    console.error(
      "Newsletter subscription error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to subscribe. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}