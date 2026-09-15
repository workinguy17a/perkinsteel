export interface AuthUser {
  id: number;
  email: string;
  username: string;
  displayName: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

interface LoginResponse {
  success: boolean;
  message?: string;
  user?: AuthUser;
}

interface MeResponse {
  authenticated: boolean;
  user: AuthUser | null;
}

export class AuthService {
  static async login(
    login: string,
    password: string
  ): Promise<LoginResponse> {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        login,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Unable to login.");
    }

    return data;
  }

  static async me(): Promise<MeResponse> {
    const response = await fetch("/api/auth/me", {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    });

    if (!response.ok) {
      return {
        authenticated: false,
        user: null,
      };
    }

    return response.json();
  }

  static async register(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    }): Promise<LoginResponse> {
    const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
        result.message || "Unable to create your account."
        );
    }

    return result;
    }

  static async logout(): Promise<void> {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  }

  static async updateAccount(data: {
    firstName: string;
    lastName: string;
    displayName: string;
    email: string;
    password?: string;
  }) {
    const response = await fetch(
      "/api/auth/account",
      {
        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",
        },

        credentials: "include",

        body: JSON.stringify(data),

        cache: "no-store",
      }
    );

    const result =
      await response.json();

    if (!response.ok) {
      throw new Error(
        result?.message ||
          "Unable to update account."
      );
    }

    return result;
  }

  static async forgotPassword(
  email: string
) {
  const response = await fetch(
    "/api/auth/forgot-password",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        email,
      }),
      cache: "no-store",
    }
  );

  const result =
    await response.json();

  if (!response.ok) {
    throw new Error(
      result?.message ||
        "Unable to request password reset."
    );
  }

  return result;
}


  static async resetPassword(data: {
    login: string;
    key: string;
    password: string;
  }) {
    const response = await fetch(
      "/api/auth/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(data),
        cache: "no-store",
      }
    );

    const result =
      await response.json();

    if (!response.ok) {
      throw new Error(
        result?.message ||
          "Unable to reset password."
      );
    }

    return result;
  }
}
