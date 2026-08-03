import categories from "@/data/categories";
import { PageData } from "@/types/page";

class CategoryService {
  getCategory(slug: string): PageData | null {
    return (
      categories.find((category) => category.slug === slug) ?? null
    );
  }
}

export default new CategoryService();