const fs = require('fs');

const filesToUpdate = [
  'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog/ai-agent-observability-how-to-monitor.astro',
  'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog/website-uptime-monitoring-complete-guide.astro',
  'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog/what-is-uptime-monitoring-guide.astro',
  'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog/best-uptime-monitoring-tools-2026.astro',
];

filesToUpdate.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/date:\s*"2026-09-02"/g, 'date: "2026-08-20"');
  content = content.replace(/date:\s*"2026-08-21"/g, 'date: "2026-08-20"');
  fs.writeFileSync(filePath, content);
  console.log('Updated date to 2026-08-20 in:', filePath);
});

// Update blog.astro
let blogContent = fs.readFileSync('C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog.astro', 'utf8');
blogContent = blogContent.replace(/"date":\s*"2026-09-02"/g, '"date": "2026-08-20"');
blogContent = blogContent.replace(/"date":\s*"2026-08-21"/g, '"date": "2026-08-20"');
fs.writeFileSync('C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog.astro', blogContent);

// Update index.astro
let indexContent = fs.readFileSync('C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/index.astro', 'utf8');
indexContent = indexContent.replace(/date:\s*"2026-08-21"/g, 'date: "2026-08-20"');
fs.writeFileSync('C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/index.astro', indexContent);
