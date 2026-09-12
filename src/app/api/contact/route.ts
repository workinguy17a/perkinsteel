import { NextResponse } from "next/server";

const WORDPRESS_URL =
  "httpss://admin.perkinssteel.com";

const CF7_FORM_ID = "6a734dc";

export async function POST(
  request: Request
) {
  try {
    const formData =
      await request.formData();

    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/contact-form-7/v1/contact-forms/${CF7_FORM_ID}/feedback`,
      {
        method: "POST",
        body: formData,
        cache: "no-store",
      }
    );

    const data =
      await response.json();

    return NextResponse.json(
      data,
      {
        status: response.ok
          ? 200
          : response.status,
      }
    );
  } catch (error) {
    console.error(
      "Contact Form 7 error:",
      error
    );

    return NextResponse.json(
      {
        status: "error",
        message:
          "Unable to send your message. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}