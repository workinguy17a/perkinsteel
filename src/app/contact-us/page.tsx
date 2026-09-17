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


      {/* =========================================================
          CONTACT FORM + INFORMATION
      ========================================================= */}

      <section className="contactform-wrapper">

        <div className="mx-auto max-w-7xl px-4">

          <div className="contact-main-grid">

            {/* =========================================
                CONTACT FORM
            ========================================= */}

            <div className="contact-form reveal fade-right">

              <div className="contact-section-heading">

                <h2
                  dangerouslySetInnerHTML={{
                    __html: contact.form.title,
                  }}
                />

                {contact.form.text && (
                  <p>
                    {contact.form.text}
                  </p>
                )}

              </div>


              <ContactForm />

            </div>


            {/* =========================================
                CONTACT INFORMATION
            ========================================= */}

            <div
              className="contact-info reveal fade-left"
              style={
                {
                  "--delay": "100ms",
                } as React.CSSProperties
              }
            >

              <div className="contact-section-heading">

                <h2
                  dangerouslySetInnerHTML={{
                    __html: contact.info.title,
                  }}
                />

                {contact.info.text && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: contact.info.text,
                    }}
                  />
                )}

              </div>


              {/* CONTACT DETAILS */}

              <div className="con-info">

                <ul>

                  {/* PHONE */}

                  <li>

                    <span className="contact-info-icon">

                      <img
                        src="/assets/image/call.webp"
                        alt=""
                      />

                    </span>

                    <div>

                      <h4>Call Us</h4>

                      <a
                        href={`tel:${global.phoneNumber}`}
                      >
                        {global.phoneNumber}
                      </a>

                    </div>

                  </li>


                  {/* EMAIL */}

                  <li>

                    <span className="contact-info-icon">

                      <img
                        src="/assets/image/mail.webp"
                        alt=""
                      />

                    </span>

                    <div>

                      <h4>Email Us</h4>

                      <a
                        href={`mailto:${global.email}`}
                      >
                        {global.email}
                      </a>

                    </div>

                  </li>


                  {/* ADDRESS */}

                  <li>

                    <span className="contact-info-icon">

                      <img
                        src="/assets/image/location.webp"
                        alt=""
                      />

                    </span>

                    <div>

                      <h4>Address</h4>

                      <p>
                        {global.address}
                      </p>

                    </div>

                  </li>

                </ul>

              </div>


              {/* =========================================
                  SOCIAL LINKS
              ========================================= */}

              {contact.info.followUsTitle && (

                <div className="contact-social-wrapper">

                  <h3
                    dangerouslySetInnerHTML={{
                      __html:
                        contact.info.followUsTitle,
                    }}
                  />


                  <div className="con-social">

                    {global.socialLinks.map(
                      (social, index) => (

                        <a
                          key={index}
                          href={social.url}
                          className="fsocial"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={
                            social.icons
                          }
                        >

                          <i
                            className={`fa-brands fa-${social.icons}`}
                          ></i>

                        </a>

                      )
                    )}

                  </div>

                </div>

              )}

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          CONTACT FEATURES
      ========================================================= */}

      {contact.features.length > 0 && (

        <section className="contact-features">

          <div className="mx-auto max-w-7xl px-4">

            <div className="contact-features-grid">

              {contact.features.map(
                (feature, index) => (

                  <div
                    key={index}
                    className="con-feature-box reveal fade-up"
                    style={
                      {
                        "--delay":
                          `${index * 80}ms`,
                      } as React.CSSProperties
                    }
                  >

                    {feature.icon.url && (

                      <div className="con-feature-icon">

                        <img
                          src={feature.icon.url}
                          alt={
                            feature.icon.alt ||
                            feature.title
                          }
                        />

                      </div>

                    )}


                    <div className="con-feature-content">

                      <h3>
                        {feature.title}
                      </h3>

                      {feature.text && (
                        <p>
                          {feature.text}
                        </p>
                      )}

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        </section>

      )}


      {/* =========================================================
          MAP
      ========================================================= */}

      {contact.map && (

        <section className="contact-map">

          <div
            className="contact-map-embed"
            dangerouslySetInnerHTML={{
              __html: contact.map,
            }}
          />

        </section>

      )}
    </>
  );
}