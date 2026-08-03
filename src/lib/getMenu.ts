import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(
  "https://perkinknives.net/graphql"
);

export async function getMenu() {
  const query = `
  {
    menus {
      nodes {
        name
        menuItems {
          nodes {
            id
            label
            path
          }
        }
      }
    }
  }
  `;

  return client.request(query);
}