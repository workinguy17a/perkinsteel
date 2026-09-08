import { graphqlFetch } from "@/graphql/fetcher";
import { GET_ABOUT_PAGE } from "@/graphql/queries/about";
import { mapAbout } from "@/mappers/about.mapper";

export const AboutService = {
  async getAbout() {
    const data =
      await graphqlFetch(
        GET_ABOUT_PAGE
      );

    return mapAbout(data);
  },
};