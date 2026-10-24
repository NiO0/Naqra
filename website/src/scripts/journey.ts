// "How it works": a hand-drawn path threads through the 4 steps and the brand
// arrow travels along it as you scroll — "the arrow moves; optimization is a journey".
import { gsap, ScrollTrigger, $, $$, reduced, onWidthResize } from "./core";

type Pt = { x: number; y: number };

/** Smooth path through points (Catmull-Rom → cubic Bézier) with a slight hand wobble. */
function pathThrough(pts: Pt[]) {
  if (pts.length < 2) return "";
  let d = `M${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const t = 0.5;
    const wob = (i % 2 ? 1 : -1) * 6;
    const c1 = { x: p1.x + ((p2.x - p0.x) / 6) * t * 2 + wob, y: p1.y + ((p2.y - p0.y) / 6) * t * 2 };
    const c2 = { x: p2.x - ((p3.x - p1.x) / 6) * t * 2 - wob, y: p2.y - ((p3.y - p1.y) / 6) * t * 2 };
    d += ` C${c1.x.toFixed(1)} ${c1.y.toFixed(1)} ${c2.x.toFixed(1)} ${c2.y.toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

function centerIn(el: HTMLElement, root: HTMLElement): Pt {
  const r = el.getBoundingClientRect();
  const R = root.getBoundingClientRect();
  return { x: r.left - R.left + r.width / 2, y: r.top - R.top + r.height / 2 };
}

export function initJourney() {
  const root = $("[data-journey]");
  if (!root) return;
  const svg = $<SVGSVGElement>("[data-journey-svg]", root)!;
  const track = $<SVGPathElement>("[data-journey-track]", root)!;
  const line = $<SVGPathElement>("[data-journey-line]", root)!;
  const traveler = $("[data-journey-traveler]", root)!;
  const steps = $$("[data-step]", root);
  const nodes = steps.map((s) => $("[data-node]", s)!);

  let tl: gsap.core.Timeline | null = null;
  const triggers: ScrollTrigger[] = [];

  function build() {
    tl?.scrollTrigger?.kill();
    tl?.kill();
    triggers.splice(0).forEach((t) => t.kill());

    const w = root.offsetWidth;
    const h = root.offsetHeight;
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    const pts = nodes.map((n) => centerIn(n, root));
    const first = pts[0];
    const last = pts[pts.length - 1];
    // lead-in from the heading and a little tail after the last step
    const all = [{ x: w / 2, y: Math.max(0, first.y - 140) }, ...pts, { x: (last.x + w / 2) / 2, y: last.y + 90 }];
    if (w < 700) all[0].x = first.x; // mobile: path runs down the side
    const d = pathThrough(all);
    track.setAttribute("d", d);
    line.setAttribute("d", d);

    steps.forEach((s) => s.classList.toggle("is-active", reduced));
    if (reduced) {
      gsap.set(traveler, { display: "none" });
      return;
    }

    gsap.set(line, { drawSVG: "0%" });
    tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: root, start: "top 62%", end: "bottom 62%", scrub: 0.8 },
    });
    tl.to(line, { drawSVG: "100%" }, 0).to(traveler, {
      motionPath: { path: line, align: line, alignOrigin: [0.69, 0.2] }, // tip of the brand arrow
    }, 0);
    tl.progress(1).progress(0); // render the start state now (traveler sits at the path start)

    steps.forEach((s, i) => {
      triggers.push(ScrollTrigger.create({
        trigger: nodes[i],
        start: "center 62%",
        onEnter: () => s.classList.add("is-active"),
        onLeaveBack: () => s.classList.remove("is-active"),
      }));
    });
  }

  // wait for fonts/layout so node positions are final
  document.fonts.ready.then(() => { build(); ScrollTrigger.refresh(); });
  onWidthResize(() => { build(); ScrollTrigger.refresh(); }, 250);
}
