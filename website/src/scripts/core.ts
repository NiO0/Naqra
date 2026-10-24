// Shared animation core: GSAP + plugins, Lenis smooth scrolling, small helpers.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, MotionPathPlugin);
gsap.defaults({ ease: "power3.out", duration: 0.9 });

export { gsap, ScrollTrigger, SplitText };

export const reduced = document.documentElement.classList.contains("reduced");
export const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

export const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  root.querySelector<T>(sel);
export const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));

export let lenis: Lenis | null = null;

export function initSmoothScroll() {
  if (reduced) return null;
  lenis = new Lenis({
    lerp: 0.085,
    wheelMultiplier: 1,
    touchMultiplier: 1.4,
    anchors: { offset: -90, duration: 1.4 },
    autoRaf: false,
    respectReducedMotion: false, // we decide via the .reduced class (see Base.astro)
  });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

/** Scroll velocity (px/frame-ish) and direction, from Lenis or a native fallback. */
export function scrollState() {
  return { velocity: lenis?.velocity ?? 0, direction: lenis?.direction ?? 1 };
}

/** Debounced resize that only fires on width changes (avoids mobile URL-bar jitter). */
export function onWidthResize(fn: () => void, wait = 200) {
  let w = innerWidth;
  let t: number | undefined;
  addEventListener("resize", () => {
    if (innerWidth === w) return;
    w = innerWidth;
    clearTimeout(t);
    t = window.setTimeout(fn, wait);
  });
}

/** Run `fn` while `el` is on screen; returns a getter for visibility. */
export function whileVisible(el: Element, onChange: (visible: boolean) => void, rootMargin = "0px") {
  const io = new IntersectionObserver(([e]) => onChange(e.isIntersecting), { rootMargin });
  io.observe(el);
  return io;
}

/** Burst the three "click" sparks of an Arrow component. */
export function burstSparks(svg: Element | null, opts: { delay?: number } = {}) {
  if (!svg) return gsap.timeline();
  const sparks = $$<SVGGElement>(".spark", svg);
  return gsap
    .timeline({ delay: opts.delay ?? 0 })
    .fromTo(sparks, { scale: 0, opacity: 1 }, {
      scale: 1, duration: 0.45, ease: "back.out(3)", stagger: 0.05,
      transformOrigin: (_i: number, el: SVGGElement) => el.dataset.origin || "50% 50%",
    });
}
