// Small, satisfying details: click sparks everywhere, magnetic buttons, 3D tilt cards.
import { gsap, $$, reduced, finePointer } from "./core";

/** Every click/tap anywhere bursts the brand's three "click" strokes. */
function initClickSparks() {
  const layer = document.createElement("div");
  layer.className = "spark-layer";
  layer.setAttribute("aria-hidden", "true");
  document.body.appendChild(layer);

  // angles mirror the sparks around the (flipped) cursor tip: up, up-left, left
  const angles = [-80, -132, 172];
  addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    const onCoral = !!(e.target as Element)?.closest?.('[data-theme="coral"], .mobile-menu');
    const burst = document.createElement("span");
    burst.className = "spark-burst";
    burst.style.left = `${e.clientX}px`;
    burst.style.top = `${e.clientY}px`;
    burst.style.setProperty("--c", onCoral ? "#fff" : "var(--coral)");
    angles.forEach((a) => {
      const s = document.createElement("i");
      s.style.setProperty("--a", `${a + (Math.random() * 14 - 7)}deg`);
      burst.appendChild(s);
    });
    layer.appendChild(burst);
    const lines = burst.children;
    gsap.timeline({ onComplete: () => burst.remove() })
      .fromTo(lines, { "--d": 6, "--s": 0 }, { "--d": 16, "--s": 1, duration: 0.2, ease: "power2.out" })
      .to(lines, { "--d": 30, "--s": 0, duration: 0.32, ease: "power2.in" });
  }, { passive: true });
}

/** Buttons lean toward the pointer and spring back. */
function initMagnetic() {
  $$("[data-magnetic]").forEach((el) => {
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.22);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
    });
    el.addEventListener("pointerleave", () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.35)", overwrite: true });
    });
  });
}

/** Bento cards tilt in 3D and carry a spotlight that follows the pointer. */
function initTilt() {
  $$("[data-tilt]").forEach((el) => {
    const rx = gsap.quickTo(el, "rotateX", { duration: 0.6, ease: "power3" });
    const ry = gsap.quickTo(el, "rotateY", { duration: 0.6, ease: "power3" });
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      rx((0.5 - py) * 7);
      ry((px - 0.5) * 9);
      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);
    });
    el.addEventListener("pointerleave", () => { rx(0); ry(0); });
  });
}

export function initInteractions() {
  if (reduced) return;
  initClickSparks();
  if (finePointer) {
    initMagnetic();
    initTilt();
  }
}
