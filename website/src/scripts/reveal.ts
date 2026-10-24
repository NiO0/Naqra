// Scroll reveals: split headings, fade-ups, self-drawing scribbles.
import { gsap, ScrollTrigger, SplitText, $$, reduced } from "./core";

export function initReveals() {
  if (reduced) return;

  // Headings: word-by-word rise (words keep Arabic letter joining intact)
  $$("[data-split]").forEach((el) => {
    if (el.closest("[data-hero]")) return;
    SplitText.create(el, {
      type: "words",
      wordsClass: "split-word",
      aria: "none",
      autoSplit: true,
      onSplit: (self) =>
        gsap.fromTo(self.words, { yPercent: 75, opacity: 0, rotate: 2.5 }, {
          yPercent: 0, opacity: 1, rotate: 0, duration: 1.05, ease: "power4.out", stagger: 0.045,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }),
    });
  });

  // Generic reveals
  ScrollTrigger.batch("[data-reveal]", {
    start: "top 90%",
    once: true,
    onEnter: (batch) =>
      gsap.fromTo(batch, {
        opacity: 0,
        y: (_i: number, el: HTMLElement) => (el.dataset.reveal === "fade" ? 0 : el.dataset.reveal === "card" ? 70 : 36),
        rotate: (_i: number, el: HTMLElement) => (el.dataset.reveal === "card" ? (Math.random() * 4 - 2) : 0),
      }, { opacity: 1, y: 0, rotate: 0, duration: 1.1, stagger: 0.09, ease: "power3.out", overwrite: true }),
  });

  // Hand-drawn scribbles draw themselves
  $$<SVGSVGElement>("[data-draw]").forEach((svg) => {
    if (svg.closest("[data-hero]")) return;
    const paths = $$<SVGPathElement>("path", svg);
    gsap.set(paths, { drawSVG: "0%" });
    ScrollTrigger.create({
      trigger: svg,
      start: "top 85%",
      once: true,
      onEnter: () => gsap.to(paths, { drawSVG: "100%", duration: 1.1, ease: "power2.inOut", delay: 0.45, stagger: 0.2 }),
    });
  });
}
