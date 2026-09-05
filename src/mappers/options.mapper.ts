import { GlobalOptions } from "@/types/options";

export function mapGlobalOptions(
  data: any
): GlobalOptions {
  const global =
    data?.themeSetting?.globalfield;

  return {
    logo: {
      url:
        global?.logo?.node?.sourceUrl ?? "",
      alt:
        global?.logo?.node?.altText ?? "",
    },

    socialLinks:
      global?.socialLinks?.map(
        (item: any) => ({
          icons: item?.icons ?? "",
          url: item?.url ?? "",
        })
      ) ?? [],

    phoneNumber:
      global?.phoneNumber ?? "",

    email:
      global?.email ?? "",

    address:
      global?.address ?? "",

    bottomText:
      global?.bottomText ?? "",

    copyright:
      global?.copyright ?? "",

    usp:
      global?.usp?.map(
        (item: any) => ({
          icon: item?.uspIcon ?? "",
          text: item?.uspText ?? "",
        })
      ) ?? [],
  };
}