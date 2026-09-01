export const GET_PRODUCTS = `
query GetProducts($first: Int = 100, $after: String) {
  products(first: $first,
  where: {
      orderby: {
        field: DATE
        order: DESC
      }
    }
  after: $after) {
    pageInfo {
      hasNextPage
      endCursor
    }
    nodes {
      __typename

      databaseId
      slug
      name
      sku

      featured

      image {
        sourceUrl
        altText
      }

      shortDescription
      description

      averageRating
      reviewCount

      productCategories {
        nodes {
          databaseId
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
`;