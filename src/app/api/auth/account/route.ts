import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  createSessionToken,
  verifySessionToken,
  type AuthUser,
} from "@/lib/auth";

const WP_API =
  "https://admin.perkinssteel.com/wp-json/perkins/v1";

export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies();

    const token =
      cookieStore.get("perkins_session")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthenticated.",
        },
        { status: 401 }
      );
    }

    const session =
      await verifySessionToken(token);

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid session.",
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    const firstName =
      String(body?.firstName ?? "").trim();

    const lastName =
      String(body?.lastName ?? "").trim();

    const displayName =
      String(body?.displayName ?? "").trim();

    const email =
      String(body?.email ?? "")
        .trim()
        .toLowerCase();

    const password =
      String(body?.password ?? "");

    if (
      !firstName ||
      !lastName ||
      !email
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "First name, last name and email are required.",
        },
        { status: 400 }
      );
    }

    if (
      password &&
      password.length < 8
    ) {
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
      `${WP_API}/account`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
            "X-Perkins-Secret":
            process.env.PERKINS_HEADLESS_SECRET!,
        },

        body: JSON.stringify({
          user_id: session.user.id,
          first_name: firstName,
          last_name: lastName,
          display_name:
            displayName ||
            `${firstName} ${lastName}`,
          email,
          password,
        }),

        cache: "no-store",
      }
    );

    const wpData =
      await wpResponse.json();

    if (!wpResponse.ok) {
      return NextResponse.json(
        {
          success: false,

          message:
            wpData?.message ||
            "Unable to update account.",
        },
        { status: wpResponse.status }
      );
    }

    const wpUser = wpData.user;

    const user: AuthUser = {
      id: wpUser.id,
      email: wpUser.email,
      username: wpUser.username,

      displayName:
        wpUser.display_name,

      firstName:
        wpUser.first_name,

      lastName:
        wpUser.last_name,

      roles:
        wpUser.roles ?? [],
    };

    /*
     * Issue a fresh session because the old
     * cookie contains the previous user data.
     */
    const newToken =
      await createSessionToken({
        user,
      });

    const response =
      NextResponse.json({
        success: true,
        message:
          "Account details updated successfully.",
        user,
      });

    response.cookies.set({
      name: "perkins_session",
      value: newToken,
      httpOnly: true,
      secure:
        process.env.NODE_ENV ===
        "production",
      sameSite: "lax",
      path: "/",
      maxAge:
        60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error(
      "Account update error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to update account.",
      },
      { status: 500 }
    );
  }
}