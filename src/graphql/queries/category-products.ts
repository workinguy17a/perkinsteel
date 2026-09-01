export const GET_CATEGORY_PRODUCTS = `
query GetCategoryProducts($slug: ID!, $first: Int = 500) {
  productCategory(id: $slug, idType: SLUG) {
    databaseId
    name
    slug
    description
    acfProductCategory {
      categoryBanner {
        node {
          sourceUrl
          altText
        }
      }
    }
    products(first: $first) {
      nodes {
        databaseId
        slug
        name
        sku
        featured

        image {
          sourceUrl
          altText
        }

        averageRating
        reviewCount

        productCategories {
          nodes {
            name
            slug
          }
        }

        ... on ProductWithPricing {
          price
          regularPrice
          salePrice
        }
      }
    }
  }
}
`;