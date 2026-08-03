"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

import PageResolver from "@/lib/resolver/pageResolver";
import Breadcrumb from "./Breadcrumb";

export default function InnerBanner() {
  const pathname = usePathname();

  const page = PageResolver.resolve(pathname);

  if (!page) return null;

  return (
<section
  className="inner-banner w-full"
  style={{
    backgroundImage: `url(${page.banner.image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>

        <div className="max-w-7xl mx-auto px-4">

            <div className="flex flex-wrap">

                <div className="w-full lg:w-1/2">

                    <div className="inner-content-wrap">

                        {/* Breadcrumb */}

                        <Breadcrumb items={page.banner.breadcrumbs} />
                        <h1>{page.banner.title}</h1>
                        <p>High-quality cookware, utensils and essentials designed for professional performance and everyday convenience.</p>

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
     );
}