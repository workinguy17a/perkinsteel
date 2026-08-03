import { RouteType } from "./route";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface CTAButton {
  text: string;
  url: string;
  variant?: "primary" | "secondary";
}

export interface BannerData {
  title: string;
  subtitle?: string;
  image: string;
  breadcrumbs: BreadcrumbItem[];
  ctaButtons?: CTAButton[];
}

export interface PageData {
  type: RouteType;
  slug: string;
  banner: BannerData;
}