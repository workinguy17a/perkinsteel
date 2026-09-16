import Link from "next/link";
import { getMenu } from "@/lib/getMenu";
import CartIcon from "./Header/CartIcon";
import AccountIcon from "./Header/AccountIcon";
import HeaderClient from "./Header/HeaderClient";
import "./Header/header.css";

export default async function Header() {
    const data: any = await getMenu();

    const menus = data?.menus?.nodes || [];
    const lmenu = menus[1];
    const rmenu = menus[2];

    const leftItems = lmenu?.menuItems?.nodes || [];
    const rightItems = rmenu?.menuItems?.nodes || [];

    return (
        <HeaderClient
            leftItems={leftItems}
            rightItems={rightItems}
        >
            {/* Desktop Header */}
            <div className="desktop-header w-full">
                <div className="max-w-7xl mx-auto px-4 header-container">
                    <div className="flex flex-wrap items-center">

                        {/* Left Menu */}
                        <div className="w-full lg:w-1/3">
                            <ul className="header-menu left-menu">
                                {leftItems.map((item: any) => (
                                    <li key={`${item.path}-${item.label}`}>
                                        <Link
                                            href={item.path || "#"}
                                            className="header-link"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Logo */}
                        <div className="w-full lg:w-1/3 text-center">
                            <Link href="/" className="logo">
                                <img
                                    src="/assets/image/logo.png"
                                    alt="Perkin"
                                    className="max-w-full h-auto inline-block"
                                />
                            </Link>
                        </div>

                        {/* Right Menu */}
                        <div className="w-full lg:w-1/3">
                            <ul className="header-menu right-menu">
                                {rightItems.map((item: any) => (
                                    <li key={`${item.path}-${item.label}`}>
                                        <Link
                                            href={item.path || "#"}
                                            className="header-link"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>

                <div className="side-icons">
                    <button
                        type="button"
                        className="header-search-trigger"
                        aria-label="Search"
                        data-search-toggle
                    >
                        <i className="fas fa-search"></i>
                    </button>

                    <AccountIcon />

                    <div className="side-cart">
                        <CartIcon />
                    </div>
                </div>
            </div>

            {/* Mobile Header */}
            <div className="mobile-header">
                <button
                    className="mobile-menu-toggle"
                    type="button"
                    aria-label="Open navigation"
                    data-mobile-menu-toggle
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <Link href="/" className="mobile-logo">
                    <img
                        src="/assets/image/logo.png"
                        alt="Perkin"
                    />
                </Link>

                <div className="mobile-actions">
                    <button
                        type="button"
                        className="mobile-search-trigger"
                        aria-label="Search"
                        data-search-toggle
                    >
                        <i className="fas fa-search"></i>
                    </button>

                    <AccountIcon />

                    <div className="mobile-cart">
                        <CartIcon />
                    </div>
                </div>
            </div>
        </HeaderClient>
    );
}