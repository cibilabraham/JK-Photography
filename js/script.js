document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       HEADER
    ===================================================== */

    const header = document.getElementById("siteHeader");

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateHeader);

    updateHeader();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", function () {

            mainNav.classList.toggle("open");

            const icon = menuToggle.querySelector("i");

            if (mainNav.classList.contains("open")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

                document.body.style.overflow = "hidden";

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

                document.body.style.overflow = "";

            }

        });


        /* Close menu when clicking navigation link */

        const navLinks = mainNav.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                mainNav.classList.remove("open");

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

                document.body.style.overflow = "";

            });

        });

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


        revealElements.forEach(function (element) {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(function (element) {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       STAGGER SERVICE CARDS
    ===================================================== */

    const serviceCards =
        document.querySelectorAll(".service-card");

    serviceCards.forEach(function (card, index) {

        card.style.transitionDelay =
            (index * 0.08) + "s";

    });


    /* =====================================================
       STAGGER GALLERY
    ===================================================== */

    const galleryItems =
        document.querySelectorAll(".gallery-item");

    galleryItems.forEach(function (item, index) {

        item.style.transitionDelay =
            (index * 0.08) + "s";

    });


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    const internalLinks =
        document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight =
                header ? header.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       IMAGE LOAD ANIMATION
    ===================================================== */

    const images =
        document.querySelectorAll("img");

    images.forEach(function (image) {

        if (image.complete) {

            image.classList.add("loaded");

        } else {

            image.addEventListener(
                "load",
                function () {

                    image.classList.add("loaded");

                },
                {
                    once: true
                }
            );

        }

    });


    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    const heroBackground =
        document.querySelector(".hero-background");

    if (heroBackground && window.innerWidth > 760) {

        window.addEventListener("scroll", function () {

            const scrollPosition =
                window.scrollY;

            if (scrollPosition <= window.innerHeight) {

                heroBackground.style.transform =
                    "translateY(" +
                    (scrollPosition * 0.12) +
                    "px) scale(1)";

            }

        });

    }


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const yearElements =
        document.querySelectorAll(".current-year");

    yearElements.forEach(function (element) {

        element.textContent =
            new Date().getFullYear();

    });


    /* =====================================================
       ESCAPE KEY
       Close mobile menu
    ===================================================== */

    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            mainNav &&
            mainNav.classList.contains("open")
        ) {

            mainNav.classList.remove("open");

            if (menuToggle) {

                const icon =
                    menuToggle.querySelector("i");

                if (icon) {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            }

            document.body.style.overflow = "";

        }

    });


    /* =====================================================
       PREVENT BROKEN IMAGE LOOK
    ===================================================== */

    images.forEach(function (image) {

        image.addEventListener("error", function () {

            image.classList.add("image-error");

        });

    });

});