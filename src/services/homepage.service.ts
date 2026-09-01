import { graphqlFetch } from "@/graphql/fetcher";
import { GET_HOMEPAGE } from "@/graphql/queries/homepage";
import { mapHomepage } from "@/mappers/homepage.mapper";
import { HomepageData } from "@/types/homepage";

class HomepageService {
  async getHomepage(): Promise<HomepageData> {
    const data: any = await graphqlFetch(GET_HOMEPAGE);

    return mapHomepage(data);
  }
}

export default new HomepageService();