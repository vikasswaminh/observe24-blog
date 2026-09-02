const fs = require('fs');
const path = require('path');

function slugify(text) {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
}

function formatTakeaway(t) {
  const clean = t.replace(/^[•\-\d\.]+\s*/, '').trim();
  let splitIdx = clean.search(/[\.\:\?]/);
  if (splitIdx > 10 && splitIdx < 75) {
    const prefix = clean.substring(0, splitIdx).trim();
    const rest = clean.substring(splitIdx + 1).trim();
    return { prefix: prefix + ':', rest: rest };
  }
  let commaIdx = clean.indexOf(',');
  if (commaIdx > 10 && commaIdx < 55) {
    const prefix = clean.substring(0, commaIdx).trim();
    const rest = clean.substring(commaIdx + 1).trim();
    return { prefix: prefix + ':', rest: rest };
  }
  const words = clean.split(' ');
  if (words.length > 5) {
    return { prefix: words.slice(0, 4).join(' ') + ':', rest: words.slice(4).join(' ') };
  }
  return { prefix: clean, rest: '' };
}

function processArticle(rawFilePath, targetFilePath, metaCategory) {
  const rawText = fs.readFileSync(rawFilePath, 'utf8');
  let content = rawText;
  if (rawText.includes('<USER_REQUEST>')) {
    content = rawText.split('<USER_REQUEST>')[1].split('</USER_REQUEST>')[0];
  }

  // Parse lines
  const lines = content.split('\n').map(l => l.trim('\r'));

  // Extract Metadata
  let title = "Article Title";
  let description = "Article Description";
  let date = "2026-08-31";
  let readTime = "21 min read";
  let category = metaCategory;

  for (let l of lines) {
    if (l.match(/^title:\s*[\"“](.*?)[\"”]/i)) title = l.match(/^title:\s*[\"“](.*?)[\"”]/i)[1];
    else if (l.match(/^description:\s*[\"“](.*?)[\"”]/i)) description = l.match(/^description:\s*[\"“](.*?)[\"”]/i)[1];
    else if (l.match(/^date:\s*[\"“](.*?)[\"”]/i)) date = l.match(/^date:\s*[\"“](.*?)[\"”]/i)[1];
    else if (l.match(/^readTime:\s*[\"“](.*?)[\"”]/i)) readTime = l.match(/^readTime:\s*[\"“](.*?)[\"”]/i)[1];
    else if (l.match(/^Category:\s*[\"“](.*?)[\"”]/i)) category = l.match(/^Category:\s*[\"“](.*?)[\"”]/i)[1];
  }

  if (title === "Article Title" && lines[0] && !lines[0].includes(':')) {
    title = lines[0].replace(/^#+\s*/, '').trim();
  }

  // Extract TL;DR
  let tldr = "";
  let inTldr = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/^TL;\s*DR/i) || lines[i].match(/^TL;DR/i)) {
      inTldr = true;
      continue;
    }
    if (inTldr) {
      if (lines[i].match(/^title:/i) || lines[i].match(/^Key Takeaway/i) || lines[i].startsWith('#')) {
        inTldr = false;
      } else if (lines[i].trim()) {
        tldr += (tldr ? " " : "") + lines[i].trim();
      }
    }
  }

  // Extract Key Takeaways
  const takeaways = [];
  let inTakeaways = false;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/^Key Takeaway/i)) {
      inTakeaways = true;
      continue;
    }
    if (inTakeaways) {
      if (lines[i].startsWith('#') || (lines[i].trim().length > 0 && !lines[i].includes('•') && !lines[i].includes('-') && !lines[i].trim().match(/^\d+\./) && !lines[i].startsWith(' ') && i > 30)) {
        inTakeaways = false;
      } else if (lines[i].includes('•') || lines[i].startsWith('-') || lines[i].trim().match(/^\d+\./)) {
        const clean = lines[i].replace(/^[•\-\d\.]+\s*/, '').trim();
        if (clean) takeaways.push(clean);
      }
    }
  }

  // Build Sections Body
  const sections = [];

  // Main content parsing
  let currentSection = null;
  let currentParagraphs = [];
  let inFaq = false;
  const faqs = [];
  let inWrappingUp = false;
  let wrappingUpParagraphs = [];

  // Identify Body Lines
  let startIdx = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/^Key Takeaway/i)) {
      startIdx = i + 1;
      while (startIdx < lines.length && (lines[startIdx].includes('•') || lines[startIdx].startsWith('-') || lines[startIdx].trim().match(/^\d+\./) || !lines[startIdx].trim())) {
        startIdx++;
      }
      break;
    }
  }

  for (let i = startIdx; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Skip metadata lines and duplicate headings
    if (line.match(/^(title|description|Category|keywords|date|readTime):/i)) continue;
    if (line.match(/^Start free with 24Observe/i) || line.includes('now add this blog') || line.includes('Updated 2026')) continue;
    if (line.match(/^TL;\s*DR/i) || line.match(/^Key Takeaway/i)) continue;

    // FAQ check
    if (line.match(/^Frequently Asked Questions/i) || line.match(/^FAQ/i)) {
      if (currentSection) {
        sections.push({ title: currentSection, content: currentParagraphs });
        currentSection = null;
        currentParagraphs = [];
      }
      inFaq = true;
      continue;
    }

    // Wrapping Up check
    if (line.match(/^Wrapping (Up|It Up)/i)) {
      if (currentSection) {
        sections.push({ title: currentSection, content: currentParagraphs });
        currentSection = null;
        currentParagraphs = [];
      }
      inFaq = false;
      inWrappingUp = true;
      continue;
    }

    if (inWrappingUp) {
      if (line && !line.includes('Start free')) {
        wrappingUpParagraphs.push(line);
      }
      continue;
    }

    if (inFaq) {
      if (line.endsWith('?') || line.match(/^(What|How|Why|Do|Can|Is|Should)\s+/i)) {
        faqs.push({ q: line.replace(/^\d+\.\s*/, ''), a: "" });
      } else if (faqs.length > 0) {
        faqs[faqs.length - 1].a += (faqs[faqs.length - 1].a ? " " : "") + line;
      }
      continue;
    }

    // Main Section Headings
    const isHeading = line.startsWith('#') || 
                      (line.length < 80 && !line.endsWith('.') && !line.endsWith(',') && !line.includes('24Observe') &&
                       (lines[i-1] === '' || lines[i-1] === undefined) && (lines[i+1] !== undefined));

    if (isHeading) {
      const cleanH = line.replace(/^#+\s*/, '').trim();
      if (currentSection) {
        sections.push({ title: currentSection, content: currentParagraphs });
      }
      currentSection = cleanH;
      currentParagraphs = [];
    } else {
      if (!currentSection) {
        currentSection = "Introduction";
      }
      currentParagraphs.push(line);
    }
  }

  if (currentSection) {
    sections.push({ title: currentSection, content: currentParagraphs });
  }

  // Format 3-Column Astro Code matching blog.astro layout 100%
  const astroCode = `---
import Base from '../../layouts/Base.astro';

const ARTICLE_META = {
  title: ${JSON.stringify(title)},
  author: "The 24Observe Engineering Team",
  date: ${JSON.stringify(date)},
  readTime: ${JSON.stringify(readTime)},
  category: ${JSON.stringify(category)},
  description: ${JSON.stringify(description)},
  slug: ${JSON.stringify(targetFilePath.split('/').pop().replace('.astro', ''))},
};

const FEATURED_GUIDES = [
  { title: "What Is AI Observability? (2026 Guide)", link: "/blog/what-is-ai-observability-complete-guide" },
  { title: "AI Agent Observability: How to Monitor", link: "/blog/ai-agent-observability-how-to-monitor" },
  { title: "SIEM vs Observability: Differences & Convergence", link: "/blog/siem-vs-observability-differences-overlap-converging" },
  { title: "Observability vs Monitoring: Key Differences", link: "/blog/observability-vs-monitoring-key-differences" },
  { title: "Website Uptime Monitoring Complete Guide", link: "/blog/website-uptime-monitoring-complete-guide" },
  { title: "Best Uptime Monitoring Tools in 2026", link: "/blog/best-uptime-monitoring-tools-2026" },
];

const PLATFORM_SPECIALS = [
  { title: "August 2026 Release Notes", link: "/blog#releases" },
  { title: "June 2026 Release Notes", link: "/blog#releases" },
  { title: "May 2026 (Phase 2 — Agent API)", link: "/blog#releases" },
  { title: "AI Agent API & Open API", link: "/docs/api-for-agents" },
  { title: "MCP Server Setup Guide", link: "/docs/mcp" },
  { title: "Self-Host Air-Gapped Setup", link: "/self-host" },
];

const FAQS = ${JSON.stringify(faqs, null, 2)};
---

<Base
  activeNav="blog"
  title={ARTICLE_META.title}
  description={ARTICLE_META.description}
>
  <main style="max-width: 100%; padding: 16px clamp(24px, 3.5vw, 64px);">
    
    {/* DESKTOP 3-COLUMN LAYOUT MATCHING BLOG.ASTRO EXACTLY */}
    <div style="display: flex; gap: 40px; align-items: flex-start;">
      
      {/* LEFT SIDEBAR: FEATURED GUIDES (EXACT MATCH FOR BLOG.ASTRO) */}
      <aside class="desktop-sidebar" style="width: 270px; flex-shrink: 0; position: sticky; top: 80px;">
        <div style="margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          <span style="background: #3B9112; color: #ffffff; font-size: 0.78rem; font-weight: 800; padding: 4px 14px; border-radius: 20px; letter-spacing: 0.05em; text-transform: uppercase;">
            FEATURED GUIDES
          </span>
        </div>
        <nav style="display: flex; flex-direction: column; gap: 3px;">
          {FEATURED_GUIDES.map((g) => (
            <a
              href={g.link}
              style={g.link.includes(ARTICLE_META.slug) ? "padding: 6px 10px; font-size: 0.90rem; color: #2A680D; font-weight: 700; text-decoration: none; border-radius: 8px; background: rgba(59, 145, 18, 0.08); transition: all 0.2s ease; line-height: 1.35;" : "padding: 6px 10px; font-size: 0.90rem; color: #111827; font-weight: 600; text-decoration: none; border-radius: 8px; transition: all 0.2s ease; line-height: 1.35;"}
              class="sidebar-nav-item"
            >
              {g.title}
            </a>
          ))}
        </nav>
        <a href="/blog" style="display: inline-block; margin-top: 10px; padding-left: 10px; font-size: 0.88rem; font-weight: 700; color: #3B9112; text-decoration: none;">
          View All Guides →
        </a>
      </aside>

      {/* CENTER MAIN ARTICLE CONTENT */}
      <main style="flex: 1; min-width: 0;">
        {/* HERO HEADER */}
        <header style="margin-bottom: 24px; border-bottom: 1px solid #e2e8f0; padding-bottom: 24px; width: 100%;">
          <div style="display: flex; gap: 10px; font-size: 0.88rem; font-weight: 800; color: #2A680D; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">
            <span>{ARTICLE_META.category}</span>
            <span>•</span>
            <span>{ARTICLE_META.date}</span>
            <span>•</span>
            <span>{ARTICLE_META.readTime}</span>
          </div>
          <h1 style="font-size: 2.2rem; font-weight: 800; line-height: 1.25; margin: 0 0 12px 0; color: #2A680D; width: 100%;">
            {ARTICLE_META.title}
          </h1>
          <p style="font-size: 1.05rem; color: #475569; line-height: 1.55; margin: 0;">
            {ARTICLE_META.description}
          </p>
        </header>

        ${tldr ? `
        {/* TL;DR BOX */}
        <section id="tldr" style="background: rgba(59, 145, 18, 0.15); border-left: 5px solid #2A680D; border-radius: 10px; padding: 18px 22px; margin-bottom: 32px; width: 100%;">
          <h3 style="font-size: 1.15rem; font-weight: 800; color: #2A680D; margin: 0 0 6px 0;">TL;DR</h3>
          <p style="font-size: 1.08rem; line-height: 1.7; color: #09090b; margin: 0;">
            ${tldr}
          </p>
        </section>` : ''}

        ${takeaways.length > 0 ? `
        {/* KEY TAKEAWAYS BOX WITH HIGHLIGHTED TITLES */}
        <section id="key-takeaways" style="background: var(--bg-card, #ffffff); border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px 24px; margin-bottom: 32px; width: 100%; box-shadow: 0 4px 16px rgba(0,0,0,0.03);">
          <h3 style="font-size: 1.3rem; font-weight: 800; color: #2A680D; margin: 0 0 16px 0;">
            Key Takeaways
          </h3>
          <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 16px;">
            ${takeaways.map(t => {
              const item = formatTakeaway(t);
              return `
            <li style="display: flex; gap: 12px; font-size: 1.08rem; line-height: 1.7; color: #09090b; text-align: left;">
              <span style="color: #2A680D; font-size: 1.2rem; line-height: 1.4; flex-shrink: 0;">•</span>
              <div>
                <strong style="color: #2A680D; font-weight: 800;">${item.prefix}</strong> ${item.rest}
              </div>
            </li>`;
            }).join('')}
          </ul>
        </section>` : ''}

        {/* MAIN CONTENT BOX */}
        <div class="blog-main-content-box" style="padding: 32px; background: var(--bg-card, #ffffff); border: 1px solid #e2e8f0; border-radius: 16px; margin-bottom: 32px; width: 100%; box-shadow: 0 4px 16px rgba(0,0,0,0.03);">
          ${sections.map(s => `
          <section id="${slugify(s.title)}" style="margin-bottom: 36px; width: 100%;">
            <h2 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 18px; color: #2A680D;">
              ${s.title}
            </h2>
            ${s.content.map(p => {
              if (p.startsWith('-') || p.startsWith('•')) {
                return `<li style="font-size: 1.05rem; line-height: 1.75; color: #09090b; margin-bottom: 10px; margin-left: 20px;">${p.replace(/^[•\-]\s*/, '')}</li>`;
              }
              return `<p style="font-size: 1.05rem; line-height: 1.75; color: #09090b; margin-bottom: 18px;">${p}</p>`;
            }).join('\n')}
          </section>`).join('\n')}
        </div>

        ${faqs.length > 0 ? `
        {/* FAQ SECTION */}
        <section id="faq" style="margin-bottom: 36px; padding: 32px; background: var(--bg-card, #ffffff); border: 1px solid #e2e8f0; border-radius: 14px; width: 100%; box-shadow: 0 4px 16px rgba(0,0,0,0.03);">
          <h2 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 20px; color: #2A680D;">
            Frequently Asked Questions
          </h2>
          <div style="display: flex; flex-direction: column; gap: 12px; width: 100%;">
            {FAQS.map((faq) => (
              <details class="faq-item" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px 20px; transition: all 0.2s ease;">
                <summary style="display: flex; align-items: center; justify-content: space-between; font-size: 1.08rem; font-weight: 700; color: #2A680D; cursor: pointer; list-style: none; user-select: none;">
                  <span>{faq.q}</span>
                  <span class="faq-toggle-icon" style="font-size: 1.2rem; font-weight: 800; color: #2A680D; flex-shrink: 0; margin-left: 14px; display: inline-block;">+</span>
                </summary>
                <p style="font-size: 1.02rem; color: #1e293b; line-height: 1.65; margin-top: 12px; margin-bottom: 0; padding-top: 12px; border-top: 1px solid #f1f5f9;">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>` : ''}

        {/* WRAPPING IT UP SECTION */}
        <section id="wrapping-it-up" style="background: var(--bg-card, #ffffff); border: 1px solid #e2e8f0; border-radius: 16px; padding: 36px 28px; margin-bottom: 32px; text-align: center; width: 100%; box-shadow: 0 4px 16px rgba(0,0,0,0.03);">
          <h2 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 16px; color: #2A680D;">Wrapping It Up</h2>
          ${wrappingUpParagraphs.map(p => `<p style="font-size: 1.05rem; line-height: 1.75; color: #09090b; margin-bottom: 16px; max-width: 850px; margin-left: auto; margin-right: auto;">${p}</p>`).join('\n')}

          <div style="display: flex; justify-content: center; align-items: center; width: 100%; margin-top: 14px;">
            <a href="https://login.24observe.com/register" class="btn btn-primary btn-lg" style="display: inline-flex; align-items: center; justify-content: center; text-align: center; font-weight: 800; padding: 14px 36px; font-size: 1.1rem; line-height: 1; background: #2A680D !important; color: #ffffff !important; text-decoration: none !important; border-radius: 8px; box-shadow: 0 4px 14px rgba(42, 104, 13, 0.25);">
              Start free with 24Observe →
            </a>
          </div>
        </section>
      </main>

      {/* RIGHT SIDEBAR: PLATFORM SPECIAL (EXACT MATCH FOR BLOG.ASTRO) */}
      <aside class="desktop-sidebar" style="width: 270px; flex-shrink: 0; position: sticky; top: 80px;">
        <div style="margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
          <span style="background: #3B9112; color: #ffffff; font-size: 0.78rem; font-weight: 800; padding: 4px 14px; border-radius: 20px; letter-spacing: 0.05em; text-transform: uppercase;">
            PLATFORM SPECIAL
          </span>
        </div>
        <nav style="display: flex; flex-direction: column; gap: 3px;">
          {PLATFORM_SPECIALS.map((s) => (
            <a
              href={s.link}
              style="padding: 6px 10px; font-size: 0.90rem; color: #111827; font-weight: 600; text-decoration: none; border-radius: 8px; transition: all 0.2s ease; line-height: 1.35;"
              class="sidebar-nav-item"
            >
              {s.title}
            </a>
          ))}
        </nav>
        <a href="/docs" style="display: inline-block; margin-top: 10px; padding-left: 10px; font-size: 0.88rem; font-weight: 700; color: #3B9112; text-decoration: none;">
          View All Specials →
        </a>
      </aside>

    </div>
  </main>
</Base>
`;

  fs.writeFileSync(targetFilePath, astroCode);
  console.log('Successfully generated page matching blog.astro 100%:', targetFilePath);
}

processArticle(
  'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/scripts/raw_prompt_1180.txt',
  'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog/observability-vs-monitoring-key-differences.astro',
  'OBSERVABILITY'
);

processArticle(
  'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/scripts/raw_prompt_1198.txt',
  'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog/ai-agent-observability-how-to-monitor.astro',
  'AI SECURITY'
);

processArticle(
  'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/scripts/raw_prompt_1216.txt',
  'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog/siem-vs-observability-differences-overlap-converging.astro',
  'SIEM & OBSERVABILITY'
);

processArticle(
  'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/scripts/raw_prompt_1253.txt',
  'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog/what-is-ai-observability-complete-guide.astro',
  'AI OBSERVABILITY'
);
