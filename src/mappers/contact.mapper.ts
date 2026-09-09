import { ContactData } from "@/types/contact";

export function mapContact(
  data: any
): ContactData {
  const contact = data?.page?.contactUs;

  return {
    pageTitle:
      data?.page?.title ?? "",

    banner: {
      image: {
        url:
          contact?.bannerImage
            ?.node?.sourceUrl ?? "",

        alt:
          contact?.bannerImage
            ?.node?.altText ?? "",
      },

      title:
        contact?.bannerTitle ?? "",

      text:
        contact?.bannerText ?? "",
    },

    form: {
      title:
        contact?.contactFormTitle ?? "",

      text:
        contact?.contactFormText ?? "",

      code:
        contact?.contactFormCode ?? "",
    },

    info: {
      title:
        contact?.contactInfoTitle ?? "",

      text:
        contact?.contactInfoText ?? "",

      followUsTitle:
        contact?.followUsTitle ?? "",
    },

    features:
      contact?.featureBox?.map(
        (item: any) => ({
          icon: {
            url:
              item?.icon
                ?.node?.sourceUrl ?? "",

            alt:
              item?.icon
                ?.node?.altText ?? "",
          },

          title:
            item?.featureTitle ?? "",

          text:
            item?.featureText ?? "",
        })
      ) ?? [],

    map:
      contact?.contactMap ?? "",
  };
}