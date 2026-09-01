import Link from "next/link";
import { BannerAction } from "./types";

interface Props {
  actions: BannerAction[];
}

export default function BannerActions({
  actions,
}: Props) {
  return (
    <div className="btn-wrapper">
      {actions.map((action) => (
        <Link
          key={action.href}
          href={action.href}
          className={
            action.variant === "secondary"
              ? "cta-btn btn-white btn"
              : "cta-btn btn"
          }
        >
          {action.label}
        </Link>
      ))}
    </div>
  );
}