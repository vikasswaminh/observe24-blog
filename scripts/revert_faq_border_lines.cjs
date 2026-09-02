const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.astro'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Revert Frequently Asked Questions heading to clean text without bottom border line
  content = content.replace(
    /<h2 style="font-size: 1\.8rem; font-weight: 800; margin: 0 0 20px 0; color: #2A680D; border-bottom: 2px solid rgba\(42, 104, 13, 0\.15\); padding-bottom: 12px;">Frequently Asked Questions<\/h2>/g,
    '<h2 style="font-size: 1.8rem; font-weight: 800; margin: 0 0 16px 0; color: #2A680D;">Frequently Asked Questions</h2>'
  );

  // 2. Revert circular '+' badge back to standard clean text toggle icon
  content = content.replace(
    /<span class="faq-toggle-icon" style="width: 28px; height: 28px; border-radius: 50%; background: #e8f8e5; color: #2A680D; display: inline-flex; align-items: center; justify-content: center; font-size: 1\.1rem; font-weight: 800; flex-shrink: 0; margin-left: 16px;">\+<\/span>/g,
    '<span class="faq-toggle-icon" style="font-size: 1.2rem; font-weight: 800; color: #2A680D; flex-shrink: 0; margin-left: 14px; display: inline-block;">+</span>'
  );

  fs.writeFileSync(filePath, content);
  console.log('Reverted FAQ border lines in:', file);
});
