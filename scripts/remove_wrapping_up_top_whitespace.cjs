const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.astro'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace wrapping-it-up padding: 36px 28px with padding: 18px 24px
  content = content.replace(
    /(<section id="wrapping-it-up"[^>]*?style="[^"]*?)padding:\s*36px 28px;/g,
    '$1padding: 18px 24px;'
  );

  // Set h2 inside wrapping-it-up section to margin: 0 0 14px 0
  content = content.replace(
    /<h2 style="font-size: 1\.8rem; font-weight: 800; margin-bottom: 16px; color: #2A680D;">Wrapping It Up<\/h2>/g,
    '<h2 style="font-size: 1.8rem; font-weight: 800; margin: 0 0 14px 0; color: #2A680D;">Wrapping It Up</h2>'
  );

  fs.writeFileSync(filePath, content);
  console.log('Removed Wrapping It Up top whitespace in:', file);
});
