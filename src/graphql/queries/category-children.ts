export const GET_CATEGORY_CHILDREN = `
  query GetCategoryChildren(
    $slug: ID!
  ) {
    productCategory(
      id: $slug
      idType: SLUG
    ) {
      databaseId
      name
      slug

      children {
        nodes {
          databaseId
          name
          slug
          description

          acfProductCategory {
            homeIcon {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    }
  }
`;