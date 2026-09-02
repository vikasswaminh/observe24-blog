# 24Observe Blog Components — Quick Cheat Sheet

## Color Palette at a Glance

```
┌─────────────────────────────────────────────────────────┐
│ DARK MODE (Default)                                     │
├─────────────────────────────────────────────────────────┤
│ --bg:          #0a0b0d    (darkest background)         │
│ --bg-1:        #0f1114    (lighter BG)                 │
│ --bg-2:        #15181d    (even lighter)               │
│ --bg-3:        #1c2027    (for panels/cards)           │
│                                                          │
│ --ink:         #e7e9ee    (main text)                  │
│ --ink-1:       #b5bac4    (secondary text)             │
│ --ink-2:       #7a808b    (tertiary text)              │
│ --ink-3:       #4a4f58    (lowest contrast)            │
│                                                          │
│ --accent:      #00e08a    (BRIGHT GREEN — use often!)  │
│ --red:         #ff5a5f    (errors/alerts)              │
│ --amber:       #ffb020    (warnings)                    │
│ --blue:        #6aa9ff    (info)                        │
│                                                          │
│ --line:        #23272f    (borders)                    │
└─────────────────────────────────────────────────────────┘
```

---

## Typography Quick Ref

| Class/Tag | Size | Weight | Use For |
|-----------|------|--------|---------|
| `.blog-h1` | 48px | 700 | Hero title at top of post |
| `.blog-h2` | 32px | 700 | Major section headings |
| `.blog-h3` | 18px | 600 | Subsection headings |
| `.blog-lede` | 18px | 400 | Opening paragraph (hook) |
| `<p>` | 15px | 400 | Body text (default) |
| `.blog-meta-top` | 11px | 600 | Date, category, read time |
| `.blog-date` | 11px | 400 | Metadata in smaller sections |
| `<code>` | 12px | 400 | Inline code or code blocks |

---

## Component Templates (Copy & Paste)

### 1. STAT BOX (Show 3 key numbers)

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
  <div class="stat">
    <div class="stat-number">72%</div>
    <div class="stat-label">Preventable root causes</div>
  </div>
</div>
```

**When to use:** Data-driven introductions, research findings, industry benchmarks.

---

### 2. REASON BOX (Highlight a point)

```astro
<div class="blog-reason">
  <h3 class="blog-h3">Why This Matters</h3>
  <p>
    Connect this concept back to the reader's business impact.
    Use data if available.
  </p>
</div>
```

**When to use:** Emphasize practical impact, aha moments, business alignment.

---

### 3. CODE BLOCK

```astro
<div class="blog-code-block">
  <pre><code>// Example JSON or config
const config = {"{"} 
  interval: 60,
  timeout: 10000,
  headers: { 'Authorization': 'Bearer token' }
{"}"}</code></pre>
</div>
```

**When to use:** Configuration examples, code snippets, commands.
- Use `{"{"}` and `{"}"}` to escape braces in Astro
- Indent for readability
- Keep examples short (~8 lines)

---

### 4. LAYER BOX (Break down complex concepts)

```astro
<div class="blog-layer">
  <h3 class="blog-h3">Layer 1: Foundation</h3>
  <p>
    Describe the first layer or concept.
  </p>
  <ul class="blog-list">
    <li>Detail or capability A</li>
    <li>Detail or capability B</li>
  </ul>
</div>

<div class="blog-layer">
  <h3 class="blog-h3">Layer 2: Advanced</h3>
  <p>
    Build on top of the foundation.
  </p>
  <ul class="blog-list">
    <li>Detail or capability C</li>
  </ul>
</div>
```

**When to use:** Multi-step processes, layered defense, building complexity.

---

### 5. TIMELINE (Show sequence of events)

```astro
<div class="blog-timeline">
  <div class="timeline-item">
    <div class="timeline-time">May 7, 11:47 PM</div>
    <div class="timeline-event">Critical cert expires, no warning.</div>
  </div>
  <div class="timeline-item">
    <div class="timeline-time">May 8, 12:04 AM</div>
    <div class="timeline-event">Service cascades fail, latency spikes.</div>
  </div>
  <div class="timeline-item">
    <div class="timeline-time">May 8, 12:18 AM</div>
    <div class="timeline-event">On-call paged; 50% of region affected.</div>
  </div>
</div>
```

**When to use:** Incident breakdowns, step-by-step walkthroughs, implementation timelines.

---

### 6. KEY INSIGHT CALLOUT (TL;DR / critical idea)

```astro
<div class="blog-callout">
  <div class="callout-icon">◈</div>
  <div>
    <p>
      <b>TL;DR:</b> 
      Expired certificates are 100% preventable with proper monitoring.
      Alert at 7–14 days before expiry.
    </p>
  </div>
</div>
```

**When to use:** Core takeaway, TL;DR summary, critical insight to remember.
- Place 2/3 through post or at major transition
- Keep it to 1–2 sentences max
- Use bold intro ("TL;DR:", "Key Point:", "Remember:")

---

### 7. UNORDERED LIST (Arrow bullets)

```astro
<ul class="blog-list">
  <li>First key point with supporting detail.</li>
  <li>Second key point with supporting detail.</li>
  <li>Third key point with supporting detail.</li>
</ul>
```

**Output:** Renders with → bullet points, accent green.

---

### 8. ORDERED LIST (Numbered steps)

```astro
<ol class="blog-list">
  <li>First action: Short, specific step.</li>
  <li>Second action: Short, specific step.</li>
  <li>Third action: Short, specific step.</li>
</ol>
```

**Output:** Renders as numbered list (1, 2, 3...).

---

### 9. CALL-TO-ACTION SECTION (Bottom of post)

```astro
<section class="blog-cta">
  <div class="container">
    <div class="cta-box">
      <h3 class="cta-h3">Ready to Get Started?</h3>
      <p class="cta-p">
        Start monitoring TLS certificates in minutes. No credit card required.
      </p>
      <div class="cta-buttons">
        <a href="https://login.24observe.com/register" class="btn btn-primary btn-lg">
          Start free <span class="arr">→</span>
        </a>
        <a href="/features#ssl" class="btn btn-ghost btn-lg">
          See SSL monitoring
        </a>
      </div>
    </div>
  </div>
</section>
```

**When to use:** End of every blog post. One primary CTA, one secondary.

---

## Text Styling in Paragraphs

```astro
<p>
  Use <b>bold</b> for emphasis on key terms or metrics.
</p>

<p>
  <em>Italicize</em> for asides or when introducing a concept.
</p>

<p>
  Use a <a href="/features">link</a> to guide readers to related content.
  External link to <a href="https://example.com" target="_blank" rel="noopener">example.com ↗</a>
</p>

<p>
  Use <code>monospace</code> for code terms or variable names inline.
</p>
```

---

## Spacing & Section Breaks

- **Between sections:** `.blog-section` has `margin-bottom: 48px`
- **Between paragraphs:** `<p>` has `margin-bottom: 16px`
- **Between list items:** `<li>` has `margin-bottom: 12px`
- **Paragraph to next element:** Add explicit margin in your component

---

## Structure Checklist

- [ ] Hero section with title, lede, date, author, category
- [ ] Table of Contents (if >800 words)
- [ ] 3–5 main sections with `<h2>` headings
- [ ] At least 1 data visualization (stat box, timeline, etc.)
- [ ] 1–2 key callout boxes (reason boxes, layer boxes)
- [ ] Key insight callout (TL;DR)
- [ ] 1–2 code examples (if technical)
- [ ] Internal links to related pages (features, docs, pricing)
- [ ] CTA section at bottom
- [ ] 800–1,500 words (target for SEO)

---

## Writing Tips for SEO

1. **Keyword placement:**
   - Title (your target keyword)
   - First 100 words (lede paragraph)
   - Subheadings (h2, h3)
   - Internal links (anchor text)

2. **Readability:**
   - Short paragraphs (3–5 sentences max)
   - Bullet lists for scanability
   - Bolded key terms
   - Whitespace between sections

3. **Internal linking:**
   - Link to `/features` when mentioning check types
   - Link to `/pricing` for pricing details
   - Link to `/docs` for technical depth
   - Link to `/self-host` for deployment info

4. **Meta tags:**
   - Use in `ARTICLE_META.description` (155 chars max)
   - Matches your marketing messaging
   - Includes target keyword

---

## File Organization

```
apps/web/
├── src/
│   ├── pages/
│   │   └── blog/
│   │       ├── why-tls-monitoring-matters.astro    ✅ Live example
│   │       └── blog-template.astro                 🔧 Copy this
│   └── styles/
│       └── tokens.css                              🎨 Design tokens
└── BLOG_DESIGN_GUIDE.md                            📖 Full reference
```

---

## Quick Color Reference

| Use Case | CSS Variable | Hex | When |
|----------|--------------|-----|------|
| Main text | `--ink` | #e7e9ee | Headers, body |
| Secondary text | `--ink-1` | #b5bac4 | Descriptions |
| Helper text | `--ink-2` | #7a808b | Captions, meta |
| Accent (numbers, icons) | `--accent` | #00e08a | Stat boxes, links |
| Card backgrounds | `--bg-2` | #15181d | Code blocks, boxes |
| Borders | `--line` | #23272f | Dividers, rules |
| Error | `--red` | #ff5a5f | Error messages |

---

## Common Mistakes to Avoid

❌ **Don't:**
- Skip heading levels (h1 → h3)
- Put all content in one block (break it up!)
- Forget alt text on images
- Use color alone for emphasis (also use bold/italics)
- Make sections longer than view height (add breaks)
- Forget internal links
- Write TL;DR at the very end (place it 2/3 through)

✅ **Do:**
- Use semantic HTML tags
- Break up long content with lists and boxes
- Add visuals (stat boxes, timelines, code)
- Link to related docs or features
- Proofread for typos and clarity
- Use short paragraphs (1–3 sentences each)
- Test on mobile (responsive design)

