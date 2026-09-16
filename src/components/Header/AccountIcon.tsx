"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AuthService } from "@/services/auth.service";

export default function AccountIcon() {
  const [href, setHref] = useState("/login");

  useEffect(() => {
    let active = true;

    async function checkAuth() {
      try {
        const result = await AuthService.me();

        if (
          active &&
          result.authenticated &&
          result.user
        ) {
          setHref("/my-account");
        }
      } catch {
        // User is logged out.
      }
    }

    checkAuth();

    return () => {
      active = false;
    };
  }, []);

  return (
    <Link
      href={href}
      aria-label="Account"
    >
      <i className="far fa-user"></i>
    </Link>
  );
}