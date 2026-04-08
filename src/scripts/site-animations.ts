import { gsap } from "gsap";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin);

const NAV_DESKTOP_MEDIA = "(min-width: 48em)";

function resetNavDropdown(): void {
  const container = document.querySelector<HTMLElement>("[data-nav-dropdown]");
  const btn = document.getElementById("site-nav-dropdown-consultations-btn");
  const menu = document.getElementById("site-nav-dropdown-consultations");
  container?.classList.remove("is-open");
  btn?.setAttribute("aria-expanded", "false");
  menu?.setAttribute("inert", "");
}

function initNavDropdown(): void {
  const container = document.querySelector<HTMLElement>("[data-nav-dropdown]");
  const btn = document.getElementById(
    "site-nav-dropdown-consultations-btn",
  ) as HTMLButtonElement | null;
  const menu = document.getElementById("site-nav-dropdown-consultations");
  if (!container || !btn || !menu) return;

  const mqDesktop = window.matchMedia(NAV_DESKTOP_MEDIA);

  function applyMenuInert(open: boolean): void {
    if (open) {
      menu.removeAttribute("inert");
    } else {
      menu.setAttribute("inert", "");
    }
  }

  function setOpen(open: boolean): void {
    container.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", String(open));
    applyMenuInert(open);
  }

  function close(): void {
    if (!container.classList.contains("is-open")) return;
    const active = document.activeElement;
    const hadFocus =
      active !== null &&
      (menu.contains(active) || btn === active);
    setOpen(false);
    if (hadFocus) {
      btn.focus();
    }
  }

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    setOpen(!container.classList.contains("is-open"));
  });

  container.addEventListener("mouseenter", () => {
    if (mqDesktop.matches) setOpen(true);
  });
  container.addEventListener("mouseleave", () => {
    if (mqDesktop.matches) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  document.addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof Node)) return;
    if (!container.contains(t)) close();
  });
}

function onReady(): void {
  const navState = document.getElementById("nav_state");
  const navTrigger = document.getElementById("nav_trigger");
  const mqDesktop = window.matchMedia(NAV_DESKTOP_MEDIA);

  function syncNavAccessibility(menuOpen: boolean): void {
    if (!navState || !navTrigger) return;
    if (mqDesktop.matches) {
      navState.setAttribute("aria-hidden", "false");
      navTrigger.setAttribute("aria-expanded", "false");
    } else {
      navState.setAttribute("aria-hidden", menuOpen ? "false" : "true");
      navTrigger.setAttribute("aria-expanded", String(menuOpen));
    }
  }

  function setMobileMenuOpen(open: boolean): void {
    if (!navState || !navTrigger) return;
    navTrigger.classList.toggle("nav-trigger--on", open);
    navState.classList.toggle("nav--open", open);
    if (!open) {
      resetNavDropdown();
    }
    document.body.classList.toggle("nav-menu-open", open && !mqDesktop.matches);
    syncNavAccessibility(open);
  }

  if (navTrigger && navState) {
    syncNavAccessibility(false);

    navTrigger.addEventListener("click", () => {
      setMobileMenuOpen(!navState.classList.contains("nav--open"));
    });

    navState.querySelectorAll<HTMLAnchorElement>(".nav__ul a").forEach((link) => {
      link.addEventListener("click", () => {
        if (!mqDesktop.matches) {
          setMobileMenuOpen(false);
        }
      });
    });

    document.addEventListener(
      "click",
      (e) => {
        if (mqDesktop.matches || !navState.classList.contains("nav--open")) {
          return;
        }
        const t = e.target as Node;
        if (navTrigger.contains(t) || navState.contains(t)) {
          return;
        }
        setMobileMenuOpen(false);
      },
      true,
    );

    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape" || mqDesktop.matches) {
        return;
      }
      const dd = document.querySelector("[data-nav-dropdown]");
      if (dd?.classList.contains("is-open")) {
        return;
      }
      if (navState.classList.contains("nav--open")) {
        setMobileMenuOpen(false);
      }
    });

    mqDesktop.addEventListener("change", () => {
      document.body.classList.remove("nav-menu-open");
      navTrigger.classList.remove("nav-trigger--on");
      navState.classList.remove("nav--open");
      resetNavDropdown();
      syncNavAccessibility(false);
    });
  }

  initNavDropdown();

  const revealContent = document.getElementById("reveal_content");
  const infoClosed = document.querySelector(".info--closed");
  if (revealContent && infoClosed) {
    revealContent.addEventListener("click", () => {
      infoClosed.classList.toggle("info--open");
      revealContent.classList.toggle("reveal-close");
    });
  }

  const main = document.getElementById("main");
  const famille2 = document.getElementById("famille-2");
  if (main && famille2) {
    const t = gsap.timeline();
    t.fromTo(main, { x: 200 }, { x: 0, duration: 1, ease: "power2.out" }).to(
      famille2,
      { opacity: 1, duration: 0.3 },
    );
  }

  const headerTel = document.querySelector(".header-tel");
  if (headerTel) {
    gsap.to(headerTel, {
      rotationX: 360,
      backgroundColor: "#ffffff",
      duration: 0.8,
      ease: "power3.in",
      repeat: -1,
      repeatDelay: 5,
      yoyo: true,
    });
  }

  const arrows = document.getElementById("arrows");
  const courbe = document.getElementById("courbe");
  if (arrows && courbe) {
    const timelineArrows = gsap.timeline({ delay: 1 });
    timelineArrows
      .to(arrows, { opacity: 1, duration: 1, ease: "bounce.out" })
      .fromTo(
        courbe,
        { drawSVG: "0% 0%" },
        { drawSVG: "0% 100%", duration: 2, ease: "power2.out" },
      );
  }

  const identityPerso = document.getElementById("identity-perso");
  const identitySvg = document.getElementById("identity-svg");
  if (identityPerso && identitySvg) {
    gsap.to(identityPerso, { opacity: 1, duration: 2, delay: 1 });
    const identitySwing = gsap.timeline({
      delay: 1,
      repeat: -1,
      yoyo: true,
      repeatDelay: 4,
    });
    identitySwing
      .to(identitySvg, {
        rotation: 5,
        transformOrigin: "center top",
        duration: 1.8,
      })
      .to(identitySvg, {
        rotation: -5,
        transformOrigin: "center top",
        duration: 1.8,
      })
      .to(identitySvg, {
        rotation: 5,
        transformOrigin: "center top",
        duration: 1.8,
      });
  }

  const fil = document.getElementById("fil");
  const motAnim = document.querySelectorAll(".mot-anim");
  if (fil && motAnim.length > 0) {
    const motsList = Array.from(motAnim);
    const timelineMots = gsap.timeline({ delay: 1, yoyo: true });
    timelineMots
      .fromTo(fil, { drawSVG: "0%" }, { drawSVG: "100%", duration: 5 })
      .fromTo(
        motsList,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 1, stagger: 0.8 },
        "-=4.8",
      );
  }

  const legoMiddle = document.getElementById("lego-middle");
  const legoBottom = document.getElementById("lego-bottom");
  const legoTop = document.getElementById("lego-top");
  if (legoMiddle && legoBottom && legoTop) {
    const timelineLegos = gsap.timeline({ delay: 1 });
    timelineLegos
      .fromTo(
        legoMiddle,
        { autoAlpha: 0, y: -100 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.in" },
      )
      .fromTo(
        legoBottom,
        { autoAlpha: 0, y: -100 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.in" },
      )
      .fromTo(
        legoTop,
        { autoAlpha: 0, y: -100 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.in" },
      );
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", onReady);
} else {
  onReady();
}
