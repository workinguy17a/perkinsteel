import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();

  const token = cookieStore.get("perkins_session")?.value;

  if (!token) {
    return NextResponse.json(
      {
        authenticated: false,
        user: null,
      },
      { status: 401 }
    );
  }

  const session = await verifySessionToken(token);

  if (!session) {
    const response = NextResponse.json(
      {
        authenticated: false,
        user: null,
      },
      { status: 401 }
    );

    response.cookies.delete("perkins_session");

    return response;
  }

  return NextResponse.json({
    authenticated: true,
    user: session.user,
  });
}