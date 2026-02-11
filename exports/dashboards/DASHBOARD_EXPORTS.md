# MagUp Dashboard & UI Exports

> All dashboard screens, KPIs, and UI patterns extracted from MagUp - ENG V9 presentation.

---

## Dashboard 1: GEO Operations Overview (Slide 13)

**Screen**: MagUp Main Dashboard

### Layout
- Left sidebar: Navigation (Dashboard, Message Center, My Files, Download Center, Project sections)
- Top bar: Project summary metrics
- Main area: GEO status cards + recent tasks + tools

### Navigation Structure
```
Dashboard
├── Dashboard (home)
├── Message Center
├── My Files
├── Download Center
├── Members
│   ├── Domestic GEO
│   │   ├── Project Progress
│   │   └── Monitor Data
│   └── Overseas GEO
│       ├── Project Progress
│       └── Monitor Data
└── Tools
    ├── Website Config
    └── Prompt Research
```

---

## Dashboard 2: Project Progress Tracking (Slide 14)

**Screen**: CN Domestic GEO - Project Progress

### Header Metrics
| Field | Value |
|-------|-------|
| Overall Progress | 32% |
| Project Status | in_progress |
| Project Manager | Zhang Wei |
| Team Members | 4 People |
| Date Range | 2025-12-01 — 2026-03-06 |

### Phase Progress Table
| # | Phase | Date Range | Progress | Status |
|---|-------|-----------|----------|--------|
| 1 | Solution Planning | 2025-12-01 — 2025-12-19 | 100% | Completed |
| 2 | Data Collection | 2025-12-15 — 2025-12-30 | 100% | Completed |
| 3 | Content Writing | 2025-12-01 — 2026-01-06 | 100% | In Progress |
| 4 | Platform Publishing | 2025-12-08 — 2026-01-31 | 40% | Completed |
| 5 | Data Collection & Optimization | 2025-01-06 — | 0% | Not Started |

### UI Elements
- Circular progress gauge (32%) — large, centered
- Phase timeline with connected dots (step indicator)
- Horizontal progress bars per phase
- Status pills: "Completed" (green), "In Progress" (blue), "Not Started" (gray)

---

## Dashboard 3: Real-time Monitoring Data (Slide 15)

**Screen**: Monitor Data — Overview Tab

### Tabs
`概览 (Overview)` | `品牌分析 (Brand Analysis)` | `AI平台分析 (AI Platform Analysis)` | `信源分析 (Source Analysis)`

### Top-line KPI Cards
| KPI | Value | Icon Color |
|-----|-------|-----------|
| Citation Rate (引用率) | 28.75% | Purple |
| Visibility (可见性) | 18.45% | Amber |
| AI Mentions (AI提及数) | 320 | Purple |
| Coverage Platforms (覆盖平台) | 97个 | Green |

### Brand Visibility Ranking (Horizontal Bar Chart)
| Brand/Platform | Visibility % |
|----------------|-------------|
| DeepSeek | 35.63% |
| 通义千问 (Tongyi Qianwen) | 28.75% |
| 智能百科 | 24.38% |
| 大模型翠 | 18.44% |
| 百鸣月桂 | 12.81% |

**Chart Style**: Horizontal bars, purple fill, percentage labels right-aligned

### AI Platform Performance Comparison (Grouped Bar Chart)
- Platforms: Doubao/Tongyi, DeepSeek, Tongyi Qianwen, Kimi
- Metrics compared: Citation vs Visibility (purple vs amber bars)
- Y-axis: 0% — 100%
- Bars at ~25-35% range

---

## Dashboard 4: Brand Multi-dimensional Analysis (Slide 16)

**Screen**: Monitor Data — AI Platform Analysis Tab

### Platform Summary Cards (Top Row)
| Platform | Visibility | Recommendation Rate |
|----------|-----------|-------------------|
| Doubao (豆包) | 26.25% | 16.25% |
| DeepSeek | 31.25% | 21.25% |
| Tongyi Qianwen (通义千问) | 30% | 18.75% |
| Kimi | 27.5% | 17.5% |

### Radar Chart — AI Platform Performance
- 5 axes: Visibility (可见率), Top5 Ratio, Recommendation Ratio (推荐占比), Top1 Ratio, [5th metric]
- 4 overlaid series (one per platform)
- Colors: Purple (Doubao), Dark purple (DeepSeek), Amber (Tongyi), Light purple (Kimi)

### Heatmap — Brand Visibility Across Platforms
| Category | Doubao | DeepSeek | Tongyi Qianwen | Kimi |
|----------|--------|----------|---------------|------|
| 品牌科技 | 11.25% | 19% | 12.6% | 12.9% |
| AI智慧通 | 18.25% | 20% | 18.75% | 18.75% |
| 数据在线 | 22.5% | 26.25% | 25% | 23.75% |
| 智能百科 | 33.75% | 17.5% | 26.05% | 19% |

**Heatmap Style**: Purple gradient intensity (darker = higher percentage)

### Detail Data Table
| Platform | Responses | Visibility | Recommendation | Top1 | Top3 | Top5 |
|----------|-----------|-----------|---------------|------|------|------|
| Doubao (豆包) | 80 | 26.25% | 16.25% | 23.75% | 25% | 26.25% |
| DeepSeek | 80 | 31.25% | 21.25% | 28.75% | 30% | 31.25% |

---

## Dashboard 5: GEO Intelligent Agent — Prompt Research (Slide 17)

**Screen**: Prompt Research Tab

### Tabs
`概览` | `品牌分析` | `AI平台分析` | `问题研究 (Prompt Research)`

### Filters
- Language: 全部 (All)
- Category: 全部
- Region: 全部
- Difficulty: 全部

### Prompt Research Table
| Question ID | Language | Question Text | Category | ChatGPT | Google AI | Perplexity |
|------------|----------|--------------|----------|---------|-----------|------------|
| Q001 | 英语 (English) | What is the best AI marketing platform? | 品牌对比 (Brand comparison) | 被引用 (Cited) | 未被引用 | 未被引用 |
| Q002 | 英语 | How to improve website SEO with AI tools? | 功能策略 (Strategy) | 未被引用 | 未被引用 | 未被引用 |
| Q003 | 英语 | What are the top content optimization platforms? | 品牌对比 | 未被引用 | 未被引用 | 未被引用 |
| Q004 | 英语 | Which AI tool is best for GEO optimization? | 核心功能 (Core) | 未被引用 | 未被引用 | 未被引用 |
| Q005 | 英语 | How does AI impact digital marketing? | 行业趋势 (Industry) | 未被引用 | 未被引用 | 未被引用 |
| Q006 | 英语 | What is the pricing of AI marketing tools? | 价格咨询 (Pricing) | 未被引用 | 未被引用 | 未被引用 |
| Q007 | 英语 | Can you recommend an AI tool for small businesses? | 用户场景 (User needs) | 未被引用 | 未被引用 | 未被引用 |
| Q008 | 英语 | What makes CyberLink different from competitors? | 品牌对比 | 未被引用 | 未被引用 | 未被引用 |
| Q001 | 德语 (German) | Was ist die beste KI-Marketingplattform? | 品牌对比 | 未被引用 | 未被引用 | 未被引用 |
| Q002 | 德语 | Wie kann man SEO mit KI-Tools verbessern? | 功能策略 | 未被引用 | 未被引用 | 未被引用 |

**Total**: 24 queries | Pagination: 1 2 3 > | 10 items/page

### Citation Status Badges
- **被引用 (Cited)**: Purple filled badge
- **未被引用 (Not Cited)**: Gray/light badge
- **未检测 (Not Tested)**: Outline badge

---

## Dashboard UI Patterns Summary

### Color Tokens (Dashboard)
| Element | Color |
|---------|-------|
| Sidebar background | `#1A0A3E` (deep purple) |
| Sidebar active item | `#6B3FA0` highlight |
| Content background | `#FFFFFF` |
| Card background | `#FFFFFF` with border |
| KPI card accent (purple) | `#6B3FA0` |
| KPI card accent (amber) | `#F5A623` |
| KPI card accent (green) | `#4ECDA0` |
| Table header | `#F8F6FF` light purple tint |
| Table border | `#E8E0F5` |
| Progress bar fill | `#6B3FA0` |
| Progress bar track | `#E8E0F5` |

### Common UI Components
1. **KPI Cards**: Icon left, large number, label below, colored accent bar
2. **Progress Gauge**: Circular, percentage in center, purple stroke
3. **Horizontal Bar Charts**: Purple fill, percentage labels
4. **Grouped Bar Charts**: Purple + amber dual bars
5. **Radar Charts**: Multi-series overlay, purple palette
6. **Heatmaps**: Purple gradient intensity grid
7. **Data Tables**: Alternating row shading, sortable columns
8. **Status Badges**: Filled pill shapes (Cited=purple, Not Cited=gray)
9. **Tab Navigation**: Underline active tab indicator
10. **Sidebar**: Dark purple with icon + label items
