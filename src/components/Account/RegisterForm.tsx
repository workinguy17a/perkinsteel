"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth.service";

export default function RegisterForm() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError("Please complete all required fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await AuthService.register({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password,
      });

      router.push("/my-account");
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to create your account."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-[600px]">
      <div className="mb-7">
        <h1 className="text-3xl font-semibold text-black md:text-4xl">
          Create Account
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          Create an account to manage your orders, addresses and account
          details.
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
        <div className="flex flex-col gap-5 sm:flex-row">
          <div className="w-full">
            <label
              htmlFor="firstName"
              className="mb-2 block text-sm font-medium text-black"
            >
              First name
              <span className="ml-1 text-red-600">*</span>
            </label>

            <input
              id="firstName"
              type="text"
              autoComplete="given-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={loading}
              className="h-12 w-full border border-gray-300 bg-white px-4 text-sm text-black outline-none transition focus:border-black"
            />
          </div>

          <div className="w-full">
            <label
              htmlFor="lastName"
              className="mb-2 block text-sm font-medium text-black"
            >
              Last name
              <span className="ml-1 text-red-600">*</span>
            </label>

            <input
              id="lastName"
              type="text"
              autoComplete="family-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={loading}
              className="h-12 w-full border border-gray-300 bg-white px-4 text-sm text-black outline-none transition focus:border-black"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-black"
          >
            Email address
            <span className="ml-1 text-red-600">*</span>
          </label>

          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="h-12 w-full border border-gray-300 bg-white px-4 text-sm text-black outline-none transition focus:border-black"
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
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="h-12 w-full border border-gray-300 bg-white px-4 text-sm text-black outline-none transition focus:border-black"
          />

          <p className="mt-2 text-xs text-gray-500">
            Password must be at least 8 characters.
          </p>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-medium text-black"
          >
            Confirm password
            <span className="ml-1 text-red-600">*</span>
          </label>

          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
            className="h-12 w-full border border-gray-300 bg-white px-4 text-sm text-black outline-none transition focus:border-black"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex h-12 w-full items-center justify-center bg-black px-6 text-sm font-semibold uppercase tracking-wide text-white transition hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>

      <div className="mt-7 border-t border-gray-200 pt-6">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-black underline underline-offset-4"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}