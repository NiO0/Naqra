// Entry point — wires every interaction on the page.
import { initSmoothScroll, ScrollTrigger } from "./core";
import { playIntro, initHero } from "./hero";
import { initDashboard } from "./dashboard";
import { initHeader } from "./header";
import { initMarquees } from "./marquee";
import { initReveals } from "./reveal";
import { initInteractions } from "./interactions";
import { initCompare } from "./compare";
import { initFeatureBoard } from "./features";
import { initJourney } from "./journey";
import { initAccordion } from "./accordion";
import { initFinale } from "./finale";

initSmoothScroll();
document.documentElement.classList.add("js-ready");

initHeader();
initMarquees();
initReveals();
initInteractions();
initCompare();
initFeatureBoard();
initJourney();
initAccordion();
initFinale();

const dashboard = initDashboard();
playIntro().then(() => initHero(dashboard));

document.fonts.ready.then(() => ScrollTrigger.refresh());
addEventListener("load", () => ScrollTrigger.refresh());
