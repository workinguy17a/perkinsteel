export const GET_CONTACT_PAGE = `
  query GetContactPage {
    page(id: "contact-us", idType: URI) {
      id
      title

      contactUs {
        bannerImage {
          node {
            sourceUrl
            altText
          }
        }

        bannerTitle
        bannerText

        contactFormTitle
        contactFormText
        contactFormCode

        contactInfoTitle
        contactInfoText

        followUsTitle

        featureBox {
          icon {
            node {
              sourceUrl
              altText
            }
          }

          featureTitle
          featureText
        }

        contactMap
      }
    }
  }
`;