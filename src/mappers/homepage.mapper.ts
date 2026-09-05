import { HomepageData } from "@/types/homepage";

export function mapHomepage(data: any): HomepageData {
  const homepagefield = data.page?.homepagefield;

  return {
    banner: {
      title:
        homepagefield?.bannerTitle ?? "",

      subText:
        homepagefield?.bannerSubText ?? "",

      redText:
        homepagefield?.redText ?? "",

      image: {
        url:
          homepagefield?.bannerImage
            ?.node?.sourceUrl ?? "",

        alt:
          homepagefield?.bannerImage
            ?.node?.altText ?? "",
      },

      buttonOne:
        homepagefield?.bannerCta?.buttonOne
          ? {
              title:
                homepagefield.bannerCta
                  .buttonOne.title ?? "",

              url:
                homepagefield.bannerCta
                  .buttonOne.url ?? "#",

              target:
                homepagefield.bannerCta
                  .buttonOne.target ?? "",
            }
          : undefined,

      buttonTwo:
        homepagefield?.bannerCta?.buttonTwo
          ? {
              title:
                homepagefield.bannerCta
                  .buttonTwo.title ?? "",

              url:
                homepagefield.bannerCta
                  .buttonTwo.url ?? "#",

              target:
                homepagefield.bannerCta
                  .buttonTwo.target ?? "",
            }
          : undefined,
},

    categoryBlocks:
      homepagefield?.catBlocks?.map(
        (item: any) => ({
          image: {
            url:
              item?.catImages?.node?.sourceUrl ??
              "",
            alt:
              item?.catImages?.node?.altText ??
              "",
          },

          name:
            item?.catName ?? "",

          text:
            item?.catText ?? "",

          link:
            item?.catLink
              ? {
                  title:
                    item.catLink.title ?? "",
                  url:
                    item.catLink.url ?? "#",
                  target:
                    item.catLink.target ?? "",
                }
              : undefined,
        })
      ) ?? [],

    whyChoose: {
      title:
        homepagefield?.whyChooseTitle ?? "",
      text:
        homepagefield?.whyChooseContent ?? "",
      cta:
        homepagefield?.whyChooseCta
        ?{
          title:
            homepagefield?.whyChooseCta.title ?? "",
          url:
            homepagefield?.whyChooseCta.url ?? "#",
          target:
            homepagefield?.whyChooseCta.target ?? "",
        }
        : undefined,
    },

    industryBlocks:
      homepagefield?.industryBox?.map(
        (item: any) => ({
          image: {
            url:
              item?.industryImage?.node?.sourceUrl ??
              "",
            alt:
              item?.industryImage?.node?.altText ??
              "",
          },

          text:
            item?.industryText ?? "",

          link:
            item?.industryCta
              ? {
                  title:
                    item.industryCta.title ?? "",
                  url:
                    item.industryCta.url ?? "#",
                  target:
                    item.industryCta.target ?? "",
                }
              : undefined,
        })
      ) ?? [],

    midBanner:{
      image: {
        url:
          homepagefield?.midBannerImage
            ?.node?.sourceUrl ?? "",

        alt:
          homepagefield?.midBannerImage
            ?.node?.altText ?? "",
      },
      title:
        homepagefield?.midBannerTitle ?? "",
      subtitle:
        homepagefield?.midBannerSubTitle ?? "",
      cta:
        homepagefield?.midBannerCta
        ?{
          title:
            homepagefield?.midBannerCta.title ?? "",
          url:
            homepagefield?.midBannerCta.url ?? "#",
          target:
            homepagefield?.midBannerCta.target ?? "",
        }
        : undefined,
    },

    hospitalityCategories:
  homepagefield
    ?.hospitalityCategory
    ?.nodes?.map(
      (category: any) => ({
        id: category.databaseId,
        name: category.name,
        slug: category.slug,

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

    faqSection:{
        title:
        homepagefield?.faqTitle ?? "",
        subtext:
        homepagefield?.faqSubText ?? "",
        cta:
        homepagefield?.faqCta
          ? {
              title:
                homepagefield.faqCta.title ?? "",

              url:
                homepagefield.faqCta.url ?? "#",

              target:
                homepagefield.faqCta.target ?? "",
            }
          : undefined,
        
          items:
            homepagefield
              ?.faqs
              ?.map(
                (item: any) => ({
                  question:
                    item?.faqQuestion ?? "",

                  answer:
                    item?.faqAnswer ?? "",
                })
              ) ?? [],
    },


    featuredProductCategories:
      homepagefield?.featuredProductCategories?.nodes?.map(
        (category: any) => ({
          id: category.databaseId,
          name: category.name,
          slug: category.slug,
        })
      ) ?? [],



    

    productsPerCategory: Number(
      homepagefield?.productsPerCategory ?? 8
    ),
  };
}