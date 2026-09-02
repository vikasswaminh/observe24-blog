const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.astro'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Replace padding: 40px with padding: 18px 24px in card containers
  content = content.replace(/style="padding:\s*40px;/g, 'style="padding: 18px 24px;');

  // 2. Reduce badge margin-bottom from 16px to 10px
  content = content.replace(/display:\s*inline-block;\s*margin-bottom:\s*16px;/g, 'display: inline-block; margin-bottom: 10px;');

  // 3. Reduce heading margin-bottom from 20px to 12px
  content = content.replace(/<h3 style="font-size: 1\.8rem; font-weight: 800; margin-bottom: 20px; color: #2A680D;">/g, '<h3 style="font-size: 1.8rem; font-weight: 800; margin: 0 0 12px 0; color: #2A680D;">');

  fs.writeFileSync(filePath, content);
  console.log('Made featured card compact in:', file);
});
