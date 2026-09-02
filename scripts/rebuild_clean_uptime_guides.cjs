const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.astro'));

const LIGHT_CTA_WIDGET_HTML = `
        {/* LIGHT ELEGANT GREEN CTA CARD WIDGET */}
        <div style="background: #f4fbf0; border: 1.5px solid #cdebc2; border-radius: 18px; padding: 24px 18px; margin-top: 24px; text-align: center; box-shadow: 0 4px 16px rgba(42, 104, 13, 0.06);">
          <p style="font-size: 0.96rem; line-height: 1.5; color: #2A680D; font-weight: 700; margin: 0 0 18px 0;">
            AI-powered uptime, logs, SIEM &amp;<br />AI agent observability in one<br />platform.
          </p>
          <a href="https://login.24observe.com/register" style="display: block; width: 100%; background: #2A680D !important; color: #ffffff !important; font-size: 0.95rem; font-weight: 800; padding: 12px 16px; border-radius: 10px; text-decoration: none !important; box-shadow: 0 4px 12px rgba(42, 104, 13, 0.2); transition: all 0.2s ease;" class="sidebar-cta-btn">
            Start free trial →
          </a>
        </div>`;

function fixFile(fileName) {
  const filePath = path.join(dir, fileName);
  let content = fs.readFileSync(filePath, 'utf8');

  // Parse Frontmatter
  const fmEnd = content.indexOf('---', 4);
  if (fmEnd === -1) return;
  let frontmatter = content.substring(0, fmEnd + 3);

  // Ensure FEATURED_GUIDES and PLATFORM_SPECIALS exist in frontmatter
  if (!frontmatter.includes('FEATURED_GUIDES')) {
    frontmatter += `\n\nconst FEATURED_GUIDES = [
  { title: "What Is AI Observability? (2026 Guide)", link: "/blog/what-is-ai-observability-complete-guide" },
  { title: "AI Agent Observability: How to Monitor", link: "/blog/ai-agent-observability-how-to-monitor" },
  { title: "SIEM vs Observability: Differences & Convergence", link: "/blog/siem-vs-observability-differences-overlap-converging" },
  { title: "Observability vs Monitoring: Key Differences", link: "/blog/observability-vs-monitoring-key-differences" },
  { title: "Website Uptime Monitoring Complete Guide", link: "/blog/website-uptime-monitoring-complete-guide" },
  { title: "Best Uptime Monitoring Tools in 2026", link: "/blog/best-uptime-monitoring-tools-2026" },
];\n`;
  }

  if (!frontmatter.includes('PLATFORM_SPECIALS')) {
    frontmatter += `\nconst PLATFORM_SPECIALS = [
  { title: "August 2026 Release Notes", link: "/blog#releases" },
  { title: "AI Agent API & OpenAPI Docs", link: "/docs/api-for-agents" },
  { title: "MCP Server Setup Guide", link: "/docs/mcp" },
  { title: "Self-Host Air-Gapped Setup", link: "/self-host" },
  { title: "SIEM & Threat Detections", link: "/product/siem" },
  { title: "AI Analyst Incident Response", link: "/product/ai-analyst" },
];\n`;
  }

  // Extract Hero Header
  let headerHtml = "";
  const headerMatch = content.match(/<header[\s\S]*?<\/header>/);
  if (headerMatch) headerHtml = headerMatch[0];

  // Extract TLDR
  let tldrHtml = "";
  const tldrMatch = content.match(/<section id="tldr"[\s\S]*?<\/section>/);
  if (tldrMatch) tldrHtml = tldrMatch[0];

  // Extract Key Takeaways
  let takeawaysHtml = "";
  const takeawaysMatch = content.match(/<section id="key-takeaways"[\s\S]*?<\/section>/);
  if (takeawaysMatch) takeawaysHtml = takeawaysMatch[0];

  // Extract Main Content Box sections
  let mainContentSections = "";
  const bodyStart = content.indexOf('<div class="blog-main-content-box"');
  let faqStart = content.indexOf('<section id="faq"');
  if (faqStart === -1) faqStart = content.indexOf('<section id="faq-section"');
  let wrappingStart = content.indexOf('<section id="wrapping-it-up"');
  if (wrappingStart === -1) wrappingStart = content.indexOf('<section id="wrapping-up"');

  let cutEnd = faqStart !== -1 ? faqStart : wrappingStart;

  if (bodyStart !== -1 && cutEnd !== -1 && cutEnd > bodyStart) {
    mainContentSections = content.substring(bodyStart, cutEnd).trim();
  }

  // Extract FAQ
  let faqHtml = "";
  const faqMatch = content.match(/<section id="faq"[\s\S]*?<\/section>/) || content.match(/<section id="faq-section"[\s\S]*?<\/section>/);
  if (faqMatch) faqHtml = faqMatch[0];

  // Extract Wrapping Up
  let wrappingUpHtml = "";
  const wrappingUpMatch = content.match(/<section id="wrapping-it-up"[\s\S]*?<\/section>/) || content.match(/<section id="wrapping-up"[\s\S]*?<\/section>/);
  if (wrappingUpMatch) wrappingUpHtml = wrappingUpMatch[0];

  // Build clean page template matching siem-vs-observability 100%
  const cleanTemplate = `${frontmatter}

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
        ${headerHtml}

        ${tldrHtml}

        ${takeawaysHtml}

        ${mainContentSections.includes('class="blog-main-content-box"') ? mainContentSections : `<div class="blog-main-content-box" style="padding: 32px; background: var(--bg-card, #ffffff); border: 1px solid #e2e8f0; border-radius: 16px; margin-bottom: 32px; width: 100%; box-shadow: 0 4px 16px rgba(0,0,0,0.03);">\n${mainContentSections}\n</div>`}

        ${faqHtml}

        ${wrappingUpHtml}
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
        ${LIGHT_CTA_WIDGET_HTML}
      </aside>

    </div>
  </main>
</Base>
`;

  fs.writeFileSync(filePath, cleanTemplate);
  console.log('Rebuilt clean Astro page for:', fileName);
}

files.forEach(f => fixFile(f));
