import { NextResponse } from "next/server";
import { createSessionToken } from "@/lib/auth";

export const runtime = "nodejs";

const WORDPRESS_URL = "https://admin.perkinssteel.com";

interface WordPressLoginResponse {
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

    const login =
      typeof body.login === "string" ? body.login.trim() : "";

    const password =
      typeof body.password === "string" ? body.password : "";

    if (!login || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email/username and password are required.",
        },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/perkins/v1/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login,
          password,
        }),
        cache: "no-store",
      }
    );

    const data: WordPressLoginResponse = await response.json();

    if (!response.ok || !data.success || !data.user) {
      return NextResponse.json(
        {
          success: false,
          message:
            data.message || "Invalid email/username or password.",
        },
        { status: response.status || 401 }
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

    const token = await createSessionToken({
      user,
    });

    const nextResponse = NextResponse.json({
      success: true,
      user,
    });

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
    console.error("Login API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to login. Please try again.",
      },
      { status: 500 }
    );
  }
}