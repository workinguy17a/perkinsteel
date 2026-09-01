import Image from "next/image";

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
              (product) =>
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
  return (
<>
    <section className="hero-section w-full"
    style={{backgroundImage:"url(assets/image/banner-img.png)",backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"noRepeat"}}>

        <div className="max-w-7xl mx-auto px-4">

            <div className="flex flex-wrap">

                <div className="w-full lg:w-1/2">

                    <div className="content-wrap">

                        <span className="hero-tag">COMPLETE</span>

                        <div className="banner-title">
                            <h1>
                                KNIVES, Hospitality <br />
                                & Kitchen Supply Solutions
                            </h1>
                        </div>

                        <div className="banner-subtext">
                            <p>
                                Premium knives, cookware, uniforms, linen &
                                <br />
                                cleaning essentials.
                            </p>
                        </div>

                    </div>

                    <div className="btn-wrapper">
                        <a href="#" className="cta-btn btn">Shop Now</a>
                        <a href="#" className="cta-btn btn-white btn">Request Quote</a>
                    </div>

                    <div className="side-icons">
                        <a href="#"><i className="fas fa-search"></i></a>
                        <a href="#"><i className="far fa-user"></i></a>
                        <a href="#"><i className="far fa-shopping-bag"></i></a>
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

                <div className="w-full lg:w-4/12 px-0.5">

                    <div className="cat-box large-box"
                        style={{backgroundImage:"url(assets/image/knife.png)",backgroundSize:"cover",backgroundRepeat:"noRepeat"}}>

                        <div className="cat-content">
                            <span className="cat-tag">CUSTOM KNIVES</span>
                            <h4>Damascus · Hunting · Bowie · Pocket · Kitchen</h4>
                            <a href="#">Explore Collection</a>
                        </div>

                    </div>

                </div>

                {/* Middle */}

                <div className="w-full lg:w-5/12 px-0.5">

                    <div className="flex flex-wrap -mx-0.5">

                        <div className="w-full px-0.5">

                            <div className="cat-box top-box"
                                style={{backgroundImage:"url(assets/image/kitchenware.png)",backgroundSize:"cover",backgroundRepeat:"no-repeat"}}>

                                <div className="cat-content">
                                    <span className="cat-tag">KITCHENWARE</span>
                                    <h4>Bowls · Cutlery · Drinkware · Porcelain</h4>
                                    <a href="#">Shop Now</a>
                                </div>

                            </div>

                        </div>

                        <div className="w-1/2 px-0.5">

                            <div className="cat-box small-box"
                                style={{backgroundImage:"url(assets/image/linen.png)",backgroundSize:"cover",backgroundRepeat:"no-repeat"}}>

                                <div className="cat-content">
                                    <span className="cat-tag">LINEN</span>
                                    <h4>Bed & Table Linen · Bath Towels</h4>
                                    <a href="#">Shop Now</a>
                                </div>

                            </div>

                        </div>

                        <div className="w-1/2 px-0.5">

                            <div className="cat-box small-box"
                                style={{backgroundImage:"url(assets/image/uniform.png)",backgroundSize:"cover",backgroundRepeat:"no-repeat"}}>

                                <div className="cat-content">
                                    <span className="cat-tag">UNIFORM</span>
                                    <h4>Chef · Hotel Staff · Facility Teams</h4>
                                    <a href="#">Shop Now</a>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Right */}

                <div className="w-full lg:w-3/12 px-0.5">

                    <div className="cat-box janitorial-box"
                        style={{backgroundImage:"url(assets/image/janitorial.png)",backgroundSize:"cover",backgroundRepeat:"no-repeat"}}>

                        <div className="cat-content">
                            <span className="cat-tag">JANITORIAL</span>
                            <h4>Industrial · Commercial · Hospitality</h4>
                            <a href="#">Shop Now</a>
                        </div>

                    </div>

                </div>

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
                        <div className="welcom-title">
                            <h2>Why Choose Us</h2>
                        </div>
                        <h3>More Than a Knife Brand</h3>
                        <p>At Perkin Steel, you're not just investing in a product — you're indulging in years of British craftsmanship history, delivered to your door across the GCC.</p>
                        <h4>UK Heritage Craftsmanship</h4>
                        <p>Established in the UK with decades of knife-making tradition. Every blade is a blend of old-world technique and modern precision.</p>
                        <h4>Premium Materials — Named & Certified</h4>
                        <p>We use 440C Stainless, D2 Tool Steel, and Multi-layer Damascus. No vague claims — every knife lists its exact steel grade.</p>
                        <h4>Full-Spectrum Hospitality Supply</h4>
                        <p>One vendor. Six categories. Everything from a Damascus blade to hotel linen — sourced, supplied, and delivered across the UAE and GCC.</p>
                        <h4>B2B Pricing & Bulk Orders</h4>
                        <p>Special pricing tiers for hotels, restaurants, and institutional buyers. MOQ-friendly. Invoice payment available for verified businesses.</p>
                        <div className="cta-btn-wrap">
                            <a href="#" className="cta-btn">Shop Now</a>
                        </div>
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
                <div className="w-full lg:flex-1">
                    <div className="industyr-wrap" style={{backgroundImage:"url(assets/image/hotel-square.webp)"}}>
                        <div className="industry-content">
                            <h3>for<br /><span>Hotels</span></h3>
                            <p>Linen, towel, cleaning & more to elevate guest experiences</p>
                            <a href="#" className="cta-btn">Shop Now</a>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:flex-1">
                    <div className="industyr-wrap" style={{backgroundImage:"url(assets/image/resto-square.webp)"}}>
                        <div className="industry-content">
                            <h3>for<br /><span>RESTAURANTS</span></h3>
                            <p>Kitchenware, uniforms, knives & everything in between</p>
                            <a href="#" className="cta-btn">Shop Now</a>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:flex-1">
                    <div className="industyr-wrap" style={{backgroundImage:"url(assets/image/outdoor-square.webp)"}}>
                        <div className="industry-content">
                            <h3>for<br /><span>OUTDOOR USE</span></h3>
                            <p>Hunting knives & outdoor gear for every adventure</p>
                            <a href="#" className="cta-btn">Shop Now</a>
                        </div>
                    </div>
                </div>
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
        <img src="assets/image/kitchenware-bg.webp" alt="kitchenware" />
        <div className="kw-content">
            <p>Check Our Collection Of</p>
            <h3>BOWLS, JARS, JUGS & OTHER KITCHENWARE</h3>
            <a href="#" className="cta-btn btn">Shop Now</a>
        </div>
    </section>

    {/* KW Collection Sliders */}
    <KwCollections />

    {/* Hospitality Sections */}
    <section className="hos-section">
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap -mx-0.5">
                <div className="section-title">
                    <h3>Hospitality Essentials</h3>
                </div>
            </div>
            <div className="flex flex-wrap -mx-0.5">
                <div className="w-full lg:w-3/12">
                    <div className="hos-wrap">
                        <a href="">
                            <img src="assets/image/linen.webp" alt="linen" />
                            <h4>Linen</h4>
                        </a>
                    </div>
                </div>
                <div className="w-full lg:w-3/12">
                    <div className="hos-wrap">
                        <a href="">
                            <img src="assets/image/towel.webp" alt="Towels" />
                            <h4>Towels</h4>
                        </a>
                    </div>
                </div>
                <div className="w-full lg:w-3/12">
                    <div className="hos-wrap">
                        <a href="">
                            <img src="assets/image/uniform.webp" alt="Uniform" />
                            <h4>Uniform</h4>
                        </a>
                    </div>
                </div>
                <div className="w-full lg:w-3/12">
                    <div className="hos-wrap">
                        <a href="">
                            <img src="assets/image/cleaning.webp" alt="Janitorial" />
                            <h4>Cleaning & Janitorial</h4>
                        </a>
                    </div>
                </div>
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
                        <details className="border-b py-5 group">
                            <summary className="cursor-pointer flex items-center font-semibold text-lg list-none">
                                <span className="transition group-open:rotate-90">
                                    <i className="fa-solid fa-square-caret-right"></i>
                                </span>
                                Can I choose my own design at Perkin Steel?
                            </summary>

                            <p className="mt-4 text-gray-600">
                                Yes, you can fully customize your knife design,
                                handle material, blade steel and engraving.
                            </p>
                        </details>

                        <details className="border-b py-5 group">                            
                            <summary className="cursor-pointer flex items-center font-semibold text-lg list-none">
                            <span className="transition group-open:rotate-90">
                                <i className="fa-solid fa-square-caret-right"></i>
                            </span>
                            How long does delivery take?
                                
                            </summary>

                            <p className="mt-4 text-gray-600">
                                Delivery times depend on the product and destination.
                            </p>
                        </details>
                    </div>
                </div>

                <div className="w-full lg:w-6/12">
                    <div className="faqinfo">
                        <h2>Have Any <br />Questions or Doubts?</h2>
                        <p>Need more details? Reach out to our team</p>
                        <div className="ctainfo">
                            <a href="tel:+971581899532">+971581899532</a>
                            <a href="mailto:sales@perkinsteel.com">sales@perkinsteel.com</a>
                            <a href="#" className="cta-btn">Enquiry Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</>
    
  );
}