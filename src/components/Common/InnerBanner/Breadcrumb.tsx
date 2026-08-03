import Link from "next/link";
import { BreadcrumbItem } from "@/types/page";

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-sm text-white">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="hover:text-primary transition">
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}

            {index < items.length - 1 && (
              <span className="text-gray-300">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}