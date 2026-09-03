const fs = require('fs');

const filesToUpdate = [
  'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog/ai-agent-observability-how-to-monitor.astro',
  'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog/website-uptime-monitoring-complete-guide.astro',
  'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog.astro'
];

filesToUpdate.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('2026-09-01')) {
    content = content.replace(/2026-09-01/g, '2026-09-02');
    fs.writeFileSync(filePath, content);
    console.log('Replaced 2026-09-01 with 2026-09-02 in:', filePath);
  }
});
