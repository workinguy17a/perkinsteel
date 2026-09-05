export const GET_HOMEPAGE = `
query GetHomepage {
  page(id: "/", idType: URI) {
    id
    title

    homepagefield {

      bannerTitle
        bannerSubText
        redText

        bannerCta {
          buttonOne {
            title
            url
            target
          }

          buttonTwo {
            title
            url
            target
          }
        }

        bannerImage {
          node {
            sourceUrl
            altText
          }
        }
      catBlocks {
        catImages {
          node {
            sourceUrl
            altText
          }
        }

        catName
        catText

        catLink {
          title
          url
          target
        }
      }

      industryBox{
        industryImage{
          node {
            sourceUrl
            altText
          }
        }
        industryText
        industryCta{
          title
          url
          target
        }
      }

      
      whyChooseTitle
      whyChooseContent

      whyChooseCta {
        title
        url
        target
      }

      midBannerSubTitle
      midBannerTitle
      midBannerCta{
        title
        url
        target
      }
      midBannerImage{
        node {
          sourceUrl
          altText
        }
      }

      hospitalityCategory {
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

      featuredProductCategories {
        nodes {
          databaseId
          name
          slug
        }
      }

      productsPerCategory

      faqTitle
      faqSubText
      faqCta{
        title
        url
        target
      }
      faqs{
        faqQuestion
        faqAnswer
      }
    }
  }
}
`;