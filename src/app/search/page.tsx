import InnerBanner from "@/components/Common/InnerBanner/InnerBanner";
import ProductGrid from "@/components/Product/ProductGrid";
import ProductService from "@/services/product.service";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const searchTerm =
    params.q?.trim() ?? "";

  const products = searchTerm
    ? await ProductService.searchProducts(
        searchTerm
      )
    : [];

  return (
    <main>
      <InnerBanner
        title="Search"
        description={
          searchTerm
            ? `Search results for "${searchTerm}"`
            : "Search our products."
        }
        breadcrumbs={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "Search",
          },
        ]}
      />

      <section className="px-4 py-10 sm:px-6 md:py-14 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-[1320px]">

          {!searchTerm ? (
            <div className="py-10 text-center">
              <h2 className="text-2xl font-semibold text-black">
                Search Products
              </h2>

              <p className="mt-3 text-sm text-gray-600">
                Enter a product name or keyword
                using the search icon above.
              </p>
            </div>
          ) : products.length === 0 ? (
            <div className="py-10 text-center">
              <h2 className="text-2xl font-semibold text-black">
                No products found
              </h2>

              <p className="mt-3 text-sm text-gray-600">
                We couldn&apos;t find any products
                matching &quot;{searchTerm}&quot;.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8 flex flex-col gap-2 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-black md:text-2xl">
                    Search Results
                  </h2>

                  <p className="mt-1 text-sm text-gray-600">
                    Results for &quot;{searchTerm}&quot;
                  </p>
                </div>

                <p className="text-sm text-gray-600">
                  {products.length}{" "}
                  {products.length === 1
                    ? "product"
                    : "products"}
                </p>
              </div>

              <ProductGrid
                products={products}
              />
            </>
          )}

        </div>
      </section>
    </main>
  );
}