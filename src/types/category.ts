import { BannerData } from "./banner";

export interface Category {
  id: number;

  name: string;

  slug: string;

  description?: string;

  image?: string;

  // Temporary optional while migrating to WP
  banner?: BannerData;

  count: number;

  parentSlug?: string | null;

  children: Category[];
}