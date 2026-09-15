import LoginForm from "@/components/Account/LoginForm";
import InnerBanner from "@/components/Common/InnerBanner/InnerBanner";

export const metadata = {
  title: "Login | Perkins Steel",
};

export default function LoginPage() {
  return (
    <main>
      <InnerBanner
        title="Login"
        description="Access your account to manage orders and account details."
        breadcrumbs={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "Login",
          },
        ]}
      />

      <section className="px-4 py-12 sm:px-6 md:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto flex max-w-[1320px] justify-center">
          <LoginForm />
        </div>
      </section>
    </main>
  );
}