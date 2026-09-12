import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import NewArrivals from "@/components/NewArrivals/NewArrivals";
import AllProducts from "@/components/AllProducts/AllProducts";
import Testimonials from "@/components/ClientTestimonials/ClientTestimonials";
import ProductService from "@/services/product.service";
import HomepageService from "@/services/homepage.service";
import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts";
import UspBar from "@/components/UspBar/UspBar";
import KitchenwareCategorySlider
from "@/components/Sliders/Kwslider";
import HospitalityCategories
    from "@/components/Sliders/HospitalityCategories";

export default async function Home() {
    const products = await ProductService.getProducts();
    const homepage = await HomepageService.getHomepage();
    const banner = homepage.banner;
    const categoryBlocks = homepage.categoryBlocks;
    const whyChoose = homepage.whyChoose;
    const industryBlocks = homepage.industryBlocks;
    const midBanner = homepage.midBanner;
    const childCategories =
        await ProductService.getChildCategories(
            "kitchenware"
        );
    const hospitalityCategories = homepage.hospitalityCategories;
    const categoryProductData = await Promise.all(
        homepage.featuredProductCategories.map(
            async (category) => {
            const data =
                await ProductService.getProductsByCategory(
                category.slug,
                100
                );

      return { 
        category,
        products:
          data?.products
            .filter(
            (product: Product) =>
                product.featured === true
            )
            .slice(
              0,
              homepage.productsPerCategory
            ) ?? [],
      };
    }
  )
);

const latestProducts =
  await ProductService.getLatestProducts(12);

const randomProducts =
  await ProductService.getRandomProducts(
    12,
    latestProducts.map((product) => product.id)
  );

const faqSection =
  homepage.faqSection;
  return (
<>
    <section
    className="hero-section w-full"
    style={{
        backgroundImage: banner.image.url
            ? `url(${banner.image.url})`
            : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    }}
>
        <div className="hero-overlay"></div>

        <div className="max-w-7xl mx-auto px-4 hero-container">
            <div className="flex flex-wrap">
                <div className="w-full lg:w-1/2">
                    <div className="content-wrap">

                        {banner.redText && (
                            <span className="hero-tag hero-animate hero-delay-1">
                                {banner.redText}
                            </span>
                        )}

                        {banner.title && (
                            <div className="banner-title hero-animate hero-delay-2">
                                <h1>
                                    {banner.title}
                                </h1>
                            </div>
                        )}

                        {banner.subText && (
                            <div className="banner-subtext hero-animate hero-delay-3">
                                <p>
                                    {banner.subText}
                                </p>
                            </div>
                        )}

                    </div>

                    <div className="btn-wrapper hero-animate hero-delay-4">
                        {banner.buttonOne?.title && (
                            <a
                                href={banner.buttonOne.url}
                                target={banner.buttonOne.target || undefined}
                                className="cta-btn btn"
                            >
                                {banner.buttonOne.title}
                            </a>
                        )}

                        {banner.buttonTwo?.title && (
                            <a
                                href={banner.buttonTwo.url}
                                target={banner.buttonTwo.target || undefined}
                                className="cta-btn btn-white btn"
                            >
                                {banner.buttonTwo.title}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </section>

    <UspBar />

    {/* Category Blocks */}
    <section className="category-section w-full">
        <div className="max-w-7xl mx-auto px-4">

            <div className="flex flex-wrap category-grid">

                {/* LEFT */}
                {categoryBlocks[0] && (
                    <div className="w-full lg:w-4/12 category-column">
                        {categoryBlocks[0].link && (
                            <a
                                href={categoryBlocks[0].link.url}
                                target={
                                    categoryBlocks[0].link.target ||
                                    undefined
                                }
                                className="category-link reveal fade-right"
                            >
                                <div className="cat-box large-box">

                                    <div
                                        className="cat-bg"
                                        style={{
                                            backgroundImage:
                                                categoryBlocks[0].image.url
                                                    ? `url(${categoryBlocks[0].image.url})`
                                                    : "none",
                                        }}
                                    />

                                    <div className="cat-overlay"></div>

                                    <div className="cat-content">
                                        <span className="cat-tag">
                                            {categoryBlocks[0].name}
                                        </span>

                                        <h4>
                                            {categoryBlocks[0].text}
                                        </h4>

                                        <span className="cat-link-text">
                                            {
                                                categoryBlocks[0].link
                                                    .title
                                            }

                                            <i className="fa-solid fa-arrow-right"></i>
                                        </span>
                                    </div>

                                </div>
                            </a>
                        )}
                    </div>
                )}


                {/* MIDDLE */}
                <div className="w-full lg:w-5/12 category-column">

                    <div className="flex flex-wrap category-middle-grid">

                        {/* TOP */}
                        {categoryBlocks[1] && (
                            <div className="w-full category-inner-column">
                                {categoryBlocks[1].link && (
                                    <a
                                        href={
                                            categoryBlocks[1].link.url
                                        }
                                        target={
                                            categoryBlocks[1].link
                                                .target || undefined
                                        }
                                        className="category-link reveal fade-up"
                                        style={
                                            {
                                                "--delay": "100ms",
                                            } as React.CSSProperties
                                        }
                                    >
                                        <div className="cat-box top-box">

                                            <div
                                                className="cat-bg"
                                                style={{
                                                    backgroundImage:
                                                        categoryBlocks[1]
                                                            .image.url
                                                            ? `url(${categoryBlocks[1].image.url})`
                                                            : "none",
                                                }}
                                            />

                                            <div className="cat-overlay"></div>

                                            <div className="cat-content">
                                                <span className="cat-tag">
                                                    {
                                                        categoryBlocks[1]
                                                            .name
                                                    }
                                                </span>

                                                <h4>
                                                    {
                                                        categoryBlocks[1]
                                                            .text
                                                    }
                                                </h4>

                                                <span className="cat-link-text">
                                                    {
                                                        categoryBlocks[1]
                                                            .link.title
                                                    }

                                                    <i className="fa-solid fa-arrow-right"></i>
                                                </span>
                                            </div>

                                        </div>
                                    </a>
                                )}
                            </div>
                        )}


                        {/* SMALL LEFT */}
                        {categoryBlocks[2] && (
                            <div className="w-1/2 category-inner-column">
                                {categoryBlocks[2].link && (
                                    <a
                                        href={
                                            categoryBlocks[2].link.url
                                        }
                                        target={
                                            categoryBlocks[2].link
                                                .target || undefined
                                        }
                                        className="category-link reveal soft-zoom"
                                        style={
                                            {
                                                "--delay": "180ms",
                                            } as React.CSSProperties
                                        }
                                    >
                                        <div className="cat-box small-box">

                                            <div
                                                className="cat-bg"
                                                style={{
                                                    backgroundImage:
                                                        categoryBlocks[2]
                                                            .image.url
                                                            ? `url(${categoryBlocks[2].image.url})`
                                                            : "none",
                                                }}
                                            />

                                            <div className="cat-overlay"></div>

                                            <div className="cat-content">
                                                <span className="cat-tag">
                                                    {
                                                        categoryBlocks[2]
                                                            .name
                                                    }
                                                </span>

                                                <h4>
                                                    {
                                                        categoryBlocks[2]
                                                            .text
                                                    }
                                                </h4>

                                                <span className="cat-link-text">
                                                    {
                                                        categoryBlocks[2]
                                                            .link.title
                                                    }

                                                    <i className="fa-solid fa-arrow-right"></i>
                                                </span>
                                            </div>

                                        </div>
                                    </a>
                                )}
                            </div>
                        )}


                        {/* SMALL RIGHT */}
                        {categoryBlocks[3] && (
                            <div className="w-1/2 category-inner-column">
                                {categoryBlocks[3].link && (
                                    <a
                                        href={
                                            categoryBlocks[3].link.url
                                        }
                                        target={
                                            categoryBlocks[3].link
                                                .target || undefined
                                        }
                                        className="category-link reveal soft-zoom"
                                        style={
                                            {
                                                "--delay": "260ms",
                                            } as React.CSSProperties
                                        }
                                    >
                                        <div className="cat-box small-box">

                                            <div
                                                className="cat-bg"
                                                style={{
                                                    backgroundImage:
                                                        categoryBlocks[3]
                                                            .image.url
                                                            ? `url(${categoryBlocks[3].image.url})`
                                                            : "none",
                                                }}
                                            />

                                            <div className="cat-overlay"></div>

                                            <div className="cat-content">
                                                <span className="cat-tag">
                                                    {
                                                        categoryBlocks[3]
                                                            .name
                                                    }
                                                </span>

                                                <h4>
                                                    {
                                                        categoryBlocks[3]
                                                            .text
                                                    }
                                                </h4>

                                                <span className="cat-link-text">
                                                    {
                                                        categoryBlocks[3]
                                                            .link.title
                                                    }

                                                    <i className="fa-solid fa-arrow-right"></i>
                                                </span>
                                            </div>

                                        </div>
                                    </a>
                                )}
                            </div>
                        )}

                    </div>
                </div>


                {/* RIGHT */}
                {categoryBlocks[4] && (
                    <div className="w-full lg:w-3/12 category-column">
                        {categoryBlocks[4].link && (
                            <a
                                href={categoryBlocks[4].link.url}
                                target={
                                    categoryBlocks[4].link.target ||
                                    undefined
                                }
                                className="category-link reveal fade-left"
                                style={
                                    {
                                        "--delay": "120ms",
                                    } as React.CSSProperties
                                }
                            >
                                <div className="cat-box janitorial-box">

                                    <div
                                        className="cat-bg"
                                        style={{
                                            backgroundImage:
                                                categoryBlocks[4].image.url
                                                    ? `url(${categoryBlocks[4].image.url})`
                                                    : "none",
                                        }}
                                    />

                                    <div className="cat-overlay"></div>

                                    <div className="cat-content">
                                        <span className="cat-tag">
                                            {categoryBlocks[4].name}
                                        </span>

                                        <h4>
                                            {categoryBlocks[4].text}
                                        </h4>

                                        <span className="cat-link-text">
                                            {
                                                categoryBlocks[4].link
                                                    .title
                                            }

                                            <i className="fa-solid fa-arrow-right"></i>
                                        </span>
                                    </div>

                                </div>
                            </a>
                        )}
                    </div>
                )}

            </div>
        </div>
    </section>

    {/* Featured Product Sliders */}
    <FeaturedProducts
    categories={categoryProductData}
    />

    {/* Welcome Section */}
    <section className="welcome-section" style={{backgroundImage:"url(assets/image/perkin-welcome.webp)"}}>
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap gap-4">
                <div className="w-full lg:w-6/12 px-0.5">
                    <div className="welcome-content reveal fade-right">
                        {whyChoose.title && (
                        <div className="welcom-title">
                            <h2>{whyChoose.title}</h2>
                        </div>
                        )}
                        {whyChoose.text && (
                            <div
                            dangerouslySetInnerHTML={{
                                __html:
                                whyChoose.text,
                            }}
                            />
                        )}
                        {whyChoose.cta?.title && (
                        <div className="cta-btn-wrap">
                            <a href={whyChoose.cta.url} target={
                            whyChoose.cta
                            .target || undefined
                        } className="cta-btn">{whyChoose.cta.title}</a>
                        </div>
                        )} 
                    </div>
                </div>
            </div>
        </div>
    </section>


   {/* New Product Sliders */}
    <NewArrivals products={latestProducts} />

    {/* Industry Section */}

    <section className="industry-section w-full">
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap industry-grid">

                {industryBlocks.map((item, index) => (
                    <div
                        key={index}
                        className="w-full lg:flex-1 industry-column"
                    >
                        <div
                            className="industyr-wrap reveal fade-up"
                            style={
                                {
                                    "--delay": `${index * 120}ms`,
                                } as React.CSSProperties
                            }
                        >

                            <div
                                className="industry-bg"
                                style={{
                                    backgroundImage: item.image.url
                                        ? `url(${item.image.url})`
                                        : "none",
                                }}
                            />

                            <div className="industry-overlay"></div>

                            <div className="industry-content">

                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: item.text,
                                    }}
                                />

                                {item.link && (
                                    <a
                                        href={item.link.url}
                                        target={
                                            item.link.target || undefined
                                        }
                                        className="cta-btn industry-cta"
                                    >
                                        {item.link.title}

                                        <i className="fa-solid fa-arrow-right"></i>
                                    </a>
                                )}

                            </div>

                        </div>
                    </div>
                ))}

            </div>
        </div>
    </section>

    {/* Kitchenware Midbanner */}

    <section className="kw-collection-banner reveal soft-zoom">

        <img
            src={midBanner.image.url}
            alt={midBanner.image.alt || ""}
            className="kw-banner-image"
        />

        <div className="kw-banner-overlay"></div>

        <div className="kw-content">

            {midBanner.subtitle && (
                <p className="kw-subtitle">
                    {midBanner.subtitle}
                </p>
            )}

            {midBanner.title && (
                <h3>
                    {midBanner.title}
                </h3>
            )}

            {midBanner.cta?.title && (
                <div className="kw-banner-cta-wrap">
                    <Link
                        href={midBanner.cta.url}
                        target={midBanner.cta.target || undefined}
                        className="cta-btn btn kw-banner-cta"
                    >
                        {midBanner.cta.title}
                        <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                </div>
            )}

        </div>

    </section>

    {/* KW Collection Sliders */}
   <KitchenwareCategorySlider
    childCategories={childCategories}
    />

    {/* Hospitality Sections */}
    <HospitalityCategories
        categories={homepage.hospitalityCategories}
    />

    {/* All Products Sliders */}
    <AllProducts products={latestProducts}  />

    {/* Testimonials */}
    <Testimonials />

    {/* FAQs */}
    <section className="faq-section">
        <div className="max-w-7xl mx-auto px-4">

            <div className="faq-grid">

                {/* LEFT FAQ */}
                <div className="faq-wrap reveal fade-right">

                    {(faqSection?.items ?? []).map(
                        (item, index) => (
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
                                    <p>
                                        {item.answer}
                                    </p>
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

                    <h2>
                        {faqSection.title}
                    </h2>

                    <p>
                        {faqSection.subtext}
                    </p>

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

                        {faqSection.cta?.title && (
                            <a
                                href={faqSection.cta.url}
                                target={
                                    faqSection.cta.target ||
                                    undefined
                                }
                                className="cta-btn faq-cta"
                            >
                                {faqSection.cta.title}
                                <i className="fa-solid fa-arrow-right"></i>
                            </a>
                        )}

                    </div>

                </div>

            </div>

        </div>
    </section>

</>
    
  );
}