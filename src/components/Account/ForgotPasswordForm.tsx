"use client";

import {
  FormEvent,
  useState,
} from "react";

import Link from "next/link";

import { AuthService } from "@/services/auth.service";

export default function ForgotPasswordForm() {
  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  async function handleSubmit(
    event: FormEvent
  ) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const result =
        await AuthService.forgotPassword(
          email
        );

      setSuccess(
        result?.message ||
          "If an account exists for this email address, a password reset link has been sent."
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to request password reset."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[520px]">
      <div className="mb-7 text-center">
        <h2 className="text-2xl font-semibold text-black md:text-3xl">
          Forgot Password
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Enter your email address and
          we&apos;ll send you a link to
          reset your password.
        </p>
      </div>

      {error && (
        <div className="mb-5 border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-5 border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          {success}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="border border-gray-200 bg-white p-5 md:p-7"
      >
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-black"
          >
            Email Address
            <span className="ml-1 text-red-600">
              *
            </span>
          </label>

          <input
            id="email"
            type="email"
            value={email}
            required
            autoComplete="email"
            onChange={(event) =>
              setEmail(
                event.target.value
              )
            }
            className="h-12 w-full border border-gray-300 bg-white px-4 text-sm text-black outline-none transition focus:border-black"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center bg-black px-6 py-3 text-xs font-semibold uppercase tracking-wide text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Sending..."
            : "Send Reset Link"}
        </button>

        <p className="mt-5 text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-semibold text-black underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}