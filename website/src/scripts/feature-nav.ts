// Features page: the sticky jump line highlights the section in view and keeps its tab visible.
import { ScrollTrigger, $, $$ } from "./core";

export function initFeatureNav() {
  const nav = $("[data-fnav]");
  if (!nav) return;
  const links = $$<HTMLAnchorElement>("a[href^='#']", nav);
  const scroller = $(".fnav-track", nav)!;

  const activate = (id: string | null) => {
    links.forEach((a) => {
      const on = a.hash === `#${id}`;
      if (on) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
      // keep the active tab in view inside the horizontally scrolling line (no page scroll)
      if (on) {
        const r = a.getBoundingClientRect();
        const s = scroller.getBoundingClientRect();
        if (r.left < s.left || r.right > s.right) scroller.scrollBy({ left: r.left - s.left - (s.width - r.width) / 2, behavior: "smooth" });
      }
    });
  };

  links.forEach((a) => {
    const section = document.getElementById(a.hash.slice(1));
    if (!section) return;
    ScrollTrigger.create({
      trigger: section,
      start: "top 45%",
      end: "bottom 45%",
      onToggle: (self) => self.isActive && activate(section.id),
    });
  });
  // above the first section nothing is current
  const first = document.getElementById(links[0]?.hash.slice(1) ?? "");
  if (first) ScrollTrigger.create({ trigger: first, start: "top 45%", onLeaveBack: () => activate(null) });
}
