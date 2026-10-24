// Final CTA: the brand cursor swoops into the burst as you scroll in, then keeps "clicking".
import { gsap, ScrollTrigger, $, reduced, whileVisible } from "./core";

export function initFinale() {
  if (reduced) return;

  const final = $("[data-final]");
  const cursor = $("[data-final-cursor]");
  if (!final || !cursor) return;

  gsap.fromTo(cursor, { xPercent: -45, yPercent: 55, rotate: -18 }, {
    xPercent: 0, yPercent: 0, rotate: 0, ease: "none",
    scrollTrigger: { trigger: final, start: "top bottom", end: "center 55%", scrub: 0.8 },
  });
  const click = () =>
    gsap.timeline()
      .to(cursor, { scale: 0.86, duration: 0.12, ease: "power2.in" })
      .to(cursor, { scale: 1, duration: 0.8, ease: "elastic.out(1, 0.45)" });
  ScrollTrigger.create({ trigger: final, start: "center 60%", once: true, onEnter: click });
  let visible = false;
  whileVisible(final, (v) => (visible = v));
  setInterval(() => { if (visible && !document.hidden) click(); }, 4200);
}
