import { AboutData } from "@/types/about";

export function mapAbout(
  data: any
): AboutData {
  const about =
    data?.page?.aboutUs;

  return {
    pageTitle: data?.page?.title ?? "",
    content:
    data?.page?.content ?? "",

  featuredImage: {
    url:
      data?.page?.featuredImage
        ?.node?.sourceUrl ?? "",

    alt:
      data?.page?.featuredImage
        ?.node?.altText ?? "",
  },
    banner: {
      image: {
        url:
          about?.bannerImage
            ?.node?.sourceUrl ?? "",

        alt:
          about?.bannerImage
            ?.node?.altText ?? "",
      },

      title:
        about?.bannerTitle ?? "",

      text:
        about?.bannerText ?? "",
    },

    history: {
      title:
        about?.industryMainTitle ?? "",

      subText:
        about?.industrySubText ?? "",

      items:
        about?.industryBox?.map(
          (item: any) => ({
            image: {
              url:
                item?.industryImage
                  ?.node
                  ?.sourceUrl ?? "",

              alt:
                item?.industryImage
                  ?.node
                  ?.altText ?? "",
            },

            text:
              item?.industryText ?? "",

            cta:
              item?.industryCta
                ? {
                    title:
                      item.industryCta
                        .title ?? "",

                    url:
                      item.industryCta
                        .url ?? "#",

                    target:
                      item.industryCta
                        .target ?? "",
                  }
                : undefined,
          })
        ) ?? [],
    },

    achievement:
      about?.achievement?.map(
        (item: any) => ({
          image: {
              url:
                item?.icon
                  ?.node
                  ?.sourceUrl ?? "",

              alt:
                item?.icon
                  ?.node
                  ?.altText ?? "",
            },

          text:
            item?.text ?? "",
        })
      ) ?? [],

    whyChoose: {
      title:
        about?.whyChooseTitle ?? "",

      content:
        about?.whyChooseContent ?? "",

      cta:
        about?.whyChooseCta
          ? {
              title:
                about.whyChooseCta
                  .title ?? "",

              url:
                about.whyChooseCta
                  .url ?? "#",

              target:
                about.whyChooseCta
                  .target ?? "",
            }
          : undefined,

      image: {
        url:
          about?.whyChooseImage
            ?.node?.sourceUrl ?? "",

        alt:
          about?.whyChooseImage
            ?.node?.altText ?? "",
      },
    },

    supply: {
      title:
        about?.supplyTitle ?? "",

      text:
        about?.supplyText ?? "",

      categories:
        about?.supplyCat?.nodes?.map(
          (category: any) => ({
            id:
              category?.databaseId ?? 0,

            name:
              category?.name ?? "",

            slug:
              category?.slug ?? "",
            image: {
              url:
                category
                  ?.acfProductCategory
                  ?.homeIcon
                  ?.node
                  ?.sourceUrl ?? "",

              alt:
                category
                  ?.acfProductCategory
                  ?.homeIcon
                  ?.node
                  ?.altText ?? "",
            },
          })
        ) ?? [],
    },

    faq: {
      title:
        about?.faqTitle ?? "",

      subText:
        about?.faqSubText ?? "",

      cta:
        about?.faqCta
          ? {
              title:
                about.faqCta.title ?? "",

              url:
                about.faqCta.url ?? "#",

              target:
                about.faqCta.target ?? "",
            }
          : undefined,

      items:
        about?.faqs?.map(
          (item: any) => ({
            question:
              item?.faqQuestion ?? "",

            answer:
              item?.faqAnswer ?? "",
          })
        ) ?? [],
    },
  };
}