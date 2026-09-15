"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AuthService } from "@/services/auth.service";

const accountLinks = [
  {
    label: "Dashboard",
    href: "/my-account",
  },
  {
    label: "Orders",
    href: "/my-account/orders",
  },
  {
    label: "Addresses",
    href: "/my-account/addresses",
  },
  {
    label: "Account Details",
    href: "/my-account/account-details",
  },
];

export default function AccountNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    try {
      await AuthService.logout();

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <aside className="w-full lg:w-[280px] lg:shrink-0">
      <div className="overflow-hidden border border-gray-200 bg-white">
        <nav className="flex flex-col">
          {accountLinks.map((item) => {
            const active =
              item.href === "/my-account"
                ? pathname === "/my-account"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`border-b border-gray-200 px-5 py-4 text-sm font-medium transition last:border-b-0 ${
                  active
                    ? "bg-black text-white"
                    : "text-black hover:bg-gray-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <button
            type="button"
            onClick={handleLogout}
            className="border-t border-gray-200 px-5 py-4 text-left text-sm font-medium text-black transition hover:bg-gray-100"
          >
            Logout
          </button>
        </nav>
      </div>
    </aside>
  );
}