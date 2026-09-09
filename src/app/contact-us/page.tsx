import Image from "next/image";
import InnerBanner from "@/components/Common/InnerBanner/InnerBanner";
import ContactForm from "@/components/Contact/ContactForm";
import { ContactService } from "@/services/contact.service";
import { OptionsService } from "@/services/options.service";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const contact =
    await ContactService.getContact();

  const global =
    await OptionsService.getGlobalOptions();  

  return (
    <>
      <InnerBanner
        title={contact.banner.title}
        description={contact.banner.text}
        image={contact.banner.image.url}
        breadcrumbs={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: contact.pageTitle,
          },
        ]}
      />

      <section className="contactform-wrapper py-16">
        <div className="mx-auto max-w-7xl px-4">

          <div className="grid grid-cols-12 gap">
            <div className="col-span-12 md:col-span-7 p-4">
                {/* CONTACT FORM */}
                <div className="contact-form">
                <h2 className="mb-3 text-3xl font-bold"
                    dangerouslySetInnerHTML={{
                __html: contact.form.title,
                }}
                />

                {contact.form.text && (
                    <p className="mb-8 text-gray-600">
                    {contact.form.text}
                    </p>
                )}

                {/* We'll render the actual form here */}
                <ContactForm />
                </div>
            </div>

            <div className="col-span-12 md:col-span-5 p-4">
                {/* CONTACT INFORMATION */}
                <div className="contact-info">
                <h2 className="mb-3 text-3xl font-bold"
                    dangerouslySetInnerHTML={{
                __html: contact.info.title,
                }}
                />

                <p
                    dangerouslySetInnerHTML={{
                    __html: contact.info.text,
                    }}
                />

                <div className="con-info">
                    <ul>
                        <li><span><img src="/assets/image/call.webp" alt="Logo" /></span><div><h4>Call Us</h4><a href={`tel:${global.phoneNumber}`}>{global.phoneNumber}</a></div></li>
                        <li><span><img src="/assets/image/mail.webp" alt="Logo" /></span><div><h4>Email Us</h4><a href={`mailto:${global.email}`}>{global.email}</a></div></li>
                        <li><span><img src="/assets/image/location.webp" alt="Logo" /></span><div><h4>Address</h4>{global.address}</div></li>
                    </ul>
                </div>

                {contact.info.followUsTitle && (
                    <h3 className="mt-8 text-xl font-bold" 
                        dangerouslySetInnerHTML={{
                __html: contact.info.followUsTitle,
                }}
                    />
                )}
                <ul className="con-social">
                    {global.socialLinks.map(
                            (social, index) => (
                            <a key={index} href={social.url} className="fsocial"><i className={`fa-brands fa-${social.icons}`}></i></a>
                            )
                            )}
                </ul>
                </div>
            </div>  

          </div>
        </div>
    </section>

    <section className="contact-features py-16">
        <div className="mx-auto max-w-7xl px-4">

          {/* FEATURE BOXES */}
          {contact.features.length > 0 && (
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
              {contact.features.map(
                (feature, index) => (
                  <div
                    key={index}
                    className="con-feature-box"
                  >
                    <div>
                    {feature.icon.url && (
                      <img
                        src={feature.icon.url}
                        alt={feature.icon.alt}
                        className="mb-4"
                      />
                    )}
                    </div>
                    <div>
                    <h3 className="text-lg font-bold">
                      {feature.title}
                    </h3>

                    <p className="text-sm">
                      {feature.text}
                    </p>
                    </div>
                  </div>
                )
              )}
            </div>
          )}

        </div>
      </section>


      {/* MAP */}
      {contact.map && (
        <section className="contact-map w-full">
          <div
            className="
              [&_iframe]:block
              [&_iframe]:h-[450px]
              [&_iframe]:w-full
              [&_iframe]:border-0
            "
            dangerouslySetInnerHTML={{
              __html: contact.map,
            }}
          />
        </section>
      )}
    </>
  );
}