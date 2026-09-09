"use client";


import {
  FormEvent,
  useState,
} from "react";



export default function ContactForm() {
  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const form = event.currentTarget;

    setLoading(true);
    setMessage("");
    setSuccess(false);

    try {
      const formData =
        new FormData(form);

      const response = await fetch(
        "/api/contact",
        {
          method: "POST",
          body: formData,
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to send message."
        );
      }

      // CF7 can return HTTP 200 with a
      // validation/spam status, so check it.
      if (data.status !== "mail_sent") {
        setSuccess(false);
        setMessage(
          data.message ||
            "Please check your details."
        );
        return;
      }

      setSuccess(true);
      setMessage(data.message);

      form.reset();
    } catch (error) {
      setSuccess(false);

      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to send message."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <input
          type="text"
          name="your-name"
          placeholder="Your Name"
          autoComplete="name"
          required
          className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-red-700"
        />
      </div>

      <div>
        <input
          type="email"
          name="your-email"
          placeholder="Your Email"
          autoComplete="email"
          required
          className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-red-700"
        />
      </div>

      <div>
        <input
          type="tel"
          name="your-phone"
          placeholder="Your Phone"
          autoComplete="tel"
          required
          className="w-full rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-red-700"
        />
      </div>

      <div>
        <textarea
          name="your-message"
          placeholder="Your Message"
          rows={6}
          className="w-full resize-none rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-red-700"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-red-700 px-7 py-3 font-medium text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading
          ? "Sending..."
          : "Submit"}
      </button>

      {message && (
        <p
          className={
            success
              ? "text-sm text-green-600"
              : "text-sm text-red-600"
          }
        >
          {message}
        </p>
      )}
    </form>
  );
}