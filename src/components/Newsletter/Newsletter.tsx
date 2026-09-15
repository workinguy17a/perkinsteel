"use client";

import { FormEvent, useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!email) return;

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Unable to subscribe."
        );
      }

      setMessage(
        data?.message || "Thank you for subscribing."
      );

      setEmail("");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="newsletter-row bg-[#f9e8e8] py-8 lg:py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          {/* Left Content */}
          <div className="flex items-start gap-4 newsletter-text">
            <div className="flex h-18 w-18 shrink-0 items-center justify-center rounded-full bg-tred">
              <i className="fa-solid fa-envelope-open"></i>
            </div>

            <div>
              <h2 className="text-xl font-bold text-black lg:text-2xl">
                Stay Updated
              </h2>

              <p className="mt-1 max-w-md text-sm leading-6 text-gray-600">
                Subscribe to get special offers, new products and
                updates straight to your inbox.
              </p>
            </div>
          </div>

          {/* Newsletter Form */}
          <div className="w-full lg:max-w-[520px] newsletter-form">
            <form
              onSubmit={handleSubmit}
              className="flex w-full overflow-hidden rounded-full bg-black"
            >
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                required
                disabled={loading}
                className="min-w-0 flex-1 bg-transparent px-5 py-4 text-sm text-white outline-none placeholder:text-gray-400 disabled:opacity-60 sm:px-6"
              />

              <button
                type="submit"
                disabled={loading}
                className="shrink-0 bg-[#a71920] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#89151b] disabled:cursor-not-allowed disabled:opacity-60 sm:px-8"
              >
                {loading ? "Please wait..." : "Subscribe"}
              </button>
            </form>

            {message && (
              <p className="mt-2 px-2 text-sm text-gray-700">
                {message}
              </p>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}