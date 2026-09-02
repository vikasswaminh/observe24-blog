const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.astro'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace inner card padding: padding: 16px 20px -> padding: 10px 16px
  content = content.replace(
    /style="padding:\s*16px 20px;\s*background:\s*var\(--bg-card/g,
    'style="padding: 10px 16px; background: var(--bg-card'
  );

  content = content.replace(
    /style="padding:\s*16px 20px;\s*background:\s*#ffffff/g,
    'style="padding: 10px 16px; background: #ffffff'
  );

  // Set h4 inside cards to margin: 0 0 6px 0
  content = content.replace(
    /<h4 style="font-size: 1\.08rem; font-weight: 700; margin-bottom: 10px; color: #2A680D;">/g,
    '<h4 style="font-size: 1.08rem; font-weight: 700; margin: 0 0 6px 0; color: #2A680D;">'
  );

  content = content.replace(
    /<h4 style="font-size: 1\.15rem; font-weight: 700; margin: 0 0 6px 0; color: #ef4444;">/g,
    '<h4 style="font-size: 1.15rem; font-weight: 700; margin: 0 0 6px 0; color: #ef4444;">'
  );

  fs.writeFileSync(filePath, content);
  console.log('Made inner cards compact in:', file);
});
