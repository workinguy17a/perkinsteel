import { SignJWT, jwtVerify } from "jose";

const secret = process.env.AUTH_SECRET;

if (!secret) {
  throw new Error("AUTH_SECRET is not configured.");
}

const encodedSecret = new TextEncoder().encode(secret);

export interface AuthUser {
  id: number;
  email: string;
  username: string;
  displayName: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

export interface AuthSession {
  user: AuthUser;
}

export async function createSessionToken(
  session: AuthSession
): Promise<string> {
  return new SignJWT({
    user: session.user,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedSecret);
}

export async function verifySessionToken(
  token: string
): Promise<AuthSession | null> {
  try {
    const { payload } = await jwtVerify(token, encodedSecret);

    if (!payload.user) {
      return null;
    }

    return {
      user: payload.user as AuthUser,
    };
  } catch {
    return null;
  }
}