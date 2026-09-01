export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BannerAction {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
}

export interface BannerData {
  title?: string;
  description?: string;
  image?: string;

  breadcrumbs: BreadcrumbItem[];

  actions?: BannerAction[];
}