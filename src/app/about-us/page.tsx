import InnerBanner from "@/components/Common/InnerBanner";
import { AboutService } from "@/services/about.service";
import UspBar from "@/components/UspBar/UspBar";
import Testimonials from "@/components/ClientTestimonials/ClientTestimonials";

export default async function AboutUsPage() {
  const about =
    await AboutService.getAbout();
const faq =
  about.faq;
  return (
    <>
      <InnerBanner
        title={about.banner.title}
        description={about.banner.text}
        image={about.banner.image.url}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: about.pageTitle},
        ]}
      />

      <UspBar />

        <section className="who-we-are">
            <div className="who-we-are-grid">

                <div className="who-we-are-image">
                {about.featuredImage.url && (
                    <img
                    src={about.featuredImage.url}
                    alt={
                        about.featuredImage.alt ||
                        about.pageTitle
                    }
                    />
                )}
                </div>

                <div className="who-we-are-content-wrap">
                        <div
                            className="who-we-are-content"
                            dangerouslySetInnerHTML={{
                            __html: about.content,
                            }}
                        />
                </div>

            </div>
        </section>

      {/* Industry Section */}

    <section className="industry-section w-full">
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center">
                <div className="section-title text-center w-1/2">
                    <h3>{about.history.title}</h3>
                    <p>{about.history.subText}</p>
                </div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap gap-4">
                {about.history.items.map(
                    (item, index) => (
                        <div  key={index} className="w-full lg:flex-1">
                            <div className="industyr-wrap" style={{
                                backgroundImage:
                                    item.image.url
                                    ? `url(${item.image.url})`
                                    : "none",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                }}>
                                <div className="industry-content">
                                    <div
                                    dangerouslySetInnerHTML={{
                                        __html:
                                        item.text,
                                    }}
                                    />

                                    {item.cta && (
                                        <a href={
                                        item.cta.url
                                    } className="cta-btn" target={
                                        item.cta
                                        .target || undefined
                                    }>{
                                        item.cta
                                        .title
                                    }</a>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    </section>

    <section className="hm-usp-bar">
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap -mx-0.5">
                {about.achievement.map(
                (item, index) => (
                <div key={index}  className="w-full lg:w-3/12 px-0.5">
                    <div className="hm-usp-box">
                        <img
                            src={item.image.url}
                            alt={item.image.alt}
                            />
                        
                        <p dangerouslySetInnerHTML={{
                                __html:
                                item.text,
                            }} />
                    </div>
                </div>
                )
                )}
                
            </div>
        </div>
    </section>

    {/* Welcome Section */}
    <section className="welcome-section" style={{
                                backgroundImage:
                                    about.whyChoose.image.url
                                    ? `url(${about.whyChoose.image.url})`
                                    : "none",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                }}>
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap gap-4">
                <div className="w-full lg:w-6/12 px-0.5">
                    <div className="welcome-content">
                        {about.whyChoose.title && (
                        <div className="welcom-title">
                            <h2>{about.whyChoose.title}</h2>
                        </div>
                        )}
                        {about.whyChoose.content && (
                            <div
                            dangerouslySetInnerHTML={{
                                __html:
                                about.whyChoose.content,
                            }}
                            />
                        )}
                        {about.whyChoose.cta?.title && (
                        <div className="cta-btn-wrap">
                            <a href={about.whyChoose.cta.url} target={
                            about.whyChoose.cta
                            .target || undefined
                        } className="cta-btn">{about.whyChoose.cta.title}</a>
                        </div>
                        )} 
                    </div>
                </div>
            </div>
        </div>
    </section>

    {/* Hospitality Sections */}
    <section className="hos-section">
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center">
                <div className="section-title text-center w-1/2">
                    <h3>{about.supply.title}</h3>
                    <p>{about.supply.text}</p>
                </div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap -mx-0.5">

               {about.supply.categories.map(
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

    {/* Testimonials */}
    <Testimonials />

    {/* FAQs */}
    <section className="faq-section">
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap -mx-0.5">
                <div className="w-full lg:w-6/12">
                    <div className="asd max-w-4xl mx-auto faq-wrap">
                        {(faq?.items ?? []).map(
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
                        <h2>{faq.title}</h2>
                        <p>{faq.subText}</p>
                        <div className="ctainfo">
                            <a href="tel:+971581899532">+971581899532</a>
                            <a href="mailto:sales@perkinsteel.com">sales@perkinsteel.com</a>
                            {faq.cta?.title && (            
                                <a href={faq.cta.url} target={
                                faq.cta
                                .target || undefined
                            } className="cta-btn">{faq.cta.title}</a>
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