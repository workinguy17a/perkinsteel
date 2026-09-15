import { InnerBannerProps } from "./types";

import Breadcrumb from "./Breadcrumb";
import BannerActions from "./BannerActions";

export default function InnerBanner({
  title,
  description,
  image,
  breadcrumbs,
  actions,
  className,
}: InnerBannerProps) {

  return (
  <section
      className={`inner-banner w-full ${className ?? ""}`}
      style={{
          backgroundImage: image
              ? `url(${image})`
              : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
      }}
  >

      <div className="inner-banner-overlay"></div>

      <div className="max-w-7xl mx-auto px-4 inner-banner-container">

          <div className="flex flex-wrap">

              <div className="w-full lg:w-8/12">

                  <div className="inner-content-wrap">

                      <div className="inner-banner-animate inner-banner-delay-1">
                          <Breadcrumb items={breadcrumbs} />
                      </div>

                      {title && (
                          <h1 className="inner-banner-animate inner-banner-delay-2">
                              {title}
                          </h1>
                      )}

                      {description && (
                          <div
                        className="inner-banner-description inner-banner-animate inner-banner-delay-3"
                        dangerouslySetInnerHTML={{
                        __html: description,
                        }}
                    />
                    )}

                      

                  </div>

                  {actions && actions.length > 0 && (
                      <div className="inner-banner-animate inner-banner-delay-4">
                          <BannerActions actions={actions} />
                      </div>
                  )}

              </div>

          </div>

      </div>

  </section>
     );
}