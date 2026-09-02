const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.astro'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Add border line below Frequently Asked Questions heading
  content = content.replace(
    /<h2([^>]*?>\s*Frequently Asked Questions\s*<\/h2>)/gi,
    '<h2 style="font-size: 1.8rem; font-weight: 800; margin: 0 0 20px 0; color: #2A680D; border-bottom: 2px solid rgba(42, 104, 13, 0.15); padding-bottom: 12px;">Frequently Asked Questions</h2>'
  );

  // 2. Add border lines and rounded badge to FAQ item cards
  content = content.replace(
    /<details class="faq-item"[^>]*?>/g,
    '<details class="faq-item" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px 22px; transition: all 0.2s ease; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">'
  );

  // 3. Style circular green '+' toggle icon matching screenshot
  content = content.replace(
    /<span class="faq-toggle-icon"[^>]*?>\+<\/span>/g,
    '<span class="faq-toggle-icon" style="width: 28px; height: 28px; border-radius: 50%; background: #e8f8e5; color: #2A680D; display: inline-flex; align-items: center; justify-content: center; font-size: 1.1rem; font-weight: 800; flex-shrink: 0; margin-left: 16px;">+</span>'
  );

  fs.writeFileSync(filePath, content);
  console.log('Added FAQ border lines in:', file);
});
