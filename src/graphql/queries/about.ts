export const GET_ABOUT_PAGE = `
  query GetAboutPage {
    page(id: "about-us", idType: URI) {
      id
      title
      content

      featuredImage {
        node {
        sourceUrl
        altText
        }
    }

      aboutUs {
        bannerImage {
          node {
            sourceUrl
            altText
          }
        }

        bannerTitle
        bannerText

        industryMainTitle        
        industrySubText

        industryBox {
          industryImage {
            node {
              sourceUrl
              altText
            }
          }

          industryText

          industryCta {
            title
            url
            target
          }
        }

        achievement {
          icon {
                node {
                sourceUrl
                altText
                }
            }
          text
        }

        whyChooseTitle
        whyChooseContent

        whyChooseCta {
          title
          url
          target
        }

        whyChooseImage {
          node {
            sourceUrl
            altText
          }
        }

        supplyTitle
        supplyText

        supplyCat {
          nodes {
            databaseId
            name
            slug
          ... on ProductCategory {
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
          

        faqTitle
        faqSubText

        faqCta {
          title
          url
          target
        }

        faqs {
          faqQuestion
          faqAnswer
        }
      }
    }
  }
`;