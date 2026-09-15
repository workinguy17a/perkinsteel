import InnerBanner from "@/components/Common/InnerBanner/InnerBanner";
import ResetPasswordForm from "@/components/Account/ResetPasswordForm";

export const metadata = {
  title:
    "Reset Password | Perkins Steel",
};

interface Props {
  searchParams: Promise<{
    key?: string;
    login?: string;
  }>;
}

export default async function ResetPasswordPage({
  searchParams,
}: Props) {
  const params =
    await searchParams;

  const key =
    params.key ?? "";

  const login =
    params.login ?? "";

  return (
    <main>
      <InnerBanner
        title="Reset Password"
        description="Choose a new password for your account."
        breadcrumbs={[
          {
            label: "Home",
            href: "/",
          },
          {
            label:
              "Reset Password",
          },
        ]}
      />

      <section className="px-4 py-10 sm:px-6 md:py-14 lg:px-8 lg:py-16">
        <ResetPasswordForm
          login={login}
          resetKey={key}
        />
      </section>
    </main>
  );
}