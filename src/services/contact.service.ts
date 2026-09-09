import { graphqlFetch } from "@/graphql/fetcher";
import { GET_CONTACT_PAGE } from "@/graphql/queries/contact";
import { mapContact } from "@/mappers/contact.mapper";

export const ContactService = {
  async getContact() {
    const data =
      await graphqlFetch(
        GET_CONTACT_PAGE
      );

    return mapContact(data);
  },
};