import InnerBanner from "@/components/Common/InnerBanner/InnerBanner";
import ForgotPasswordForm from "@/components/Account/ForgotPasswordForm";

export const metadata = {
  title:
    "Forgot Password | Perkins Steel",
};

export default function ForgotPasswordPage() {
  return (
    <main>
      <InnerBanner
        title="Forgot Password"
        description="Reset your account password."
        breadcrumbs={[
          {
            label: "Home",
            href: "/",
          },
          {
            label:
              "Forgot Password",
          },
        ]}
      />

      <section className="px-4 py-10 sm:px-6 md:py-14 lg:px-8 lg:py-16">
        <ForgotPasswordForm />
      </section>
    </main>
  );
}