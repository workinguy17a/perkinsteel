import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(
  "http://admin.perkinssteel.com/graphql"
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