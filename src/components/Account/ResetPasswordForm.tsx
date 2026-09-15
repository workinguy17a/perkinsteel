"use client";

import {
  FormEvent,
  useState,
} from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { AuthService } from "@/services/auth.service";

interface Props {
  login: string;
  resetKey: string;
}

export default function ResetPasswordForm({
  login,
  resetKey,
}: Props) {
  const router = useRouter();

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

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
      setError("");
      setSuccess("");

      if (password.length < 8) {
        setError(
          "Password must be at least 8 characters."
        );

        return;
      }

      if (
        password !==
        confirmPassword
      ) {
        setError(
          "Passwords do not match."
        );

        return;
      }

      setLoading(true);

      const result =
        await AuthService.resetPassword({
          login,
          key: resetKey,
          password,
        });

      setSuccess(
        result?.message ||
          "Your password has been reset successfully."
      );

      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to reset password."
      );
    } finally {
      setLoading(false);
    }
  }

  if (!login || !resetKey) {
    return (
      <div className="mx-auto w-full max-w-[520px] border border-red-200 bg-red-50 p-6 text-center">
        <p className="text-sm text-red-700">
          This password reset link is
          invalid.
        </p>

        <Link
          href="/forgot-password"
          className="mt-4 inline-block text-sm font-semibold text-black underline"
        >
          Request a new reset link
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[520px]">
      <div className="mb-7 text-center">
        <h2 className="text-2xl font-semibold text-black md:text-3xl">
          Reset Password
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Enter your new password below.
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
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-black"
          >
            New Password
          </label>

          <input
            id="password"
            type="password"
            value={password}
            required
            minLength={8}
            autoComplete="new-password"
            onChange={(event) =>
              setPassword(
                event.target.value
              )
            }
            className="h-12 w-full border border-gray-300 bg-white px-4 text-sm text-black outline-none transition focus:border-black"
          />
        </div>

        <div className="mt-5">
          <label
            htmlFor="confirm-password"
            className="mb-2 block text-sm font-medium text-black"
          >
            Confirm New Password
          </label>

          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            required
            minLength={8}
            autoComplete="new-password"
            onChange={(event) =>
              setConfirmPassword(
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
            ? "Resetting..."
            : "Reset Password"}
        </button>
      </form>
    </div>
  );
}