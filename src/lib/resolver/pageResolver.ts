import { CategoryService, PageService } from "@/services";
import { PageData } from "@/types/page";
import { RouteType } from "@/types/route";

class PageResolver {
  async resolve(pathname: string): Promise<PageData | null> {
    // Static Pages
    const page = PageService.getPage(pathname);

    if (page) {
      return page;
    }

    // Category
    if (pathname.startsWith("/category/")) {
      const slug = pathname.split("/")[2];

      const category = await CategoryService.getCategory(slug);

      if (!category) {
        return null;
      }

      return {
        type: RouteType.CATEGORY,
        slug: category.slug,
        banner: category.banner ?? {
          title: category.name,
          image: "",
          breadcrumbs: [
            {
              label: "Home",
              href: "/",
            },
            {
              label: category.name,
            },
          ],
        },
      };
    }

    // Product
    if (pathname.startsWith("/product/")) {
      return null;
    }

    // Blog
    if (pathname.startsWith("/blog/")) {
      return null;
    }

    return null;
  }
}

export default new PageResolver();