// FAQ accordion with smooth height animation (one item open at a time).
import { gsap, ScrollTrigger, $, $$, reduced } from "./core";

export function initAccordion() {
  const root = $("[data-accordion]");
  if (!root) return;
  const items = $$("[data-acc-item]", root).map((item) => ({
    btn: $("[data-acc-btn]", item)!,
    panel: $("[data-acc-panel]", item)!,
  }));
  const dur = reduced ? 0 : 0.55;
  let refreshT: number | undefined;
  const refreshSoon = () => { clearTimeout(refreshT); refreshT = window.setTimeout(() => ScrollTrigger.refresh(), (dur + 0.05) * 1000); };

  const close = ({ btn, panel }: (typeof items)[number]) => {
    if (btn.getAttribute("aria-expanded") !== "true") return;
    btn.setAttribute("aria-expanded", "false");
    gsap.to(panel, { height: 0, duration: dur, ease: "power3.inOut", onComplete: () => { panel.hidden = true; } });
  };
  const open = ({ btn, panel }: (typeof items)[number]) => {
    btn.setAttribute("aria-expanded", "true");
    panel.hidden = false;
    gsap.fromTo(panel, { height: 0 }, { height: "auto", duration: dur, ease: "power3.out" });
    if (!reduced) gsap.fromTo(panel.firstElementChild, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.1 });
  };

  items.forEach((it) => {
    it.btn.addEventListener("click", () => {
      const isOpen = it.btn.getAttribute("aria-expanded") === "true";
      items.forEach((o) => o !== it && close(o));
      isOpen ? close(it) : open(it);
      refreshSoon();
    });
  });

  // open the first one as an affordance
  if (items[0]) {
    items[0].btn.setAttribute("aria-expanded", "true");
    items[0].panel.hidden = false;
  }
}
