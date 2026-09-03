import { PageData } from "@/types/page";
import { RouteType } from "@/types/route";

const pages: Record<string, PageData> = {
  "/about": {
    type: RouteType.PAGE,
    slug: "about",
    banner: {
      title: "About Us",
      image: "/assets/image/about-banner.jpg",
      breadcrumbs: [
        { label: "Home", href: "/" },
        { label: "About Us" },
      ],
    },
  },

  "/contact": {
    type: RouteType.PAGE,
    slug: "contact",
    banner: {
      title: "Contact Us",
      image: "/assets/image/contact-banner.jpg",
      breadcrumbs: [
        { label: "Home", href: "/" },
        { label: "Contact Us" },
      ],
      actions: [
        {
          text: "Request Quote",
          url: "/contact",
        },
      ],
    },
  },
};

export default pages;