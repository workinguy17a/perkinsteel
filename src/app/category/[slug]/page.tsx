import { notFound } from "next/navigation";

import ProductService from "@/services/product.service";

import InnerBanner from "@/components/Common/InnerBanner";
import CategoryContent from "@/components/Category/CategoryContent";

import CategoryService from "@/services/category.service";





interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({
  params,
}: Props) {
  const { slug } = await params;

  const [data, categories] = await Promise.all([
  ProductService.getProductsByCategory(slug),
  CategoryService.getCategories(),
]);

  if (!data) {
    notFound();
  }

  //console.log(categories);

  return (
    <>
      <InnerBanner
  title={data.category.name}
  description={data.category.description}
  image={data.category.bannerImage}
  breadcrumbs={[
    { label: "Home", href: "/" },
    { label: data.category.name },
  ]}
/>

      <CategoryContent
    products={data.products}
    category={data.category}
    categories={categories}
/>
    </>
  );
}