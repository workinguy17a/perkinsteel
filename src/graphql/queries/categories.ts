export const GET_PRODUCT_CATEGORIES = `
query GetProductCategories {
  productCategories(first: 100, where: { hideEmpty: true }) {
    nodes {
      databaseId
      name
      slug
      count

      parent {
        node {
          databaseId
          slug
        }
      }

      children(first: 100) {
        nodes {
          databaseId
          name
          slug
          count
        }
      }
    }
  }
}
`;