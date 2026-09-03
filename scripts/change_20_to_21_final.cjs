const fs = require('fs');

const filesToUpdate = [
  'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog/what-is-uptime-monitoring-guide.astro',
  'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog/best-uptime-monitoring-tools-2026.astro',
  'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog.astro',
  'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/index.astro'
];

filesToUpdate.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('2026-08-20')) {
    content = content.replace(/2026-08-20/g, '2026-08-21');
    fs.writeFileSync(filePath, content);
    console.log('Replaced 2026-08-20 with 2026-08-21 in:', filePath);
  }
});
