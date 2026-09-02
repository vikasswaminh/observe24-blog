const fs = require('fs');
const path = require('path');

const CTA_WIDGET_HTML = `
        {/* GREEN CTA WIDGET CARD MATCHING USER SCREENSHOT */}
        <div style="background: #27650B; border-radius: 20px; padding: 28px 20px; margin-top: 24px; text-align: center; box-shadow: 0 10px 25px rgba(39, 101, 11, 0.22);">
          <p style="font-size: 1.05rem; line-height: 1.5; color: #091a03; font-weight: 700; margin: 0 0 22px 0;">
            AI-powered uptime, logs, SIEM &amp;<br />AI agent observability in one<br />platform.
          </p>
          <a href="https://login.24observe.com/register" style="display: block; width: 100%; background: #ffffff !important; color: #27650B !important; font-size: 1.05rem; font-weight: 800; padding: 14px 20px; border-radius: 12px; text-decoration: none !important; box-shadow: 0 4px 14px rgba(0,0,0,0.12); transition: all 0.2s ease;" class="sidebar-cta-btn">
            Start free trial →
          </a>
        </div>`;

// 1. Update src/pages/blog.astro
const blogAstroPath = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog.astro';
let blogContent = fs.readFileSync(blogAstroPath, 'utf8');

if (!blogContent.includes('AI-powered uptime, logs, SIEM')) {
  blogContent = blogContent.replace(
    /<a href="\/docs" style="display: inline-block; margin-top: 10px; padding-left: 10px; font-size: 0.88rem; font-weight: 700; color: #3B9112; text-decoration: none;">\s*View All Specials →\s*<\/a>/,
    `<a href="/docs" style="display: inline-block; margin-top: 10px; padding-left: 10px; font-size: 0.88rem; font-weight: 700; color: #3B9112; text-decoration: none;">
          View All Specials →
        </a>${CTA_WIDGET_HTML}`
  );
  fs.writeFileSync(blogAstroPath, blogContent);
  console.log('Added green CTA widget to blog.astro');
}

// 2. Update all blog post files in src/pages/blog/*.astro
const dir = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.astro'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('AI-powered uptime, logs, SIEM')) {
    content = content.replace(
      /<a href="\/docs" style="display: inline-block; margin-top: 10px; padding-left: 10px; font-size: 0.88rem; font-weight: 700; color: #3B9112; text-decoration: none;">\s*View All Specials →\s*<\/a>/,
      `<a href="/docs" style="display: inline-block; margin-top: 10px; padding-left: 10px; font-size: 0.88rem; font-weight: 700; color: #3B9112; text-decoration: none;">
          View All Specials →
        </a>${CTA_WIDGET_HTML}`
    );
    fs.writeFileSync(filePath, content);
    console.log('Added green CTA widget to:', file);
  }
});
