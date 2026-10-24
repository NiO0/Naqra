// Pricing: monthly ↔ annual switch. Every [data-bill] node carries data-monthly / data-annual values.
import { gsap, $, $$, reduced } from "./core";

export function initBilling() {
  const root = $("[data-billing]");
  if (!root) return;
  const btns = $$<HTMLButtonElement>("[data-bill-btn]", root);
  const values = $$("[data-bill]");

  const set = (mode: string) => {
    root.dataset.mode = mode;
    btns.forEach((b) => b.setAttribute("aria-checked", String(b.dataset.billBtn === mode)));
    values.forEach((el) => {
      const next = el.dataset[mode] ?? "";
      if (el.textContent === next) return;
      if (reduced) { el.textContent = next; return; }
      gsap.timeline()
        .to(el, { yPercent: -60, opacity: 0, duration: 0.18, ease: "power2.in" })
        .add(() => { el.textContent = next; })
        .fromTo(el, { yPercent: 60 }, { yPercent: 0, opacity: 1, duration: 0.45, ease: "back.out(2)" });
    });
  };
  btns.forEach((b) => {
    b.addEventListener("click", () => set(b.dataset.billBtn!));
    b.addEventListener("keydown", (e) => {
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) return;
      e.preventDefault();
      const next = root.dataset.mode === "monthly" ? "annual" : "monthly";
      set(next);
      btns.find((x) => x.dataset.billBtn === next)?.focus();
    });
  });
}
