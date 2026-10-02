/* =====================================================
ALI TOUR — JAVASCRIPT
===================================================== */


/* =====================================================
WHATSAPP
===================================================== */

const whatsappNumber = "+6289525247947";


function openWhatsApp(message) {

    const encodedMessage =
        encodeURIComponent(message);

    const url =
        `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}


/* =====================================================
WHATSAPP BUTTON
===================================================== */

document
    .querySelectorAll("[data-wa-message]")
    .forEach((button) => {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const message =
                    this.dataset.waMessage ||
                    "Bismillah, saya ingin berkonsultasi mengenai paket Umroh Ali Tour.";

                openWhatsApp(message);

            }
        );

    });


/* =====================================================
MOBILE MENU
===================================================== */

const menuToggle =
    document.getElementById("menuToggle");

const mobileNav =
    document.getElementById("mobileNav");


if (menuToggle && mobileNav) {

    menuToggle.addEventListener(
        "click",
        () => {

            mobileNav.classList.toggle("open");

            document.body.classList.toggle(
                "menu-open"
            );

            const icon =
                menuToggle.querySelector(
                    ".material-symbols-outlined"
                );

            if (
                mobileNav.classList.contains("open")
            ) {

                icon.textContent = "close";

                menuToggle.setAttribute(
                    "aria-label",
                    "Tutup menu"
                );

            } else {

                icon.textContent = "menu";

                menuToggle.setAttribute(
                    "aria-label",
                    "Buka menu"
                );

            }

        }
    );

}


/* =====================================================
CLOSE MOBILE MENU AFTER CLICK
===================================================== */

document
    .querySelectorAll(".mobile-nav a")
    .forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                mobileNav?.classList.remove(
                    "open"
                );

                document.body.classList.remove(
                    "menu-open"
                );

                const icon =
                    menuToggle?.querySelector(
                        ".material-symbols-outlined"
                    );

                if (icon) {

                    icon.textContent =
                        "menu";

                }

            }
        );

    });


/* =====================================================
SMOOTH SCROLL
===================================================== */

document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) {

                    return;

                }

                event.preventDefault();

                const header =
                    document.querySelector(
                        ".header"
                    );

                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;

                const targetPosition =
                    target.getBoundingClientRect()
                        .top
                    +
                    window.scrollY
                    -
                    headerHeight
                    +
                    2;

                window.scrollTo({

                    top:
                        targetPosition,

                    behavior:
                        "smooth"

                });

            }
        );

    });


/* =====================================================
HEADER SCROLL EFFECT
===================================================== */

const header =
    document.getElementById("header");


function updateHeader() {

    if (!header) {

        return;

    }

    if (window.scrollY > 30) {

        header.classList.add(
            "scrolled"
        );

    } else {

        header.classList.remove(
            "scrolled"
        );

    }

}


window.addEventListener(
    "scroll",
    updateHeader,
    {
        passive: true
    }
);


updateHeader();


/* =====================================================
REVEAL ON SCROLL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


if (
    prefersReducedMotion
) {

    revealElements.forEach(
        (element) => {

            element.classList.add(
                "visible"
            );

        }
    );

} else {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.08,

                rootMargin:
                    "0px 0px -60px 0px"
            }
        );


    revealElements.forEach(
        (element) => {

            revealObserver.observe(
                element
            );

        }
    );

}


/* =====================================================
ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


const sectionObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        const id =
                            entry.target.id;

                        navLinks.forEach(
                            (link) => {

                                link.classList.remove(
                                    "active"
                                );

                                const href =
                                    link.getAttribute(
                                        "href"
                                    );

                                if (
                                    href ===
                                    `#${id}`
                                ) {

                                    link.classList.add(
                                        "active"
                                    );

                                }

                            }
                        );

                    }

                }
            );

        },
        {
            rootMargin:
                "-35% 0px -55% 0px",

            threshold: 0
        }
    );


sections.forEach(
    (section) => {

        sectionObserver.observe(
            section
        );

    }
);


/* =====================================================
PARALLAX HERO
===================================================== */

const hero =
    document.querySelector(
        ".hero"
    );

const heroBackground =
    document.querySelector(
        ".hero-background"
    );


let ticking =
    false;


function updateHeroParallax() {

    if (
        !hero ||
        !heroBackground ||
        prefersReducedMotion
    ) {

        return;

    }


    const scrollY =
        window.scrollY;


    const heroHeight =
        hero.offsetHeight;


    if (
        scrollY <= heroHeight
    ) {

        const movement =
            scrollY * 0.12;

        heroBackground.style.transform =
            `scale(1.06) translate3d(0, ${movement}px, 0)`;

    }


    ticking = false;

}


window.addEventListener(
    "scroll",
    () => {

        if (!ticking) {

            window.requestAnimationFrame(
                updateHeroParallax
            );

            ticking = true;

        }

    },
    {
        passive: true
    }
);


/* =====================================================
BACK TO TOP
===================================================== */

const backToTop =
    document.getElementById(
        "backToTop"
    );


function updateBackToTop() {

    if (!backToTop) {

        return;

    }


    if (
        window.scrollY > 650
    ) {

        backToTop.classList.add(
            "show"
        );

    } else {

        backToTop.classList.remove(
            "show"
        );

    }

}


window.addEventListener(
    "scroll",
    updateBackToTop,
    {
        passive: true
    }
);


if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior:
                    prefersReducedMotion
                        ? "auto"
                        : "smooth"

            });

        }
    );

}


/* =====================================================
ESCAPE CLOSE MENU
===================================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            mobileNav?.classList.remove(
                "open"
            );

            document.body.classList.remove(
                "menu-open"
            );

            const icon =
                menuToggle?.querySelector(
                    ".material-symbols-outlined"
                );

            if (icon) {

                icon.textContent =
                    "menu";

            }

        }

    }
);


/* =====================================================
INITIAL PARALLAX
===================================================== */

updateHeroParallax();
