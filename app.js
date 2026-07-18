"use strict";

/* Short DOM helpers */
const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

/* Main elements */
const root = document.documentElement;
const header = $(".site-header");
const menuButton = $("#menu-toggle");
const navigation = $("#main-navigation");
const themeButton = $("#theme-toggle");
const themeIcon = $(".theme-icon");
const themeLabel = $(".theme-label");

const lightbox = $("#lightbox");
const lightboxImage = $("#lightbox-image");
const lightboxCaption = $("#lightbox-caption");
const lightboxClose = $("#lightbox-close");
const navLinks = $$(".main-navigation a");
const answers = $$(".answer-card");
const backToTop = $("#back-to-top");

/* Theme management */
const systemTheme = matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

const savedTheme = localStorage.getItem("theme") || systemTheme;

function applyTheme(theme) {
    const dark = theme === "dark";

    root.dataset.theme = theme;
    themeIcon.textContent = dark ? "☀" : "☾";
    themeLabel.textContent = dark ? "Světlé" : "Tmavé";

    themeButton?.setAttribute(
        "aria-label",
        dark ? "Zapnout světlé téma" : "Zapnout tmavé téma"
    );

    localStorage.setItem("theme", theme);
}

applyTheme(savedTheme);

themeButton?.addEventListener("click", () => {
    applyTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

/* Prague clock */
const timeFormatter = new Intl.DateTimeFormat("cs-CZ", {
    timeZone: "Europe/Prague",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
});

const dateFormatter = new Intl.DateTimeFormat("cs-CZ", {
    timeZone: "Europe/Prague",
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
});

function updatePragueTime() {
    const now = new Date();

    if (pragueClock) pragueClock.textContent = timeFormatter.format(now);
    if (pragueDate) pragueDate.textContent = dateFormatter.format(now);
}

updatePragueTime();
setInterval(updatePragueTime, 1000);

/* Time spent on page */
const pageStartedAt = Date.now();

function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [hours, minutes, secs]
        .map(value => String(value).padStart(2, "0"))
        .join(":");
}

function updatePageTimer() {
    if (!pageTimer) return;

    const elapsed = Math.floor((Date.now() - pageStartedAt) / 1000);
    pageTimer.textContent = formatDuration(elapsed);
}

updatePageTimer();
setInterval(updatePageTimer, 1000);

/* Mobile navigation */
function setMenu(open) {
    menuButton?.classList.toggle("is-open", open);
    navigation?.classList.toggle("is-open", open);
    menuButton?.setAttribute("aria-expanded", String(open));
    menuButton?.setAttribute(
        "aria-label",
        open ? "Zavřít navigaci" : "Otevřít navigaci"
    );
}

menuButton?.addEventListener("click", () => {
    setMenu(!navigation.classList.contains("is-open"));
});

document.addEventListener("click", event => {
    if (
        navigation?.classList.contains("is-open") &&
        !navigation.contains(event.target) &&
        !menuButton.contains(event.target)
    ) {
        setMenu(false);
    }
});

/* Header shadow */
function updateHeader() {
    header?.classList.toggle("is-scrolled", scrollY > 20);
}

updateHeader();
addEventListener("scroll", updateHeader, { passive: true });


/* Accordion behavior */
function restoreScrollPosition(position) {
    const previousBehavior = root.style.scrollBehavior;

    /* Disable smooth scrolling during layout changes */
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, position);

    requestAnimationFrame(() => {
        root.style.scrollBehavior = previousBehavior;
    });
}

function openAnswer(id) {
    const selected = document.getElementById(id);

    if (!(selected instanceof HTMLDetailsElement)) return;

    /* Keep other sections open */
    selected.open = true;
}

answers.forEach(answer => {
    const summary = $("summary", answer);

    summary?.addEventListener("click", event => {
        event.preventDefault();

        const scrollPosition = window.scrollY;

        /* Toggle only the selected section */
        answer.open = !answer.open;

        /* Prevent browser scroll anchoring after content expansion */
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                restoreScrollPosition(scrollPosition);
            });
        });
    });
});
/* Navigation scrolling */
navLinks.forEach(link => {
    link.addEventListener("click", event => {
        const id = link.getAttribute("href")?.replace("#", "");
        const target = id && document.getElementById(id);

        if (!target) return;

        event.preventDefault();

        if (id.startsWith("q")) openAnswer(id);

        target.scrollIntoView({
            behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "auto"
                : "smooth",
            block: "start"
        });

        history.replaceState(null, "", `#${id}`);
        setMenu(false);
    });
});

/* Active navigation item */
const sectionObserver = new IntersectionObserver(
    entries => {
        const visible = entries
            .filter(entry => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        navLinks.forEach(link => {
            const active =
                link.getAttribute("href") === `#${visible.target.id}`;

            link.classList.toggle("is-active", active);

            if (active) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    },
    {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0.1, 0.3, 0.6]
    }
);

answers.forEach(answer => sectionObserver.observe(answer));

/* Image lightbox */
function openLightbox(image) {
    if (!lightbox || !lightboxImage) return;

    const caption = image
        .closest("figure")
        ?.querySelector("figcaption")
        ?.textContent.trim();

    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = caption || image.alt;

    lightbox.showModal();
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    if (!lightbox?.open) return;

    lightbox.close();
    lightboxImage.src = "";
    document.body.style.overflow = "";
}

$$("[data-lightbox]").forEach(image => {
    image.setAttribute("tabindex", "0");
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", `${image.alt}. Zvětšit obrázek.`);

    image.addEventListener("click", () => openLightbox(image));

    image.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openLightbox(image);
        }
    });
});

lightboxClose?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", event => {
    if (event.target === lightbox) closeLightbox();
});

lightbox?.addEventListener("close", () => {
    document.body.style.overflow = "";
});

/* Global keyboard controls */
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        setMenu(false);
        closeLightbox();
    }
});

/* Open question from URL hash */
function openFromHash() {
    const id = location.hash.slice(1);

    if (id.startsWith("q")) openAnswer(id);
}

openFromHash();
addEventListener("hashchange", openFromHash);

/* Reliable back-to-top navigation */
backToTop?.addEventListener("click", event => {
    event.preventDefault();

    const reducedMotion = matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: reducedMotion ? "auto" : "smooth"
    });

    /* Remove the section hash from the URL */
    history.replaceState(
        null,
        "",
        `${location.pathname}${location.search}`
    );
});
