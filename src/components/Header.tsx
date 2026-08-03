import Link from "next/link";
import Image from "next/image";
//import { getMenu } from "@/lib/getMenu";

export default function Header() {
    // const data: any = await getMenu();
    // const menu = data.menus.nodes[0];
  return (
    <header className="header-section">
        <div className="w-full">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-wrap items-center">

                    { /* Left Menu */ }
                    <div className="w-full lg:w-1/3">
                        <ul className="header-menu left-menu">
                            <li><a href="#" className="active">Home</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Blogs</a></li>
                            <li><a href="#">Contact Us</a></li>
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
                            <li><a href="#">Knives</a></li>
                            <li><a href="#">Kitchenware</a></li>
                            <li><a href="#">Linen</a></li>
                            <li><a href="#">Cleaning & Janitorial</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </header>
    );
}