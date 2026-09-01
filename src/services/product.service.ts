import { graphqlFetch } from "@/graphql/fetcher";
import { GET_PRODUCTS } from "@/graphql/queries/products";
import { GET_PRODUCT_BY_SLUG } from "@/graphql/queries/product";
import { GET_CATEGORY_PRODUCTS } from "@/graphql/queries/category-products";
import { mapProduct } from "@/mappers/product.mapper";
import { Product } from "@/types/product";

class ProductService {
  async getProducts(first = 500): Promise<Product[]> {
    const data: any = await graphqlFetch(GET_PRODUCTS, {
      first,
    });

    return data.products.nodes.map(mapProduct);
  }

  async getLatestProducts(first = 8): Promise<Product[]> {
  const data: any = await graphqlFetch(
    GET_PRODUCTS,
    { first }
  );

  return data.products.nodes.map(mapProduct);
}

async getRandomProducts(
  count = 8,
  excludeIds: number[] = []
): Promise<Product[]> {
  const products = await this.getProducts();

  const availableProducts = products.filter(
    (product) => !excludeIds.includes(product.id)
  );

  return [...availableProducts]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}

  async getProductsByCategory(
    slug: string,
    first = 500
  ) {
    const data: any = await graphqlFetch(
      GET_CATEGORY_PRODUCTS,
      {
        slug,
        first,
      }
    );

    if (!data.productCategory) {
      return null;
    }

    return {
      category: {
        id: data.productCategory.databaseId,
        name: data.productCategory.name,
        slug: data.productCategory.slug,
        description: data.productCategory.description,

        bannerImage:
          data.productCategory.acfProductCategory
            ?.categoryBanner
            ?.node
            ?.sourceUrl ?? "",
      },

      products: data.productCategory.products.nodes.map(mapProduct),
    };
  }

  async getProductBySlug(
    slug: string
  ): Promise<Product | null> {
    const data: any = await graphqlFetch(
      GET_PRODUCT_BY_SLUG,
      {
        slug,
      }
    );

    if (!data.product) {
      return null;
    }

    return mapProduct(data.product);
    const product = mapProduct(data.product);

product.relatedProducts =
  data.product.related?.nodes
    ?.map(mapProduct)
    ?? [];

return product;
  }
  
}

export default new ProductService();