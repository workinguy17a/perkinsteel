"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import CartService from "@/services/cart.service";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {

  const router = useRouter();
  const [cart, setCart] =
  useState<any>(null);

const [loading, setLoading] =
  useState(true);

const [placingOrder, setPlacingOrder] =
  useState(false);

const [
  paymentMethods,
  setPaymentMethods,
] = useState<any[]>([]);

const [
  selectedPaymentMethod,
  setSelectedPaymentMethod,
] = useState("");

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
        paymentResponse,
        customerResponse,
      ] = await Promise.all([
        CartService.getCart(),

        fetch("/api/countries"),

        fetch("/api/payment-methods"),

        fetch("/api/account/customer", {
          credentials: "include",
          cache: "no-store",
        }),
      ]);

      const countriesData =
        await countriesResponse.json();

      const paymentData =
        await paymentResponse.json();

      let customerData: any = null;

      if (customerResponse.ok) {
        customerData =
          await customerResponse.json();
      }

      setCart(cartData);

      if (
        customerData?.authenticated &&
        customerData?.customer
      ) {
        const customer =
          customerData.customer;

        const billing =
          customer.billing ?? {};

        const shipping =
          customer.shipping ?? {};

        setForm((current) => ({
          ...current,

          first_name:
            billing.first_name ||
            shipping.first_name ||
            customer.first_name ||
            "",

          last_name:
            billing.last_name ||
            shipping.last_name ||
            customer.last_name ||
            "",

          company:
            billing.company ||
            shipping.company ||
            "",

          address_1:
            billing.address_1 ||
            shipping.address_1 ||
            "",

          address_2:
            billing.address_2 ||
            shipping.address_2 ||
            "",

          city:
            billing.city ||
            shipping.city ||
            "",

          state:
            billing.state ||
            shipping.state ||
            "",

          postcode:
            billing.postcode ||
            shipping.postcode ||
            "",

          country:
            billing.country ||
            shipping.country ||
            current.country,

          email:
            billing.email ||
            customer.email ||
            "",

          phone:
            billing.phone || "",
        }));
      }

      if (countriesResponse.ok) {
        setCountries(countriesData);
      } else {
        console.error(
          "Countries error:",
          countriesData
        );
      }

      if (paymentResponse.ok) {
        setPaymentMethods(
          paymentData
        );

        if (
          paymentData.length > 0
        ) {
          setSelectedPaymentMethod(
            paymentData[0].id
          );
        }
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
    setError("");

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

    setError(
      error instanceof Error
        ? error.message
        : "Unable to update address"
    );
  }
};

useEffect(() => {
  const hasRequiredAddress =
    form.first_name &&
    form.last_name &&
    form.address_1 &&
    form.city &&
    form.postcode &&
    form.country &&
    (
      states.length === 0 ||
      form.state
    );

  if (!hasRequiredAddress) {
    return;
  }

  const timeout =
    setTimeout(() => {
      updateWooCustomer();
    }, 700);

  return () => {
    clearTimeout(timeout);
  };
}, [
  form.first_name,
  form.last_name,
  form.address_1,
  form.address_2,
  form.city,
  form.state,
  form.postcode,
  form.country,
]);

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

      try {
        const customerResponse = await fetch(
          "/api/account/customer",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              billing: billingAddress,
              shipping: shippingAddress,
            }),
          }
        );

        // 401 simply means guest checkout.
        if (
          !customerResponse.ok &&
          customerResponse.status !== 401
        ) {
          const customerError =
            await customerResponse.json();

          console.error(
            "Unable to save customer address:",
            customerError
          );
        }
      } catch (customerError) {
        console.error(
          "Unable to save customer address:",
          customerError
        );
      }

      if (
        !selectedPaymentMethod
      ) {
        setError(
          "Please select a payment method"
        );

        setPlacingOrder(false);

        return;
      }

      const result =
        await CartService.checkout({
          billing_address:
            billingAddress,

          shipping_address:
            shippingAddress,

          payment_method: selectedPaymentMethod,

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

     const redirectUrl =
        result?.payment_result?.redirect_url;

      // WooCommerce has completed the order and is trying
      // to send the customer to the WP thank-you page.
      if (
        result?.order_id &&
        redirectUrl?.includes("/order-received/")
      ) {
        const wooRedirect = new URL(redirectUrl);

        const orderKey =
          wooRedirect.searchParams.get("key") ??
          result.order_key ??
          "";

        window.location.href =
          `/order-received?order=${result.order_id}&key=${encodeURIComponent(
            orderKey
          )}`;

        return;
      }

      // External payment gateway redirect
      if (redirectUrl) {
        window.location.href = redirectUrl;
        return;
      }

      // Successful order with no redirect URL
      if (result?.order_id) {
        window.location.href =
          `/order-received?order=${result.order_id}&key=${encodeURIComponent(
            result.order_key ?? ""
          )}`;

        return;
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
    <section className="checkout-page">

  <div className="max-w-7xl mx-auto px-4">

    {/* =========================================
        PAGE HEADER
    ========================================= */}

    <div className="checkout-page-header reveal fade-up">

      <h1>Checkout</h1>

      <div className="checkout-secure-label">
        <i className="fa-solid fa-lock"></i>
        Secure Checkout
      </div>

    </div>


    <form
      onSubmit={handleSubmit}
      className="checkout-layout"
    >

      {/* =========================================
          CUSTOMER DETAILS
      ========================================= */}

      <div className="checkout-details reveal fade-right">

        {/* CONTACT */}

        <div className="checkout-section">

          <div className="checkout-section-heading">

            <span className="checkout-step-number">
              01
            </span>

            <div>
              <h2>Contact Information</h2>

              <p>
                We'll use these details to keep you
                updated about your order.
              </p>
            </div>

          </div>


          <div className="checkout-fields">

            <div className="checkout-field">

              <label htmlFor="first_name">
                First Name
                <span>*</span>
              </label>

              <input
                id="first_name"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                placeholder="First Name"
                required
              />

            </div>


            <div className="checkout-field">

              <label htmlFor="last_name">
                Last Name
                <span>*</span>
              </label>

              <input
                id="last_name"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                required
              />

            </div>


            <div className="checkout-field">

              <label htmlFor="email">
                Email Address
                <span>*</span>
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
              />

            </div>


            <div className="checkout-field">

              <label htmlFor="phone">
                Phone Number
                <span>*</span>
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                required
              />

            </div>

          </div>

        </div>


        {/* =========================================
            BILLING / SHIPPING ADDRESS
        ========================================= */}

        <div className="checkout-section">

          <div className="checkout-section-heading">

            <span className="checkout-step-number">
              02
            </span>

            <div>
              <h2>Billing & Shipping Address</h2>

              <p>
                Enter the address where your order
                should be delivered.
              </p>
            </div>

          </div>


          <div className="checkout-fields">

            {/* COMPANY */}

            <div className="checkout-field checkout-field-full">

              <label htmlFor="company">
                Company
                <small>Optional</small>
              </label>

              <input
                id="company"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Company Name"
              />

            </div>


            {/* ADDRESS */}

            <div className="checkout-field checkout-field-full">

              <label htmlFor="address_1">
                Street Address
                <span>*</span>
              </label>

              <input
                id="address_1"
                name="address_1"
                value={form.address_1}
                onChange={handleChange}
                placeholder="House number and street name"
                required
              />

            </div>


            {/* ADDRESS 2 */}

            <div className="checkout-field checkout-field-full">

              <label htmlFor="address_2">
                Apartment / Suite
                <small>Optional</small>
              </label>

              <input
                id="address_2"
                name="address_2"
                value={form.address_2}
                onChange={handleChange}
                placeholder="Apartment, suite, unit, etc."
              />

            </div>


            {/* CITY */}

            <div className="checkout-field">

              <label htmlFor="city">
                City
                <span>*</span>
              </label>

              <input
                id="city"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                required
              />

            </div>


            {/* POSTCODE */}

            <div className="checkout-field">

              <label htmlFor="postcode">
                Postcode
                <span>*</span>
              </label>

              <input
                id="postcode"
                name="postcode"
                value={form.postcode}
                onChange={handleChange}
                placeholder="Postcode"
                required
              />

            </div>


            {/* COUNTRY */}

            <div className="checkout-field">

              <label htmlFor="country">
                Country
                <span>*</span>
              </label>

              <select
                id="country"
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

            </div>


            {/* STATE */}

            <div className="checkout-field">

              <label htmlFor="state">
                State / Province
                <span>*</span>
              </label>

              {states.length > 0 ? (

                <select
                  id="state"
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
                  id="state"
                  type="text"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="State / Province"
                />

              )}

            </div>

          </div>

        </div>


        {/* =========================================
            SHIPPING METHOD
        ========================================= */}

        {cart?.needs_shipping &&
          cart?.shipping_rates?.length > 0 && (

            <div className="checkout-section">

              <div className="checkout-section-heading">

                <span className="checkout-step-number">
                  03
                </span>

                <div>
                  <h2>Shipping Method</h2>

                  <p>
                    Select your preferred delivery
                    method.
                  </p>
                </div>

              </div>


              <div className="checkout-shipping-methods">

                {cart.shipping_rates.map(
                  (shippingPackage: any) => (

                    <div
                      key={
                        shippingPackage.package_id
                      }
                      className="shipping-package"
                    >

                      {shippingPackage.name && (

                        <h3>
                          {shippingPackage.name}
                        </h3>

                      )}


                      {shippingPackage.shipping_rates?.map(
                        (rate: any) => (

                          <label
                            key={rate.rate_id}
                            className={`checkout-radio-option ${
                              rate.selected === true
                                ? "selected"
                                : ""
                            }`}
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
                                    await CartService
                                      .selectShippingRate(
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


                            <span className="checkout-custom-radio"></span>


                            <span className="shipping-rate-name">
                              {rate.name}
                            </span>

                          </label>

                        )
                      )}

                    </div>

                  )
                )}

              </div>

            </div>

          )}


        {/* ERROR */}

        {error && (

          <div className="checkout-error">

            <i className="fa-solid fa-circle-exclamation"></i>

            <span>
              {error}
            </span>

          </div>

        )}

      </div>


      {/* =========================================
          ORDER SUMMARY
      ========================================= */}

      <aside
        className="checkout-order reveal fade-left"
        style={
          {
            "--delay": "120ms",
          } as React.CSSProperties
        }
      >

        <div className="checkout-order-header">

          <h2>Your Order</h2>

          <span>
            {cart.items.length}
            {cart.items.length === 1
              ? " Item"
              : " Items"}
          </span>

        </div>


        <div className="checkout-order-body">

          {/* PRODUCTS */}

          <div className="checkout-order-products">

            {cart.items.map(
              (item: any) => (

                <div
                  key={item.key}
                  className="checkout-order-product"
                >

                  <div className="checkout-order-product-info">

                    {(
                      item.images?.[0]?.thumbnail ||
                      item.images?.[0]?.src
                    ) && (

                      <div className="checkout-order-image">

                        <img
                          src={
                            item.images?.[0]?.thumbnail ||
                            item.images?.[0]?.src
                          }
                          alt={item.name}
                        />

                        <span>
                          {item.quantity}
                        </span>

                      </div>

                    )}


                    <div>

                      <h3>
                        {item.name}
                      </h3>

                      <p>
                        Qty: {item.quantity}
                      </p>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>


          {/* TOTALS */}

          <div className="checkout-totals">

            <div className="checkout-total-row">

              <span>Subtotal</span>

              <strong>
                {currency}
                {formatPrice(
                  cart?.totals?.total_items
                )}
              </strong>

            </div>


            <div className="checkout-total-row">

              <span>Shipping</span>

              <strong>
                {currency}
                {formatPrice(
                  cart?.totals?.total_shipping
                )}
              </strong>

            </div>


            <div className="checkout-total-row">

              <span>Tax</span>

              <strong>
                {currency}
                {formatPrice(
                  cart?.totals?.total_tax
                )}
              </strong>

            </div>


            <div className="checkout-grand-total">

              <span>Total</span>

              <strong>
                {currency}
                {formatPrice(
                  cart?.totals?.total_price
                )}
              </strong>

            </div>

          </div>


          {/* =========================================
              PAYMENT METHODS
          ========================================= */}

          <div className="checkout-payment">

            <h3>
              Payment Method
            </h3>


            {paymentMethods.length === 0 ? (

              <p className="checkout-no-payment">
                No payment methods available.
              </p>

            ) : (

              <div className="checkout-payment-options">

                {paymentMethods.map(
                  (method: any) => (

                    <label
                      key={method.id}
                      className={`checkout-payment-option ${
                        selectedPaymentMethod ===
                        method.id
                          ? "selected"
                          : ""
                      }`}
                    >

                      <div className="checkout-payment-title">

                        <input
                          type="radio"
                          name="payment_method"
                          value={method.id}
                          checked={
                            selectedPaymentMethod ===
                            method.id
                          }
                          onChange={() =>
                            setSelectedPaymentMethod(
                              method.id
                            )
                          }
                        />

                        <span className="checkout-custom-radio"></span>

                        <strong>
                          {method.title}
                        </strong>

                      </div>


                      {method.description && (
                        <div
                          className="checkout-payment-description"
                          dangerouslySetInnerHTML={{
                            __html:
                              method.description,
                          }}
                        />
                      )}

                    </label>

                  )
                )}

              </div>

            )}

          </div>


          {/* PLACE ORDER */}

          <button
            type="submit"
            disabled={
              placingOrder ||
              paymentMethods.length === 0
            }
            className="checkout-place-order"
          >

            {placingOrder ? (

              <>
                <i className="fa-solid fa-spinner fa-spin"></i>
                Placing Order...
              </>

            ) : (

              <>
                Place Order
                <i className="fa-solid fa-arrow-right"></i>
              </>

            )}

          </button>


          <div className="checkout-security">

            <i className="fa-solid fa-lock"></i>

            <span>
              Your payment information is secure
              and encrypted
            </span>

          </div>

        </div>

      </aside>

    </form>

  </div>

</section>
  );
}