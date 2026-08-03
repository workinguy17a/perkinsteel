import pages from "@/data/pages";
import { PageData } from "@/types/page";

class PageService {
  getPage(pathname: string): PageData | null {
    return pages[pathname] ?? null;
  }
}

export default new PageService();