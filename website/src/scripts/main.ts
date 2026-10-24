// Entry point — wires every interaction on the page.
import { initSmoothScroll, ScrollTrigger, $ } from "./core";
import { playIntro, initHero } from "./hero";
import { initDashboard, autoplayDashboard } from "./dashboard";
import { initHeader } from "./header";
import { initMarquees } from "./marquee";
import { initReveals } from "./reveal";
import { initInteractions } from "./interactions";
import { initCompare } from "./compare";
import { initFeatureBoard } from "./features";
import { initJourney } from "./journey";
import { initAccordion } from "./accordion";
import { initFinale } from "./finale";
import { initInView } from "./inview";
import { initTabs } from "./tabs";
import { initBilling } from "./pricing";
import { initFeatureNav } from "./feature-nav";
import { initContactForm } from "./contact-form";

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
initInView();
initTabs();
initBilling();
initFeatureNav();
initContactForm();

const dashboard = initDashboard();
// On the home page the hero's pressed button drives the dashboard; elsewhere it plays when in view
playIntro().then(() => ($("[data-hero]") ? initHero(dashboard) : autoplayDashboard(dashboard)));

document.fonts.ready.then(() => ScrollTrigger.refresh());
addEventListener("load", () => ScrollTrigger.refresh());
