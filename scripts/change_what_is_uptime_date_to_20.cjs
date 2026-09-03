const fs = require('fs');

// 1. Update what-is-uptime-monitoring-guide.astro
const guidePath = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog/what-is-uptime-monitoring-guide.astro';
let guideContent = fs.readFileSync(guidePath, 'utf8');
guideContent = guideContent.replace(/date:\s*"2026-08-21"/g, 'date: "2026-08-20"');
fs.writeFileSync(guidePath, guideContent);
console.log('Updated date in what-is-uptime-monitoring-guide.astro to 2026-08-20');

// 2. Update blog.astro for what-is-uptime-monitoring-guide specifically
const blogPath = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog.astro';
let blogContent = fs.readFileSync(blogPath, 'utf8');
blogContent = blogContent.replace(
  /"title": "What Is Uptime Monitoring[\s\S]*?"date": "2026-08-21"/,
  (match) => match.replace('"2026-08-21"', '"2026-08-20"')
);
fs.writeFileSync(blogPath, blogContent);
console.log('Updated date in blog.astro to 2026-08-20');

// 3. Update index.astro for what-is-uptime-monitoring-guide specifically
const indexPath = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/index.astro';
let indexContent = fs.readFileSync(indexPath, 'utf8');
indexContent = indexContent.replace(
  /What Is Uptime Monitoring[\s\S]*?date:\s*"2026-08-21"/,
  (match) => match.replace('"2026-08-21"', '"2026-08-20"')
);
fs.writeFileSync(indexPath, indexContent);
console.log('Updated date in index.astro to 2026-08-20');
