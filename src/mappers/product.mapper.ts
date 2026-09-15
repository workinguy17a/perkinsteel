import { Product } from "@/types/product";
function parsePrice(value?: string | null): number {
  if (!value) return 0;

  const cleaned = value
    .replace(/<[^>]*>/g, "")
    .replace(/&(?:#\d+|#x[\da-f]+|[a-z]+);/gi, "")
    .replace(/,/g, "")
    .trim();

  const match = cleaned.match(/\d+(?:\.\d+)?/);

  return match ? Number(match[0]) : 0;
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

    uspImage: node.acfproduct?.uspImage?.node
      ? {
          url:
            node.acfproduct.uspImage.node.sourceUrl ?? "",
          alt:
            node.acfproduct.uspImage.node.altText ?? "",
        }
      : undefined,

      productUspBar:
        node.acfproduct?.productUspBar?.map(
          (item: any) => ({
            icon: {
              url:
                item.uspIcon?.node?.sourceUrl ?? "",
              alt:
                item.uspIcon?.node?.altText ?? "",
            },
            title:
              item.uspTitle ?? "",
            text:
              item.uspText ?? "",
          })
        ) ?? [],
  };
}