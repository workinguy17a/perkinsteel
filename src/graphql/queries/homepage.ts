export const GET_HOMEPAGE = `
query GetHomepage {
  page(id: "home", idType: URI) {
    id
    title

    homepagefield {
      featuredProductCategories {
        nodes {
          databaseId
          name
          slug
        }
      }

      productsPerCategory
    }
  }
}
`;