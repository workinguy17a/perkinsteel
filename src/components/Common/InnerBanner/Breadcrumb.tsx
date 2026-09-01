import Link from "next/link";
import { BreadcrumbItem } from "./types";

interface Props {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumb">
      <ol className="flex items-center gap-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center">
              {!isLast && item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-primary transition"
                >
                  {item.label}
                </Link>
              ) : (
                <span>{item.label}</span>
              )}

              {!isLast && (
                <span className="mx-2">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}