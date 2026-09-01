export interface HomepageFeaturedCategory {
  id: number;
  name: string;
  slug: string;
}

export interface HomepageData {
  featuredProductCategories: HomepageFeaturedCategory[];
  productsPerCategory: number;
}