// Intro + hero choreography.
// A hand presses the coral button inside the headline: each press stretches the kashida in
// "بالكامل" and runs "optimize all" on the dashboard beside it.
import { gsap, $, $$, reduced, finePointer, lenis, burstSparks, whileVisible, onWidthResize } from "./core";
import type { DashboardDemo } from "./dashboard";

const HAND_REST = -7; // fingertip hovers just above the button (local units of PressButton.astro)
const CYCLE = 9; // seconds between automatic presses while the hero is on screen

/** First visit: arrow draws in on coral, clicks, then flies into the header logo's arrow. */
export function playIntro(): Promise<boolean> {
  const intro = $("[data-intro]");
  const html = document.documentElement;
  if (!intro || reduced || html.classList.contains("intro-seen")) {
    intro?.remove();
    return Promise.resolve(false);
  }
  try { sessionStorage.setItem("naqra-intro", "1"); } catch {}

  return new Promise((resolve) => {
    lenis?.stop();
    const mark = $("[data-intro-mark]", intro)!;
    const svg = $("svg", mark)!;
    const tag = $(".intro-tag", intro)!;
    const targets = $$(".hdr-logo .la");

    const tl = gsap.timeline();
    tl.fromTo(svg, { scale: 0.35, opacity: 0, rotate: -35, x: -80, y: 80 },
      { scale: 1, opacity: 1, rotate: 0, x: 0, y: 0, duration: 0.85, ease: "back.out(1.5)" })
      .fromTo(tag, { opacity: 0, y: 12 }, { opacity: 0.85, y: 0, duration: 0.6 }, "<0.2")
      .to(svg, { scale: 0.84, duration: 0.11, ease: "power2.in", transformOrigin: "76% 22%" })
      .add(burstSparks(svg))
      .to(svg, { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" }, "<")
      .add(() => {
        // fly the mark onto the logo's arrow (body + sparks) and turn it coral on the way
        const a = mark.getBoundingClientRect();
        const rects = targets.map((t) => t.getBoundingClientRect());
        const b = rects.length
          ? {
              left: Math.min(...rects.map((r) => r.left)), top: Math.min(...rects.map((r) => r.top)),
              right: Math.max(...rects.map((r) => r.right)), bottom: Math.max(...rects.map((r) => r.bottom)),
            }
          : { left: a.left, top: -a.height, right: a.right, bottom: 0 };
        const bw = b.right - b.left;
        const dx = b.left + bw / 2 - (a.left + a.width / 2);
        const dy = (b.top + b.bottom) / 2 - (a.top + a.height / 2);
        gsap.timeline({
          onComplete: () => {
            intro.remove();
            lenis?.start();
          },
        })
          .to(tag, { opacity: 0, duration: 0.3 })
          .to(mark, { x: dx, y: dy, scale: bw / a.width, duration: 1.05, ease: "expo.inOut" }, 0)
          .to(mark, { color: getComputedStyle(document.documentElement).getPropertyValue("--coral").trim(), duration: 0.5 }, 0.3)
          .to(intro, { backgroundColor: "rgba(242,110,83,0)", duration: 0.55, ease: "none" }, 0.4)
          .call(() => resolve(true), [], 0.45)
          .to(mark, { opacity: 0, duration: 0.2 }, 0.95);
      }, "+=0.15");
  });
}

export function initHero(dash: DashboardDemo | null) {
  const hero = $("[data-hero]");
  if (!hero) return;
  const rows = $$("[data-hero-row]", hero);
  const rules = $$("[data-hero-rule]", hero);
  const items = $$("[data-hero-item]", hero);
  const visual = $("[data-hero-visual]", hero)!;
  const word = $("[data-hero-stretch]", hero)!;
  const wordRow = word.closest<HTMLElement>("[data-hero-row]")!;
  const kashida = $("[data-kashida]", word)!;
  const wordSparks = $("[data-stretch-sparks]", word);
  const pressEl = $("[data-hero-press]", hero)!;
  const art = $<SVGSVGElement>(".press", pressEl)!;
  const hand = $<SVGGElement>(".hp-hand", art)!;
  const capTop = $<SVGGElement>(".hp-top", art)!;
  const capSide = $<SVGPathElement>(".hp-side", art)!;

  // ---- kashida rests at the length that justifies "بالكامل" to the longest line ----
  let rest = 1.6;
  const justify = () => {
    const fs = parseFloat(getComputedStyle(wordRow).fontSize);
    const longest = Math.max(...rows.filter((r) => r !== wordRow).map((r) => r.offsetWidth));
    rest = gsap.utils.clamp(0.5, 3.4, (longest - (wordRow.offsetWidth - kashida.offsetWidth)) / fs);
  };
  justify();
  const rejustify = () => {
    justify();
    gsap.set(kashida, { "--k": rest });
  };

  if (reduced) {
    rejustify();
    document.fonts.ready.then(rejustify);
    onWidthResize(rejustify);
    return;
  }

  // ---- the stretch: kashida pulls long, sparks burst, then it springs back ----
  let stretchTl: gsap.core.Timeline | null = null;
  function stretch(strength = 1) {
    stretchTl?.kill();
    stretchTl = gsap.timeline()
      .to(kashida, { "--k": rest + 1.1 * strength, duration: 0.2, ease: "power2.out" })
      .add(burstSparks(wordSparks), 0)
      .to(kashida, { "--k": rest, duration: 1.5, ease: "elastic.out(1, 0.28)" });
  }

  // ---- the press: wind up, push the button down, everything else follows ----
  let pressTl: gsap.core.Timeline | null = null;
  let lastPress = -Infinity;
  function press(strength = 1) {
    if (pressTl?.isActive()) return;
    lastPress = performance.now();
    pressTl = gsap.timeline()
      .to(hand, { y: HAND_REST - 6, duration: 0.16, ease: "power2.out", overwrite: "auto" })
      .to(hand, { y: 3, duration: 0.11, ease: "power3.in" })
      .to(capTop, { y: 4, duration: 0.11, ease: "power3.in" }, "<")
      .to(capSide, { scaleY: 0.6, transformOrigin: "50% 100%", duration: 0.11, ease: "power3.in" }, "<")
      .addLabel("hit")
      .add(burstSparks(art), "hit")
      .call(() => { stretch(strength); dash?.play(); }, [], "hit")
      .to(hand, { y: HAND_REST, duration: 0.9, ease: "elastic.out(1, 0.45)" }, "hit+=0.08")
      .to(capTop, { y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" }, "hit+=0.08")
      .to(capSide, { scaleY: 1, duration: 0.7, ease: "elastic.out(1, 0.4)" }, "hit+=0.08");
  }

  // ---- entrance ----
  gsap.set(kashida, { "--k": 0 });
  gsap.set(hand, { y: HAND_REST });
  let ready = false;
  const tl = gsap.timeline({ defaults: { ease: "power4.out" }, onComplete: () => { ready = true; } });
  tl.fromTo(rules, { scaleX: 0, opacity: 1 }, { scaleX: 1, duration: 1.4, stagger: 0.12, ease: "expo.inOut" }, 0)
    .fromTo(rows, { yPercent: 45, opacity: 0, rotate: 1.5 }, { yPercent: 0, opacity: 1, rotate: 0, duration: 1.1, stagger: 0.1 }, 0.15)
    .to(kashida, { "--k": () => rest, duration: 1.3, ease: "expo.out" }, 0.4)
    .fromTo(hand, { y: -70 }, { y: HAND_REST, duration: 1, ease: "power3.out" }, 0.55)
    .fromTo(items, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.1 }, 0.7)
    .fromTo(visual, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.4, ease: "expo.out" }, 0.55)
    .add(() => press(1.1), 1.7);

  document.fonts.ready.then(() => {
    justify();
    if (tl.progress() === 1) gsap.set(kashida, { "--k": rest });
  });
  onWidthResize(rejustify);

  // ---- interactions ----
  pressEl.addEventListener("click", () => press(1.3));
  $("[data-dash-btn]")?.addEventListener("click", () => press(1.3));
  word.addEventListener("click", () => stretch(1.35));
  if (finePointer) {
    word.addEventListener("pointerenter", () => stretch(0.6));
    // the hand lifts, ready to press
    pressEl.addEventListener("pointerenter", () => { if (!pressTl?.isActive()) gsap.to(hand, { y: HAND_REST - 5, duration: 0.35, ease: "power2.out", overwrite: "auto" }); });
    pressEl.addEventListener("pointerleave", () => { if (!pressTl?.isActive()) gsap.to(hand, { y: HAND_REST, duration: 0.6, ease: "elastic.out(1, 0.5)", overwrite: "auto" }); });
  }

  // replay the demo every few seconds while the hero is on screen (and right after it returns)
  let visible = true;
  whileVisible(hero, (v) => (visible = v));
  setInterval(() => {
    if (ready && visible && !document.hidden && performance.now() - lastPress > CYCLE * 1000) press(0.8);
  }, 400);

  // ---- scroll velocity tugs on the kashida like a rubber band ----
  let vel = 0;
  gsap.ticker.add(() => {
    if (!visible) return;
    const target = Math.min(Math.abs(lenis?.velocity ?? 0) * 0.03, 0.9);
    vel += (target - vel) * 0.12;
    kashida.style.setProperty("--k-vel", vel.toFixed(3));
  });

  // floating annotation cards: scroll parallax + a little mouse drift
  const floats = $$("[data-float]", hero);
  floats.forEach((el) => {
    const f = parseFloat(el.dataset.float || "1");
    gsap.to(el, { y: -50 * f, ease: "none", scrollTrigger: { trigger: visual, start: "top bottom", end: "bottom top", scrub: true } });
  });
  if (finePointer && floats.length) {
    const movers = floats.map((el) => gsap.quickTo(el, "x", { duration: 0.9, ease: "power3" }));
    hero.addEventListener("pointermove", (e) => {
      const nx = e.clientX / innerWidth - 0.5;
      movers.forEach((m, i) => m(nx * 24 * parseFloat(floats[i].dataset.float || "1")));
    });
  }
}
