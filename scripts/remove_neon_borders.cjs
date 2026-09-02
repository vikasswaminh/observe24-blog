const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.astro'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('rgba(0, 224, 138')) {
    content = content.replace(/border:\s*1px solid rgba\(0,\s*224,\s*138,\s*0\.4\);/g, 'border: 1.5px solid #cdebc2;');
    content = content.replace(/box-shadow:\s*0 8px 30px rgba\(0,\s*224,\s*138,\s*0\.1\);/g, 'box-shadow: 0 4px 20px rgba(42, 104, 13, 0.08);');
    content = content.replace(/background:\s*rgba\(0,\s*224,\s*138,\s*0\.15\);/g, 'background: rgba(59, 145, 18, 0.12);');
    fs.writeFileSync(filePath, content);
    console.log('Removed neon green border in:', file);
  }
});
