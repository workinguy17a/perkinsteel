export const GET_PRODUCT_BY_SLUG = `
query GetProductBySlug($slug: ID!) {
  product(id: $slug, idType: SLUG) {
    __typename

    databaseId
    slug
    name
    sku

    image {
      sourceUrl
      altText
    }

    galleryImages {
      nodes {
        sourceUrl
        altText
      }
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

    acfproduct {
      uspImage {
        node {
          sourceUrl
          altText
        }
      }

      productUspBar {
        uspIcon {
          node {
            sourceUrl
            altText
          }
        }

        uspTitle
        uspText
      }
    }

    related {
  nodes {
    __typename

    ... on Product {
      databaseId
      slug
      name
      sku

      image {
        sourceUrl
        altText
      }

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

    ... on ProductWithPricing {
      price
      regularPrice
      salePrice
    }
  }
}
`;

export const GET_SHOP_PAGE = `
  query GetShopPage($id: ID!) {
    page(id: $id, idType: DATABASE_ID) {
      title
      content
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;