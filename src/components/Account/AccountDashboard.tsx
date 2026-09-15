import Link from "next/link";
import type { AuthUser } from "@/lib/auth";

interface AccountDashboardProps {
  user: AuthUser;
}

export default function AccountDashboard({
  user,
}: AccountDashboardProps) {
  const customerName =
    user.firstName ||
    user.displayName ||
    user.username;

  return (
    <div className="w-full min-w-0">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-black md:text-3xl">
          Hello {customerName}
        </h2>

        <p className="mt-3 max-w-[750px] text-sm leading-6 text-gray-600">
          From your account dashboard you can view your recent orders,
          manage your billing and shipping addresses, and edit your
          account details.
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <AccountCard
          title="Orders"
          description="View your recent and previous orders."
          href="/my-account/orders"
          linkText="View Orders"
        />

        <AccountCard
          title="Addresses"
          description="Manage your billing and shipping addresses."
          href="/my-account/addresses"
          linkText="Manage Addresses"
        />

        <AccountCard
          title="Account Details"
          description="Update your name, email address and password."
          href="/my-account/account-details"
          linkText="Edit Details"
        />
      </div>
    </div>
  );
}

interface AccountCardProps {
  title: string;
  description: string;
  href: string;
  linkText: string;
}

function AccountCard({
  title,
  description,
  href,
  linkText,
}: AccountCardProps) {
  return (
    <div className="flex min-h-[190px] w-full flex-col border border-gray-200 bg-white p-5 sm:w-[calc(50%-8px)] xl:w-[calc(33.333%-11px)]">
      <h3 className="text-xl font-semibold text-black">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-gray-600">
        {description}
      </p>

      <div className="mt-auto pt-6">
        <Link
          href={href}
          className="inline-flex items-center justify-center bg-black px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white transition hover:opacity-80"
        >
          {linkText}
        </Link>
      </div>
    </div>
  );
}