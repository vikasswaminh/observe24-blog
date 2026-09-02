const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog';
const BENCHMARK_FILE = 'what-is-ai-observability-complete-guide.astro';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.astro') && f !== BENCHMARK_FILE);

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Standardize Header / Hero
  content = content.replace(/<header[^>]*?>/g, '<header style="margin-bottom: 24px; border-bottom: 1px solid #e2e8f0; padding-bottom: 24px; width: 100%;">');
  content = content.replace(/<h1[^>]*?>/g, '<h1 style="font-size: 2.2rem; font-weight: 800; line-height: 1.25; margin: 0 0 12px 0; color: #2A680D; width: 100%;">');
  content = content.replace(/<p class="lede"[^>]*?>/g, '<p style="font-size: 1.05rem; color: #475569; line-height: 1.55; margin: 0;">');

  // 2. Standardize TL;DR Section
  content = content.replace(/<section id="tldr"[^>]*?>/g, '<section id="tldr" style="background: rgba(59, 145, 18, 0.15); border-left: 5px solid #2A680D; border-radius: 10px; padding: 18px 22px; margin-bottom: 32px; width: 100%;">');
  content = content.replace(/<h3 style="font-size: 1\.08rem; font-weight: 800; color: #2A680D; margin: 0 0 6px 0;">TL;DR<\/h3>/g, '<h3 style="font-size: 1.15rem; font-weight: 800; color: #2A680D; margin: 0 0 6px 0;">TL;DR</h3>');

  // 3. Standardize Key Takeaways Section
  content = content.replace(/<section id="key-takeaways"[^>]*?>/g, '<section id="key-takeaways" style="background: var(--bg-card, #ffffff); border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px 24px; margin-bottom: 32px; width: 100%; box-shadow: 0 4px 16px rgba(0,0,0,0.03);">');
  content = content.replace(/<h3 style="font-size: 1\.3rem; font-weight: 800; color: #2A680D; margin: 0 0 10px 0;">/g, '<h3 style="font-size: 1.3rem; font-weight: 800; color: #2A680D; margin: 0 0 16px 0;">');

  // 4. Standardize Main Content Box
  content = content.replace(/<div class="blog-main-content-box"[^>]*?>/g, '<div class="blog-main-content-box" style="padding: 32px; background: var(--bg-card, #ffffff); border: 1px solid #e2e8f0; border-radius: 16px; margin-bottom: 32px; width: 100%; box-shadow: 0 4px 16px rgba(0,0,0,0.03);">');

  // 5. Standardize Section Headings and Body Paragraphs
  content = content.replace(/<h2 style="font-size: 2\.4rem;[^>]*?>/g, '<h2 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 18px; color: #2A680D;">');
  content = content.replace(/<h2 class="h2"[^>]*?>/g, '<h2 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 18px; color: #2A680D;">');
  content = content.replace(/<h2 style="font-size: 1\.8rem; font-weight: 800; margin-bottom: 12px; color: #2A680D;">/g, '<h2 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 18px; color: #2A680D;">');
  
  content = content.replace(/<p style="font-size: 1\.15rem; line-height: 1\.8; color: #09090b; margin-bottom: [0-9]+px;">/g, '<p style="font-size: 1.05rem; line-height: 1.75; color: #09090b; margin-bottom: 18px;">');
  content = content.replace(/<p style="font-size: 1\.08rem; line-height: 1\.8; color: #09090b; margin-bottom: [0-9]+px;">/g, '<p style="font-size: 1.05rem; line-height: 1.75; color: #09090b; margin-bottom: 18px;">');

  // 6. Standardize FAQ Section
  content = content.replace(/<section id="faq"[^>]*?>/g, '<section id="faq" style="margin-bottom: 36px; padding: 18px 24px; background: var(--bg-card, #ffffff); border: 1px solid #e2e8f0; border-radius: 14px; width: 100%; box-shadow: 0 4px 16px rgba(0,0,0,0.03);">');
  content = content.replace(/<details class="faq-item"[^>]*?>/g, '<details class="faq-item" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px 22px; transition: all 0.2s ease; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">');
  content = content.replace(/<p style="font-size: 1\.08rem; color: #1e293b; line-height: 1\.7; margin-top: 14px; margin-bottom: 0; padding-top: 14px; border-top: 1px solid #f1f5f9;">/g, '<p style="font-size: 1.02rem; color: #1e293b; line-height: 1.65; margin-top: 12px; margin-bottom: 0; padding-top: 12px; border-top: 1px solid #f1f5f9;">');

  // 7. Standardize Wrapping It Up Section
  content = content.replace(/<section id="wrapping-it-up"[^>]*?>/g, '<section id="wrapping-it-up" style="background: var(--bg-card, #ffffff); border: 1px solid #e2e8f0; border-radius: 16px; padding: 36px 28px; margin-bottom: 32px; text-align: center; width: 100%; box-shadow: 0 4px 16px rgba(0,0,0,0.03);">');
  content = content.replace(/<section id="wrapping-up"[^>]*?>/g, '<section id="wrapping-it-up" style="background: var(--bg-card, #ffffff); border: 1px solid #e2e8f0; border-radius: 16px; padding: 36px 28px; margin-bottom: 32px; text-align: center; width: 100%; box-shadow: 0 4px 16px rgba(0,0,0,0.03);">');
  
  content = content.replace(/<a href="https:\/\/login\.24observe\.com\/register" class="cta-btn"[^>]*?>/g, '<a href="https://login.24observe.com/register" class="cta-btn" style="display: inline-flex; align-items: center; justify-content: center; font-weight: 800; padding: 14px 36px; font-size: 1.1rem; background: #2A680D !important; color: #ffffff !important; text-decoration: none !important; border-radius: 8px; box-shadow: 0 4px 14px rgba(42, 104, 13, 0.25); transition: all 0.2s ease;">');

  fs.writeFileSync(filePath, content);
  console.log('Standardized to benchmark AI Observability Guide:', file);
});
