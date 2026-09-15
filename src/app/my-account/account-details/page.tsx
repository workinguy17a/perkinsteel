import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import InnerBanner from "@/components/Common/InnerBanner/InnerBanner";
import AccountNavigation from "@/components/Account/AccountNavigation";
import AccountDetails from "@/components/Account/AccountDetails";

import {
  verifySessionToken,
} from "@/lib/auth";

export const metadata = {
  title:
    "Account Details | Perkins Steel",
};

export const dynamic =
  "force-dynamic";

export default async function AccountDetailsPage() {
  const cookieStore =
    await cookies();

  const token =
    cookieStore.get(
      "perkins_session"
    )?.value;

  if (!token) {
    redirect("/login");
  }

  const session =
    await verifySessionToken(
      token
    );

  if (!session) {
    redirect("/login");
  }

  return (
    <main>
      <InnerBanner
        title="Account Details"
        description="Manage your personal information and password."
        breadcrumbs={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "My Account",
            href: "/my-account",
          },
          {
            label:
              "Account Details",
          },
        ]}
      />

      <section className="px-4 py-10 sm:px-6 md:py-14 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-[1320px]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
            <AccountNavigation />

            <div className="min-w-0 flex-1">
              <AccountDetails
                user={
                  session.user
                }
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}