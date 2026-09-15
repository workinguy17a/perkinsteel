export interface Product {
  id: number;

  slug: string;

  name: string;

  sku?: string;

  image: string;

  price: number;

  priceHtml?: string;

  currency?: string;

  regularPrice?: number;

  regularPriceHtml?: string;
  featured?: boolean;

  salePrice?: number;

  salePriceHtml?: string;

  rating?: number;

  reviewCount?: number;

  category?: string;
  categorySlugs?: string[];

  stockStatus?: "instock" | "outofstock";

  // Product detail
  description?: string;

  shortDescription?: string;

  gallery?: ProductImage[];

  specifications?: ProductSpecification[];

  // Related products
  relatedProducts?: Product[];
    uspImage?: {
    url: string;
    alt: string;
  };

  productUspBar?: {
    icon: {
      url: string;
      alt: string;
    };
    title: string;
    text: string;
  }[];
}

export interface ProductImage {
  url: string;
  alt?: string;
}

export interface ProductSpecification {
  label: string;
  value: string;
}