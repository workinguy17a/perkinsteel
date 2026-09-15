import { NextResponse } from "next/server";

const WP_API =
  "https://admin.perkinssteel.com/wp-json/perkins/v1";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = String(
      body?.email ?? ""
    )
      .trim()
      .toLowerCase();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter your email address.",
        },
        { status: 400 }
      );
    }

    const wpResponse = await fetch(
      `${WP_API}/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
            "X-Perkins-Secret":
            process.env.PERKINS_HEADLESS_SECRET!,
        },
        body: JSON.stringify({
          email,
        }),
        cache: "no-store",
      }
    );

    const data =
      await wpResponse.json();

    return NextResponse.json(
      data,
      {
        status: wpResponse.status,
      }
    );
  } catch (error) {
    console.error(
      "Forgot password error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to process the password reset request.",
      },
      { status: 500 }
    );
  }
}