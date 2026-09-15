import { NextResponse } from "next/server";
import { createSessionToken } from "@/lib/auth";

export const runtime = "nodejs";

const WORDPRESS_URL = "https://admin.perkinssteel.com";

interface WordPressRegisterResponse {
  success: boolean;
  message?: string;
  user?: {
    id: number;
    email: string;
    username: string;
    display_name: string;
    first_name: string;
    last_name: string;
    roles: string[];
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const firstName =
      typeof body.firstName === "string" ? body.firstName.trim() : "";

    const lastName =
      typeof body.lastName === "string" ? body.lastName.trim() : "";

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const password =
      typeof body.password === "string" ? body.password : "";

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required fields.",
        },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 8 characters.",
        },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/perkins/v1/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           "X-Perkins-Secret":
            process.env.PERKINS_HEADLESS_SECRET!,
        },
        body: JSON.stringify({
          email,
          password,
          first_name: firstName,
          last_name: lastName,
        }),
        cache: "no-store",
      }
    );

    const data: WordPressRegisterResponse = await response.json();

    if (!response.ok || !data.success || !data.user) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Unable to create your account.",
        },
        { status: response.status || 400 }
      );
    }

    const user = {
      id: data.user.id,
      email: data.user.email,
      username: data.user.username,
      displayName: data.user.display_name,
      firstName: data.user.first_name,
      lastName: data.user.last_name,
      roles: data.user.roles,
    };

    /*
     * Automatically log the customer in after registration.
     */
    const token = await createSessionToken({
      user,
    });

    const nextResponse = NextResponse.json(
      {
        success: true,
        message: "Account created successfully.",
        user,
      },
      { status: 201 }
    );

    nextResponse.cookies.set({
      name: "perkins_session",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return nextResponse;
  } catch (error) {
    console.error("Register API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create your account. Please try again.",
      },
      { status: 500 }
    );
  }
}