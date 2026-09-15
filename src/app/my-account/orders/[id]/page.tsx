import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import InnerBanner from "@/components/Common/InnerBanner/InnerBanner";
import AccountNavigation from "@/components/Account/AccountNavigation";
import AccountOrderDetail from "@/components/Account/AccountOrderDetail";
import { verifySessionToken } from "@/lib/auth";

export const metadata = {
  title: "View Order | Perkins Steel",
};

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function AccountOrderPage({
  params,
}: Props) {
  const { id } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get("perkins_session")?.value;

  if (!token) {
    redirect("/login");
  }

  const session = await verifySessionToken(token);

  if (!session) {
    redirect("/login");
  }

  return (
    <main>
      <InnerBanner
        title="View Order"
        description="View your order details."
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
            label: "Orders",
            href: "/my-account/orders",
          },
          {
            label: `Order #${id}`,
          },
        ]}
      />

      <section className="px-4 py-10 sm:px-6 md:py-14 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-[1320px]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
            <AccountNavigation />

            <div className="min-w-0 flex-1">
              <AccountOrderDetail orderId={id} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}