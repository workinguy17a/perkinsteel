
import Image from "next/image";
import CategorySidebar from "@/components/Category/CategorySidebar";
import CategoryContent from "@/components/Category/CategoryContent";
import InnerBanner from "@/components/Common/InnerBanner";
function formatTitle(slug: string) {
  return slug
    .split("-")
    .map(
      word => word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <>
    <InnerBanner />    
    <CategoryContent />
</>
  );
}

