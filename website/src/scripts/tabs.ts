// Accessible tabs (Solutions audiences, Contact). Without JS every panel stays visible.
// A panel whose id matches the URL hash (e.g. /solutions#agencies) is selected on load and on
// hash changes, then scrolled into view.
import { gsap, $, $$, lenis, reduced } from "./core";

export function initTabs() {
  $$("[data-tabs]").forEach((root) => {
    const tabs = $$<HTMLButtonElement>('[role="tab"]', root);
    const panels = tabs.map((t) => document.getElementById(t.getAttribute("aria-controls")!)!);

    const select = (i: number, focus = false, animate = true) => {
      tabs.forEach((t, n) => {
        const on = n === i;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        panels[n].hidden = !on;
      });
      if (focus) tabs[i].focus();
      if (animate && !reduced) gsap.fromTo($$("[data-tab-in]", panels[i]), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, overwrite: true });
      root.dispatchEvent(new CustomEvent("tabchange", { detail: { index: i } }));
    };

    tabs.forEach((t, i) => {
      t.addEventListener("click", () => select(i));
      t.addEventListener("keydown", (e) => {
        // RTL: ArrowLeft moves to the next tab
        const step = { ArrowLeft: 1, ArrowRight: -1, Home: -Infinity, End: Infinity }[e.key];
        if (step === undefined) return;
        e.preventDefault();
        const next = Math.abs(step) === Infinity ? (step > 0 ? tabs.length - 1 : 0) : (i + step + tabs.length) % tabs.length;
        select(next, true);
      });
    });

    const fromHash = (scroll: boolean) => {
      const i = panels.findIndex((p) => `#${p.id}` === location.hash);
      if (i < 0) return false;
      select(i, false, false);
      if (scroll) {
        const target = $("[data-tabs-anchor]", root) ?? root;
        lenis ? lenis.scrollTo(target, { offset: -24, immediate: reduced }) : target.scrollIntoView();
      }
      return true;
    };
    if (!fromHash(true)) select(Math.max(0, tabs.findIndex((t) => t.getAttribute("aria-selected") === "true")), false, false);
    addEventListener("hashchange", () => fromHash(true));
    root.classList.add("tabs-ready");
  });
}
