import { graphqlFetch } from "@/graphql/fetcher";
import { GET_PRODUCT_CATEGORIES } from "@/graphql/queries/categories";
import { mapCategory } from "@/mappers/category.mapper";
import { Category } from "@/types/category";

class CategoryService {
  async getCategories(): Promise<Category[]> {
    const data: any = await graphqlFetch(GET_PRODUCT_CATEGORIES);

    return data.productCategories.nodes.map(mapCategory);
  }

  async getCategory(slug: string): Promise<Category | null> {
    const categories = await this.getCategories();

    return (
      categories.find((category) => category.slug === slug) ?? null
    );
  }
}

export default new CategoryService();

