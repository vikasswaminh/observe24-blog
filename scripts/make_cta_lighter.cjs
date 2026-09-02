const fs = require('fs');
const path = require('path');

const OLD_CTA_MARKER = 'AI-powered uptime, logs, SIEM';

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

// 1. Update src/pages/blog.astro
const blogAstroPath = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog.astro';
let blogContent = fs.readFileSync(blogAstroPath, 'utf8');

blogContent = blogContent.replace(/\{\/\* GREEN CTA WIDGET CARD MATCHING USER SCREENSHOT \*\/\}[\s\S]*?<\/div>/, LIGHT_CTA_WIDGET_HTML);
blogContent = blogContent.replace(/\{\/\* LIGHT ELEGANT GREEN CTA CARD WIDGET \*\/\}[\s\S]*?<\/div>/, LIGHT_CTA_WIDGET_HTML);

fs.writeFileSync(blogAstroPath, blogContent);
console.log('Updated blog.astro to light green CTA widget');

// 2. Update all blog post files in src/pages/blog/*.astro
const dir = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.astro'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes(OLD_CTA_MARKER)) {
    content = content.replace(/\{\/\* GREEN CTA WIDGET CARD MATCHING USER SCREENSHOT \*\/\}[\s\S]*?<\/div>/, LIGHT_CTA_WIDGET_HTML);
    content = content.replace(/\{\/\* LIGHT ELEGANT GREEN CTA CARD WIDGET \*\/\}[\s\S]*?<\/div>/, LIGHT_CTA_WIDGET_HTML);
    fs.writeFileSync(filePath, content);
    console.log('Updated to light green CTA widget:', file);
  }
});
