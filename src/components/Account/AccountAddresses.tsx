"use client";

import { useEffect, useState } from "react";

interface Address {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email?: string;
  phone?: string;
}

const emptyAddress: Address = {
  first_name: "",
  last_name: "",
  company: "",
  address_1: "",
  address_2: "",
  city: "",
  state: "",
  postcode: "",
  country: "",
  email: "",
  phone: "",
};

export default function AccountAddresses() {
  const [billing, setBilling] =
    useState<Address>(emptyAddress);

  const [shipping, setShipping] =
    useState<Address>(emptyAddress);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  useEffect(() => {
    async function loadAddresses() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "/api/account/customer",
          {
            credentials: "include",
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message ||
              "Unable to load addresses."
          );
        }

        const customer = data.customer;

        setBilling({
          ...emptyAddress,
          ...(customer?.billing ?? {}),
        });

        setShipping({
          ...emptyAddress,
          ...(customer?.shipping ?? {}),
        });
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Unable to load addresses."
        );
      } finally {
        setLoading(false);
      }
    }

    loadAddresses();
  }, []);

  function updateBilling(
    name: keyof Address,
    value: string
  ) {
    setBilling((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function updateShipping(
    name: keyof Address,
    value: string
  ) {
    setShipping((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await fetch(
        "/api/account/customer",
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            billing,
            shipping,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Unable to save addresses."
        );
      }

      setBilling({
        ...emptyAddress,
        ...(data.customer?.billing ?? {}),
      });

      setShipping({
        ...emptyAddress,
        ...(data.customer?.shipping ?? {}),
      });

      setSuccess(
        "Your addresses have been updated."
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to save addresses."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="border border-gray-200 bg-white p-6">
        <p className="text-sm text-gray-600">
          Loading addresses...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0">
      <div className="mb-7">
        <h2 className="text-2xl font-semibold text-black md:text-3xl">
          Addresses
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          Manage your billing and shipping
          addresses.
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

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6 xl:flex-row">
          <AddressForm
            title="Billing Address"
            address={billing}
            onChange={updateBilling}
            showContact
          />

          <AddressForm
            title="Shipping Address"
            address={shipping}
            onChange={updateShipping}
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="mt-6 inline-flex items-center justify-center bg-black px-7 py-3 text-xs font-semibold uppercase tracking-wide text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving
            ? "Saving..."
            : "Save Addresses"}
        </button>
      </form>
    </div>
  );
}

interface AddressFormProps {
  title: string;
  address: Address;
  onChange: (
    name: keyof Address,
    value: string
  ) => void;
  showContact?: boolean;
}

function AddressForm({
  title,
  address,
  onChange,
  showContact = false,
}: AddressFormProps) {
  return (
    <div className="w-full border border-gray-200 bg-white p-5 md:p-6">
      <h3 className="mb-5 text-xl font-semibold text-black">
        {title}
      </h3>

      <div className="flex flex-wrap gap-4">
        <Field
          label="First Name"
          name="first_name"
          value={address.first_name}
          onChange={onChange}
          required
          half
        />

        <Field
          label="Last Name"
          name="last_name"
          value={address.last_name}
          onChange={onChange}
          required
          half
        />

        <Field
          label="Company"
          name="company"
          value={address.company}
          onChange={onChange}
        />

        <Field
          label="Street Address"
          name="address_1"
          value={address.address_1}
          onChange={onChange}
          required
        />

        <Field
          label="Apartment / Suite"
          name="address_2"
          value={address.address_2}
          onChange={onChange}
        />

        <Field
          label="City"
          name="city"
          value={address.city}
          onChange={onChange}
          required
          half
        />

        <Field
          label="State / Province"
          name="state"
          value={address.state}
          onChange={onChange}
          half
        />

        <Field
          label="Postcode"
          name="postcode"
          value={address.postcode}
          onChange={onChange}
          half
        />

        <Field
          label="Country Code"
          name="country"
          value={address.country}
          onChange={onChange}
          placeholder="AE"
          required
          half
        />

        {showContact && (
          <>
            <Field
              label="Email"
              name="email"
              type="email"
              value={address.email || ""}
              onChange={onChange}
              required
            />

            <Field
              label="Phone"
              name="phone"
              type="tel"
              value={address.phone || ""}
              onChange={onChange}
            />
          </>
        )}
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  name: keyof Address;
  value: string;
  onChange: (
    name: keyof Address,
    value: string
  ) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  half?: boolean;
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  half = false,
}: FieldProps) {
  return (
    <div
      className={
        half
          ? "w-full sm:w-[calc(50%-8px)]"
          : "w-full"
      }
    >
      <label
        htmlFor={`account-${name}`}
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
        id={`account-${name}`}
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(name, event.target.value)
        }
        className="h-12 w-full border border-gray-300 bg-white px-4 text-sm text-black outline-none transition focus:border-black"
      />
    </div>
  );
}