import RegisterForm from "@/components/Account/RegisterForm";
import InnerBanner from "@/components/Common/InnerBanner/InnerBanner";

export const metadata = {
  title: "Register | Perkins Steel",
};

export default function RegisterPage() {
  return (
    <main>
      <InnerBanner
        title="Register"
        description="Create your Perkins Steel account."
        breadcrumbs={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "Register",
          },
        ]}
      />

      <section className="px-4 py-12 sm:px-6 md:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto flex max-w-[1320px] justify-center">
          <RegisterForm />
        </div>
      </section>
    </main>
  );
}