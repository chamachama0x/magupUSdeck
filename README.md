# GEO 42 — Presentation Deck Generator

Programmatic PPTX deck generator for the **GEO 42** brand (Generative Engine Optimization platform). Outputs a 19-slide investor/sales presentation built entirely in code using [PptxGenJS](https://gitbrent.github.io/PptxGenJS/), with SVG-to-PNG chart rendering via Sharp.

---

## Quick Start

```bash
npm install
npm run build
```

Output: `output/GEO42_Presentation.pptx` (19 slides)

---

## Project Structure

```
├── src/
│   ├── geo42_v2.js            # Main deck generator (current, 848 lines)
│   ├── dashboard_slides.js    # Dashboard mockup slides 14-16 (364 lines)
│   └── legacy/
│       ├── create_deck_v1.js  # Original v1 deck (deprecated)
│       └── geo42_deck_v1.js   # Intermediate v1.5 (deprecated)
├── brand-book/                # Design system specs (8 markdown files)
│   ├── 01-colors.md           # Full color palette with hex values
│   ├── 02-typography.md       # Font families, sizes, hierarchy
│   ├── 03-components.md       # Glass cards, buttons, badges, KPIs
│   ├── 04-dashboard-elements.md
│   ├── 05-layout-patterns.md  # Grid systems, section templates
│   ├── 06-animations.md
│   ├── 07-brand-voice.md
│   └── 08-icons-assets.md
├── docs/
│   └── geo-magup-plan.md      # GEO strategy knowledge base
├── output/
│   └── GEO42_Presentation.pptx  # Latest built deck
├── package.json
└── .gitignore
```

---

## Architecture

The deck is generated entirely in Node.js — no PowerPoint templates or manual editing:

1. **geo42_v2.js** is the main entry point. Creates a PptxGenJS presentation and builds all 19 slides procedurally
2. **SVG charts** (bar, line, radar, heatmap) are constructed as SVG strings, then rasterized to PNG via sharp for embedding
3. **React Icons** (Font Awesome set) are rendered server-side to SVG → PNG for icon images
4. **dashboard_slides.js** is imported by geo42_v2.js and generates slides 14-16 as full-width SVG dashboard mockups at 3× resolution

### Key Constants (top of geo42_v2.js)

```javascript
const C = {
  bg:    "110B30",  // primary-900 — main page background
  bgd:   "08051A",  // primary-950 — deepest background
  card:  "1A1242",  // primary-800 — glass card surfaces
  pp:    "9775FA",  // accent-500 — core brand accent
  pl:    "B197FC",  // accent-400 — interactive text, links
  t1:    "F5F0FF",  // primary-50 — headlines
  green: "34D399",  // semantic — positive/cited
  amber: "FBBF24",  // semantic — warning/partial
  red:   "F87171",  // semantic — negative/none
};
const FH = "Space Grotesk";   // Headings
const FB = "Inter";            // Body
const FM = "JetBrains Mono";   // Monospace/data
```

---

## Slide Map (19 slides)

| # | Section | Content |
|---|---------|---------|
| 1 | Title | Hero — "The Answer Engine for Enterprise Brands" + CTAs |
| 2 | Problem | SEO vs GEO comparison + market stats |
| 3 | Proof | Before/After case study + 4 KPI cards |
| 4 | Market Data | AI traffic growth bar chart + zero-click line chart |
| 5 | Challenge | 6 Walls Enterprises Face (3×2 card grid) |
| 6 | Product | Dashboard preview — prompt table + brand intelligence + heatmap |
| 7 | Model | Visibility Flywheel diagram |
| 8 | Services | 7-pillar service grid (3+4 layout) |
| 9 | Platforms | AI engine coverage — donut chart + 8 platform cards |
| 10 | Strategy | Three-Phase GEO Framework |
| 11 | Industries | 4 vertical cards |
| 12 | ROI | 12-month projection line chart + 4 KPI cards |
| 13 | Competitive | Radar chart (GEO 42 vs Traditional) |
| 14 | Dashboard 1 | Prompt Research table + Brand Intelligence panel |
| 15 | Dashboard 2 | Real-Time Monitoring + Project Progress |
| 16 | Dashboard 3 | Full-width project overview |
| 17 | Audit Framework | SEO → AEO → GEO three-layer audit methodology |
| 18 | Audit Example | Keeta.com sample audit |
| 19 | CTA | Closing slide |

---

## Brand Book Compliance

All design decisions follow the brand book specs in /brand-book/. Key rules:

- **Backgrounds**: primary-900 (#110B30) or primary-950 (#08051A) — never pure black
- **Accent**: accent-500 (#9775FA) for filled elements, accent-400 (#B197FC) for text/links
- **Status badges**: Filled pill shapes with semi-transparent tinted backgrounds
- **Buttons**: Full pill radius (rectRadius: 0.24), ghost buttons use primary-600 borders
- **Glass cards**: primary-800 fill with subtle primary-600 border
- **Dashboard slides**: Window control dots, accent dot indicators, 3× SVG resolution

---

## Dependencies

| Package | Purpose |
|---------|---------|
| pptxgenjs | PPTX file generation |
| sharp | SVG → PNG rasterization |
| react + react-dom | Server-side icon rendering |
| react-icons | Font Awesome icon set |

Node.js >= 18 required.

---

## Version History

| Version | File | Changes |
|---------|------|---------|
| v1.0 | create_deck_v1.js | Initial 15-slide deck |
| v1.5 | geo42_deck_v1.js | SVG charts, 18 slides |
| v2.0 | geo42_v2.js | Brand book compliance, dashboard module, 19 slides |
| v2.1 | Current | Perfection pass: badge fills, flywheel, radar labels, pill buttons |

---

## Notes for Developers

1. **PptxGenJS**: Doesn't support "transparent" fill — use the actual background color instead
2. **Fonts**: Space Grotesk, Inter, JetBrains Mono must be installed on the machine opening the PPTX
3. **SVG rendering**: Sharp uses librsvg which may render fonts differently than browsers
4. **File size**: ~1.3MB due to embedded PNG chart images (3× dashboard resolution)
