function parsePrice(price?: string | null): number {
  if (!price) return 0;

  return Number(price.replace(/[^\d.]/g, ""));
}

function getCurrency(price?: string | null): string {
  if (!price) return "";

  return price.replace(/[0-9.,\s]/g, "");
}

export function mapProduct(node: any): Product {
  return {
    id: node.databaseId,
    slug: node.slug,
    name: node.name,
    sku: node.sku ?? undefined,

    image:
      node.image?.sourceUrl ||
      "/assets/image/no-image.png",

    featured: Boolean(node.featured),

    price: parsePrice(node.price),
    priceHtml: node.price,
    currency: getCurrency(node.price),

    regularPrice: node.regularPrice
      ? parsePrice(node.regularPrice)
      : undefined,

    regularPriceHtml: node.regularPrice,

    salePrice: node.salePrice
      ? parsePrice(node.salePrice)
      : undefined,

    salePriceHtml: node.salePrice,

    rating: Number(node.averageRating ?? 0),
    reviewCount: Number(node.reviewCount ?? 0),

    category:
      node.productCategories?.nodes?.[0]?.name ?? "",

    // ADD THIS
    categorySlugs:
      node.productCategories?.nodes?.map(
        (category: any) => category.slug
      ) ?? [],

    stockStatus: "instock",

    shortDescription: node.shortDescription ?? "",
    description: node.description ?? "",

    gallery:
      node.galleryImages?.nodes?.map((image: any) => ({
        url: image.sourceUrl,
        alt: image.altText ?? "",
      })) ?? [],

    relatedProducts:
      node.related?.nodes?.map(mapProduct) ?? [],
  };
}