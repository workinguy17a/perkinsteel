"use client";

import {useEffect, useMemo, useRef, useState,} from "react";
import Link from "next/link";

type MenuItem = {
    id?: string;
    label?: string;
    path?: string;
    parentId?: string | null;
};

type HeaderClientProps = {
    children: React.ReactNode;
    leftItems: MenuItem[];
    rightItems: MenuItem[];
};

export default function HeaderClient({
    children,
    leftItems,
    rightItems,
}: HeaderClientProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
    const [searchOpen, setSearchOpen] = useState(false);

    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const toggle = document.querySelector(
            "[data-mobile-menu-toggle]"
        );

        const handleToggle = () => {
            setMenuOpen((prev) => !prev);
        };

        toggle?.addEventListener("click", handleToggle);

        return () => {
            toggle?.removeEventListener("click", handleToggle);
        };
    }, []);

    useEffect(() => {
        if (menuOpen || searchOpen) {
            document.body.classList.add("ui-locked");
        } else {
            document.body.classList.remove("ui-locked");
        }

        return () => {
            document.body.classList.remove("ui-locked");
        };
    }, [menuOpen, searchOpen]);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setMenuOpen(false);
                setSearchOpen(false);
            }
        };

        window.addEventListener("keydown", handleEscape);

        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, []);

    useEffect(() => {
        const searchButtons = document.querySelectorAll(
            "[data-search-toggle]"
        );

        const openSearch = () => {
            setMenuOpen(false);
            setSearchOpen(true);
        };

        searchButtons.forEach((button) => {
            button.addEventListener("click", openSearch);
        });

        return () => {
            searchButtons.forEach((button) => {
                button.removeEventListener("click", openSearch);
            });
        };
    }, []);

    useEffect(() => {
        if (!searchOpen) return;

        const timeout = window.setTimeout(() => {
            searchInputRef.current?.focus();
        }, 250);

        return () => {
            window.clearTimeout(timeout);
        };
    }, [searchOpen]);

    const allItems = useMemo(
        () => [...leftItems, ...rightItems],
        [leftItems, rightItems]
    );

    const rootItems = allItems.filter(
        (item) => !item.parentId
    );

    const getChildren = (parentId?: string) => {
        if (!parentId) return [];

        return allItems.filter(
            (item) => item.parentId === parentId
        );
    };

    const closeMenu = () => {
        setMenuOpen(false);
        setOpenSubmenu(null);
    };

    return (
        <>
            <header
                className={`header-section ${
                    isScrolled ? "is-scrolled" : ""
                }`}
            >
                {children}
            </header>

            {/* Overlay */}
            <div
                className={`mobile-menu-overlay ${
                    menuOpen ? "is-open" : ""
                }`}
                onClick={closeMenu}
            />

            {/* Mobile Drawer */}
            <aside
                className={`mobile-nav-drawer ${
                    menuOpen ? "is-open" : ""
                }`}
                aria-hidden={!menuOpen}
            >
                <div className="mobile-nav-top">
                    <Link href="/" onClick={closeMenu}>
                        <img
                            src="/assets/image/logo.png"
                            alt="Perkin"
                            className="drawer-logo"
                        />
                    </Link>

                    <button
                        type="button"
                        className="mobile-nav-close"
                        onClick={closeMenu}
                        aria-label="Close navigation"
                    >
                        <span></span>
                        <span></span>
                    </button>
                </div>

                <nav className="mobile-nav-menu">
                    <ul>
                        {rootItems.map((item, index) => {
                            const children = getChildren(item.id);
                            const hasChildren = children.length > 0;
                            const itemKey =
                                item.id ||
                                `${item.path}-${item.label}`;

                            const isOpen =
                                openSubmenu === itemKey;

                            return (
                                <li
                                    key={itemKey}
                                    className="mobile-nav-item"
                                    style={
                                        {
                                            "--item-index": index,
                                        } as React.CSSProperties
                                    }
                                >
                                    <div className="mobile-nav-row">
                                        <Link
                                            href={item.path || "#"}
                                            onClick={closeMenu}
                                        >
                                            {item.label}
                                        </Link>

                                        {hasChildren && (
                                            <button
                                                type="button"
                                                className={`submenu-toggle ${
                                                    isOpen
                                                        ? "is-open"
                                                        : ""
                                                }`}
                                                onClick={() =>
                                                    setOpenSubmenu(
                                                        isOpen
                                                            ? null
                                                            : itemKey
                                                    )
                                                }
                                                aria-label={`Toggle ${item.label} submenu`}
                                            >
                                                <i className="fas fa-chevron-down"></i>
                                            </button>
                                        )}
                                    </div>

                                    {hasChildren && (
                                        <div
                                            className={`mobile-submenu ${
                                                isOpen
                                                    ? "is-open"
                                                    : ""
                                            }`}
                                        >
                                            <ul>
                                                {children.map(
                                                    (child) => (
                                                        <li
                                                            key={
                                                                child.id ||
                                                                `${child.path}-${child.label}`
                                                            }
                                                        >
                                                            <Link
                                                                href={
                                                                    child.path ||
                                                                    "#"
                                                                }
                                                                onClick={
                                                                    closeMenu
                                                                }
                                                            >
                                                                {
                                                                    child.label
                                                                }
                                                            </Link>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </aside>
            {/* Search Overlay */}
            <div
                className={`search-overlay ${
                    searchOpen ? "is-open" : ""
                }`}
                aria-hidden={!searchOpen}
            >
                <button
                    type="button"
                    className="search-overlay-close"
                    onClick={() => setSearchOpen(false)}
                    aria-label="Close search"
                >
                    <span></span>
                    <span></span>
                </button>

                <div className="search-overlay-inner">

                    <div className="search-heading">
                        <span className="search-eyebrow">
                            PERKIN
                        </span>

                        <h2>
                            What are you looking for?
                        </h2>

                        <p>
                            Search our knives, kitchenware,
                            hospitality essentials and more.
                        </p>
                    </div>

                    <form
                        className="search-form"
                        onSubmit={(event) => {
                            event.preventDefault();

                            /*
                            * Later we will connect this
                            * to the real search page.
                            */
                        }}
                    >
                        <input
                            ref={searchInputRef}
                            type="search"
                            placeholder="Search products..."
                            aria-label="Search products"
                        />

                        <button
                            type="submit"
                            aria-label="Submit search"
                        >
                            <i className="fas fa-search"></i>
                        </button>
                    </form>

                    <div className="search-suggestions">
                        <span>Popular:</span>

                        <button type="button">
                            Pocket Knives
                        </button>

                        <button type="button">
                            Chef Knives
                        </button>

                        <button type="button">
                            Kitchenware
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}