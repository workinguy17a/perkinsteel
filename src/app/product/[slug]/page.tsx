import { notFound } from "next/navigation";

import ProductService from "@/services/product.service";

import ProductDetail from "@/components/Product/ProductDetail";
import InnerBanner from "@/components/Common/InnerBanner";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({
  params,
}: Props) {
  const { slug } = await params;

  const product =
    await ProductService.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
    <InnerBanner
        breadcrumbs={[
          { label: "Home", href: "/" },
          ...(product.category
            ? [
                {
                  label: product.category,
                  href: `/category/${product.category
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`,
                },
              ]
            : []),
          {
            label: product.name,
          },
        ]}
      />
    <ProductDetail product={product} />
    </>
  );
}