export const GET_GLOBAL_OPTIONS = `
  query GetGlobalOptions {
    themeSetting {
      globalfield {
        logo {
          node {
            sourceUrl
            altText
          }
        }

        socialLinks {
          icons
          url
        }

        phoneNumber
        email
        address
        bottomText
        copyright

        usp {
          uspIcon
          uspText
        }

        achievements {
          icon {
                node {
                sourceUrl
                altText
                }
            }
          text
        }
      }
    }
  }
`;