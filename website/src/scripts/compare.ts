// "Naqra in action": manual-vs-Naqra switch and the draggable before/after preview.
import { gsap, ScrollTrigger, $, $$, reduced } from "./core";

function initSwitch() {
  const board = $("[data-compare]");
  if (!board) return;
  const btns = $$("[data-mode-btn]", board);
  let touched = false;

  const set = (mode: string) => {
    board.dataset.mode = mode;
    btns.forEach((b) => b.setAttribute("aria-checked", String(b.dataset.modeBtn === mode)));
  };
  btns.forEach((b) => {
    b.addEventListener("click", () => { touched = true; set(b.dataset.modeBtn!); });
    b.addEventListener("keydown", (e) => {
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return;
      e.preventDefault();
      touched = true;
      const next = board.dataset.mode === "manual" ? "naqra" : "manual";
      set(next);
      btns.find((x) => x.dataset.modeBtn === next)?.focus();
    });
  });

  // Show the "before" state first, then flip to Naqra once it's in view
  ScrollTrigger.create({
    trigger: board,
    start: "top 65%",
    once: true,
    onEnter: () => gsap.delayedCall(reduced ? 0 : 1.1, () => { if (!touched) set("naqra"); }),
  });
}

function initBeforeAfter() {
  const stage = $("[data-ba-stage]");
  const handle = $("[data-ba-handle]");
  if (!stage || !handle) return;
  const state = { p: 50 };
  const render = () => {
    stage.style.setProperty("--p", state.p.toFixed(2));
    handle.setAttribute("aria-valuenow", String(Math.round(100 - state.p)));
  };
  const fromEvent = (e: PointerEvent) => {
    const r = stage.getBoundingClientRect();
    return gsap.utils.clamp(0, 100, ((e.clientX - r.left) / r.width) * 100);
  };

  let dragging = false;
  const setTo = gsap.quickTo(state, "p", { duration: 0.35, ease: "power3", onUpdate: render });
  stage.addEventListener("pointerdown", (e) => {
    dragging = true;
    gsap.killTweensOf(state);
    handle.classList.add("is-dragging");
    stage.setPointerCapture(e.pointerId);
    setTo(fromEvent(e));
  });
  stage.addEventListener("pointermove", (e) => { if (dragging) setTo(fromEvent(e)); });
  const end = () => { dragging = false; handle.classList.remove("is-dragging"); };
  stage.addEventListener("pointerup", end);
  stage.addEventListener("pointercancel", end);
  handle.addEventListener("keydown", (e) => {
    const step = e.shiftKey ? 15 : 5;
    // RTL: ArrowLeft reveals more "after" (it sits on the right/start side)
    if (e.key === "ArrowLeft") { e.preventDefault(); setTo(Math.max(0, state.p - step)); }
    if (e.key === "ArrowRight") { e.preventDefault(); setTo(Math.min(100, state.p + step)); }
  });

  // A playful sweep when it first scrolls into view, so people know it's draggable
  if (!reduced) {
    ScrollTrigger.create({
      trigger: stage,
      start: "top 70%",
      once: true,
      onEnter: () =>
        gsap.timeline({ onUpdate: render })
          .to(state, { p: 86, duration: 0.9, ease: "power2.inOut" })
          .to(state, { p: 14, duration: 1.2, ease: "power2.inOut" })
          .to(state, { p: 42, duration: 1, ease: "elastic.out(1, 0.6)" }),
    });
  }
  render();
}

export function initCompare() {
  initSwitch();
  initBeforeAfter();
}
