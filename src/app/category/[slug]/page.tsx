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

      {data.category.categoryContent && (
        <section className="category-content-section py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div
              className="category-content"
              dangerouslySetInnerHTML={{
                __html:
                  data.category.categoryContent,
              }}
            />
          </div>
        </section>
      )}

      {/* FAQs */}
      {data.category.categoryFaq?.length > 0 && (
    <section className="faq-section">
        <div className="max-w-7xl mx-auto px-4">

            <div className="faq-grid">

                {/* LEFT FAQ */}
                <div className="faq-wrap reveal fade-right">

                    {data.category.categoryFaq.map(
                      (
                        item: {
                          question: string;
                          answer: string;
                        },
                        index: number
                      ) => (
                        <details
                          className="faq-item"
                          key={index}
                          style={{
                            "--delay": `${index * 70}ms`,
                          } as React.CSSProperties}
                        >
                          <summary>
                            <span className="faq-icon">
                              <i className="fa-solid fa-square-caret-right"></i>
                            </span>

                            <span className="faq-question">
                              {item.question}
                            </span>
                          </summary>

                          <div className="faq-answer">
                            <div
                              className="pt-4 text-gray-600"
                              dangerouslySetInnerHTML={{
                                __html: item.answer,
                              }}
                            />
                          </div>
                        </details>
                      )
                    )}

                </div>


                {/* RIGHT INFO */}
                <div
                  className="faqinfo reveal fade-left"
                  style={{
                    "--delay": "120ms",
                  } as React.CSSProperties}
                >
                  <span className="faq-eyebrow">
                    Need Help?
                  </span>

                  {data.category.faqTitle && (
                    <h2>
                      {data.category.faqTitle}
                    </h2>
                  )}

                  {data.category.faqSubText && (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: data.category.faqSubText,
                      }}
                    />
                  )}

                  <div className="ctainfo">

                    <a
                      href="tel:+971581899532"
                      className="faq-contact"
                    >
                      <i className="fa-solid fa-phone"></i>
                      +971581899532
                    </a>

                    <a
                      href="mailto:sales@perkinsteel.com"
                      className="faq-contact"
                    >
                      <i className="fa-solid fa-envelope"></i>
                      sales@perkinsteel.com
                    </a>

                    {data.category.faqCta?.title && (
                      <a
                        href={data.category.faqCta.url}
                        target={
                          data.category.faqCta.target ||
                          undefined
                        }
                        className="cta-btn faq-cta"
                      >
                        {data.category.faqCta.title}

                        <i className="fa-solid fa-arrow-right"></i>
                      </a>
                    )}

                  </div>
                </div>
              
            </div>

        </div>
    </section>
    )}
    </>
  );
}