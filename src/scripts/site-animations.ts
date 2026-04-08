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
    if (!container.contains(e.target as Node)) close();
  });
}

function onReady(): void {
  const navState = document.getElementById("nav_state");
  const navTrigger = document.getElementById("nav_trigger");
  if (navTrigger && navState) {
    navTrigger.addEventListener("click", () => {
      const wasOpen = navState.classList.contains("nav--open");
      navTrigger.classList.toggle("nav-trigger--on");
      navState.classList.toggle("nav--open");
      if (wasOpen) {
        resetNavDropdown();
      }
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
