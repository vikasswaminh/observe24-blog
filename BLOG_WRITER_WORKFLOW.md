# Writer Workflow — Step-by-Step Blog Writing Process

This is your day-by-day guide to write an SEO-optimized blog post. Follow this exactly.

---

## 📋 **Pre-Writing Checklist (1 hour)**

### **Day 0: Before You Write a Single Word**

- [ ] **Keyword research complete**
  - Primary keyword identified
  - Search volume verified (min 300/mo)
  - KD score acceptable (<50 for new site)
  - See: BLOG_KEYWORD_RESEARCH.md

- [ ] **Topical cluster mapped**
  - Pillar article identified
  - Related cluster posts listed
  - Internal linking strategy drafted
  - See: BLOG_TOPICAL_STRATEGY.md

- [ ] **ARTICLE_META filled (even if placeholder)**
  - Title drafted (include keyword)
  - Author name + credentials
  - Search intent declared
  - FAQ questions listed
  - See: blog-template-seo.astro

- [ ] **Competitor analysis done**
  - Ranked top 3 posts reviewed
  - Their strengths noted
  - Your angle of attack identified

**If ANY item not done:** STOP. Don't write until ready. Do research first.

---

## ✍️ **Day 1: Content Outline (2-3 hours)**

### **Step 1: Write Your Core Outline**

**DO NOT start writing prose yet.** Create structure first:

```
BLOG POST: How to Monitor TLS Certificates on Linux

PRIMARY KEYWORD: Monitor TLS certificates Linux

OUTLINE:
○ Hero Section
  - Hook (data point): "23% of admins found expired certs in production"
  - Value: "Step-by-step guide to automated TLS monitoring"
  - Keyword: MUST appear in lede + title

○ Section 1: What is TLS Monitoring (Definition)
  └─ Optimize for featured snippet (one-sentence definition)
  └─ 250 words max

○ Section 2: Why It Matters (Problem statement)
  └─ Include stat box (3 metrics from your research)
  └─ Connect to reader's business (prevent downtime, save money)
  └─ 400 words

○ Section 3: Methods Compared (Comparison)
  └─ Table with 3-4 options
  └─ Optimize for featured snippet (table format)
  └─ 500 words

○ Section 4: Step-by-Step Setup (Tutorial)
  └─ Numbered list (4-6 steps)
  └─ Each step has: action + expected outcome
  └─ Include code block example
  └─ 800 words

○ Section 5: Troubleshooting (Common Errors)
  └─ 3-4 error scenarios
  └─ Problem → Solution format
  └─ Links to docs
  └─ 400 words

○ Section 6: Original Research Findings
  └─ Your data (not generic stats)
  └─ 3-5 key insights
  └─ 300 words

○ Section 7: Real Case Study
  └─ Customer story or internal project
  └─ Challenge → Solution → Results
  └─ Quantified metrics
  └─ 300 words

○ TL;DR Callout
  └─ One actionable sentence
  └─ Use accent color

○ CTA Section
  └─ Link to `/features#ssl`
  └─ Link to `/pricing`

TOTAL TARGET: 1,500 words
```

### **Step 2: Map H2 Headings to Keywords**

Each H2 should include a keyword variation:

```
H2 Heading         | Keyword Included | Purpose
─────────────────────────────────────────────────────
"What is TLS      | TLS monitoring   | Definition
Monitoring?"       |                  | (featured snippet)
─────────────────────────────────────────────────────
"Why TLS Cert     | Certificate      | Problem/value
Monitoring Matters"| monitoring       | 
─────────────────────────────────────────────────────
"Methods         | TLS monitoring   | Comparison
Compared"        | methods          | +featured snippet
─────────────────────────────────────────────────────
"Setup Guide:    | Monitor on Linux | Tutorial
Step-by-Step"    |                  | (action-oriented)
─────────────────────────────────────────────────────
...
```

**Result:** Google sees primary keyword + 5-7 related keywords = topical depth signal.

---

## 📝 **Day 2: Write the First Draft (4-6 hours)**

### **Rule #1: Write Fast, Edit Later**

- Write in order: Hero → Sections 1-7 → CTA
- Don't perfect as you go. Aim for 70% quality.
- Typos, awkward sentences = okay for draft.
- Speed = 400-600 words/hour
- Target: 1,500 words = 2.5-4 hours

### **Rule #2: Write for Your Audience, Not Google**

- Primary audience: SREs, DevOps engineers
- Their pain: Certificate expiry causing outages
- Your promise: Simple, automated solution
- Your tone: Expert but not condescending (you've "been there")

### **Rule #3: Include Original Research Early**

In sections 2-3, reference your own data:

```
DON'T:
"Many engineers struggle with expired certificates."

DO:
"A 24Observe analysis of 10,000+ production certificates 
found 23% were expiring within 90 days with no monitoring 
in place. Of those, 12% expiring within 30 days (critical risk)."
```

The difference = E-A-T signal + credibility boost.

### **Rule #4: Natural Keyword Integration**

```
DON'T (Keyword stuffing):
"TLS monitoring tools are important for certificate monitoring.
If you use a TLS monitoring solution, you'll have better TLS 
monitoring and better certificate monitoring with TLS monitors..."

DO (Natural integration):
"TLS monitoring tools verify certificates haven't expired.
A good monitoring setup catches expiration 7-14 days before
it becomes critical, giving your team time to renew."
```

**Check keyword density:** Use wordcounter.net
- Primary keyword: 1-2 times per 1,000 words (1-2%)
- Related keywords: 3-5 total variations

### **Step 1: Write Hero + First 3 Sections**

```
HERO SECTION:
═════════════════════════════════════════════════════

Title: "How to Monitor TLS Certificates on Linux: 
        Complete Setup Guide 2025"

Lede:
"In March 2024, our analysis of 10,000+ production certificates 
found 23% were expiring within 90 days with no alerts in place.
The organizations that lost revenue due to certificate expirations 
had one thing in common: no monitoring.

This guide walks you through setting up automated TLS certificate 
monitoring on Linux—both open-source tools and 24Observe—so you 
never get caught off-guard by expiry again."

Author: Elena Rodriguez, Senior SRE, 8y @ Netflix + Stripe

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## What is TLS Certificate Monitoring?

TLS certificate monitoring is the practice of continuously checking 
SSL/TLS certificates for validity, expiration dates, and chain integrity. 
When a certificate is set to expire, monitoring alerts your team so they 
can renew it before it causes an outage.

[Why it matters: Show consequences]
A certificate that expires stops accepting connections. Browsers show 
CERTIFICATE_VERIFY_FAILED. APIs return 500 errors. Internal services 
drop connections. The result: typically 100% downtime until renewed.

[Add stat box here with your research data]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Why TLS Certificate Monitoring Matters

Every organization has certificates:
- Public-facing HTTPS sites
- Internal APIs with mTLS
- Message brokers (Kafka, RabbitMQ)
- Database connections (PostgreSQL)
- Service mesh (Istio, Linkerd)

Most teams track the big ones but miss internal certificates.

[Add research findings here]
"Our 10K certificate audit found:
- 23% expiring within 90 days (no alert)
- 12% within 30 days (critical)
- 8% no monitoring at all
- 3% manual tracking only (unreliable)"

[Business impact]
Unmonitored expiry = production incident = hours of downtime 
= $X cost per incident.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Methods Compared: How to Monitor TLS

[Add comparison table here]
- OpenSSL manual checks
- Certbot automated renewal
- Services mesh tools (Istio cert lifecycle)
- Dedicated tools (24Observe, others)

[Table should be featured snippet format]
```

### **Step 2: Write Sections 4-7**

Follow same pattern: subheading → problem → solution → example

```
## Step-by-Step Setup

1. Check existing certificates
   Command: $ openssl s_client -connect api.example.com:443 -servername api.example.com
   What to look for: "notAfter" field shows expiration date
   
2. Set up automated monitoring
   [Choose: OpenSSL cron? Certbot? 24Observe?]
   
3. Configure alerts
   [Email? Slack? PagerDuty?]
   
4. Test the alert
   [Simulate expiry to verify it works]
```

---

## 🔍 **Day 3: Edit & Optimize (3-4 hours)**

### **Round 1: SEO Optimization Edit**

- [ ] Primary keyword in H1 title ✓
- [ ] Primary keyword in first 100 words ✓
- [ ] Related keywords in H2/H3 (3-5 variations) ✓
- [ ] Keyword density check (1-2%, not stuffed) ✓
- [ ] Internal links added (3-5 topical cluster links) ✓
- [ ] External citations added (3-5 authoritative sources) ✓
- [ ] Featured snippet targets optimized (table, list, definition) ✓

### **Round 2: Readability Edit**

- [ ] Paragraph length: max 4 sentences per paragraph
- [ ] Avg sentence length: 15-20 words (not too long)
- [ ] Bullet lists break up walls of text (every 300 words)
- [ ] Bold key terms throughout
- [ ] Subheadings match H2/H3 levels (no skipping)
- [ ] No passive voice (use active: "You verify expiry" not "Expiry is verified")

### **Round 3: E-A-T Check**

- [ ] Author credentials visible (bio section) ✓
- [ ] Original research included + source cited ✓
- [ ] Case study includes real metrics (not vague) ✓
- [ ] Credible sources linked (RFC docs, industry reports) ✓
- [ ] Tone = expert but not condescending ✓
- [ ] No AI-detected content (sounds human, specific examples) ✓

### **Round 4: Technical Copy-Edit**

- [ ] Fix typos (Grammarly or similar)
- [ ] Consistent capitalization (TLS vs tls)
- [ ] Code blocks formatted correctly
- [ ] Links test (click all internal + external links)
- [ ] Images have alt text (if any)
- [ ] No broken sentence structures

---

## ✅ **Day 4: Final Validation (1-2 hours)**

### **Before Publishing: RUN THE 30-POINT CHECKLIST**

See: BLOG_SEO_CHECKLIST.md

Score must be ≥ 28/30 points.

If score < 28:
- [ ] Fix failing items
- [ ] Re-check checklist
- [ ] If still < 28: Do NOT publish. Rewrite.

### **Schema Validation**

- [ ] ARTICLE_META filled completely
- [ ] Paste HTML into Google Schema Tool
- [ ] All green ✅ (no errors)
- [ ] FAQ schema shows 5 Q&A pairs
- [ ] Author schema includes credentials

### **Final Quality Check**

- [ ] Word count: 1,200+ words (actual content, not boilerplate)
- [ ] Screenshots/code examples included
- [ ] Case study is specific (not generic praise)
- [ ] CTA buttons link correctly
- [ ] Internal links are keyword-rich (not "click here")

---

## 🚀 **Day 5: Publish & Monitor (1 hour)**

### **Pre-Publish Checklist**

- [ ] **Copy raw post URL** (you'll need this)
- [ ] **Screenshot hero section** (for social media)
- [ ] **Draft social media post** (LinkedIn + Twitter)
- [ ] **Note expected traffic estimate** (see BLOG_SCORING_RUBRIC.md)

### **Publish on 24observe.com**

1. Copy blog post to: `apps/web/src/pages/blog/[your-slug].astro`
2. Deploy to production
3. Verify via: `https://24observe.com/blog/[your-slug]`
4. Run schema tool one more time (live check)

### **Promotion (24 hours)**

- [ ] Post on 24Observe Twitter
- [ ] Post on company LinkedIn
- [ ] Share internally (Slack announcement)
- [ ] Submit to relevant communities (Reddit, HN, etc.)

### **Monitoring (First Week)**

1. **Day 1:** Google Search Console confirms URL crawled
2. **Day 3:** Check rankings on target keyword (probably position 20+, that's normal)
3. **Day 7:** Log impressions + CTR in Google Search Console
4. **Week 2:** Compare vs. expected estimate (BLOG_SCORING_RUBRIC.md)

---

## 📊 **Day 30: Score Your Post**

See: BLOG_SCORING_RUBRIC.md

Create a spreadsheet entry:

```
Blog Post: "How to Monitor TLS Certificates on Linux"
Published: 2026-05-06
Primary KW: "Monitor TLS certificates Linux"
KW Volume: 420/mo

RESULTS (Day 30):
- Impressions: [GSC data]
- Clicks: [GSC data]
- Avg Position: [GSC data]
- Estimated Traffic: [GSC clicks]
- Estimated Conversions: [calculator]

SEO SCORE: [0-100 from scoring rubric]
vs. Expected: [from keyword research]

NEXT: Better or worse than estimate?
  If better → Analyze why (do more of this)
  If worse → Debug issues (fix and re-optimize)
```

---

## 🔗 **Connected Documents (In Order)**

1. **BLOG_KEYWORD_RESEARCH.md** — Before you write
2. **BLOG_TOPICAL_STRATEGY.md** — Plan your cluster
3. **blog-template-seo.astro** — Your template (copy this)
4. **This document** ← Write your post
5. **BLOG_SCHEMA_IMPLEMENTATION.md** — Verify schema
6. **BLOG_SEO_CHECKLIST.md** — 30-point validation
7. **BLOG_SCORING_RUBRIC.md** — After publishing

---

## ⏱️ **Time Estimates**

| Phase | Time | Notes |
|-------|------|-------|
| Pre-writing research | 2-3 hours | Keyword + outline + competitor analysis |
| Writing (draft) | 3-4 hours | Fast, 70% quality |
| Editing (SEO) | 2-3 hours | Keywords, schema, links |
| Editing (readability) | 1-2 hours | Clarity, tone, grammar |
| Validation (checklist) | 1-2 hours | 30-point SEO checklist + schema test |
| Publish + monitoring setup | 1 hour | Go live + track in GSC |
| **TOTAL** | **~12-16 hours** | **For a quality, published post** |

---

## 💡 **Pro Tips**

- **Write in batches:** 3 posts a week (one per day) beats one post per week
- **Use templates:** Copy sections from previous posts (save 30% time)
- **Collaborate:** Author writes, editor SEO-checks, marketer promotes
- **Track everything:** Spreadsheet keeps you accountable
- **Iterate:** Every post improves your process

