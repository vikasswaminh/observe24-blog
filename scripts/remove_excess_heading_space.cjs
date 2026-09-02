const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.astro'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Reduce h2 margin-bottom from 24px/28px to 12px
  content = content.replace(/margin-bottom:\s*2[48]px;([^"']*?color:\s*#2A680D;)/g, 'margin-bottom: 12px;$1');
  content = content.replace(/(color:\s*#2A680D;[^"']*?)margin-bottom:\s*2[48]px;/g, '$1margin-bottom: 12px;');

  // 2. Reduce card container padding from padding: 24px to padding: 16px 20px
  content = content.replace(/style="padding:\s*24px;\s*background:\s*var\(--bg-card/g, 'style="padding: 16px 20px; background: var(--bg-card');

  // 3. Reduce gap in flex column containers from gap: 20px/18px to gap: 12px
  content = content.replace(/gap:\s*1[89]px;/g, 'gap: 12px;');
  content = content.replace(/gap:\s*20px;/g, 'gap: 12px;');

  // 4. Reduce margin-bottom on h4 titles inside card blocks to 6px
  content = content.replace(/margin-bottom:\s*8px;\s*color:\s*#ef4444;/g, 'margin: 0 0 6px 0; color: #ef4444;');

  // 5. Reduce section margin-bottom from 56px/48px to 32px
  content = content.replace(/margin-bottom:\s*[45][06]px;/g, 'margin-bottom: 32px;');

  fs.writeFileSync(filePath, content);
  console.log('Removed excess vertical space in:', file);
});
