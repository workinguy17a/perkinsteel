import { graphqlFetch } from "@/graphql/fetcher";
import { GET_GLOBAL_OPTIONS } from "@/graphql/queries/options";
import { mapGlobalOptions } from "@/mappers/options.mapper";

export const OptionsService = {
  async getGlobalOptions() {
    const data =
      await graphqlFetch(
        GET_GLOBAL_OPTIONS
      );

    console.log(
      "GLOBAL OPTIONS RAW:",
      JSON.stringify(data, null, 2)
    );

    return mapGlobalOptions(data);
  },
};