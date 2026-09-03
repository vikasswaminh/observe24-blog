const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (file.endsWith('.astro') || file.endsWith('.js') || file.endsWith('.ts') || file.endsWith('.json')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('2026-08-21')) {
        content = content.replace(/2026-08-21/g, '2026-08-20');
        fs.writeFileSync(fullPath, content);
        console.log('Replaced 2026-08-21 with 2026-08-20 in:', file);
      }
    }
  });
}

processDir('C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src');
