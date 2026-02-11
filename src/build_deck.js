const PptxGenJS = require("pptxgenjs");
const fs = require("fs");
const path = require("path");

// ── Brand Tokens (from brand-book/01-colors.md) ──
const C = {
  bg:    "110B30", // primary-900
  bgd:   "08051A", // primary-950
  card:  "1A1242", // primary-800
  brd:   "3D2B7A", // primary-600
  pp:    "9775FA", // accent-500
  pl:    "B197FC", // accent-400
  t1:    "F5F0FF", // primary-50  — headlines
  t2:    "EDE5FF", // primary-100 — body high
  t3:    "B8A0E8", // primary-300 — body std
  t4:    "8B72B8", // primary-400 — muted
  green: "34D399",
  amber: "FBBF24",
  red:   "F87171",
  white: "FFFFFF",
};
const FH = "Calibri"; // heading (safe fallback)
const FB = "Calibri"; // body
const FM = "Courier New"; // mono

const pptx = new PptxGenJS();
pptx.defineLayout({ name: "WIDE", width: 13.33, height: 7.5 });
pptx.layout = "WIDE";

// ── Helpers ──
function bg(slide, color) {
  slide.background = { fill: color || C.bg };
}
function addTitle(slide, text, opts = {}) {
  slide.addText(text, {
    x: opts.x || 0.7, y: opts.y || 0.4, w: opts.w || 11.9, h: 0.7,
    fontSize: opts.fs || 32, fontFace: FH, color: C.t1, bold: true,
    ...opts,
  });
}
function addSubtitle(slide, text, opts = {}) {
  slide.addText(text, {
    x: opts.x || 0.7, y: opts.y || 1.15, w: opts.w || 11.9, h: 0.5,
    fontSize: opts.fs || 16, fontFace: FB, color: C.pl, bold: true,
    ...opts,
  });
}
function addBody(slide, text, opts = {}) {
  slide.addText(text, {
    x: opts.x || 0.7, y: opts.y || 1.8, w: opts.w || 11.9, h: opts.h || 4.5,
    fontSize: opts.fs || 13, fontFace: FB, color: C.t3, valign: "top",
    lineSpacingMultiple: 1.25,
    ...opts,
  });
}
function addAccentLine(slide, y) {
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0.7, y: y || 1.05, w: 1.6, h: 0.04, fill: { color: C.pp },
  });
}
function glassCard(slide, x, y, w, h) {
  slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, rectRadius: 0.15,
    fill: { color: C.card }, line: { color: C.brd, width: 1 },
  });
}
function addTable(slide, rows, opts = {}) {
  const styledRows = rows.map((row, ri) =>
    row.map((cell) => ({
      text: String(cell),
      options: {
        fontSize: 11, fontFace: FB,
        color: ri === 0 ? C.t1 : C.t3,
        bold: ri === 0,
        fill: { color: ri === 0 ? C.brd : C.card },
        border: { type: "solid", color: C.brd, pt: 0.5 },
        valign: "middle",
      },
    }))
  );
  slide.addTable(styledRows, {
    x: opts.x || 0.7, y: opts.y || 2.6, w: opts.w || 11.9,
    colW: opts.colW,
    rowH: opts.rowH || 0.4,
    ...opts,
  });
}
function slideNum(slide, n) {
  slide.addText(String(n), {
    x: 12.4, y: 7.0, w: 0.6, h: 0.3,
    fontSize: 9, fontFace: FB, color: C.t4, align: "right",
  });
}

// ════════════════════════════════════════════════════════════════
// SLIDE 1 — Title
// ════════════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  bg(s, C.bgd);
  // Glow circle (decorative)
  s.addShape(pptx.shapes.OVAL, {
    x: 8.5, y: 1.0, w: 4.5, h: 4.5,
    fill: { color: C.pp, transparency: 85 },
  });
  s.addText("GEO 42", {
    x: 0.7, y: 1.2, w: 8, h: 1.2,
    fontSize: 54, fontFace: FH, color: C.t1, bold: true,
  });
  addAccentLine(s, 2.5);
  s.addText("The Answer Engine for Enterprise Brands", {
    x: 0.7, y: 2.7, w: 8, h: 0.6,
    fontSize: 22, fontFace: FH, color: C.pl, bold: true,
  });
  s.addText(
    "We make your brand the definitive answer across every AI engine — ChatGPT, Gemini, Perplexity, DeepSeek, Claude, and beyond.\n\nGEO + SEO content marketing to efficiently acquire global customers.",
    { x: 0.7, y: 3.5, w: 7.5, h: 1.8, fontSize: 14, fontFace: FB, color: C.t3, lineSpacingMultiple: 1.3 }
  );
  s.addText("TRUSTED BY 1,000+ ENTERPRISE BRANDS WORLDWIDE", {
    x: 0.7, y: 5.8, w: 8, h: 0.4,
    fontSize: 11, fontFace: FB, color: C.t4, bold: true,
  });
  s.addText("hello@geo42.ai  |  geo42.ai", {
    x: 0.7, y: 6.5, w: 5, h: 0.3, fontSize: 11, fontFace: FB, color: C.pp,
  });
  slideNum(s, 1);
}

// ════════════════════════════════════════════════════════════════
// SLIDE 2 — The Shift
// ════════════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  bg(s);
  addTitle(s, "SEO is Linear. GEO is Binary.");
  addAccentLine(s);
  addSubtitle(s, "Search demand hasn't changed — but the entry points are shifting fast.");

  // Left column — SEO
  glassCard(s, 0.7, 1.9, 5.7, 3.2);
  s.addText("Traditional Google SEO", {
    x: 1.0, y: 2.0, w: 5, h: 0.4, fontSize: 15, fontFace: FH, color: C.pp, bold: true,
  });
  s.addText(
    "Traffic drops gradually with ranking, but the long tail still survives. Even pages scoring 30-60 points capture some traffic. Sites climb from position 10 to 1, and multiple results coexist on page one.\n\nLinear distribution — progressive gains.",
    { x: 1.0, y: 2.5, w: 5.1, h: 2.3, fontSize: 12, fontFace: FB, color: C.t3, lineSpacingMultiple: 1.2 }
  );

  // Right column — GEO
  glassCard(s, 6.9, 1.9, 5.7, 3.2);
  s.addText("Generative Engine (GEO)", {
    x: 7.2, y: 2.0, w: 5, h: 0.4, fontSize: 15, fontFace: FH, color: C.amber, bold: true,
  });
  s.addText(
    "AI generates a single answer window and cites only 5-10 high-authority sources. You're either the cited answer or you're invisible. There is no page two. There is no long tail.\n\nCliff-edge — binary outcome.",
    { x: 7.2, y: 2.5, w: 5.1, h: 2.3, fontSize: 12, fontFace: FB, color: C.t3, lineSpacingMultiple: 1.2 }
  );

  // Bottom stat cards
  const stats = [
    ["34×", "Gap: 1,631B vs 55B visits/mo"],
    ["1,000×", "AI chatbot growth rate"],
    ["60%", "Zero-click searches"],
  ];
  stats.forEach(([val, label], i) => {
    const bx = 0.7 + i * 4.2;
    glassCard(s, bx, 5.4, 3.8, 1.2);
    s.addText(val, { x: bx + 0.2, y: 5.45, w: 1.6, h: 0.6, fontSize: 28, fontFace: FH, color: C.pp, bold: true });
    s.addText(label, { x: bx + 1.8, y: 5.5, w: 1.8, h: 0.6, fontSize: 11, fontFace: FB, color: C.t3 });
  });
  slideNum(s, 2);
}

// ════════════════════════════════════════════════════════════════
// SLIDE 3 — Proven Results
// ════════════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  bg(s);
  addTitle(s, "From Invisible to #1 — Robot Vacuum Case Study");
  addAccentLine(s);
  addBody(s,
    "A leading robot vacuum brand was completely absent from AI recommendations. When users asked Gemini \"Which robot vacuum has the best smart navigation?\" — competitors owned every answer. Brand visibility: 0%.\n\nAfter GEO optimization targeting high-value queries around smart navigation and suction power, the brand became the top recommendation across Gemini, ChatGPT, Perplexity, and DeepSeek.",
    { h: 2.0 }
  );
  addTable(s, [
    ["Metric", "Before", "After"],
    ["Brand Mentions", "Baseline", "+450%"],
    ["Share of Voice", "Invisible", "#1 Position"],
    ["Sentiment Score", "—", "Positive (Trust)"],
    ["Direct Traffic from AI", "Baseline", "+30%"],
    ["AI Platforms Covered", "0", "4 (Gemini, ChatGPT, Perplexity, DeepSeek)"],
  ], { y: 4.0, colW: [3, 3, 5.9] });
  slideNum(s, 3);
}

// ════════════════════════════════════════════════════════════════
// SLIDE 4 — Market Data
// ════════════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  bg(s);
  addTitle(s, "AI Search Is Reshaping Discovery");
  addAccentLine(s);

  s.addText(
    "All search engines combined: 1,631.5 billion visits/mo (Google alone at 60.19%).\nAll AI chatbots combined: 55.2 billion visits/mo — growing at 1,000×.",
    { x: 0.7, y: 1.5, w: 11.9, h: 0.8, fontSize: 13, fontFace: FB, color: C.t2 }
  );

  addTable(s, [
    ["Platform", "Monthly Visits"],
    ["ChatGPT", "164.5M"],
    ["DeepSeek", "218.5M"],
    ["Perplexity", "920.4M"],
  ], { y: 2.6, w: 5.5, colW: [2.75, 2.75] });

  // Right side — market size comparison
  glassCard(s, 6.9, 2.5, 5.7, 2.5);
  s.addText("Traditional SEO+SEM", {
    x: 7.2, y: 2.6, w: 5, h: 0.35, fontSize: 13, fontFace: FH, color: C.t4, bold: true,
  });
  s.addText("~$500 Billion  (growth slowing)", {
    x: 7.2, y: 2.95, w: 5, h: 0.4, fontSize: 16, fontFace: FH, color: C.amber, bold: true,
  });
  s.addText("AI-Driven GEO Market", {
    x: 7.2, y: 3.6, w: 5, h: 0.35, fontSize: 13, fontFace: FH, color: C.t4, bold: true,
  });
  s.addText("$10+ Trillion  (exponential)", {
    x: 7.2, y: 3.95, w: 5, h: 0.4, fontSize: 16, fontFace: FH, color: C.green, bold: true,
  });

  addBody(s,
    "Companies that prioritize high-quality content now capture early traffic dividends and lock in long-term brand equity.",
    { y: 5.5, h: 0.8, fs: 13, color: C.t3 }
  );
  slideNum(s, 4);
}

// ════════════════════════════════════════════════════════════════
// SLIDE 5 — The Challenge (6 Walls)
// ════════════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  bg(s);
  addTitle(s, "6 Walls Enterprises Hit Going Global");
  addAccentLine(s);

  const walls = [
    ["Discovery Wall", "Website built well but no traffic. Doesn't fit Google's rules. AI crawlers skip you entirely."],
    ["Credibility Wall", "Content reads like marketing copy. Traces of machine translation. Lacks the professionalism that earns citations."],
    ["Brand Wall", "Insufficient overseas awareness. No understanding of local culture. Over-reliance on a single channel."],
    ["Talent Wall", "Team hasn't done overseas content before. No foreign-language writing capability. Hires are expensive."],
    ["Operations Wall", "No content strategy. No operation planning. No professional tooling or playbooks to follow."],
    ["ROI Wall", "Outsourcing is expensive with poor results. In-house production is slow. Trial-and-error drags on."],
  ];
  walls.forEach(([title, desc], i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const cx = 0.7 + col * 4.15;
    const cy = 1.6 + row * 2.8;
    glassCard(s, cx, cy, 3.85, 2.4);
    s.addText(title, {
      x: cx + 0.2, y: cy + 0.15, w: 3.4, h: 0.4,
      fontSize: 14, fontFace: FH, color: C.pp, bold: true,
    });
    s.addText(desc, {
      x: cx + 0.2, y: cy + 0.6, w: 3.4, h: 1.6,
      fontSize: 11, fontFace: FB, color: C.t3, valign: "top", lineSpacingMultiple: 1.2,
    });
  });
  slideNum(s, 5);
}

// ════════════════════════════════════════════════════════════════
// SLIDE 6 — Product Preview
// ════════════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  bg(s);
  addTitle(s, "GEO Intelligent Agent — See It in Action");
  addAccentLine(s);
  addSubtitle(s, "Prompt tracking across ChatGPT, Google AI, Perplexity, DeepSeek — real-time citation status.");

  addTable(s, [
    ["ID", "Language", "Question", "ChatGPT", "Google AI", "Perplexity"],
    ["Q001", "English", "What is the best AI marketing platform?", "Cited", "—", "—"],
    ["Q002", "English", "How to improve website SEO with AI tools?", "—", "—", "—"],
    ["Q004", "English", "Which AI tool is best for GEO optimization?", "—", "—", "—"],
    ["Q001", "German", "Was ist die beste KI-Marketingplattform?", "—", "—", "—"],
  ], { y: 2.0, colW: [0.7, 1.1, 4.5, 1.5, 1.5, 1.5] });

  s.addText("Brand Intelligence — AI Platform Visibility", {
    x: 0.7, y: 4.4, w: 6, h: 0.4, fontSize: 14, fontFace: FH, color: C.pl, bold: true,
  });
  addTable(s, [
    ["Platform", "Visibility", "Recommendation Rate"],
    ["Doubao", "26.25%", "16.25%"],
    ["DeepSeek", "31.25%", "21.25%"],
    ["Tongyi Qianwen", "30.00%", "18.75%"],
    ["Kimi", "27.50%", "17.50%"],
  ], { y: 4.9, w: 8, colW: [3, 2.5, 2.5] });
  slideNum(s, 6);
}

// ════════════════════════════════════════════════════════════════
// SLIDE 7 — Visibility Flywheel
// ════════════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  bg(s);
  addTitle(s, "The Visibility Flywheel");
  addAccentLine(s);

  s.addText(
    "Old path:  Advertising → User Sees → Understands → Maybe Buys\nNew path:  User Asks AI → Gets Answer → Verifies → Decides to Buy",
    { x: 0.7, y: 1.5, w: 11.9, h: 0.8, fontSize: 13, fontFace: FM, color: C.t2, lineSpacingMultiple: 1.4 }
  );

  const positions = [
    ["Answer Position", "Your brand must appear in AI answers. Build it with comparison pages, buying guides, FAQs, spec sheets, case studies. Citable, judgeable, actionable information."],
    ["Mindshare Position", "Solve user trust issues. Three endorsement types: authoritative (media reports), peer (industry experts, KOLs), and real user proof (community word-of-mouth)."],
    ["Transaction Position", "Convert trust into orders. Landing page content consistent with AI statements. Evidence visible. Purchase path shortest possible."],
  ];
  positions.forEach(([title, desc], i) => {
    const cx = 0.7 + i * 4.15;
    glassCard(s, cx, 2.6, 3.85, 3.5);
    s.addText(title, {
      x: cx + 0.2, y: 2.7, w: 3.4, h: 0.45, fontSize: 15, fontFace: FH, color: C.pp, bold: true,
    });
    s.addText(desc, {
      x: cx + 0.2, y: 3.2, w: 3.4, h: 2.6, fontSize: 11.5, fontFace: FB, color: C.t3, valign: "top", lineSpacingMultiple: 1.25,
    });
  });

  s.addText("Become the Answer  →  Win Trust  →  Facilitate Transaction  →  Reinforce  →  (repeat)", {
    x: 0.7, y: 6.4, w: 11.9, h: 0.4, fontSize: 13, fontFace: FH, color: C.pl, bold: true, align: "center",
  });
  slideNum(s, 7);
}

// ════════════════════════════════════════════════════════════════
// SLIDE 8 — Services
// ════════════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  bg(s);
  addTitle(s, "Not Just Traffic — Conversion.");
  addAccentLine(s);
  addSubtitle(s, "Five steps from analysis to revenue:");

  const steps = [
    ["1. Market Analysis", "Analyze overseas competitors' traffic sources and keyword rankings."],
    ["2. Keyword GEO/SEO Strategy", "Choose precise intent keywords easy to rank for."],
    ["3. High-Quality Content", "Bypass AI detection, meet GEO/SEO standards, drive clicks."],
    ["4. Convert Traffic to Leads", "Blog internal links and landing pages → lead generation."],
    ["5. Sales Conversion", "Leads assigned to sales for timely follow-up."],
  ];
  steps.forEach(([title, desc], i) => {
    const cx = 0.7 + (i % 3) * 4.15;
    const cy = 1.9 + Math.floor(i / 3) * 2.1;
    glassCard(s, cx, cy, 3.85, 1.8);
    s.addText(title, { x: cx + 0.2, y: cy + 0.1, w: 3.4, h: 0.4, fontSize: 13, fontFace: FH, color: C.pp, bold: true });
    s.addText(desc, { x: cx + 0.2, y: cy + 0.55, w: 3.4, h: 1.1, fontSize: 11, fontFace: FB, color: C.t3, valign: "top", lineSpacingMultiple: 1.2 });
  });

  // 7 Pillars label
  s.addText("Full-Stack AI Visibility — 7 Pillars", {
    x: 0.7, y: 6.3, w: 11.9, h: 0.4, fontSize: 12, fontFace: FH, color: C.t4, align: "center",
  });
  s.addText("AI Visibility Tracking · Prompt Intelligence · Citation Analytics · Crawler Analytics · Traffic Attribution · AI Shopping · GEO+SEO Content", {
    x: 0.7, y: 6.65, w: 11.9, h: 0.35, fontSize: 10, fontFace: FB, color: C.t4, align: "center",
  });
  slideNum(s, 8);
}

// ════════════════════════════════════════════════════════════════
// SLIDE 9 — Platform Coverage
// ════════════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  bg(s);
  addTitle(s, "Every AI Engine. One Dashboard.");
  addAccentLine(s);

  // International
  glassCard(s, 0.7, 1.7, 5.7, 4.0);
  s.addText("International Platforms", {
    x: 1.0, y: 1.8, w: 5, h: 0.4, fontSize: 15, fontFace: FH, color: C.pp, bold: true,
  });
  const intl = ["ChatGPT (OpenAI) — 47.7B visits/mo", "Perplexity — 500M+ queries/mo", "Gemini (Google)", "Claude (Anthropic)", "Copilot (Microsoft)", "Grok (xAI)", "Meta AI"];
  s.addText(intl.map(t => ({ text: "•  " + t + "\n", options: { fontSize: 12, fontFace: FB, color: C.t3 } })), {
    x: 1.0, y: 2.3, w: 5, h: 3.2, lineSpacingMultiple: 1.4, valign: "top",
  });

  // Domestic
  glassCard(s, 6.9, 1.7, 5.7, 4.0);
  s.addText("Domestic Platforms", {
    x: 7.2, y: 1.8, w: 5, h: 0.4, fontSize: 15, fontFace: FH, color: C.pp, bold: true,
  });
  const dom = ["DeepSeek", "Doubao (豆包)", "Tencent Yuanbao", "Kimi", "Baidu Wenxiaoyan (百度文小言)", "Tongyi Qianwen (通义千问)"];
  s.addText(dom.map(t => ({ text: "•  " + t + "\n", options: { fontSize: 12, fontFace: FB, color: C.t3 } })), {
    x: 7.2, y: 2.3, w: 5, h: 3.2, lineSpacingMultiple: 1.4, valign: "top",
  });

  s.addText("One-click distribution to 16 global search engines. Content appears in front of readers within hours, not weeks.", {
    x: 0.7, y: 6.1, w: 11.9, h: 0.5, fontSize: 13, fontFace: FB, color: C.pl, align: "center", bold: true,
  });
  slideNum(s, 9);
}

// ════════════════════════════════════════════════════════════════
// SLIDE 10 — Three-Phase Strategy
// ════════════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  bg(s);
  addTitle(s, "Three-Phase GEO Framework");
  addAccentLine(s);
  addSubtitle(s, "From Indexing to Recognition to Recommendation");

  const phases = [
    ["Phase 1: Expand Sources", "Ensure Being Found", "Make your brand a credible info source when AI generates content. Structured data conversion. Build a centralized, authoritative 'Brand Knowledge Base' that AI can pull from."],
    ["Phase 2: Build Reputation", "Ensure Being Recognized", "Optimize content semantics for GEO performance. Invite industry experts to create endorsement content. Write white papers and industry reports."],
    ["Phase 3: Gain Recommendations", "Ensure Being Adopted", "Adapt content for images, data tables, multimodal formats. Monitor AI citation effectiveness. Influence AI to recommend your brand proactively."],
  ];
  phases.forEach(([title, sub, desc], i) => {
    const cx = 0.7 + i * 4.15;
    glassCard(s, cx, 2.0, 3.85, 4.5);
    s.addText(title, { x: cx + 0.2, y: 2.1, w: 3.4, h: 0.45, fontSize: 14, fontFace: FH, color: C.pp, bold: true });
    s.addText(sub, { x: cx + 0.2, y: 2.55, w: 3.4, h: 0.35, fontSize: 12, fontFace: FB, color: C.amber, bold: true });
    s.addText(desc, { x: cx + 0.2, y: 3.0, w: 3.4, h: 3.2, fontSize: 11.5, fontFace: FB, color: C.t3, valign: "top", lineSpacingMultiple: 1.25 });
  });
  slideNum(s, 10);
}

// ════════════════════════════════════════════════════════════════
// SLIDE 11 — Industries
// ════════════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  bg(s);
  addTitle(s, "Deeply Cultivating Niche Industries");
  addAccentLine(s);
  addSubtitle(s, "Helping companies from China, Singapore, the US, and across the globe build AI content marketing systems.");

  const verticals = [
    ["Software & AI", "AI companies\nSaaS platforms\nEnterprise tools", C.pp],
    ["Adv. Manufacturing", "Automotive (Ford, VW)\nIndustrial equipment\nElectronics (Samsung, HP)", C.pl],
    ["E-Commerce", "Shopee\nAmazon marketplace\nConsumer brands (Nike)", "E8736D"],
    ["Professional Services", "Professional firms\nConsulting\nLegal & finance", C.green],
  ];
  verticals.forEach(([title, items, color], i) => {
    const cx = 0.7 + i * 3.15;
    glassCard(s, cx, 2.2, 2.85, 4.0);
    // Colored top bar
    s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: cx, y: 2.2, w: 2.85, h: 0.55, rectRadius: 0.15,
      fill: { color },
    });
    s.addText(title, {
      x: cx + 0.1, y: 2.22, w: 2.65, h: 0.5,
      fontSize: 13, fontFace: FH, color: C.white, bold: true, align: "center",
    });
    s.addText(items, {
      x: cx + 0.2, y: 2.9, w: 2.45, h: 3.0,
      fontSize: 12, fontFace: FB, color: C.t3, valign: "top", lineSpacingMultiple: 1.4,
    });
  });
  slideNum(s, 11);
}

// ════════════════════════════════════════════════════════════════
// SLIDE 12 — ROI Model
// ════════════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  bg(s);
  addTitle(s, "Projected Impact Over 12 Months");
  addAccentLine(s);

  // KPI cards
  const kpis = [
    ["91%", "Visibility Score"],
    ["15,000+", "Brand Mentions/Mo"],
    ["135+", "AI-Sourced Leads/Mo"],
    ["5–8×", "Projected ROI"],
  ];
  kpis.forEach(([val, label], i) => {
    const cx = 0.7 + i * 3.15;
    glassCard(s, cx, 1.6, 2.85, 1.5);
    s.addText(val, { x: cx + 0.2, y: 1.65, w: 2.45, h: 0.8, fontSize: 28, fontFace: FH, color: C.pp, bold: true, align: "center" });
    s.addText(label, { x: cx + 0.2, y: 2.45, w: 2.45, h: 0.4, fontSize: 11, fontFace: FB, color: C.t3, align: "center" });
  });

  // Delivery Team
  s.addText("Delivery Team Structure", {
    x: 0.7, y: 3.5, w: 6, h: 0.4, fontSize: 15, fontFace: FH, color: C.pl, bold: true,
  });
  addTable(s, [
    ["Role", "What They Do"],
    ["Leader", "Overall scheduling, content design, optimization plan customization"],
    ["Data Analysts", "Targeted data analysis, decision basis, weekly and monthly reporting"],
    ["Knowledge Base Architects", "Knowledge base structure, content review, fact base maintenance"],
    ["Content Channel Leads", "Multi-platform content seeding, AI training, ensuring indexing"],
    ["Content Operations", "Customized production per AI platform's unique characteristics"],
  ], { y: 4.0, colW: [3, 8.9] });
  slideNum(s, 12);
}

// ════════════════════════════════════════════════════════════════
// SLIDE 13 — Competitive Advantage
// ════════════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  bg(s);
  addTitle(s, "GEO 42 vs Traditional Agencies");
  addAccentLine(s);

  addTable(s, [
    ["Capability", "GEO 42", "Traditional Agency"],
    ["AI Agents", "7 specialized agents", "Manual labour"],
    ["Platform Coverage", "10+ AI engines", "Google only"],
    ["Monitoring", "Real-time dashboards", "Monthly reports"],
    ["Content Model", "Binary outcome expertise", "Linear SEO thinking"],
    ["Languages", "Multilingual at scale", "English-only or outsourced"],
    ["Distribution", "One-click to 16 engines", "Manual submission"],
    ["Speed", "Hours to publish", "Weeks to go live"],
  ], { y: 1.6, colW: [3, 4.45, 4.45] });

  s.addText("One human makes the decisions. Seven AI agents do the heavy lifting.", {
    x: 0.7, y: 5.8, w: 11.9, h: 0.5, fontSize: 14, fontFace: FH, color: C.pl, bold: true, align: "center",
  });

  // 7 Agents mini-grid
  const agents = [
    "Idea Excavation", "Brand Operation", "Professional Writer", "Editor",
    "Intelligent Engineer", "DevOps Engineer", "Data Analyst",
  ];
  agents.forEach((name, i) => {
    const cx = 0.7 + i * 1.8;
    s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: cx, y: 6.4, w: 1.6, h: 0.55, rectRadius: 0.12,
      fill: { color: C.pp, transparency: 70 }, line: { color: C.pp, width: 1 },
    });
    s.addText(name, { x: cx, y: 6.4, w: 1.6, h: 0.55, fontSize: 8, fontFace: FB, color: C.t1, align: "center", valign: "middle" });
  });
  slideNum(s, 13);
}

// ════════════════════════════════════════════════════════════════
// SLIDE 14 — Dashboard Preview 1
// ════════════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  bg(s, C.bgd);
  addTitle(s, "Intelligence Dashboard");
  addAccentLine(s);

  // Fake dashboard frame
  glassCard(s, 0.7, 1.5, 11.9, 5.3);
  // Sidebar
  s.addShape(pptx.shapes.RECTANGLE, { x: 0.7, y: 1.5, w: 2.5, h: 5.3, fill: { color: "0D0820" } });
  const navItems = ["Dashboard", "Message Center", "My Files", "Download Center", "—", "Domestic GEO", "Overseas GEO", "—", "Website Config", "Prompt Research"];
  navItems.forEach((item, i) => {
    s.addText(item === "—" ? "" : item, {
      x: 0.9, y: 1.7 + i * 0.48, w: 2.1, h: 0.4,
      fontSize: 9, fontFace: FB, color: item === "Dashboard" ? C.pp : C.t4,
      bold: item === "Dashboard",
    });
  });

  s.addText("GEO Operations Overview", {
    x: 3.5, y: 1.7, w: 8, h: 0.5, fontSize: 18, fontFace: FH, color: C.t1, bold: true,
  });
  s.addText("Project status, recent tasks, and tools — all in one view.", {
    x: 3.5, y: 2.2, w: 8, h: 0.4, fontSize: 12, fontFace: FB, color: C.t3,
  });
  slideNum(s, 14);
}

// ════════════════════════════════════════════════════════════════
// SLIDE 15 — Real-Time Monitoring
// ════════════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  bg(s, C.bgd);
  addTitle(s, "Real-Time Monitoring");
  addAccentLine(s);

  const kpis = [
    ["28.75%", "Citation Rate", C.pp],
    ["18.45%", "Visibility", C.amber],
    ["320", "AI Mentions", C.pp],
    ["97", "Coverage Platforms", C.green],
  ];
  kpis.forEach(([val, label, color], i) => {
    const cx = 0.7 + i * 3.15;
    glassCard(s, cx, 1.6, 2.85, 1.6);
    s.addShape(pptx.shapes.RECTANGLE, { x: cx, y: 1.6, w: 0.08, h: 1.6, fill: { color } });
    s.addText(val, { x: cx + 0.3, y: 1.7, w: 2.35, h: 0.8, fontSize: 26, fontFace: FH, color: C.t1, bold: true });
    s.addText(label, { x: cx + 0.3, y: 2.5, w: 2.35, h: 0.4, fontSize: 11, fontFace: FB, color: C.t4 });
  });

  s.addText("Brand visibility rankings · AI platform performance comparison · Grouped bars · Radar · Heatmaps", {
    x: 0.7, y: 3.6, w: 11.9, h: 0.4, fontSize: 12, fontFace: FB, color: C.t3, align: "center",
  });
  s.addText("Tabs:  Overview  ·  Brand Analysis  ·  AI Platform Analysis  ·  Source Analysis", {
    x: 0.7, y: 4.2, w: 11.9, h: 0.4, fontSize: 11, fontFace: FB, color: C.t4, align: "center",
  });
  slideNum(s, 15);
}

// ════════════════════════════════════════════════════════════════
// SLIDE 16 — Project Progress
// ════════════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  bg(s, C.bgd);
  addTitle(s, "Project Progress");
  addAccentLine(s);

  // Overall gauge
  s.addShape(pptx.shapes.OVAL, { x: 1.5, y: 1.8, w: 2.5, h: 2.5, line: { color: C.brd, width: 3 } });
  s.addShape(pptx.shapes.OVAL, { x: 1.6, y: 1.9, w: 2.3, h: 2.3, line: { color: C.pp, width: 6, dashType: "dash" } });
  s.addText("32%", { x: 1.5, y: 2.4, w: 2.5, h: 1.0, fontSize: 36, fontFace: FH, color: C.pp, bold: true, align: "center" });
  s.addText("Overall Progress", { x: 1.5, y: 3.3, w: 2.5, h: 0.4, fontSize: 11, fontFace: FB, color: C.t4, align: "center" });

  addTable(s, [
    ["Phase", "Progress", "Status"],
    ["Solution Planning", "100%", "Completed"],
    ["Data Collection", "100%", "Completed"],
    ["Content Writing", "100%", "In Progress"],
    ["Platform Publishing", "40%", "In Progress"],
    ["Data Collection & Optimization", "0%", "Not Started"],
  ], { x: 4.5, y: 1.8, w: 8.5, colW: [3.5, 1.5, 3.5] });

  s.addText("Real-time tracking with assigned project manager and team.", {
    x: 0.7, y: 5.0, w: 11.9, h: 0.4, fontSize: 12, fontFace: FB, color: C.t3, align: "center",
  });
  slideNum(s, 16);
}

// ════════════════════════════════════════════════════════════════
// SLIDE 17 — Audit Framework + GEO Service Process
// ════════════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  bg(s);
  addTitle(s, "SEO → AEO → GEO: The Full Diagnosis");
  addAccentLine(s);
  addSubtitle(s, "Three-layer audit + 6-step GEO service process.");

  const steps = [
    ["1. Intent Analysis", "Research core questions. Test AI model responses. Identify gaps and biases."],
    ["2. Data Analysis", "Synthesize AI performance data. Audit all brand information assets."],
    ["3. Content Structuring", "Convert to AI-friendly structured data. Build Brand Knowledge Base."],
    ["4. Semantic Optimization", "Refine semantics for GEO. Inject expert endorsements."],
    ["5. Multimodal Adaptation", "Images, data tables, multi-platform formats. Weekly/monthly reports."],
    ["6. Continuous Monitoring", "Track citations, mention rates, user feedback. Iterate."],
  ];
  steps.forEach(([title, desc], i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const cx = 0.7 + col * 4.15;
    const cy = 2.0 + row * 2.6;
    glassCard(s, cx, cy, 3.85, 2.2);
    s.addText(title, { x: cx + 0.2, y: cy + 0.1, w: 3.4, h: 0.4, fontSize: 13, fontFace: FH, color: C.pp, bold: true });
    s.addText(desc, { x: cx + 0.2, y: cy + 0.55, w: 3.4, h: 1.4, fontSize: 11, fontFace: FB, color: C.t3, valign: "top", lineSpacingMultiple: 1.2 });
  });
  slideNum(s, 17);
}

// ════════════════════════════════════════════════════════════════
// SLIDE 18 — Sample Audit
// ════════════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  bg(s);
  addTitle(s, "Keeta.com — SEO & AEO Diagnosis");
  addAccentLine(s);

  const scores = [
    ["SEO", "68/100", "Average", C.amber],
    ["AEO", "31/100", "Weak", "F97316"],
    ["GEO", "18/100", "Critical", C.red],
  ];
  scores.forEach(([layer, score, rating, color], i) => {
    const cx = 0.7 + i * 4.15;
    glassCard(s, cx, 1.8, 3.85, 3.0);
    s.addText(layer, { x: cx + 0.2, y: 1.9, w: 3.4, h: 0.5, fontSize: 18, fontFace: FH, color: C.t1, bold: true, align: "center" });
    s.addText(score, { x: cx + 0.2, y: 2.5, w: 3.4, h: 1.0, fontSize: 42, fontFace: FH, color, bold: true, align: "center" });
    s.addText(rating, { x: cx + 0.2, y: 3.5, w: 3.4, h: 0.5, fontSize: 16, fontFace: FH, color, bold: true, align: "center" });

    // Progress bar
    s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: cx + 0.4, y: 4.1, w: 3.05, h: 0.25, rectRadius: 0.12, fill: { color: C.brd },
    });
    const pct = parseInt(score) / 100;
    s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: cx + 0.4, y: 4.1, w: 3.05 * pct, h: 0.25, rectRadius: 0.12, fill: { color },
    });
  });

  addBody(s,
    "This is what most enterprise brands look like before GEO optimization.\nStrong-ish SEO, almost nonexistent in AI answers.",
    { y: 5.3, h: 1.0, fs: 14 }
  );
  slideNum(s, 18);
}

// ════════════════════════════════════════════════════════════════
// SLIDE 19 — CTA
// ════════════════════════════════════════════════════════════════
{
  const s = pptx.addSlide();
  bg(s, C.bgd);
  // Glow
  s.addShape(pptx.shapes.OVAL, {
    x: 4.0, y: 1.5, w: 5.5, h: 5.5,
    fill: { color: C.pp, transparency: 88 },
  });
  s.addText("Ready to Become\nthe AI Answer?", {
    x: 1, y: 2.0, w: 11.3, h: 2.0,
    fontSize: 44, fontFace: FH, color: C.t1, bold: true, align: "center", lineSpacingMultiple: 1.1,
  });
  addAccentLine(s, 4.2);
  s.addShape(pptx.shapes.RECTANGLE, {
    x: 5.4, y: 4.15, w: 2.5, h: 0.04, fill: { color: C.pp },
  });
  s.addText("Pioneering the era of high-quality AI content marketing.", {
    x: 1, y: 4.5, w: 11.3, h: 0.5,
    fontSize: 16, fontFace: FB, color: C.t3, align: "center",
  });

  // CTA button
  s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 4.5, y: 5.3, w: 4.3, h: 0.7, rectRadius: 0.35,
    fill: { color: C.pp },
  });
  s.addText("See It in Action", {
    x: 4.5, y: 5.3, w: 4.3, h: 0.7,
    fontSize: 16, fontFace: FH, color: C.white, bold: true, align: "center", valign: "middle",
  });

  s.addText("hello@geo42.ai  ·  geo42.ai", {
    x: 1, y: 6.3, w: 11.3, h: 0.4,
    fontSize: 14, fontFace: FB, color: C.pl, align: "center",
  });
  slideNum(s, 19);
}

// ── Write ──
const outPath = path.join(__dirname, "..", "output", "GEO42_Presentation_v8.pptx");
pptx.writeFile({ fileName: outPath }).then(() => {
  console.log("Done →", outPath);
  const stat = fs.statSync(outPath);
  console.log("Size:", (stat.size / 1024).toFixed(0), "KB");
});
