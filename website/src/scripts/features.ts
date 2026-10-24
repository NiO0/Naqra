// Feature board: the ruled lines draw in first, then each paper note drops onto the
// board as its slot scrolls into view (and lifts off again when scrolling back up).
import { gsap, $, $$, reduced } from "./core";

export function initFeatureBoard() {
  const board = $("[data-ft-board]");
  if (!board) return;

  // Fresh random tilt per visit, in the design's ranges: coral notes lean +2.5…7°, cream ones −3…−4.8°
  // (the markup's fixed tilts are the no-JS fallback)
  $$("[data-ft-card]", board).forEach((drop) => {
    const tilt = drop.dataset.ftCard === "cream" ? -(3 + Math.random() * 1.8) : 2.5 + Math.random() * 4.5;
    $(".ft-card", drop)?.style.setProperty("--tilt", `${tilt.toFixed(2)}deg`);
  });
  if (reduced) return;

  gsap.fromTo($("[data-ft-lines]", board), { clipPath: "inset(0% 0% 100% 0%)" }, {
    clipPath: "inset(0% 0% 0% 0%)", duration: 1.8, ease: "power2.inOut",
    scrollTrigger: { trigger: board, start: "top 85%", once: true },
  });

  $$("[data-ft-card]", board).forEach((card) => {
    const lean = card.dataset.ftCard === "cream" ? -1 : 1;
    gsap.timeline({
      scrollTrigger: { trigger: card.parentElement, start: "top 78%", toggleActions: "play none none reverse" },
    })
      .fromTo(card, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "none" })
      .fromTo(card, { y: -46, scale: 1.14, rotation: lean * 10 }, {
        y: 0, scale: 1, rotation: 0, duration: 0.85, ease: "back.out(1.6)",
      }, 0);
  });
}
