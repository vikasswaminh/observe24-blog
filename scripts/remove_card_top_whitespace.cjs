const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.astro'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace card div padding: 32px or 40px with padding: 18px 24px
  content = content.replace(
    /style="padding:\s*(?:32|40)px;\s*background:\s*var\(--bg-card/g,
    'style="padding: 18px 24px; background: var(--bg-card'
  );

  content = content.replace(
    /style="padding:\s*(?:32|40)px;\s*background:\s*#ffffff/g,
    'style="padding: 18px 24px; background: #ffffff'
  );

  // Set h3 inside cards to margin-top: 0
  content = content.replace(
    /<h3 style="font-size: 1\.6rem; font-weight: 800; margin-bottom: 16px; color: #2A680D;">/g,
    '<h3 style="font-size: 1.6rem; font-weight: 800; margin: 0 0 14px 0; color: #2A680D;">'
  );

  fs.writeFileSync(filePath, content);
  console.log('Removed card top whitespace in:', file);
});
