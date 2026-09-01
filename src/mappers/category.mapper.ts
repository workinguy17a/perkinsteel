import { Category } from "@/types/category";

export const mapCategory = (category: any) => ({
  id: category.databaseId,
  name: category.name,
  slug: category.slug,
  count: category.count,

  parentSlug: category.parent?.node?.slug,

  children:
    category.children?.nodes?.map(mapCategory) ?? [],
});