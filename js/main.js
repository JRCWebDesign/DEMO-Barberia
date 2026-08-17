/* ==========================================================
    FITPOWER GYM
    main.js

    PARTE 1

    1. Inicialización
    2. Variables
    3. Header Scroll
    4. Menú Mobile
    5. Scroll Suave
    6. Active Link
    7. Botón Volver Arriba
========================================================== */

"use strict";

/* ==========================================================
    INICIALIZACIÓN
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeApp();

});

/* ==========================================================
    VARIABLES
========================================================== */

const header = document.getElementById("header");

const menuButton = document.querySelector(".menu-toggle");

const nav = document.querySelector("nav");

const navLinks = document.querySelectorAll(".nav-links a");

const backToTop = document.getElementById("backToTop");

/* ==========================================================
    APP
========================================================== */

function initializeApp() {

    initializeHeader();

    initializeMenu();

    initializeSmoothScroll();

    initializeBackToTop();

    initializeActiveSections();

    initializeObservers();

    initializeComponents();

}

/* ==========================================================
    HEADER
========================================================== */

function initializeHeader() {

    updateHeader();

    window.addEventListener("scroll", updateHeader);

}

function updateHeader() {

    if (window.scrollY > 80) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

/* ==========================================================
    MENÚ RESPONSIVE
========================================================== */

function initializeMenu() {

    if (!menuButton) return;

    menuButton.addEventListener("click", toggleMenu);

    navLinks.forEach(link => {

        link.addEventListener("click", closeMenu);

    });

}

function toggleMenu() {

    nav.classList.toggle("active");

}

function closeMenu() {

    nav.classList.remove("active");

}

/* ==========================================================
    SCROLL SUAVE
========================================================== */

function initializeSmoothScroll() {

    navLinks.forEach(link => {

        link.addEventListener("click", function (event) {

            event.preventDefault();

            const targetId = this.getAttribute("href");

            const targetSection = document.querySelector(targetId);

            if (!targetSection) return;

            const headerHeight = header.offsetHeight;

            const targetPosition =
                targetSection.offsetTop - headerHeight;

            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });

}

/* ==========================================================
    BOTÓN VOLVER ARRIBA
========================================================== */

function initializeBackToTop() {

    updateBackToTop();

    window.addEventListener("scroll", updateBackToTop);

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

function updateBackToTop() {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    }

    else {

        backToTop.classList.remove("show");

    }

}

/* ==========================================================
    LINK ACTIVO
========================================================== */

function initializeActiveSections() {

    window.addEventListener("scroll", highlightCurrentSection);

    highlightCurrentSection();

}

function highlightCurrentSection() {

    const sections = document.querySelectorAll("section[id]");

    let currentSection = "";

    sections.forEach(section => {

        const top = section.offsetTop - 120;

        const height = section.offsetHeight;

        if (window.scrollY >= top &&
            window.scrollY < top + height) {

            currentSection = section.id;

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        const href = link.getAttribute("href").replace("#", "");

        if (href === currentSection) {

            link.classList.add("active");

        }

    });

}

/* ==========================================================
    UTILIDADES
========================================================== */

function isMobile() {

    return window.innerWidth <= 768;

}

function debounce(callback, delay = 100) {

    let timeout;

    return (...args) => {

        clearTimeout(timeout);

        timeout = setTimeout(() => {

            callback(...args);

        }, delay);

    };

}

/* ==========================================================
    PARTE 2

    8. Intersection Observer
    9. Animaciones
    10. Contadores
    11. Parallax Hero
========================================================== */

/* ==========================================================
    ANIMACIONES
========================================================== */

function initializeAnimations() {

    const animatedElements = document.querySelectorAll(".animate");

    if (!animatedElements.length) return;

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            });

        },

        {
            threshold: 0.15
        }

    );

    animatedElements.forEach(element => {

        observer.observe(element);

    });

}

/* ==========================================================
    CONTADORES
========================================================== */

function initializeCounters() {

    const counters = document.querySelectorAll("[data-counter]");

    if (!counters.length) return;

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                animateCounter(entry.target);

                observer.unobserve(entry.target);

            });

        },

        {
            threshold: 0.4
        }

    );

    counters.forEach(counter => {

        observer.observe(counter);

    });

}

function animateCounter(element) {

    const target = Number(element.dataset.counter);

    const duration = 1800;

    const startTime = performance.now();

    function update(currentTime) {

        const progress = Math.min(

            (currentTime - startTime) / duration,

            1

        );

        const value = Math.floor(progress * target);

        element.textContent = value.toLocaleString("es-ES");

        if (progress < 1) {

            requestAnimationFrame(update);

        }

    }

    requestAnimationFrame(update);

}

/* ==========================================================
    PARALLAX HERO
========================================================== */

function initializeParallax() {

    const hero = document.querySelector(".hero");

    if (!hero) return;

    let ticking = false;

    function updateParallax() {

        const offset = window.scrollY * 0.35;

        hero.style.backgroundPosition =

            `center calc(50% + ${offset}px)`;

        ticking = false;

    }

    window.addEventListener("scroll", () => {

        if (!ticking) {

            requestAnimationFrame(updateParallax);

            ticking = true;

        }

    });

}

/* ==========================================================
    ESTADÍSTICAS
========================================================== */

function initializeStatistics() {

    initializeCounters();

}

/* ==========================================================
    OBSERVADORES
========================================================== */

function initializeObservers() {

    initializeAnimations();

    initializeStatistics();

    initializeParallax();

}

/* ==========================================================
    PARTE 3

    12. FAQ
    13. Lightbox
    14. Countdown
    15. Formulario
    16. WhatsApp
    17. Loader
========================================================== */

/* ==========================================================
    FAQ
========================================================== */

function initializeFAQ() {

    const items = document.querySelectorAll(".faq-item");

    if (!items.length) return;

    items.forEach(item => {

        const title = item.querySelector("h3");

        title.addEventListener("click", () => {

            items.forEach(current => {

                if (current !== item) {

                    current.classList.remove("active");

                }

            });

            item.classList.toggle("active");

        });

    });

}

/* ==========================================================
    LIGHTBOX
========================================================== */

function initializeLightbox() {

    const images = document.querySelectorAll(".gallery img");

    if (!images.length) return;

    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";

    const image = document.createElement("img");

    const close = document.createElement("span");
    close.className = "lightbox-close";
    close.innerHTML = "&times;";

    lightbox.appendChild(close);
    lightbox.appendChild(image);

    document.body.appendChild(lightbox);

    images.forEach(img => {

        img.addEventListener("click", () => {

            image.src = img.src;
            image.alt = img.alt;

            lightbox.classList.add("show");

            document.body.classList.add("no-scroll");

        });

    });

    function closeLightbox() {

        lightbox.classList.remove("show");

        document.body.classList.remove("no-scroll");

    }

    close.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (event) => {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeLightbox();

        }

    });

}

/* ==========================================================
    COUNTDOWN
========================================================== */

function initializeCountdown() {

    const countdown = document.getElementById("countdown");

    if (!countdown) return;

    const targetDate = new Date();

    targetDate.setDate(targetDate.getDate() + 15);

    function updateCountdown() {

        const now = new Date();

        const difference = targetDate - now;

        if (difference <= 0) {

            countdown.innerHTML = "Promoción finalizada";

            return;

        }

        const days = Math.floor(difference / 86400000);

        const hours = Math.floor((difference % 86400000) / 3600000);

        const minutes = Math.floor((difference % 3600000) / 60000);

        const seconds = Math.floor((difference % 60000) / 1000);

        countdown.innerHTML = `

            <div>${days}<small>Días</small></div>

            <div>${hours}<small>Horas</small></div>

            <div>${minutes}<small>Min</small></div>

            <div>${seconds}<small>Seg</small></div>

        `;

    }

    updateCountdown();

    setInterval(updateCountdown, 1000);

}

/* ==========================================================
    FORMULARIO
========================================================== */

function initializeContactForm() {

    const form = document.querySelector("form");

    if (!form) return;

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        alert("Formulario enviado correctamente.");

        form.reset();

    });

}

/* ==========================================================
    WHATSAPP
========================================================== */

function initializeWhatsApp() {

    const message = encodeURIComponent(
        "Hola, me gustaría reservar turno! 💈"
    );

    const buttons = [
        document.getElementById("whatsapp-button"),
        document.getElementById("whatsapp-button-2")
    ];

    buttons.forEach(button => {

        if (!button) return;

        button.href =
            `https://wa.me/59898267576?text=${message}`;

    });

}

function initializeServiceWhatsApp() {

    const buttons = document.querySelectorAll(".whatsapp-servicio");

    buttons.forEach(button => {

        const servicio = button.dataset.servicio;

        const message = encodeURIComponent(
            `Hola, me gustaría reservar turno para ${servicio}! 💈`
        );

        button.href =
            `https://wa.me/59898267576?text=${message}`;

    });

}


/* ==========================================================
    LOADER
========================================================== */

function initializeLoader() {

    const loader = document.querySelector(".loader");

    if (!loader) return;

    window.addEventListener("load", () => {

        loader.classList.add("hide");

    });

}

/* ==========================================================
    COMPONENTES
========================================================== */

function initializeComponents() {

    initializeFAQ();

    initializeLightbox();

    initializeCountdown();

    initializeContactForm();

    initializeWhatsApp();

    initializeLoader();

    initializeServiceWhatsApp();

}