export interface Product {
  id: number;
  name: string;
  slug: string;

  image: string;

  price: number;

  regularPrice?: number;

  salePrice?: number;

  rating?: number;

  reviewCount?: number;

  category?: string;

  isSale?: boolean;

  isFeatured?: boolean;

  stockStatus?: "instock" | "outofstock";
}
