import { HomepageData } from "@/types/homepage";

export function mapHomepage(data: any): HomepageData {
  const homepagefield = data.page?.homepagefield;

  return {
    featuredProductCategories:
      homepagefield?.featuredProductCategories?.nodes?.map(
        (category: any) => ({
          id: category.databaseId,
          name: category.name,
          slug: category.slug,
        })
      ) ?? [],

    productsPerCategory: Number(
      homepagefield?.productsPerCategory ?? 8
    ),
  };
}