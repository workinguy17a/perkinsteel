export const GET_POSTS = `
  query GetPosts($first: Int = 12, $after: String) {
    posts(
      first: $first
      after: $after
      where: {
        orderby: {
          field: DATE
          order: DESC
        }
      }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }

      nodes {
        databaseId
        slug
        title
        date
        excerpt
        content

        featuredImage {
          node {
            sourceUrl
            altText
          }
        }

        author {
          node {
            name
          }
        }

        categories {
          nodes {
            databaseId
            name
            slug
          }
        }
      }
    }
  }
`;

export const GET_POST_BY_SLUG = `
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      databaseId
      slug
      title
      date
      excerpt
      content

      featuredImage {
        node {
          sourceUrl
          altText
        }
      }

      author {
        node {
          name
        }
      }

      categories {
        nodes {
          databaseId
          name
          slug
        }
      }
    }
  }
`;