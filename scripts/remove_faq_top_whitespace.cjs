const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.astro'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace FAQ section padding: padding: 32px; -> padding: 18px 24px;
  content = content.replace(
    /(<section id="faq"[^>]*?style="[^"]*?)padding:\s*(?:32|36|40)px;/g,
    '$1padding: 18px 24px;'
  );

  // Replace Frequently Asked Questions h2 margin-top and margin-bottom to be compact
  content = content.replace(
    /<h2([^>]*?>\s*Frequently Asked Questions\s*<\/h2>)/gi,
    (match) => {
      if (match.includes('style=')) {
        return match.replace(/margin-bottom:\s*2[048]px;/, 'margin: 0 0 16px 0;').replace(/margin:\s*0\s*0\s*2[048]px\s*0;/, 'margin: 0 0 16px 0;');
      }
      return match.replace('<h2', '<h2 style="margin: 0 0 16px 0; font-size: 1.8rem; font-weight: 800; color: #2A680D;"');
    }
  );

  fs.writeFileSync(filePath, content);
  console.log('Removed FAQ top whitespace in:', file);
});
