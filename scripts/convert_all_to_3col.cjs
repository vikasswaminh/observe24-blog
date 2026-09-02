const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.astro'));

const FEATURED_GUIDES_CODE = `const FEATURED_GUIDES = [
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
];`;

const LEFT_SIDEBAR_HTML = `
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
      </aside>`;

const RIGHT_SIDEBAR_HTML = `
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
      </aside>`;

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Add FEATURED_GUIDES and PLATFORM_SPECIALS if missing
  if (!content.includes('FEATURED_GUIDES')) {
    content = content.replace(/const ARTICLE_META = {[\s\S]*?};/, (match) => {
      return match + '\n\n' + FEATURED_GUIDES_CODE;
    });
  }

  // Ensure main wrapper padding matches blog.astro
  content = content.replace(/<div class="container" style="width: 100%; max-width: 1440px; margin: 0 auto; padding: 40px 24px;">\s*<article class="blog-article" style="width: 100%;">\s*<div class="blog-3col-layout" style="display: flex; gap: 32px; align-items: flex-start; position: relative;">/, 
    `<main style="max-width: 100%; padding: 16px clamp(24px, 3.5vw, 64px);">\n    <div style="display: flex; gap: 40px; align-items: flex-start;">`
  );

  // Replace blog-sidebar-left with desktop-sidebar matching blog.astro
  if (content.includes('blog-sidebar-left') || content.includes('blog-toc-sidebar')) {
    content = content.replace(/<aside class="blog-sidebar-left"[\s\S]*?<\/aside>/, LEFT_SIDEBAR_HTML);
    content = content.replace(/<aside class="blog-toc-sidebar"[\s\S]*?<\/aside>/, LEFT_SIDEBAR_HTML);
    content = content.replace(/<aside class="blog-sidebar-right"[\s\S]*?<\/aside>/, RIGHT_SIDEBAR_HTML);
  }

  // Update outer closing tags to </main>
  content = content.replace(/<\/div>\s*<\/article>\s*<\/div>/, `</main>\n    </div>\n  </main>`);

  fs.writeFileSync(filePath, content);
  console.log('Processed matching blog.astro:', file);
});
