import InnerBanner from "@/components/Common/InnerBanner";
import { AboutService } from "@/services/about.service";
import UspBar from "@/components/Global/UspBar";
import AchievementBar from "@/components/Global/acheivementBar";
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

            <div className="who-we-are-image reveal fade-right">
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
                    className="who-we-are-content reveal fade-left"
                    style={{
                        "--delay": "120ms",
                    } as React.CSSProperties}
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
                <div className="section-title text-center w-1/2 reveal fade-up">
                    <h3>{about.history.title}</h3>
                    <p>{about.history.subText}</p>
                </div>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap industry-grid">
                {about.history.items.map(
                    (item, index) => (
                        <div  key={index} className="w-full lg:flex-1 industry-column">
                            <div
                                className="industyr-wrap reveal fade-up"
                                style={
                                    {
                                        "--delay": `${index * 120}ms`,
                                    } as React.CSSProperties
                                }
                            >
                            <div className="industry-bg" style={{
                                backgroundImage:
                                    item.image.url
                                    ? `url(${item.image.url})`
                                    : "none",
                                }}>
                                <div className="industry-overlay"></div>
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
                                    } className="cta-btn industry-cta" target={
                                        item.cta
                                        .target || undefined
                                    }>{
                                        item.cta
                                        .title
                                    }
                                    <i className="fa-solid fa-arrow-right"></i>
                                    </a>
                                    )}
                                </div>
                            </div>
                        </div>
                        </div>
                    )
                )}
            </div>
        </div>
    </section>

    <AchievementBar />

    {/* Welcome Section */}
    <section className="welcome-section about-welcome asd" style={{
                                backgroundImage:
                                    about.whyChoose.image.url
                                    ? `url(${about.whyChoose.image.url})`
                                    : "none",
                                }}>
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap gap-4">
                <div className="w-full lg:w-6/12 px-0.5">
                    <div className="welcome-content reveal fade-right">
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
            <div className="faq-grid">

                {/* LEFT FAQ */}
                <div className="faq-wrap reveal fade-right">
                    {(faq?.items ?? []).map(
                        (item, index) => (
                    <details className="faq-item"  key={index} style={{
                                "--delay": `${index * 70}ms`,
                            } as React.CSSProperties}>
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

                <div
                    className="faqinfo reveal fade-left"
                    style={{
                        "--delay": "120ms",
                    } as React.CSSProperties}
                >
                    <span className="faq-eyebrow">
                        Need Help?
                    </span>
                    <h2>{faq.title}</h2>
                    <p>{faq.subText}</p>
                    <div className="ctainfo">
                        <a href="tel:+971581899532" className="faq-contact"><i className="fa-solid fa-phone"></i>+971581899532</a>
                        <a href="mailto:sales@perkinsteel.com" className="faq-contact"><i className="fa-solid fa-envelope"></i>sales@perkinsteel.com</a>
                        {faq.cta?.title && (            
                            <a href={faq.cta.url} target={
                            faq.cta
                            .target || undefined
                        } className="cta-btn faq-cta">{faq.cta.title}
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