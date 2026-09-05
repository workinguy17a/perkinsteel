import Link from "next/link";
import { getMenu } from "@/lib/getMenu";
import { OptionsService } from "@/services/options.service";

export default async function Footer() {
    const global =
    await OptionsService.getGlobalOptions();
    const data: any = await getMenu();

    const menus = data?.menus?.nodes || [];
    const lmenu = menus[1];
    const catmenu = menus[0];

    const leftItems = lmenu?.menuItems?.nodes || [];
    const rightItems = catmenu?.menuItems?.nodes || [];
  return (
    <footer className="bg-black text-white">
        <div className="w-full">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-3">              

                    <div className="footer-1 footer-menu">
                        <h3>Quick Links</h3>
                        <ul>
                            {leftItems.map((item: any) => (
                            <li key={`${item.path}-${item.label}`}>
                                <Link href={item.path || "#"} className="hover:text-red-600">
                                {item.label}
                                </Link>
                            </li>
                            ))}
                        </ul>
                    </div>

                    <div className="footer-2 footer-info">
                        <div className="foot-logo">
                            <a href="#">
                                <img src={global.logo.url} alt="Logo" className="max-w-full h-auto inline-block" />
                            </a>
                        </div>
                        <div className="foot-text">
                            <p>{global.bottomText}</p>
                        </div>
                        
                        <div className="foot-social">
                            {global.socialLinks.map(
                            (social, index) => (
                            <a key={index} href={social.url} className="fsocial"><i className={`fa-brands fa-${social.icons}`}></i></a>
                            )
                            )}
                        </div>
                        <div className="foot-con-info">
                            <a href={`tel:${global.phoneNumber}`}><i className="fa fa-phone"></i>{global.phoneNumber}</a>
                            <a href={`mailto:${global.email}`}><i className="fa fa-envelope"></i>{global.email}</a>
                            <a href="#"><i className="fa fa-marker"></i>{global.address}</a>
                        </div>
                    </div>
                    

                    <div className="footer-3 footer-menu">
                        <h3>Categories</h3>
                        <ul>
                            {rightItems.map((item: any) => (
                            <li key={`${item.path}-${item.label}`}>
                                <Link href={item.path || "#"} className="hover:text-red-600">
                                {item.label}
                                </Link>
                            </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </div>
        <div className="copyright-section">
            <div className="w-full">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-wrap -mx-0.5">
                        <div className="w-full lg:w-6/12">
                            <div className="copyright=text">
                                <p>{global.copyright}</p>
                            </div>
                        </div>
                        <div className="w-full lg:w-6/12">
                            <div className="bottom-footer">
                                <ul>
                                    <li><a href="#">Age Policy</a></li>
                                    <li><a href="#">Term of Service</a></li>
                                    <li><a href="#">Return and Refund Policy</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    );
}