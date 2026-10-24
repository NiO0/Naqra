// Infinite marquees whose speed reacts to scroll velocity and whose direction
// follows the scroll direction. Works for RTL and LTR tracks.
import { gsap, $, $$, reduced, lenis, whileVisible } from "./core";

export function initMarquees() {
  $$("[data-marquee]").forEach((el) => {
    const track = $(".marquee-track", el)!;
    const group = $(".marquee-group", el)!;
    const rtl = getComputedStyle(el).direction === "rtl";
    const base = parseFloat(el.dataset.speed || "1") * 0.6; // px per frame @60fps
    const reverse = el.hasAttribute("data-reverse");
    const sign = (rtl ? 1 : -1) * (reverse ? -1 : 1);

    // make sure the track is always wider than two viewports
    let w = group.offsetWidth;
    const fill = () => {
      w = group.offsetWidth;
      while (track.offsetWidth < innerWidth * 2 + w && track.children.length < 12) {
        const clone = group.cloneNode(true) as HTMLElement;
        clone.setAttribute("aria-hidden", "true");
        track.appendChild(clone);
      }
    };
    fill();
    new ResizeObserver(fill).observe(el);

    if (reduced) return;
    let x = 0;
    let dir = 1;
    let boost = 0;
    let visible = false;
    whileVisible(el, (v) => (visible = v), "100px");

    gsap.ticker.add((_t, dt) => {
      if (!visible || !w) return;
      const v = lenis?.velocity ?? 0;
      if (Math.abs(v) > 0.5) dir = v > 0 ? 1 : -1;
      boost += (Math.min(Math.abs(v) * 0.35, 18) - boost) * 0.08;
      x += sign * dir * (base + boost) * (dt / 16.67);
      x = rtl ? ((x % w) + w) % w : -((((-x) % w) + w) % w);
      track.style.transform = `translate3d(${x}px,0,0)`;
    });
  });
}
