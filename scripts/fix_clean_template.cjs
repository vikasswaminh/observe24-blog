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

const RIGHT_SIDEBAR_EXACT = `      {/* RIGHT SIDEBAR: PLATFORM SPECIAL (EXACT MATCH FOR BLOG.ASTRO) */}
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

  // Strip duplicate <aside class="desktop-sidebar"> or broken right sidebars at the end
  let endWrappingUpIdx = content.indexOf('</section>\n      </main>');
  if (endWrappingUpIdx === -1) endWrappingUpIdx = content.indexOf('</section>\n        </main>');
  if (endWrappingUpIdx === -1) endWrappingUpIdx = content.indexOf('Start free with 24Observe →\n            </a>\n          </div>\n        </section>');

  if (endWrappingUpIdx !== -1) {
    const endSectionTag = content.indexOf('</section>', endWrappingUpIdx);
    if (endSectionTag !== -1) {
      const cleanHeaderToSection = content.substring(0, endSectionTag + 10);
      const cleanFullFile = cleanHeaderToSection + '\n      </main>\n\n' + RIGHT_SIDEBAR_EXACT + '\n';
      fs.writeFileSync(filePath, cleanFullFile);
      console.log('Cleaned and fixed right sidebar for:', file);
    }
  }
});
