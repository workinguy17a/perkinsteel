import { RouteType } from "@/types/route";
import { PageData } from "@/types/page";

const categories: PageData[] = [
  {
    type: RouteType.CATEGORY,

    slug: "kitchenware",

    banner: {
      title: "Kitchenware",

      image: "/assets/image/category-banner.png",

      breadcrumbs: [
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop" },
        { label: "Kitchenware" },
      ],

      ctaButtons: [],
    },
  },

  {
    type: RouteType.CATEGORY,

    slug: "knives",

    banner: {
      title: "Knives",

      image: "/assets/image/category-banner.png",

      breadcrumbs: [
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop" },
        { label: "Knives" },
      ],

      ctaButtons: [],
    },
  },
];

export default categories;