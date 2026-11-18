---
name: sensifai-ui-ux-excellence
description: Advanced UI/UX component patterns, Bento grids, device mockup frames, left-sidebar dashboard layouts, mobile-native bottom tab navigation, and domain-specific interactive visualizations for SENSIFAI Marketplace applications. Use whenever designing or coding frontend pages, landing sections, dashboards, or interactive AI workspaces.
---

# Sensifai UI/UX Excellence — Modern Minimal Landings, Left-Sidebar Dashboards & Native Mobile Shells

## When to Use This Skill

Load this skill whenever you are building or polishing the frontend (`src/app/page.tsx`, `src/components/*`, `src/app/globals.css`) of a SENSIFAI Marketplace application. It provides concrete UI architecture patterns so every app looks like an award-winning modern SaaS product.

---

## 1. Layout Architecture: Pure Marketing Landing (`/`) + Dedicated Workspace (`/workspace`)

Never embed `AppShell` as a section inside `src/app/page.tsx`! Structure applications with clean separation between marketing and workspace:

- **Top Marketing Surface (`src/app/page.tsx` -> `/`)**:
  - Pure high-converting landing page using `Navbar.tsx` + one of the 4 domain archetypes (`studio`, `bento`, `editorial`, `playful`).
  - Features hero showcase, before/after comparative previews, value metrics, device chrome frames, and prominent CTA buttons linking directly to `/workspace`.
- **Dedicated Application Workspace (`src/app/workspace/page.tsx` -> `/workspace` & `/dashboard`)**:
  - Full-screen SaaS workspace wrapped in `AppShell` from `@/components/AppShell`.
  - Pass `appName`, `appTagline`, `primaryColor` (from `PROJECT.md`), and domain-specific `navItems`.
  - On desktop (`>= 1024px`), `AppShell` renders a collapsible **Left Sidebar Menu** (`260px` expanded / `76px` rail) with active brand-colored pills and a pinned **Prepaid Wallet & Metering Card** at the bottom.
  - On mobile (`< 1024px`), `AppShell` automatically transforms into a native mobile application layout with a compact top header and a fixed frosted-glass **Bottom Tab Bar (`h-16`)**!
  - Include responsive telemetry metric cards with `truncate` / `break-words` and `grid-cols-2 md:grid-cols-4` to prevent number overflows.
  - Export `/dashboard` as a re-export of `/workspace` so both routes work seamlessly.

---

## 2. Browser Chrome & Device Frame Pattern (Mandatory for `platform-ui.png`)

Never place an unframed screenshot on the landing page. Wrap `public/images/platform-ui.png` inside a sleek macOS/Browser Chrome container:

```tsx
<div className="rounded-2xl border border-slate-200/80 bg-white shadow-[0_20px_50px_rgba(5,15,26,0.08)] overflow-hidden">
  <div className="h-10 bg-slate-50 border-b border-slate-200/80 px-4 flex items-center justify-between">
    <div className="flex items-center gap-1.5">
      <span className="h-3 w-3 rounded-full bg-rose-400/80" />
      <span className="h-3 w-3 rounded-full bg-amber-400/80" />
      <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
    </div>
    <div className="px-3 py-1 rounded-md bg-white border border-slate-200 text-[11px] font-mono text-slate-500">
      https://{appId}.sensifai.com/workspace
    </div>
    <div className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
      Live Engine
    </div>
  </div>
  <div className="relative aspect-video w-full bg-slate-900 overflow-hidden min-h-[300px] sm:min-h-[460px] md:min-h-[540px]">
    <Image
      src="/images/platform-ui.png"
      alt={`${appName} Live Workspace Interface`}
      fill
      sizes="(max-width: 768px) 100vw, 1100px"
      className="object-cover object-top"
    />
  </div>
</div>
```

> [!CAUTION]
> **CRITICAL CSS QUALITY GATE: NEVER USE `aspect-16/9` WITH TAILWIND CSS V3**
> Tailwind CSS v3 does NOT recognize `aspect-16/9` (which is a Tailwind v4 class). If you write `aspect-16/9`, Tailwind generates no CSS rule, causing any container wrapping Next.js `<Image fill />` to collapse to **0 pixels height** and render completely invisible in production!
> - ALWAYS use `aspect-video` (which produces `aspect-ratio: 16 / 9;`).
> - ALWAYS combine with an explicit responsive minimum height (e.g., `min-h-[300px] sm:min-h-[460px] md:min-h-[540px]` for hero platform previews, and `min-h-[190px] sm:min-h-[240px]` for feature cards) so containers NEVER collapse under any browser or CSS engine.
> - Configure `aspectRatio: { 'video': '16 / 9', '16/9': '16 / 9' }` in `tailwind.config.js`.

> [!IMPORTANT]
> **MARKETPLACE PLAIN-TEXT CLEANLINESS (ZERO YAML INDENTATION LEAKAGE)**
> When writing `description_long` in `PROJECT.md` or registering on the Marketplace, all paragraphs MUST be plain natural text without any leading indentation spaces.
> - **Zero Indentation Rule**: In YAML multiline blocks (`description_long: |`), never leave 4 leading spaces at the start of paragraphs when extracted. In CommonMark, 4 leading spaces after a newline is rendered as an indented code block (`<pre><code>`), showing up as an ugly horizontal-scrolling monospace code box in the Marketplace.
> - `scripts/marketplace-manage.mjs` automatically invokes `cleanMultilineDescription()` to strip YAML indentation and unindent every paragraph. Ensure your descriptions remain clean, natural paragraphs.

---

## 3. Domain-Specific Dashboard Visualizations (Never Ship Raw Text Dumps)

When the user runs an AI analysis or clicks a sample preset, NEVER render a plain wall of text or raw JSON. Transform the structured AI output (`callSensifaiAIJson`) into **rich visual components**:

1. **Executive KPI & Telemetry Strip**: 3 to 4 top metric cards displaying key scores, confidence percentages, or risk indices in `JetBrains Mono` (`text-2xl font-bold`), paired with semantic status badges (`#05B169` positive, `#F0AD4E` warning, `#DF2935` alert).
2. **Radial Progress Gauges & Segmented Scorecards**: Use SVG circular progress rings (`strokeDasharray` / `strokeDashoffset` colored with `var(--brand-primary)`) for overall scores (0–100) and horizontal segmented bars for sub-criteria breakdowns.
3. **Interactive Tabs & Export Actions**: Organize detailed output into scannable tabs (*Executive Summary*, *Detailed Breakdown*, *Action Plan*, *Export Report*).
4. **Visual Plates for Creative / Multimodal Apps**: Pair every generated story, scene, or inspection result with a generated image, interactive hotspot overlay, or bespoke multi-layered SVG scene illustration.


---

## 4. Mandatory Legal & Accuracy Disclaimer Pattern (Under Primary Action Buttons)

To protect the platform and operators from liability, **every primary action button that triggers an AI analysis / execution MUST feature a clean, subtle legal disclaimer directly beneath it**:

```tsx
{/* Action Button */}
<button
  type="button"
  onClick={handleRunAction}
  disabled={loading}
  className="..."
>
  Run AI Analysis (€0.05)
</button>

{/* Mandatory Legal & Accuracy Disclaimer */}
<p className="text-[11px] text-stone-400 text-center flex items-center justify-center gap-1 pt-1 leading-tight select-none">
  <Info className="h-3 w-3 shrink-0 text-stone-400" />
  <span>Sensifai AI may make mistakes. Verify critical decisions and information with official regulations.</span>
</p>
```

Alternatively, use `<AIDisclaimer />` exported from `@/components/AppShell`.
