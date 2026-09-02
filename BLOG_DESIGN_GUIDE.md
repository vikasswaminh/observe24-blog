# 24Observe Blog Design System

## Overview

This document describes the design tokens and components used in 24Observe blog posts. All values are defined in `apps/web/src/styles/tokens.css` and can be used via CSS variables.

---

## Design Tokens

### Color Palette

#### Dark Mode (Default)
```css
--bg: #0a0b0d          /* Main background */
--bg-1: #0f1114        /* Secondary background (lighter) */
--bg-2: #15181d        /* Tertiary background (even lighter) */
--bg-3: #1c2027        /* Quaternary background (for cards/panels) */

--line: #23272f        /* Primary border color */
--line-2: #2e333c      /* Secondary border color */

--ink: #e7e9ee         /* Primary text (high contrast) */
--ink-1: #b5bac4       /* Secondary text (medium contrast) */
--ink-2: #7a808b       /* Tertiary text (low contrast) */
--ink-3: #4a4f58       /* Quaternary text (lowest contrast, placeholders) */

--accent: #00e08a      /* Brand accent (neon green) */
--accent-dim: rgba(0, 224, 138, 0.14)      /* Accent with 14% opacity */
--accent-line: rgba(0, 224, 138, 0.38)    /* Accent border (38% opacity) */

--red: #ff5a5f         /* Error/alert color */
--amber: #ffb020       /* Warning color */
--blue: #6aa9ff        /* Info color */
--violet: #b08cff      /* Secondary accent */
```

#### Light Mode
```css
[data-theme="light"] {
  --bg: #fafaf7
  --bg-1: #ffffff
  --bg-2: #f4f3ee
  --bg-3: #ebeae3
  --line: #e2e0d6
  --line-2: #d2cfc2
  --ink: #14161a
  --ink-1: #3a3e46
  --ink-2: #6b707a
  --ink-3: #9aa0ab
  --accent: #00a86b
}
```

### Typography

```css
--sans: "Geist", ui-sans-serif, system-ui, -apple-system, sans-serif
--mono: "Geist Mono", ui-monospace, SFMono-Regular, Menlo, monospace
```

**Font Sizes:**
- `blog-h1`: 48px (hero title)
- `blog-h2`: 32px (section title)
- `blog-h3`: 18px (subsection)
- `blog-lede`: 18px (hero paragraph)
- Body text: 15px
- Meta text: 11–13px

### Spacing & Border Radius

```css
--pad: 32px            /* Standard padding (48px on comfy, 20px on compact) */
--rad: 6px             /* Standard border radius */
--rad-lg: 10px         /* Large border radius */
--maxw: 1240px         /* Max container width */
```

---

## Component Patterns

### Blog Hero Section

**Usage:** Top of every blog post with title, metadata, author info.

```astro
<section class="blog-hero">
  <div class="container">
    <div class="blog-meta-top">
      <span class="blog-category">Category</span>
      <span class="blog-date">2026-05-06</span>
      <span class="blog-read-time">8 min read</span>
    </div>
    <h1 class="blog-h1">Your Title Here</h1>
    <p class="blog-lede">Opening paragraph that hooks the reader.</p>
    <div class="blog-byline">
      <span>By Author Name</span>
      <span>·</span>
      <span>2026-05-06</span>
    </div>
  </div>
</section>
```

**Styling:** Gradient background (bg-2 → bg), bottom border.

---

### Table of Contents

**Usage:** Sticky, collapsible navigation for long-form posts.

```astro
<section class="blog-toc">
  <div class="container">
    <details open>
      <summary>
        <span class="toc-label">Table of Contents</span>
        <span class="toc-icon">▼</span>
      </summary>
      <nav class="toc-nav">
        <a href="#intro" class="toc-link">Introduction</a>
        <a href="#section1" class="toc-link">First Section</a>
      </nav>
    </details>
  </div>
</section>
```

**Styling:** Background: `--bg-1`, accent hover color, animated icon rotation.

---

### Blog Content Sections

#### Headings

```astro
<h2 class="blog-h2">Main Section Title</h2>
<h3 class="blog-h3">Subsection Title</h3>
```

**Sizes:**
- `blog-h2`: 32px, letter-spacing: -0.01em
- `blog-h3`: 18px, letter-spacing: normal

#### Paragraphs

```astro
<p>Standard paragraph text uses 15px, line-height: 1.8, color: --ink-1.</p>
<p>
  Links are <a href="#">styled in accent color</a> with bottom border on hover.
</p>
```

#### Lists

**Unordered with arrow bullets:**
```astro
<ul class="blog-list">
  <li>First point with arrow (→) bullet.</li>
  <li>Second point with arrow (→) bullet.</li>
</ul>
```

**Ordered lists:**
```astro
<ol class="blog-list">
  <li>First step.</li>
  <li>Second step.</li>
</ol>
```

---

### Stat Boxes

**Usage:** Display key metrics or data points.

```astro
<div class="blog-stat-box">
  <div class="stat">
    <div class="stat-number">$1.2M</div>
    <div class="stat-label">Median outage cost</div>
  </div>
  <div class="stat">
    <div class="stat-number">45 min</div>
    <div class="stat-label">Average MTTR</div>
  </div>
</div>
```

**Styling:** Grid layout (3 columns on desktop, 1 on mobile), accent numbers, secondary text labels, bg-2 background.

---

### Reason/Callout Boxes

**Usage:** Highlight important takeaways or context.

```astro
<div class="blog-reason">
  <h3 class="blog-h3">Why This Matters</h3>
  <p>Explain the practical impact and connection to the reader's business.</p>
</div>
```

**Styling:** Left green border (accent), bg-2 background, subtle rounded corners.

---

### Code Blocks

**Usage:** Show configuration examples, code snippets, or commands.

```astro
<div class="blog-code-block">
  <pre><code>// Example code
const config = {"{"} 
  interval: 60,
  timeout: 10000
{"}"}</code></pre>
</div>
```

**Styling:** bg-2 background, 1px border, monospace font (12px), horizontal scrolling on overflow.

---

### Layer Boxes

**Usage:** Break down multi-layer concepts (e.g., 3 layers of security, 4 stages of monitoring).

```astro
<div class="blog-layer">
  <h3 class="blog-h3">Layer 1: Foundation</h3>
  <p>Description of this layer.</p>
  <ul class="blog-list">
    <li>Detail 1</li>
    <li>Detail 2</li>
  </ul>
</div>
```

**Styling:** bg-1 background, accent-colored heading, consistent padding, stacks vertically.

---

### Timeline

**Usage:** Show sequence of events (e.g., incident timeline, 5-week implementation plan).

```astro
<div class="blog-timeline">
  <div class="timeline-item">
    <div class="timeline-time">Week 1</div>
    <div class="timeline-event">Setup and configuration.</div>
  </div>
  <div class="timeline-item">
    <div class="timeline-time">Week 2</div>
    <div class="timeline-event">Testing and integration.</div>
  </div>
</div>
```

**Styling:** Grid (140px time, 1fr event), dashed border, accent time labels.

---

### Key Insight Callout

**Usage:** Summarize the core takeaway in one place. Use for TL;DR or critical insight.

```astro
<div class="blog-callout">
  <div class="callout-icon">◈</div>
  <div>
    <p>
      <b>TL;DR:</b> Expired TLS certificates are 100% preventable.
      Monitor all endpoints 7–14 days before expiry.
    </p>
  </div>
</div>
```

**Styling:** Accent background (accent-dim), accent border, flex layout with icon + text, stands out from page.

---

### Call-to-Action Section

**Usage:** Bottom of blog post with action buttons.

```astro
<section class="blog-cta">
  <div class="container">
    <div class="cta-box">
      <h3 class="cta-h3">Ready to Get Started?</h3>
      <p class="cta-p">Start monitoring in minutes. No credit card required.</p>
      <div class="cta-buttons">
        <a href="https://login.24observe.com/register" class="btn btn-primary btn-lg">
          Start free <span class="arr">→</span>
        </a>
        <a href="/features" class="btn btn-ghost btn-lg">
          See features
        </a>
      </div>
    </div>
  </div>
</section>
```

**Styling:** Gradient background, centered card, two-button layout (primary + ghost), responsive.

---

## Typography Hierarchy

| Level | Size | Weight | Usage |
|-------|------|--------|-------|
| Hero Title | 48px | 700 | `blog-h1` |
| Section | 32px | 700 | `blog-h2` |
| Subsection | 18px | 600 | `blog-h3` |
| Body | 15px | 400 | `<p>` |
| Meta | 13px | 500 | Category, date, byline |
| Small | 11px | 400 | Timestamps, labels |
| Code | 12px | 400 | Monospace font |

---

## Color Usage Guidelines

| Element | Color | When |
|---------|-------|------|
| Primary text | `--ink` | Main body text, headings |
| Secondary text | `--ink-1` | Descriptions, supporting text |
| Tertiary text | `--ink-2` | Captions, metadata |
| Links | `--accent` | Inline links with hover border |
| Accent highlights | `--accent` | Numbers in stat boxes, icons, borders |
| Backgrounds | `--bg`, `--bg-1`, `--bg-2` | Page, cards, code blocks |
| Borders | `--line`, `--line-2` | Subtle dividers |
| Errors/alerts | `--red` | Red color badge, error state |
| Warnings | `--amber` | Warning messages |
| Info | `--blue` | Info badges, links in dark text |

---

## Responsive Behavior

All blog components scale gracefully:

**Desktop (1024px+)**
- Wide layouts, 2+ column grids
- Full sidebar on TOC
- Stat boxes: 3 columns

**Tablet (768–1024px)**
- Single column, reduced padding
- Stat boxes: 2 columns
- Buttons: inline with wrapping

**Mobile (< 768px)**
- Single column, full width
- Reduced font sizes (h1: 32px → 24px)
- Stat boxes: 1 column
- Buttons: full width stacked

---

## Accessibility & Best Practices

1. **Semantic HTML:**
   - Use `<h2>`, `<h3>` in order (don't skip levels).
   - Use `<ol>` for ordered, `<ul>` for unordered lists.

2. **Color Contrast:**
   - All text meets WCAG AA minimum contrast.
   - Don't rely on color alone; use text labels.

3. **Image Alt Text:**
   - All images should have descriptive `alt` text.
   - Avoid "image", "screenshot", use specific descriptions.

4. **Links:**
   - All links have color + underline (not just color).
   - Internal links: `<a href="/path">label</a>`
   - External links: `<a href="https://..." target="_blank" rel="noopener">label ↗</a>`

5. **Code Blocks:**
   - Use `<code>` inside `<pre>` for multi-line code.
   - Single inline code: `<code>variable_name</code>` (wrapped in backticks in source).

---

## Example Structure

```astro
---
import Base from '../../layouts/Base.astro';

const ARTICLE_META = {
  title: 'Title',
  author: 'Name',
  date: '2026-05-06',
  readTime: '8 min read',
  category: 'Best Practices',
  description: 'Meta description for SEO.',
};
---

<Base title={ARTICLE_META.title} description={ARTICLE_META.description}>
  <article class="blog-article">
    {/* Hero */}
    <section class="blog-hero">...</section>
    
    {/* TOC */}
    <section class="blog-toc">...</section>
    
    {/* Content */}
    <section class="blog-content">
      <div class="container">
        <section id="intro" class="blog-section">
          <h2 class="blog-h2">Intro</h2>
          <p>Text...</p>
        </section>
      </div>
    </section>
    
    {/* CTA */}
    <section class="blog-cta">...</section>
  </article>
</Base>
```

---

## Quick Copy-Paste Snippets

### Stat Box (3 stats)
```astro
<div class="blog-stat-box">
  <div class="stat">
    <div class="stat-number">VALUE</div>
    <div class="stat-label">Label</div>
  </div>
  {/* Repeat for each stat */}
</div>
```

### Callout Box
```astro
<div class="blog-callout">
  <div class="callout-icon">◈</div>
  <div><p><b>Label:</b> Content here.</p></div>
</div>
```

### Layer Box
```astro
<div class="blog-layer">
  <h3 class="blog-h3">Layer Title</h3>
  <p>Description...</p>
  <ul class="blog-list">
    <li>Point 1</li>
    <li>Point 2</li>
  </ul>
</div>
```

### Button Link
```astro
<a href="https://..." class="btn btn-primary btn-lg">
  Label <span class="arr">→</span>
</a>
```

---

## Questions?

Refer to:
- **Live example:** `apps/web/src/pages/blog/why-tls-monitoring-matters.astro`
- **Template:** `apps/web/src/pages/blog/blog-template.astro`
- **Tokens:** `apps/web/src/styles/tokens.css`
- **Components:** `apps/web/src/styles/components.css`
