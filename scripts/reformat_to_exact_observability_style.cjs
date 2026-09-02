const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog';

const targetFiles = [
  'website-uptime-monitoring-complete-guide.astro',
  'best-uptime-monitoring-tools-2026.astro'
];

targetFiles.forEach(fileName => {
  const filePath = path.join(dir, fileName);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Standardize Header / Hero
  content = content.replace(/<h1[^>]*?>/g, '<h1 style="font-size: 2.2rem; font-weight: 800; line-height: 1.25; margin: 0 0 12px 0; color: #2A680D; width: 100%;">');
  content = content.replace(/<p class="lede"[^>]*?>/g, '<p style="font-size: 1.05rem; color: #475569; line-height: 1.55; margin: 0;">');

  // 2. Standardize TL;DR Section
  content = content.replace(/<section id="tldr"[^>]*?>/g, '<section id="tldr" style="background: rgba(59, 145, 18, 0.15); border-left: 5px solid #2A680D; border-radius: 10px; padding: 18px 22px; margin-bottom: 32px; width: 100%;">');
  content = content.replace(/<p style="font-size: 1\.1rem; line-height: 1\.75; color: #09090b; margin: 0;">/g, '<p style="font-size: 1.08rem; line-height: 1.7; color: #09090b; margin: 0;">');

  // 3. Standardize Key Takeaways Section
  content = content.replace(/<section id="key-takeaways"[^>]*?>/g, '<section id="key-takeaways" style="background: var(--bg-card, #ffffff); border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px 24px; margin-bottom: 32px; width: 100%; box-shadow: 0 4px 16px rgba(0,0,0,0.03);">');
  content = content.replace(/font-size: 1\.15rem;/g, 'font-size: 1.08rem;');
  content = content.replace(/font-size: 1\.1rem;/g, 'font-size: 1.08rem;');

  // 4. Standardize Main Content Box and Headings
  content = content.replace(/<div class="blog-main-content-box"[^>]*?>/g, '<div class="blog-main-content-box" style="padding: 32px; background: var(--bg-card, #ffffff); border: 1px solid #e2e8f0; border-radius: 16px; margin-bottom: 32px; width: 100%; box-shadow: 0 4px 16px rgba(0,0,0,0.03);">');
  content = content.replace(/<h2 class="h2"[^>]*?>/g, '<h2 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 18px; color: #2A680D;">');
  content = content.replace(/<h2 style="font-size: 2\.4rem;[^>]*?>/g, '<h2 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 18px; color: #2A680D;">');
  content = content.replace(/<p style="font-size: 1\.15rem; line-height: 1\.8; color: #09090b; margin-bottom: [0-9]+px;">/g, '<p style="font-size: 1.05rem; line-height: 1.75; color: #09090b; margin-bottom: 18px;">');

  // 5. Standardize FAQ Section
  content = content.replace(/<section id="faq"[^>]*?>/g, '<section id="faq" style="margin-bottom: 32px; padding: 32px; background: var(--bg-card, #ffffff); border: 1px solid #e2e8f0; border-radius: 14px; width: 100%; box-shadow: 0 4px 16px rgba(0,0,0,0.03);">');

  // 6. Standardize Wrapping It Up Section
  content = content.replace(/<section id="wrapping-it-up"[^>]*?>/g, '<section id="wrapping-it-up" style="background: var(--bg-card, #ffffff); border: 1px solid #e2e8f0; border-radius: 16px; padding: 36px 28px; margin-bottom: 32px; text-align: center; width: 100%; box-shadow: 0 4px 16px rgba(0,0,0,0.03);">');

  fs.writeFileSync(filePath, content);
  console.log('Reformatted to exact observability-vs-monitoring style:', fileName);
});
