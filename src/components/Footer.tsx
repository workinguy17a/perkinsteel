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
    
    <footer className="site-footer bg-black text-white">

    <div className="footer-main">

        <div className="max-w-7xl mx-auto px-4">

            <div className="footer-grid">

                {/* LEFT MENU */}
                <div className="footer-1 footer-menu reveal fade-right">

                    <h3>
                        Quick Links
                    </h3>

                    <ul>
                        {leftItems.map((item: any) => (
                            <li key={`${item.path}-${item.label}`}>

                                <Link
                                    href={item.path || "#"}
                                >
                                    {item.label}
                                </Link>

                            </li>
                        ))}
                    </ul>

                </div>


                {/* CENTER INFO */}
                <div
                    className="footer-2 footer-info reveal fade-up"
                    style={{
                        "--delay": "100ms",
                    } as React.CSSProperties}
                >

                    <div className="foot-logo">

                        <a href="#">
                            <img
                                src={global.logo.url}
                                alt="Logo"
                            />
                        </a>

                    </div>


                    <div className="foot-text">

                        <p>
                            {global.bottomText}
                        </p>

                    </div>


                    <div className="foot-social">

                        {global.socialLinks.map(
                            (social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    className="fsocial"
                                    aria-label={social.icons}
                                >
                                    <i
                                        className={`fa-brands fa-${social.icons}`}
                                    ></i>
                                </a>
                            )
                        )}

                    </div>


                    <div className="foot-con-info">

                        <a href={`tel:${global.phoneNumber}`}>
                            <i className="fa fa-phone"></i>

                            <span>
                                {global.phoneNumber}
                            </span>
                        </a>


                        <a href={`mailto:${global.email}`}>
                            <i className="fa fa-envelope"></i>

                            <span>
                                {global.email}
                            </span>
                        </a>


                        <a href="#">
                            <i className="fa fa-location-dot"></i>

                            <span>
                                {global.address}
                            </span>
                        </a>

                    </div>

                </div>


                {/* RIGHT MENU */}
                <div
                    className="footer-3 footer-menu reveal fade-left"
                    style={{
                        "--delay": "160ms",
                    } as React.CSSProperties}
                >

                    <h3>
                        Categories
                    </h3>

                    <ul>

                        {rightItems.map((item: any) => (
                            <li key={`${item.path}-${item.label}`}>

                                <Link
                                    href={item.path || "#"}
                                >
                                    {item.label}
                                </Link>

                            </li>
                        ))}

                    </ul>

                </div>

            </div>

        </div>

    </div>


    {/* COPYRIGHT */}
    <div className="copyright-section">

        <div className="max-w-7xl mx-auto px-4">

            <div className="copyright-grid">

                <div className="copyright-text">
                    <p>
                        {global.copyright}
                    </p>
                </div>


                <div className="bottom-footer">

                    <ul>

                        <li>
                            <a href="#">
                                Age Policy
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                Terms of Service
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                Return and Refund Policy
                            </a>
                        </li>

                    </ul>

                </div>

            </div>

        </div>

    </div>

</footer>
    );
}