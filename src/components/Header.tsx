import Link from "next/link";
import Image from "next/image";
import { getMenu } from "@/lib/getMenu";
import CartIcon from "./Header/CartIcon";

export default async function Header() {
    const data: any = await getMenu();

    const menus = data?.menus?.nodes || [];
    const lmenu = menus[1];
    const rmenu = menus[2];

    const leftItems = lmenu?.menuItems?.nodes || [];
    const rightItems = rmenu?.menuItems?.nodes || [];

    

  return (
    <header className="header-section">
        <div className="w-full">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-wrap items-center">

                    { /* Left Menu */ }
                    <div className="w-full lg:w-1/3">
                        <ul className="header-menu left-menu">
                            {leftItems.map((item: any) => (
                            <li key={`${item.path}-${item.label}`}>
                                <Link href={item.path || "#"} className="hover:text-red-600">
                                {item.label}
                                </Link>
                            </li>
                            ))}
                        </ul>
                    </div>

                    { /* Logo */ }
                    <div className="w-full lg:w-1/3 text-center">
                        <a href="#" className="logo">
                            <img src="/assets/image/logo.png" alt="Logo" className="max-w-full h-auto inline-block" />
                        </a>
                    </div>

                    { /*Right Menu */ }
                    <div className="w-full lg:w-1/3">
                        <ul className="header-menu right-menu">
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
        <div className="side-icons">
            <a href="#"><i className="fas fa-search"></i></a>
            <a href="#"><i className="far fa-user"></i></a>
            <CartIcon />
        </div>
    </header>
    );
}