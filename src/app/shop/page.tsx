import Image from "next/image";
import Link from "next/link";
import InnerBanner from "@/components/Common/InnerBanner";
import ProductService from "@/services/product.service";
import BestSellingSlider from "@/components/Shop/BestSellingSlider";
import ShopProductSlider from "@/components/Shop/ShopProductSlider";
import UspBar from "@/components/Global/UspBar";
import AchievementBar from "@/components/Global/acheivementBar";
import Testimonials from "@/components/ClientTestimonials/ClientTestimonials";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
   const [
      shopPage,
      categories,
      bestSellingProducts,
    ] = await Promise.all([
      ProductService.getShopPage(),
      ProductService.getMainCategories(),
      ProductService.getBestSellingProducts(10),
    ]); 
    console.log("SHOP PAGE:", shopPage);
  const categorySections =
    await Promise.all(
      categories.map(
        async (category: any) => {
          const data =
            await ProductService.getProductsByCategory(
              category.slug,
              8
            );

          return {
            category,
            products:
              data?.products ?? [],
          };
        }
      )
    );

    

  return (
    <main>
      <InnerBanner
        description={shopPage.description}
        image={shopPage.image.url}
        breadcrumbs={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: shopPage.title,
          },
        ]}
      />

      <UspBar />

      {/* =========================
          SHOP BY CATEGORY
      ========================== */}

      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4">

          <h2 className="mb-10 text-center text-[30px] font-bold">
            Shop By Category
          </h2>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-5 lg:gap-6">
            {categories.map((category: any) => (
                <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="
                    group
                    flex
                    basis-[calc(50%-8px)]
                    flex-col
                    items-center
                    text-center

                    sm:basis-[calc(33.333%-14px)]
                    lg:basis-[calc(16.666%-20px)]
                "
                >
                <div className="relative mb-3 aspect-square w-full max-w-[140px] overflow-hidden rounded-full bg-gray-100">
                    {category.image?.url && (
                    <Image
                        src={category.image.url}
                        alt={category.image.alt || category.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    )}
                </div>

                <h3 className="text-sm font-semibold sm:text-[15px]">
                    {category.name}
                </h3>
                </Link>
            ))}
            </div>

        </div>
      </section>


      {/* =========================
          BEST SELLING PRODUCTS
      ========================== */}

      {bestSellingProducts.length > 0 && (
        <section className="pb-14 lg:pb-16">
          <div className="max-w-7xl mx-auto px-4">

            <BestSellingSlider
                products={bestSellingProducts}
                desktopSlides={5}
            />

          </div>
        </section>
      )}


      {/* =========================
          CATEGORY COLLECTIONS
      ========================== */}

      {categorySections.map(
        (
          section: any,
          index: number
        ) => {

          if (
            section.products.length === 0
          ) {
            return null;
          }

          const isDark = index % 2 === 0;
          const isReverse = index % 2 !== 0;

          return (
            <div key={section.category.id}>
            <section
              key={
                section.category.id
              }
              className={
                isDark
                  ? "catblocks bg-black py-12 text-white lg:py-14"
                  : "catblocks bg-[#fff1f1] py-12 text-black lg:py-14"
              }
            >
              <div className="max-w-7xl mx-auto px-4">

                <div
                  className={`flex flex-col gap-8 lg:items-center ${
                    isReverse
                      ? "lg:flex-row-reverse"
                      : "lg:flex-row"
                  }`}
                >
                    <div className="w-full lg:basis-[24%] lg:shrink-0">
                      {section.category.shortTitle && (
                        <span className="mb-2 block text-xs font-semibold uppercase text-red-600">
                        {section.category.shortTitle}
                        </span>
                      )}

                        <h2 className="mb-4 text-2xl font-bold leading-tight sm:text-[28px]">
                        {section.category.name} Collection
                        </h2>

                        {section.category.description && (
                        <div
                            className={`mb-5 text-sm leading-6 ${
                            isDark
                                ? "text-gray-300"
                                : "text-gray-700"
                            }`}
                            dangerouslySetInnerHTML={{
                            __html: section.category.description,
                            }}
                        />
                        )}

                        <Link
                        href={`/category/${section.category.slug}`}
                        className="cta-btn"
                        >
                        Shop Now
                        </Link>
                    </div>

                    <div className="min-w-0 w-full lg:flex-1">
                        <ShopProductSlider products={section.products} desktopSlides={4} arrowsLeft={isReverse} />
                    </div>

                    </div>

              </div>
            </section>
            {section.category.slug === "kitchenware" && (
              <AchievementBar />
            )}
            </div>
            
          );
          
        }
      )}

      {/* Testimonials */}
          <Testimonials />
      

    </main>
  );
}