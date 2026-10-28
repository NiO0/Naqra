// Card carousels with prev/next arrows (Solutions "ما تقدمه لك نقرة"). The track still scrolls by
// touch / trackpad; the arrows step one card at a time and dim at either end. RTL: "next" goes left.
import { $, $$, reduced } from "./core";

export function initCarousels() {
  $$("[data-carousel]").forEach((root) => {
    const track = $<HTMLElement>("[data-carousel-track]", root);
    const prev = $<HTMLButtonElement>("[data-carousel-prev]", root);
    const next = $<HTMLButtonElement>("[data-carousel-next]", root);
    if (!track || !prev || !next) return;

    const step = () => {
      const card = track.firstElementChild as HTMLElement | null;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return (card?.offsetWidth ?? track.clientWidth) + gap;
    };
    const sync = () => {
      const max = track.scrollWidth - track.clientWidth;
      const pos = Math.abs(track.scrollLeft); // 0 → -max in RTL; snapping leaves a few px of padding
      prev.disabled = pos < 12;
      next.disabled = pos > max - 12;
    };
    const go = (dir: 1 | -1) => {
      track.scrollBy({ left: -dir * step(), behavior: reduced ? "auto" : "smooth" });
      setTimeout(sync, 600); // in case scroll events are throttled (background tab)
    };

    prev.addEventListener("click", () => go(-1));
    next.addEventListener("click", () => go(1));
    track.addEventListener("scroll", sync, { passive: true });
    addEventListener("resize", sync);
    // panels start hidden behind tabs; re-check once one is shown
    root.closest("[data-tabs]")?.addEventListener("tabchange", () => requestAnimationFrame(sync));
    sync();
  });
}
