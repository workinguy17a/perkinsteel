import Image from "next/image";
import { Product } from "@/types/product";
import NewArrivals from "@/components/NewArrivals/NewArrivals";
import KwCollections from "@/components/KwCollections/KwCollections";
import AllProducts from "@/components/AllProducts/AllProducts";
import Testimonials from "@/components/ClientTestimonials/ClientTestimonials";
import ProductService from "@/services/product.service";
import HomepageService from "@/services/homepage.service";
import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts";

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
    <section className="hero-section w-full"
    style={{
    backgroundImage: banner.image.url
      ? `url(${banner.image.url})`
      : "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}>

        <div className="max-w-7xl mx-auto px-4">

            <div className="flex flex-wrap">

                <div className="w-full lg:w-1/2">

                    <div className="content-wrap">

                        {banner.redText && (
                            <span className="hero-tag">
                            {banner.redText}
                            </span>
                        )}

                        {banner.title && (
                            <div className="banner-title">
                            <h1>
                                {banner.title}
                            </h1>
                            </div>
                        )}

                        {banner.subText && (
                            <div className="banner-subtext">
                            <p>
                                {banner.subText}
                            </p>
                            </div>
                        )}

                    </div>

                    <div className="btn-wrapper">
                        {banner.buttonOne?.title && (
                            <a
                            href={
                                banner.buttonOne.url
                            }
                            target={
                                banner.buttonOne.target ||
                                undefined
                            }
                            className="cta-btn btn"
                            >
                            {
                                banner.buttonOne
                                .title
                            }
                            </a>
                        )}

                        {banner.buttonTwo?.title && (
                            <a
                            href={
                                banner.buttonTwo.url
                            }
                            target={
                                banner.buttonTwo.target ||
                                undefined
                            }
                            className="cta-btn btn-white btn"
                            >
                            {
                                banner.buttonTwo
                                .title
                            }
                            </a>
                        )}

        </div>

                </div>

            </div>

        </div>

    </section>

    {/* Category Blocks */}
    <section className="category-section w-full">
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap -mx-0.5">

            {/* Left */}
            {categoryBlocks[0] && (
                <div className="w-full lg:w-4/12 px-0.5">
                    {categoryBlocks[0].link && (
                    <a
                        href={
                            categoryBlocks[0].link.url
                        }
                        target={
                            categoryBlocks[0].link
                            .target || undefined
                        }
                        >
                           
                <div
                    className="cat-box large-box"
                    style={{
                    backgroundImage:
                        categoryBlocks[0].image.url
                        ? `url(${categoryBlocks[0].image.url})`
                        : "none",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    }}
                >
                    <div className="cat-content">
                    <span className="cat-tag">
                        {categoryBlocks[0].name}
                    </span>

                    <h4>
                        {categoryBlocks[0].text}
                    </h4>

                    
                        <span>
                        {
                            categoryBlocks[0].link
                            .title
                        }
                        </span>
                    
                    </div>
                </div>
                </a>
                 )}
                </div>
            )}

            {/* Middle */}
            <div className="w-full lg:w-5/12 px-0.5">
                <div className="flex flex-wrap -mx-0.5">

                {categoryBlocks[1] && (
                    <div className="w-full px-0.5">
                        {categoryBlocks[1].link && (
                            <a
                            href={
                                categoryBlocks[1].link
                                .url
                            }
                            target={
                                categoryBlocks[1].link
                                .target || undefined
                            }
                            >
                                <div
                                    className="cat-box top-box"
                                    style={{
                                    backgroundImage:
                                        categoryBlocks[1].image.url
                                        ? `url(${categoryBlocks[1].image.url})`
                                        : "none",
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    }}
                                >
                                    <div className="cat-content">
                                        <span className="cat-tag">
                                            {categoryBlocks[1].name}
                                        </span>
                                        <h4>
                                            {categoryBlocks[1].text}
                                        </h4>
                                        <span>
                                            {
                                                categoryBlocks[1].link.title
                                            }
                                        </span>
                                    </div>
                                </div>
                            </a>
                        )}
                    </div>
                )}

                {categoryBlocks[2] && (
                    <div className="w-1/2 px-0.5">
                        {categoryBlocks[2].link && (
                            <a
                            href={
                                categoryBlocks[2].link
                                .url
                            }
                            target={
                                categoryBlocks[2].link
                                .target || undefined
                            }
                            >
                    <div
                        className="cat-box small-box"
                        style={{
                        backgroundImage:
                            categoryBlocks[2].image.url
                            ? `url(${categoryBlocks[2].image.url})`
                            : "none",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        }}
                    >
                        <div className="cat-content">
                        <span className="cat-tag">
                            {categoryBlocks[2].name}
                        </span>

                        <h4>
                            {categoryBlocks[2].text}
                        </h4>

                        <span>
                            {
                                categoryBlocks[2].link
                                .title
                            }
                            </span>
                        
                        </div>
                    </div>
                    </a>
                    )}
                    </div>
                )}

                {categoryBlocks[3] && (
                    <div className="w-1/2 px-0.5">
                        {categoryBlocks[3].link && (
                            <a
                            href={
                                categoryBlocks[3].link
                                .url
                            }
                            target={
                                categoryBlocks[3].link
                                .target || undefined
                            }
                            >
                    <div
                        className="cat-box small-box"
                        style={{
                        backgroundImage:
                            categoryBlocks[3].image.url
                            ? `url(${categoryBlocks[3].image.url})`
                            : "none",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        }}
                    >
                        <div className="cat-content">
                        <span className="cat-tag">
                            {categoryBlocks[3].name}
                        </span>

                        <h4>
                            {categoryBlocks[3].text}
                        </h4>

                        <span>
                            {
                                categoryBlocks[3].link
                                .title
                            }
                        </span>
                        
                        
                        </div>
                    </div>
                    </a>
                    )}
                    </div>
                )}

                </div>
            </div>

            {/* Right */}
            {categoryBlocks[4] && (
                <div className="w-full lg:w-3/12 px-0.5">
                    {categoryBlocks[4].link && (
                        <a
                        href={
                            categoryBlocks[4].link.url
                        }
                        target={
                            categoryBlocks[4].link
                            .target || undefined
                        }
                        >
                <div
                    className="cat-box janitorial-box"
                    style={{
                    backgroundImage:
                        categoryBlocks[4].image.url
                        ? `url(${categoryBlocks[4].image.url})`
                        : "none",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    }}
                >
                    <div className="cat-content">
                        <span className="cat-tag">
                            {categoryBlocks[4].name}
                        </span>

                        <h4>
                            {categoryBlocks[4].text}
                        </h4>

                        <span>
                        {
                            categoryBlocks[4].link
                            .title
                        }
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
                    <div className="welcome-content">
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
            <div className="flex flex-wrap gap-4">
                {industryBlocks[0] && (
                <div className="w-full lg:flex-1">
                    <div className="industyr-wrap" style={{
                    backgroundImage:
                        industryBlocks[0].image.url
                        ? `url(${industryBlocks[0].image.url})`
                        : "none",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    }}>
                        <div className="industry-content">
                            <div
                            dangerouslySetInnerHTML={{
                                __html:
                                industryBlocks[0].text,
                            }}
                            />

                            {industryBlocks[0].link && (
                            <a href={
                            industryBlocks[0].link.url
                        } className="cta-btn" target={
                            industryBlocks[0].link
                            .target || undefined
                        }>{
                            industryBlocks[0].link
                            .title
                        }</a>
                            )}
                        </div>
                    </div>
                </div>
                )}
                {industryBlocks[1] && (
                <div className="w-full lg:flex-1">
                    <div className="industyr-wrap" style={{
                    backgroundImage:
                        industryBlocks[1].image.url
                        ? `url(${industryBlocks[1].image.url})`
                        : "none",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    }}>
                        <div className="industry-content">
                            <div
                            dangerouslySetInnerHTML={{
                                __html:
                                industryBlocks[1].text,
                            }}
                            />

                            {industryBlocks[1].link && (
                            <a href={
                            industryBlocks[1].link.url
                        } className="cta-btn" target={
                            industryBlocks[1].link
                            .target || undefined
                        }>{
                            industryBlocks[1].link
                            .title
                        }</a>
                            )}
                        </div>
                    </div>
                </div>
                )}
                {industryBlocks[2] && (
                <div className="w-full lg:flex-1">
                    <div className="industyr-wrap" style={{
                    backgroundImage:
                        industryBlocks[2].image.url
                        ? `url(${industryBlocks[2].image.url})`
                        : "none",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    }}>
                        <div className="industry-content">
                            <div
                            dangerouslySetInnerHTML={{
                                __html:
                                industryBlocks[2].text,
                            }}
                            />

                            {industryBlocks[2].link && (
                            <a href={
                            industryBlocks[2].link.url
                        } className="cta-btn" target={
                            industryBlocks[2].link
                            .target || undefined
                        }>{
                            industryBlocks[2].link
                            .title
                        }</a>
                            )}
                        </div>
                    </div>
                </div>
                )}
            </div>
        </div>
    </section>

    <section className="hm-usp-bar">
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap -mx-0.5">
                <div className="w-full lg:w-3/12 px-0.5">
                    <div className="hm-usp-box">
                        <img src="assets/image/credit-card.png" alt="credit card" />
                        <p>Online <span>Payment</span></p>
                    </div>
                </div>
                <div className="w-full lg:w-3/12 px-0.5">
                    <div className="hm-usp-box">
                        <img src="assets/image/24-7.png" alt="24/7" />
                        <p>24/7 <span>Support</span></p>
                    </div>
                </div>
                <div className="w-full lg:w-3/12 px-0.5">
                    <div className="hm-usp-box">
                        <img src="assets/image/delivery.png" alt="delivery" />
                        <p>Fast <span>Delivery</span></p>
                    </div>
                </div>
                <div className="w-full lg:w-3/12 px-0.5">
                    <div className="hm-usp-box">
                        <img src="assets/image/review.png" alt="review" />
                        <p>4.3/5 <span>(15 reviews)</span></p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section className="kw-collection-banner">
        <img src={midBanner.image.url}  alt={midBanner.image.alt} />
        <div className="kw-content">
            {midBanner.subtitle && (
            <p>{midBanner.subtitle}</p>
            )}
            {midBanner.title && (
            <h3>{midBanner.title}</h3>
            )}
            {midBanner.cta?.title && (            
                <a href={midBanner.cta.url} target={
                midBanner.cta
                .target || undefined
            } className="cta-btn btn">{midBanner.cta.title}</a>
            )}

        </div>
    </section>

    {/* KW Collection Sliders */}
    <section className="kw-collection">
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap -mx-0.5">
                {childCategories.map(
                    (category) => (
                        <div key={category.id} className="kwcollection-card">
                            <a href={`/category/${category.slug}`}>
                                <span className="black-bg">
                                    <img src={category.image.url} alt={category.image.alt} className="mx-auto object-contain" />
                                </span>
                                <h3 className="mt-6 text-[18px] leading-7">
                                    {category.name}
                                </h3>
                            </a>
                        </div>
                    )
                )}         
            </div>
        </div>
    </section>

    {/* Hospitality Sections */}
    <section className="hos-section">
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap -mx-0.5">
                <div className="section-title">
                    <h3>Hospitality Essentials</h3>
                </div>
            </div>
            <div className="flex flex-wrap -mx-0.5">

               {homepage.hospitalityCategories.map(
                (category) => (
                    <div  key={category.id} className="w-full lg:w-3/12"> 
                        <div className="hos-wrap">   
                    <a href={`/category/${category.slug}`}>
                        {category.image.url && (
                        <img src={category.image.url}
                            alt={
                                category.image.alt ||
                                category.name
                            } />
                        )} 
                        <h4>{category.name}</h4>
                    </a>
                    </div>
                    </div>
                )
                )}
            </div>
        </div>
    </section>

    {/* All Products Sliders */}
    <AllProducts products={latestProducts}  />

    {/* Testimonials */}
    <Testimonials />

    {/* FAQs */}
    <section className="faq-section">
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap -mx-0.5">
                <div className="w-full lg:w-6/12">
                    <div className="max-w-4xl mx-auto faq-wrap">
                        {(faqSection?.items ?? []).map(
                            (item, index) => (
                        <details className="border-b py-5 group"  key={index}>
                            <summary className="cursor-pointer flex items-center font-semibold text-lg list-none">
                                <span className="transition group-open:rotate-90">
                                    <i className="fa-solid fa-square-caret-right"></i>
                                </span>
                                {item.question}
                            </summary>

                            <p className="mt-4 text-gray-600">
                                {item.answer}
                            </p>
                        </details>
                        )
                        )}
                    </div>
                </div>

                <div className="w-full lg:w-6/12">
                    <div className="faqinfo">
                        <h2>{faqSection.title}</h2>
                        <p>{faqSection.subtext}</p>
                        <div className="ctainfo">
                            <a href="tel:+971581899532">+971581899532</a>
                            <a href="mailto:sales@perkinsteel.com">sales@perkinsteel.com</a>
                            {faqSection.cta?.title && (            
                                <a href={faqSection.cta.url} target={
                                faqSection.cta
                                .target || undefined
                            } className="cta-btn">{faqSection.cta.title}</a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</>
    
  );
}