"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth.service";

export default function LoginForm() {
  const router = useRouter();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!login.trim() || !password) {
      setError("Please enter your email/username and password.");
      return;
    }

    try {
      setLoading(true);

      await AuthService.login(login.trim(), password);

      router.push("/my-account");
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-[520px]">
      <div className="mb-7">
        <h1 className="text-3xl font-semibold text-black md:text-4xl">
          Login
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Login to your account to view your orders and manage your
          account details.
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-5 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="login"
            className="mb-2 block text-sm font-medium text-black"
          >
            Email address or username
            <span className="ml-1 text-red-600">*</span>
          </label>

          <input
            id="login"
            name="login"
            type="text"
            autoComplete="username"
            value={login}
            onChange={(event) => setLogin(event.target.value)}
            disabled={loading}
            className="h-12 w-full border border-gray-300 bg-white px-4 text-sm text-black outline-none transition focus:border-black"
            placeholder="Enter email or username"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-black"
          >
            Password
            <span className="ml-1 text-red-600">*</span>
          </label>

          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={loading}
            className="h-12 w-full border border-gray-300 bg-white px-4 text-sm text-black outline-none transition focus:border-black"
            placeholder="Enter password"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
              className="h-4 w-4"
            />

            <span>Remember me</span>
          </label>

          <Link
            href="/forgot-password"
            className="text-sm font-medium text-black underline underline-offset-4"
          >
            Lost your password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex h-12 w-full items-center justify-center bg-black px-6 text-sm font-semibold uppercase tracking-wide text-white transition hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="mt-7 border-t border-gray-200 pt-6">
        <p className="text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-black underline underline-offset-4"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}