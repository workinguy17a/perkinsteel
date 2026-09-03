"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import CartService from "@/services/cart.service";

export default function CheckoutPage() {
  const [cart, setCart] =
  useState<any>(null);

const [loading, setLoading] =
  useState(true);

const [placingOrder, setPlacingOrder] =
  useState(false);

const [error, setError] =
  useState("");

const [countries, setCountries] =
  useState<any[]>([]);

const [form, setForm] =
  useState({
    first_name: "",
    last_name: "",
    company: "",
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    postcode: "",
    country: "US",
    email: "",
    phone: "",
  });

const selectedCountry =
  countries.find(
    (country: any) =>
      country.code === form.country
  );

const states =
  selectedCountry?.states ?? [];

 useEffect(() => {
  const loadCheckout = async () => {
    try {
      const [
        cartData,
        countriesResponse,
      ] = await Promise.all([
        CartService.getCart(),
        fetch("/api/countries"),
      ]);

      const countriesData =
        await countriesResponse.json();

      setCart(cartData);

      if (countriesResponse.ok) {
        setCountries(countriesData);
      } else {
        console.error(
          "Countries error:",
          countriesData
        );
      }
    } catch (error) {
      console.error(
        "Checkout load error:",
        error
      );

      setError(
        "Unable to load checkout"
      );
    } finally {
      setLoading(false);
    }
  };

  loadCheckout();
}, []);
  

  const handleChange = (
  event: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement
  >
) => {
  const {
    name,
    value,
  } = event.target;

  setForm((current) => ({
    ...current,
    [name]: value,

    ...(name === "country"
      ? { state: "" }
      : {}),
  }));
};

  const updateWooCustomer = async () => {
  try {
    const shippingAddress = {
      first_name: form.first_name,
      last_name: form.last_name,
      company: form.company,
      address_1: form.address_1,
      address_2: form.address_2,
      city: form.city,
      state: form.state,
      postcode: form.postcode,
      country: form.country,
    };

    const billingAddress = {
      ...shippingAddress,
      email: form.email,
      phone: form.phone,
    };

    const updatedCart =
      await CartService.updateCustomer(
        billingAddress,
        shippingAddress
      );

    setCart(updatedCart);
  } catch (error) {
    console.error(
      "Address update error:",
      error
    );
  }
};

  const handleSubmit = async (
    e: FormEvent
  ) => {
    e.preventDefault();

    try {
      setError("");
      setPlacingOrder(true);

      const shippingAddress = {
        first_name:
          form.first_name,
        last_name:
          form.last_name,
        company: form.company,
        address_1:
          form.address_1,
        address_2:
          form.address_2,
        city: form.city,
        state: form.state,
        postcode: form.postcode,
        country: form.country,
      };

      const billingAddress = {
        ...shippingAddress,
        email: form.email,
        phone: form.phone,
      };

      const result =
        await CartService.checkout({
          billing_address:
            billingAddress,

          shipping_address:
            shippingAddress,

          payment_method: "cod",

          payment_data: [],

          customer_note: "",

          expected_total:
            cart?.totals
              ?.total_price,
        });

      console.log(
        "Checkout result:",
        result
      );

      if (
        result?.payment_result
          ?.redirect_url
      ) {
        window.location.href =
          result.payment_result
            .redirect_url;

        return;
      }

      if (result?.order_id) {
        window.location.href =
          `/order-success?order=${result.order_id}`;
      }
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to place order"
      );
    } finally {
      setPlacingOrder(false);
    }
  };  

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        Loading checkout...
      </div>
    );
  }

  if (!cart?.items?.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        Your cart is empty.
      </div>
    );
  }

  const minorUnit =
  cart?.totals?.currency_minor_unit ?? 2;

const currency =
  cart?.totals?.currency_symbol ?? "$";

const formatPrice = (
  value: string | number = 0
) => {
  return (
    Number(value) /
    Math.pow(10, minorUnit)
  ).toFixed(minorUnit);
};

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl mb-10">
        Checkout
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid lg:grid-cols-3 gap-10"
      >
        <div className="lg:col-span-2">

          <div className="grid md:grid-cols-2 gap-4">

            <input
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              placeholder="First Name"
              required
            />

            <input
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />

            <input
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Company"
            />

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              required
            />

            <input
              name="address_1"
              value={form.address_1}
              onChange={handleChange}
              placeholder="Address"
              required
            />

            <input
              name="address_2"
              value={form.address_2}
              onChange={handleChange}
              placeholder="Apartment / Suite"
            />

            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              required
            />

            {states.length > 0 ? (
  <select
    name="state"
    value={form.state}
    onChange={handleChange}
    required
  >
    <option value="">
      Select State / Province
    </option>

    {states.map(
      (state: any) => (
        <option
          key={state.code}
          value={state.code}
        >
          {state.name}
        </option>
      )
    )}
  </select>
) : (
  <input
    type="text"
    name="state"
    value={form.state}
    onChange={handleChange}
    placeholder="State / Province"
  />
)}

            <input
              name="postcode"
              value={form.postcode}
              onChange={handleChange}
              placeholder="Postcode"
              required
            />

            <select
  name="country"
  value={form.country}
  onChange={handleChange}
  required
>
  <option value="">
    Select Country
  </option>

  {countries.map(
    (country: any) => (
      <option
        key={country.code}
        value={country.code}
      >
        {country.name}
      </option>
    )
  )}
</select>

            <button
            type="button"
            onClick={updateWooCustomer}
            >
            Update Address
            </button>

            {cart?.needs_shipping &&
                cart?.shipping_rates?.map(
                    (shippingPackage: any) => (
                    <div
                        key={shippingPackage.package_id}
                        className="mt-6"
                    >
                        <h3>
                        {shippingPackage.name}
                        </h3>

                        {shippingPackage.shipping_rates?.map(
                        (rate: any) => (
                            <label
                            key={rate.rate_id}
                            className="block py-2"
                            >
                            <input
                                type="radio"
                                name={`shipping-${shippingPackage.package_id}`}
                                checked={
                                rate.selected === true
                                }
                                onChange={async () => {
                                try {
                                    const updatedCart =
                                    await CartService.selectShippingRate(
                                        shippingPackage.package_id,
                                        rate.rate_id
                                    );

                                    setCart(updatedCart);
                                } catch (error) {
                                    console.error(
                                    "Shipping error:",
                                    error
                                    );
                                }
                                }}
                            />

                            <span className="ml-2">
                                {rate.name}
                            </span>
                            </label>
                        )
                        )}
                    </div>
                    )
                )}

          </div>

          {error && (
            <p className="mt-4 text-red-600">
              {error}
            </p>
          )}
        </div>

        <div>
          <h2 className="text-xl mb-5">
            Your Order
          </h2>

          {cart.items.map(
            (item: any) => (
              <div
                key={item.key}
                className="flex justify-between py-3 border-b"
              >
                <span>
                  {item.name} ×{" "}
                  {item.quantity}
                </span>
              </div>
            )
          )}

          <div className="flex justify-between">
            <span>Subtotal</span>

            <span>
                {currency}
                {formatPrice(
                cart?.totals?.total_items
                )}
            </span>
            </div>

            <div className="flex justify-between">
            <span>Shipping</span>

            <span>
                {currency}
                {formatPrice(
                cart?.totals?.total_shipping
                )}
            </span>
            </div>

            <div className="flex justify-between">
            <span>Tax</span>

            <span>
                {currency}
                {formatPrice(
                cart?.totals?.total_tax
                )}
            </span>
            </div>

            <div className="flex justify-between font-bold">
            <span>Total</span>

            <span>
                {currency}
                {formatPrice(
                cart?.totals?.total_price
                )}
            </span>
            </div>

          <div className="mt-8">
            <label>
              <input
                type="radio"
                checked
                readOnly
              />

              <span className="ml-2">
                Cash on Delivery
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={
              placingOrder
            }
            className="mt-8"
          >
            {placingOrder
              ? "Placing Order..."
              : "Place Order"}
          </button>
        </div>
      </form>
    </section>
  );
}