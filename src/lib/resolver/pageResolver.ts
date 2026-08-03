import { CategoryService, PageService } from "@/services";
import { PageData } from "@/types/page";

class PageResolver {
  resolve(pathname: string): PageData | null {
    // Static Pages
    const page = PageService.getPage(pathname);

    if (page) {
      return page;
    }

    // Category
    if (pathname.startsWith("/category/")) {
      const slug = pathname.split("/")[2];

      return CategoryService.getCategory(slug);
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