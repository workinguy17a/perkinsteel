export const GET_CATEGORY_PRODUCTS = `
query GetCategoryProducts($slug: ID!, $first: Int = 500) {
  productCategory(id: $slug, idType: SLUG) {
    databaseId
    name
    slug
          ancestors(first: 100) {
            nodes {
              slug
            }
          }
    description
    acfProductCategory {
      categoryBanner {
        node {
          sourceUrl
          altText
        }
      }

      categoryContent

      categoryFaq {
        catQuestion
        catAnswer
      }
      faqTitle
      faqSubText
      faqCta{
          title
          url
          target
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
            ancestors(first: 100) {
              nodes {
                slug
              }
            }
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

export const GET_MAIN_PRODUCT_CATEGORIES = `
  query GetMainProductCategories {
    productCategories(
      first: 100
      where: {
        parent: 0
        hideEmpty: true
      }
    ) {
      nodes {
        databaseId
        name
        slug
        description

        image {
          sourceUrl
          altText
        }       
        
      }
    }
  }
`;


export const GET_FEATURED_CATEGORY_PRODUCTS = `
  query GetFeaturedCategoryProducts(
    $slug: ID!
    $first: Int = 100
    $after: String
  ) {
    productCategory(
      id: $slug
      idType: SLUG
    ) {
      databaseId
      name
      slug

      products(
        first: $first
        after: $after
        where: {
          featured: true
        }
      ) {
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
              ancestors(first: 100) {
                nodes {
                  slug
                }
              }
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
