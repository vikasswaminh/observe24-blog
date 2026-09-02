const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog';

const filesToFix = [
  'website-uptime-monitoring-complete-guide.astro',
  'best-uptime-monitoring-tools-2026.astro',
  'what-is-observability-guide-2026.astro',
  'what-is-uptime-monitoring-guide.astro',
  'custom-observability-guide.astro',
  'best-datadog-alternatives-2026.astro',
  'new-guide.astro',
  'latest-guide-2026.astro'
];

const TEMPLATE_START = `<Base
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
        </header>`;

const TEMPLATE_END = `      </main>

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
</Base>`;

filesToFix.forEach(file => {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Extract frontmatter block (everything up to </Base> or start of layout)
  const fmEndIdx = content.indexOf('<Base');
  if (fmEndIdx === -1) return;
  const frontmatter = content.substring(0, fmEndIdx).trim();

  // Extract Center Body Content (from after header/hero down to wrapping-it-up section)
  let centerBody = "";
  
  // Find TLDR or Key Takeaways or Main Content Box
  let bodyStart = content.indexOf('<section id="tldr"');
  if (bodyStart === -1) bodyStart = content.indexOf('<section id="key-takeaways"');
  if (bodyStart === -1) bodyStart = content.indexOf('<div class="blog-main-content-box"');

  let bodyEnd = content.indexOf('</main>\n\n      {/* RIGHT SIDEBAR');
  if (bodyEnd === -1) bodyEnd = content.indexOf('</aside>\n\n      </div>');
  if (bodyEnd === -1) bodyEnd = content.indexOf('</Base>');

  if (bodyStart !== -1 && bodyEnd !== -1 && bodyEnd > bodyStart) {
    centerBody = content.substring(bodyStart, bodyEnd).trim();
  }

  // Clean up any extra closing tags in centerBody
  centerBody = centerBody.replace(/<\/main>\s*<\/div>\s*<\/article>/g, '');
  centerBody = centerBody.replace(/<\/aside>/g, '');

  if (centerBody) {
    const newContent = `${frontmatter}\n\n${TEMPLATE_START}\n\n        ${centerBody}\n\n${TEMPLATE_END}\n`;
    fs.writeFileSync(filePath, newContent);
    console.log('Rebuilt page to match siem-vs-observability 100%:', file);
  }
});
