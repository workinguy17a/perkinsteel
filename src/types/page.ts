import { RouteType } from "./route";
import { BannerData } from "./banner";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface CTAButton {
  text: string;
  url: string;
  variant?: "primary" | "secondary";
}

export interface PageData {
  type: RouteType;
  slug: string;
  banner: BannerData;
}