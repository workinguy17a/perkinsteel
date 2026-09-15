"use client";

import { useEffect } from "react";

export default function AnimationProvider() {

    useEffect(() => {

        /* =========================================
           INTERSECTION OBSERVER
        ========================================= */

        const observer = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "is-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15,
                rootMargin:
                    "0px 0px -40px 0px",
            }
        );


        /* =========================================
           OBSERVE REVEAL ELEMENTS
        ========================================= */

        const observeElements = () => {

            const elements =
                document.querySelectorAll(
                    ".reveal:not(.is-visible)"
                );

            elements.forEach((element) => {

                /*
                 Prevent observing the same
                 element repeatedly
                */

                if (
                    !element.hasAttribute(
                        "data-reveal-observed"
                    )
                ) {

                    element.setAttribute(
                        "data-reveal-observed",
                        "true"
                    );

                    observer.observe(element);

                }

            });

        };


        /*
         Observe elements already on page
        */

        observeElements();


        /* =========================================
           WATCH DYNAMIC CONTENT
        ========================================= */

        const mutationObserver =
            new MutationObserver(() => {

                observeElements();

            });


        mutationObserver.observe(
            document.body,
            {
                childList: true,
                subtree: true,
            }
        );


        /* =========================================
           CLEANUP
        ========================================= */

        return () => {

            observer.disconnect();

            mutationObserver.disconnect();

        };

    }, []);


    return null;
}