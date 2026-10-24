# Naqra — website (home page)

Arabic, RTL marketing site for **نقرة / Naqra**. Built from the brand book
(`Naqra Branding files.zip`) and the copy in `Naqra _ Website Content.md`.

## Run it

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm run preview    # serve the built site
```

> If your OS has **Reduce motion** turned on, the site respects it and shows a calm,
> static version. To review the full animations anyway, open `/?motion=on`.

## Stack

| Tool | Why |
| --- | --- |
| [Astro](https://astro.build) | Static, zero-JS-by-default pages; components/layouts ready for the other 6 pages |
| [GSAP 3](https://gsap.com) (+ ScrollTrigger, SplitText, DrawSVG, MotionPath) | All scroll and interaction animation |
| [Lenis](https://lenis.darkroom.engineering) | Smooth scrolling, synced to GSAP's ticker |
| Self-hosted fonts | **Zanjabeel** (Arabic display + body), **Cascadia Code** (mono / Latin), Aref Ruqaa (hand-written notes) |

## Where things live

```
src/
  data/home.ts            ← ALL home-page copy and links (edit text here)
  styles/global.css       ← design tokens (colours, type scale, spacing), buttons, fonts
  layouts/Base.astro      ← <html dir="rtl">, meta, header/footer, intro
  components/
    brand/                ← Logo, Arrow (cursor + sparks), Wordmark — vector paths from "Naqra 2.ai"
    sections/             ← one file per home-page section, in page order
    mock/                 ← product UI mock-ups (dashboard, product thumbnails)
    ui/                   ← Button, Icon (hand-drawn set), Scribble, Marquee, SectionHead
  scripts/                ← one module per behaviour (hero, dashboard, tabs, journey…), wired in main.ts
public/
  fonts/                  ← subset WOFF2 files generated from /fonts
  cursor*.svg, favicon.svg
```

## Signature interactions

- **Intro → hero**: the hand-drawn arrow clicks, then flies into the headline; its click stretches the
  kashida of **نقـــرة** (also on hover/click, and the kashida tugs with scroll speed).
- **Live dashboard**: cursor selects products and clicks "حسّن الكل بنقرة"; rows rewrite one by one.
- **Brand cursor + click sparks** everywhere (desktop cursor is the logo arrow).
- Crossed **value marquees** whose speed/direction follow your scrolling.
- Stacking pain-point cards, manual ↔ Naqra **toggle**, draggable **before/after**.
- Auto-playing **feature tabs**, each with its own animated mini-UI.
- **How it works**: a hand-drawn path draws itself and the arrow travels along it through the 4 steps.

## Before launch

- Swap the typographic Salla / Shopify marks in `sections/Platforms.astro` for their official logo SVGs.
- Add the phone / WhatsApp number in `data/home.ts` (`footer.phone`) and real social links.
- Links to `/features`, `/how-it-works`, `/solutions`, `/pricing`, `/about`, `/contact`, `/privacy`,
  `/terms` point at pages that don't exist yet.
- Confirm the Zanjabeel licence covers web embedding.
- Dashboard numbers and before/after examples are illustrative UI, not performance claims.
