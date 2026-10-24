// Small CSS-driven visuals (gauge, image split, flow diagrams…) start when scrolled into view:
// [data-inview] gets .is-inview once. With reduced motion it is set straight away.
import { ScrollTrigger, $$, reduced } from "./core";

export function initInView() {
  $$("[data-inview]").forEach((el) => {
    if (reduced) return el.classList.add("is-inview");
    ScrollTrigger.create({ trigger: el, start: "top 75%", once: true, onEnter: () => el.classList.add("is-inview") });
  });
}
