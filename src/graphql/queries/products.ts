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

export const GET_BEST_SELLING_PRODUCTS = `
  query GetBestSellingProducts($first: Int = 10) {
    products(
      first: $first
      where: {
        orderby: {
          field: TOTAL_SALES
          order: DESC
        }
      }
    ) {
      nodes {
        databaseId
        name
        slug
        sku

        image {
          sourceUrl
          altText
        }

        productCategories {
          nodes {
            name
            slug
          }
        }

        ... on SimpleProduct {
          price
          regularPrice
          salePrice
          stockStatus
        }

        ... on VariableProduct {
          price
          regularPrice
          salePrice
          stockStatus
        }
      }
    }
  }
`;