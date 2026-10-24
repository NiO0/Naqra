// Hero dashboard demo, driven by the hero's pressed button (scripts/hero.ts):
// "optimize all" fires, rows get selected and rewritten one by one while scores climb.
import { gsap, $, $$, reduced } from "./core";

const C = 2 * Math.PI * 15;
const AMBER = "#e9a23b";
const OK = "#2f9e6e";

export type DashboardDemo = {
  /** Run "optimize all", rewinding to the "before" state first when needed. False while a run is playing. */
  play(): boolean;
};

export function initDashboard(): DashboardDemo | null {
  const dash = $("[data-dash]");
  if (!dash) return null;
  const btn = $("[data-dash-btn]", dash)!;
  const bar = $("[data-dash-bar]", dash)!;
  const count = $("[data-dash-count]", dash)!;
  const table = $(".dash-table", dash)!;
  const rows = $$("[data-dash-row]", dash);

  const rowParts = rows.map((r) => ({
    r,
    s0: +r.dataset.s0!,
    s1: +r.dataset.s1!,
    before: $(".dt-before", r)!,
    after: $(".dt-after", r)!,
    ring: $<SVGCircleElement>("[data-ring]", r)!,
    score: $("[data-score]", r)!,
    todo: $(".st-todo", r)!,
    done: $(".st-done", r)!,
    shimmer: $(".dt-shimmer", r)!,
  }));

  const setState = (optimized: boolean) => {
    rowParts.forEach((p) => {
      p.r.classList.toggle("is-selected", optimized);
      gsap.set(p.before, { opacity: optimized ? 0 : 1, yPercent: optimized ? -100 : 0 });
      gsap.set(p.after, { opacity: optimized ? 1 : 0, yPercent: optimized ? 0 : 100 });
      gsap.set(p.ring, { strokeDashoffset: C * (1 - (optimized ? p.s1 : p.s0) / 100), stroke: optimized ? OK : AMBER });
      p.score.textContent = String(optimized ? p.s1 : p.s0);
      gsap.set(p.todo, { opacity: optimized ? 0 : 1, scale: 1 });
      gsap.set(p.done, { opacity: optimized ? 1 : 0, scale: optimized ? 1 : 0.5 });
    });
    gsap.set(bar, { scaleX: optimized ? 1 : 0, opacity: 1 });
    count.textContent = optimized ? "248" : "0";
  };

  if (reduced) {
    setState(true);
    return null;
  }

  let state: "idle" | "running" | "done" = "idle";
  let tl: gsap.core.Timeline | null = null;

  function play() {
    if (state === "running") return false;
    const rewind = state === "done";
    state = "running";
    tl?.kill();
    const n = rowParts.length;
    const counter = { v: 0 };
    tl = gsap.timeline({ defaults: { ease: "power2.inOut" }, onComplete: () => { state = "done"; } });

    if (rewind) {
      tl.to(table, { opacity: 0.35, duration: 0.25, ease: "power1.out" })
        .to(bar, { opacity: 0, duration: 0.25 }, "<")
        .call(() => setState(false))
        .to(table, { opacity: 1, duration: 0.3, ease: "power1.out" });
    }

    tl.addLabel("go");
    rowParts.forEach((p, i) => tl!.call(() => p.r.classList.add("is-selected"), [], `go+=${i * 0.05}`));
    tl.addLabel("click", "go+=0.12")
      .to(btn, { scale: 0.88, duration: 0.1, ease: "power2.in" }, "click")
      .to(btn, { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" }, "click+=0.1")
      .to(bar, { scaleX: 1, duration: 0.6 + n * 0.45, ease: "power1.inOut" }, "click+=0.15")
      .to(counter, {
        v: 248, duration: 0.6 + n * 0.45, ease: "power1.inOut",
        onUpdate: () => { count.textContent = String(Math.round(counter.v)); },
      }, "click+=0.15");

    rowParts.forEach((p, i) => {
      const t = 0.3 + i * 0.45;
      const score = { v: p.s0 };
      tl!
        .fromTo(p.shimmer, { xPercent: 110 }, { xPercent: -110, duration: 0.9, ease: "power2.inOut", immediateRender: false }, `click+=${t}`)
        .to(p.before, { yPercent: -100, opacity: 0, duration: 0.45, ease: "power2.in" }, `click+=${t + 0.25}`)
        .to(p.after, { yPercent: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }, `click+=${t + 0.55}`)
        .to(p.ring, { strokeDashoffset: C * (1 - p.s1 / 100), stroke: OK, duration: 1.1, ease: "power3.out" }, `click+=${t + 0.4}`)
        .to(score, {
          v: p.s1, duration: 1.1, ease: "power3.out",
          onUpdate: () => { p.score.textContent = String(Math.round(score.v)); },
        }, `click+=${t + 0.4}`)
        .to(p.todo, { opacity: 0, scale: 0.8, duration: 0.25 }, `click+=${t + 0.5}`)
        .to(p.done, { opacity: 1, scale: 1, duration: 0.55, ease: "back.out(2.6)" }, `click+=${t + 0.6}`);
    });
    return true;
  }

  setState(false);
  return { play };
}
