import { GraphQLClient } from "graphql-request";
import { getFrontendUrl } from "@/utils/url";

const client = new GraphQLClient(
  "https://admin.perkinssteel.com/graphql"
);

interface MenuItem {
  path?: string | null;
  [key: string]: unknown;
}

interface MenuNode {
  menuItems?: {
    nodes?: MenuItem[] | null;
    [key: string]: unknown;
  } | null;
  [key: string]: unknown;
}

interface MenuData {
  menus?: {
    nodes?: MenuNode[] | null;
    [key: string]: unknown;
  } | null;
  [key: string]: unknown;
}

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

  const data = await client.request<MenuData>(query);

  const menus = data.menus;
  const nodes = menus?.nodes;

  if (!nodes) {
    return data;
  }

  return {
    ...data,
    menus: {
      ...menus,
      nodes: nodes.map((menu) => {
        const menuItems = menu.menuItems;

        if (!menuItems) {
          return menu;
        }

        return {
          ...menu,
          menuItems: {
            ...menuItems,
            nodes: menuItems.nodes?.map((item) => ({
              ...item,
              path: getFrontendUrl(item.path ?? undefined),
            })),
          },
        };
      }),
    },
  };
}
