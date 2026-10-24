// Header: hides on scroll down, mega menu (hover + click + keyboard) and the full-screen mobile menu.
import { gsap, ScrollTrigger, $, $$, lenis, finePointer, reduced } from "./core";

export function initHeader() {
  const header = $("[data-header]");
  if (!header) return;

  // --- hide-on-down ---
  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      const y = self.scroll();
      if (y > 480 && self.direction === 1) header.classList.add("is-hidden");
      else if (self.direction === -1) header.classList.remove("is-hidden");
    },
  });

  // --- scroll progress bar ---
  const progress = $("[data-scroll-progress]");
  if (progress) {
    gsap.to(progress, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });
  }

  // --- mega menu ---
  const mega = $("[data-mega]", header);
  const megaBtn = $("[data-mega-btn]", header);
  const panel = $("[data-mega-panel]", header);
  if (mega && megaBtn && panel) {
    let closeT: number | undefined;
    const setOpen = (open: boolean) => {
      clearTimeout(closeT);
      megaBtn.setAttribute("aria-expanded", String(open));
      panel.classList.toggle("is-open", open);
      if (open && !reduced) {
        gsap.fromTo($$(".mega-item", panel), { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.03, overwrite: true });
      }
    };
    megaBtn.addEventListener("click", () => setOpen(megaBtn.getAttribute("aria-expanded") !== "true"));
    if (finePointer) {
      mega.addEventListener("pointerenter", () => setOpen(true));
      mega.addEventListener("pointerleave", () => { closeT = window.setTimeout(() => setOpen(false), 180); });
    }
    mega.addEventListener("focusout", (e) => { if (!mega.contains(e.relatedTarget as Node)) setOpen(false); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && panel.classList.contains("is-open")) { setOpen(false); megaBtn.focus(); }
    });
    document.addEventListener("click", (e) => { if (!mega.contains(e.target as Node)) setOpen(false); });
  }

  // --- mobile menu ---
  const burger = $("[data-burger]", header);
  const menu = $("[data-mobile-menu]", header);
  if (burger && menu) {
    const items = $$(".mm-item, .mm-foot", menu);
    const setMenu = (open: boolean) => {
      header.classList.toggle("menu-open", open);
      burger.setAttribute("aria-expanded", String(open));
      $(".sr-only", burger)!.textContent = open ? "إغلاق القائمة" : "فتح القائمة";
      menu.setAttribute("aria-hidden", String(!open));
      if (open) {
        lenis?.stop();
        document.body.style.overflow = "hidden";
        if (!reduced) gsap.fromTo(items, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, delay: 0.2, ease: "power4.out" });
      } else {
        lenis?.start();
        document.body.style.overflow = "";
      }
    };
    burger.addEventListener("click", () => setMenu(!header.classList.contains("menu-open")));
    $$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && header.classList.contains("menu-open")) { setMenu(false); burger.focus(); }
    });
    matchMedia("(min-width: 1101px)").addEventListener("change", (e) => e.matches && setMenu(false));
  }
}
