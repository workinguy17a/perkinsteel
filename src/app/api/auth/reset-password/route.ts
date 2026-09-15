import { NextResponse } from "next/server";

const WP_API =
  "https://admin.perkinssteel.com/wp-json/perkins/v1";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const login = String(
      body?.login ?? ""
    ).trim();

    const key = String(
      body?.key ?? ""
    ).trim();

    const password = String(
      body?.password ?? ""
    );

    if (
      !login ||
      !key ||
      !password
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid password reset request.",
        },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Password must be at least 8 characters.",
        },
        { status: 400 }
      );
    }

    const wpResponse = await fetch(
      `${WP_API}/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
          "X-Perkins-Secret":
            process.env.PERKINS_HEADLESS_SECRET!,
        },
        body: JSON.stringify({
          login,
          key,
          password,
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
      "Reset password error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to reset password.",
      },
      { status: 500 }
    );
  }
}