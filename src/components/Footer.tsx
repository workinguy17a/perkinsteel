import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
        <div className="w-full">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-3">              

                    <div className="footer-1 footer-menu">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">Latest Editions</a></li>
                            <li><a href="#">Blogs</a></li>
                        </ul>
                    </div>

                    <div className="footer-2 footer-info">
                        <div className="foot-logo">
                            <a href="#">
                                <img src="/assets/image/logo.png" alt="Logo" className="max-w-full h-auto inline-block" />
                            </a>
                        </div>
                        <div className="foot-text">
                            <p>At Perkins, you’re not just investing in a knife, you are indulging in years of history poured into perfecting our designs.</p>
                        </div>
                        <div className="foot-social">
                            <a href="#" className="fsocial"><i className="fa fa-facebook"></i></a>
                            <a href="#" className="fsocial"><i className="fa fa-instagram"></i></a>
                            <a href="#" className="fsocial"><i className="fa fa-amazon"></i></a>
                        </div>
                        <div className="foot-con-info">
                            <a href="tel:+971581899532"><i className="fa fa-phone"></i>+971581899532</a>
                            <a href="mailto:sales@perkinssteel.com"><i className="fa fa-envelope"></i>sales@perkinssteel.com</a>
                            <a href="#"><i className="fa fa-marker"></i>Perkins Steel LLC, Sharjah Media City, UAE.</a>
                        </div>
                    </div>

                    <div className="footer-3 footer-menu">
                        <h3>Categories</h3>
                        <ul>
                            <li><a href="#">Knives</a></li>
                            <li><a href="#">Kitchenware</a></li>
                            <li><a href="#">Linen</a></li>
                            <li><a href="#">Uniform</a></li>
                            <li><a href="#">Towels</a></li>
                            <li><a href="#">Cleaning & Janitorial</a></li>
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
                                <p>Copyright © 2026 Perkin Steel, All Rights Reserved</p>
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