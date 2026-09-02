# 30-Point SEO Checklist — Before Publishing Any Blog Post

**DO NOT PUBLISH** until all items are checked. This checklist enforces Google's 2024-2025 ranking factors.

---

## ✅ SECTION 1: KEYWORD RESEARCH (5 points)

- [ ] **1. Keyword research completed** 
  - Used Ahrefs, SEMrush, or Google Search Console
  - Documented search volume (minimum 300/mo recommended)
  - Researched keyword difficulty (aim for KD < 50 if new domain)
  - *Score if YES: 1pt*

- [ ] **2. Search intent verified**
  - Identified intent: tutorial? comparison? problem-solving? news?
  - Your content type matches the intent
  - Example: Keyword "how to X" = tutorial content (not blog essay)
  - *Score if YES: 1pt*

- [ ] **3. Topical cluster mapped**
  - Identified pillar topic (e.g., "TLS Certificate Monitoring")
  - Listed 3-5 related cluster posts
  - Will create internal linking strategy
  - *Score if YES: 1pt*

- [ ] **4. Keyword appears naturally in content**
  - Primary keyword in H1 title
  - Primary keyword in first 100 words (lede)
  - Secondary keywords in H2/H3 headings (3-5 times)
  - Target keyword density: 1-2% (not stuffed)
  - *Score if YES: 1pt*

- [ ] **5. Related keywords integrated**
  - At least 3 long-tail variations used
  - Example: "TLS monitoring" + "certificate monitoring" + "automated TLS renewal"
  - Natural language (NOT keyword stuffing)
  - *Score if YES: 1pt*

**Section 1 Total: ___/5**

---

## ✅ SECTION 2: E-A-T SIGNALS (5 points)

- [ ] **6. Author credentials complete**
  - Full name + job title
  - Years of experience documented
  - Previous/current company listed
  - LinkedIn URL present
  - Twitter/social handle present
  - *Score if YES: 1pt*

- [ ] **7. Author bio written**
  - 2-3 sentence professional bio
  - Establishes credibility (which tools/platforms they've worked with)
  - Includes specific expertise area
  - *Score if YES: 1pt*

- [ ] **8. Author's first-hand experience evident**
  - Phrases like "I debugged...", "We analyzed...", "I've seen..."
  - Real examples from author's background
  - NOT generic/AI-written tone
  - *Score if YES: 1pt*

- [ ] **9. Expertise demonstrated**
  - Content shows deep knowledge (not surface-level)
  - Uses industry terminology correctly
  - Cites relevant standards/RFCs/documentation
  - Example: "As per RFC 6960 OCSP specification..."
  - *Score if YES: 1pt*

- [ ] **10. Unique angle/controversial take**
  - Post doesn't just echo competitor content
  - Has original perspective or insight
  - Challenges conventional wisdom (supported by data)
  - Example: "Why X approach is wrong (and here's why)"
  - *Score if YES: 1pt*

**Section 2 Total: ___/5**

---

## ✅ SECTION 3: ORIGINAL RESEARCH / DATA (5 points)

- [ ] **11. Original research conducted**
  - NOT generic industry stats (AVOID: "73% of engineers...")
  - MUST BE: Your own data, survey, analysis
  - Examples: Customer data, internal testing, original research poll
  - *Score if YES: 2pts*

- [ ] **12. Data source documented**
  - Research type specified (case-study / survey / benchmark / data-analysis)
  - Sample size stated (e.g., "analyzed 10K certs")
  - Methodology explained
  - Dates specified (fresh research, not 2019 data)
  - *Score if YES: 1pt*

- [ ] **13. Unique statistics highlighted**
  - At least 3 data points from your research
  - Differ from competitors' published stats
  - Provably from original source (linked if possible)
  - *Score if YES: 1pt*

- [ ] **14. Case study included**
  - Real customer story OR internal project
  - Challenge → solution → quantified results
  - Metrics: time saved, money saved, incidents prevented
  - *Score if YES: 1pt*

**Section 3 Total: ___/5**

---

## ✅ SECTION 4: FEATURED SNIPPET OPTIMIZATION (5 points)

- [ ] **15. Definition section optimized**
  - H2: "What is [keyword]?"
  - Single-sentence definition (Google featured snippet format)
  - Clear, non-technical explanation
  - *Score if YES: 1pt*

- [ ] **16. List/bullet optimization**
  - At least one bulleted list with 3-5 items
  - Each item is scannable (< 15 words)
  - Format: Bold label + description
  - *Score if YES: 1pt*

- [ ] **17. Table optimization**
  - At least one comparison table
  - 3-4 columns, 3+ rows
  - Directly answers a search query (What's the difference? When to use?)
  - *Score if YES: 1pt*

- [ ] **18. FAQ schema included**
  - 3-5 Q&A pairs addressing common questions
  - Questions are real (from search console, competitor comments)
  - Answers are concise (2-3 sentences)
  - *Score if YES: 1pt*

- [ ] **19. Numbered steps (if tutorial)**
  - At least one "How-to" section with 4+ steps
  - Steps are sequential and actionable
  - Each step has expected outcome
  - *Score if YES: 1pt*

**Section 4 Total: ___/5**

---

## ✅ SECTION 5: STRUCTURED DATA / SCHEMA (3 points)

- [ ] **20. Article schema implemented**
  - Article schema present in page source
  - Includes: headline, author, datePublished, wordCount
  - Author credentials in schema (jobTitle, organization)
  - Validate with Google SDTT (Schema Debugging Tool)
  - *Score if YES: 1pt*

- [ ] **21. FAQ schema implemented**
  - FAQPage schema present
  - Maps to FAQ section in content
  - Tested with Google SDTT
  - *Score if YES: 1pt*

- [ ] **22. Organization schema present**
  - 24Observe organization JSON-LD
  - Logo, brand, website included
  - Links to social profiles
  - *Score if YES: 1pt*

**Section 5 Total: ___/3**

---

## ✅ SECTION 6: CONTENT QUALITY (4 points)

- [ ] **23. Word count adequate**
  - Minimum 1,200 words (better: 1,500-2,000)
  - Count sections separately (don't include boilerplate)
  - Rule: Longer content ranks better IF quality is high
  - Check: `wc -w blog-post.astro | grep -o '[0-9]*'`
  - *Score if YES: 1pt*

- [ ] **24. Content is scannable**
  - H2 headings every 300-400 words
  - Bullet lists break up walls of text
  - Bold key terms throughout
  - Paragraph length: max 4 sentences per paragraph
  - *Score if YES: 1pt*

- [ ] **25. No AI-detection flags**
  - NOT generic/templated tone
  - Includes personal anecdotes / real examples
  - Use specific numbers (not "many", "some", "often")
  - Pass through ZeroGPT or Originality.ai (optional)
  - *Score if YES: 1pt*

- [ ] **26. Cites credible sources**
  - Links to 3-5 authoritative sources (RFC, academic, industry)
  - NOT just internal linking
  - AVOID circular references
  - Example: RFC 6960, Mozilla SSL Report, academic papers
  - *Score if YES: 1pt*

**Section 6 Total: ___/4**

---

## ✅ SECTION 7: INTERNAL LINKING (2 points)

- [ ] **27. Topical cluster links included**
  - 3-5 links to related blog posts in cluster
  - Anchor text includes keyword variation
  - Links are contextual (not at bottom only)
  - *Score if YES: 1pt*

- [ ] **28. Feature page links**
  - At least 1 link to `/features` (with relevant H3 section)
  - At least 1 link to `/pricing` or `/docs`
  - Anchor text: specific and keyword-relevant
  - Example: `<a href="/features#ssl">TLS certificate monitoring</a>`
  - *Score if YES: 1pt*

**Section 7 Total: ___/2**

---

## ✅ SECTION 8: TECHNICAL SEO (1 point)

- [ ] **29. Meta description optimized**
  - 150-160 characters
  - Includes primary keyword
  - Compelling call-to-action
  - Not truncated in SERP preview
  - *Score if YES: 1pt*

**Section 8 Total: ___/1**

---

## ✅ SECTION 9: MOBILE & PERFORMANCE (Optional but Important)

- [ ] **30. Mobile-friendly tested**
  - Test: Use Google Mobile-Friendly Tool
  - All buttons are touch-sized (48px+)
  - Tables don't overflow horizontally
  - Text is readable (no pinch-zoom required)
  - *Bonus point if YES: +1pt*

**Bonus Total: ___/1**

---

## 📊 SCORING

**Total Possible Points: 31 (30 required + 1 bonus)**

| Score | Result | Action |
|-------|--------|--------|
| 28-31 | ✅ PUBLISH | Content is SEO-optimized and ready |
| 25-27 | ⚠️ FIX ISSUES | Address failing checklist items (see below) |
| < 25 | ❌ NOT READY | Rewrite sections; redo keyword research |

---

## 🔴 COMMON FAILURES (RED FLAGS)

### If you score < 28, check these:

**❌ Keyword not researched**
- Solution: Use Ahrefs free trial or Google Search Console
- Document: search volume, KD, intent type

**❌ No author credentials**
- Solution: Add author bio with LinkedIn, years of experience
- Make it credible (specific companies, roles)

**❌ No original research**
- Solution: Add customer data, internal audit, or survey
- Document the source and methodology

**❌ No featured snippet optimization**
- Solution: Add definition, table, or FAQ section
- Make it scannable (not prose)

**❌ Weak internal linking**
- Solution: Add 3-5 topical cluster links
- Use keyword-rich anchor text

---

## 📋 USAGE

**Before publishing ANY blog post:**

1. Print this checklist (or use in spreadsheet)
2. Go through each of the 30 items
3. Check the box ONLY if 100% true
4. Calculate total score at bottom
5. If < 28: Return to BLOG_WRITER_WORKFLOW.md, fix issues, recheck
6. If ≥ 28: PUBLISH and monitor rankings

**Track over time:** Keep scores in a spreadsheet to see if your blog quality is improving.

---

## 🎯 Connected Documents

Read these in order:
1. **BLOG_KEYWORD_RESEARCH.md** — Before starting
2. **BLOG_WRITER_WORKFLOW.md** — During writing
3. **This checklist** — Before publishing
4. **BLOG_SCORING_RUBRIC.md** — After publishing (to estimate traffic)

