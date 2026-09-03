export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BannerAction {
  text: string;
  url: string;
  variant?: "primary" | "secondary";
}

export interface BannerData {
  title?: string;
  description?: string;
  image?: string;

  breadcrumbs: BreadcrumbItem[];

  actions?: BannerAction[];
}