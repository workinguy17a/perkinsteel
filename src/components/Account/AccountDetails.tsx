"use client";

import {
  FormEvent,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import { AuthService } from "@/services/auth.service";

interface Props {
  user: {
    firstName: string;
    lastName: string;
    displayName: string;
    email: string;
  };
}

export default function AccountDetails({
  user,
}: Props) {
  const router = useRouter();

  const [form, setForm] =
    useState({
      firstName:
        user.firstName || "",

      lastName:
        user.lastName || "",

      displayName:
        user.displayName || "",

      email:
        user.email || "",

      password: "",

      confirmPassword: "",
    });

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  function handleChange(
    event:
      React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } =
      event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(
    event: FormEvent
  ) {
    event.preventDefault();

    try {
      setError("");
      setSuccess("");

      if (
        form.password &&
        form.password.length < 8
      ) {
        setError(
          "Password must be at least 8 characters."
        );

        return;
      }

      if (
        form.password !==
        form.confirmPassword
      ) {
        setError(
          "New passwords do not match."
        );

        return;
      }

      setSaving(true);

      const result =
        await AuthService.updateAccount({
          firstName:
            form.firstName,

          lastName:
            form.lastName,

          displayName:
            form.displayName,

          email:
            form.email,

          password:
            form.password || undefined,
        });

      setSuccess(
        result?.message ||
          "Account details updated successfully."
      );

      setForm((current) => ({
        ...current,
        password: "",
        confirmPassword: "",
      }));

      /*
       * Server has issued a new session cookie.
       * Refresh server components using that
       * updated session.
       */
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to update account."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="w-full min-w-0">
      <div className="mb-7">
        <h2 className="text-2xl font-semibold text-black md:text-3xl">
          Account Details
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          Update your personal information
          and password.
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
        <div className="flex flex-wrap gap-5">
          <AccountField
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
            half
          />

          <AccountField
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
            half
          />

          <AccountField
            label="Display Name"
            name="displayName"
            value={form.displayName}
            onChange={handleChange}
          />

          <AccountField
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="my-7 border-t border-gray-200" />

        <div>
          <h3 className="text-lg font-semibold text-black">
            Change Password
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Leave these fields empty if you
            don&apos;t want to change your password.
          </p>

          <div className="mt-5 flex flex-wrap gap-5">
            <AccountField
              label="New Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              half
            />

            <AccountField
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              value={
                form.confirmPassword
              }
              onChange={handleChange}
              half
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="mt-7 inline-flex items-center justify-center bg-black px-7 py-3 text-xs font-semibold uppercase tracking-wide text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving
            ? "Saving..."
            : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

interface FieldProps {
  label: string;
  name: string;
  value: string;
  type?: string;
  required?: boolean;
  half?: boolean;

  onChange: (
    event:
      React.ChangeEvent<HTMLInputElement>
  ) => void;
}

function AccountField({
  label,
  name,
  value,
  type = "text",
  required = false,
  half = false,
  onChange,
}: FieldProps) {
  return (
    <div
      className={
        half
          ? "w-full sm:w-[calc(50%-10px)]"
          : "w-full"
      }
    >
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-black"
      >
        {label}

        {required && (
          <span className="ml-1 text-red-600">
            *
          </span>
        )}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        required={required}
        onChange={onChange}
        autoComplete={
          type === "password"
            ? "new-password"
            : undefined
        }
        className="h-12 w-full border border-gray-300 bg-white px-4 text-sm text-black outline-none transition focus:border-black"
      />
    </div>
  );
}