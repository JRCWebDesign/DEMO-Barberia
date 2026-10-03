"use strict";
(() => {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const loader = document.querySelector(".loader");
  const motionButton = document.querySelector(".motion-toggle");
  let manuallyPaused = false;
  let loaderFinished = false;
  // Booking never waits for remote fonts or images.
  function finishLoader() {
    if (loaderFinished) return;
    loaderFinished = true;
    root.classList.remove("is-loading");
    root.classList.add("is-loaded");
    window.setTimeout(() => loader?.remove(), 700);
  }
  if (!reducedMotion.matches && loader) {
    root.classList.add("is-loading");
    window.setTimeout(finishLoader, 450);
  } else finishLoader();
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.getElementById("navigation");
  const mobileQuery = window.matchMedia("(max-width: 760px)");
  function setMenu(open, restoreFocus = false) {
    navigation.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    if (restoreFocus) menuButton.focus();
  }
  menuButton.addEventListener("click", () => setMenu(menuButton.getAttribute("aria-expanded") !== "true"));
  navigation.addEventListener("click", event => {
    if (event.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") setMenu(false, true);
  });
  document.addEventListener("click", event => {
    if (!event.target.closest(".header")) setMenu(false);
  });
  document.addEventListener("focusin", event => {
    if (!event.target.closest(".header")) setMenu(false);
  });
  mobileQuery.addEventListener("change", () => setMenu(false));
  function updateMotion() {
    const paused = manuallyPaused || reducedMotion.matches;
    root.classList.toggle("motion-paused", paused);
    motionButton.setAttribute("aria-pressed", String(paused));
    motionButton.textContent = paused ? "Animaciones pausadas" : "Pausar animaciones";
    if (manuallyPaused && !reducedMotion.matches) motionButton.textContent = "Activar animaciones";
    motionButton.hidden = reducedMotion.matches;
    if (paused) finishLoader();
  }
  motionButton.addEventListener("click", () => {
    manuallyPaused = !manuallyPaused;
    updateMotion();
  });
  reducedMotion.addEventListener("change", updateMotion);
  updateMotion();
  document.addEventListener("visibilitychange", () => root.classList.toggle("page-hidden", document.hidden));
  if ("IntersectionObserver" in window) {
    const reveals = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          reveals.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach(element => {
      if (!reducedMotion.matches) element.classList.add("is-pending");
      reveals.observe(element);
    });
    const pole = document.querySelector(".pole-scene");
    const poleObserver = new IntersectionObserver(entries => {
      pole.classList.toggle("offscreen", !entries[0].isIntersecting);
    });
    poleObserver.observe(pole);
    const navLinks = [...navigation.querySelectorAll("a")];
    const sections = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          const active = link.hash === `#${entry.target.id}`;
          link.classList.toggle("active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-15% 0px -65% 0px", threshold: 0 });
    document.querySelectorAll("main section[id]").forEach(section => sections.observe(section));
  }
  document.getElementById("year").textContent = String(new Date().getFullYear());
})();
