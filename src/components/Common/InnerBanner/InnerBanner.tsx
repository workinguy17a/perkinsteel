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
  className="inner-banner w-full"
  style={{
    backgroundImage: image
          ? `url(${image})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
  }}
>

        <div className="max-w-7xl mx-auto px-4">

            <div className="flex flex-wrap">

                <div className="w-full lg:w-8/12">

                    <div className="inner-content-wrap">

                        {/* Breadcrumb */}

                        <Breadcrumb items={breadcrumbs} />
                         {title && <h1>{title}</h1>}
                        {description && (
                                <p>{description}</p>
                            )}

                    </div>

                    {actions && actions.length > 0 && (
                    <BannerActions actions={actions} />
                    )}
                    

                    <div className="side-icons">
                        <a href="#"><i className="fas fa-search"></i></a>
                        <a href="#"><i className="far fa-user"></i></a>
                        <a href="#"><i className="far fa-shopping-bag"></i></a>
                    </div>

                </div>

            </div>

        </div>

    </section>
     );
}