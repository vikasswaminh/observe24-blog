const fs = require('fs');

// Update ai-agent-observability-how-to-monitor.astro
const articlePath = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog/ai-agent-observability-how-to-monitor.astro';
let articleContent = fs.readFileSync(articlePath, 'utf8');
articleContent = articleContent.replace(/date:\s*"2026-08-20"/g, 'date: "2026-08-21"');
articleContent = articleContent.replace(/date:\s*"2026-09-02"/g, 'date: "2026-08-21"');
fs.writeFileSync(articlePath, articleContent);
console.log('Updated date to 2026-08-21 in ai-agent-observability-how-to-monitor.astro');

// Update blog.astro
const blogPath = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog.astro';
let blogContent = fs.readFileSync(blogPath, 'utf8');
blogContent = blogContent.replace(
  /"title": "AI Agent Observability: How to Monitor AI Agents in Production"[\s\S]*?"date": "(2026-08-20|2026-09-02)"/,
  (match) => match.replace(/"date": "(2026-08-20|2026-09-02)"/, '"date": "2026-08-21"')
);
fs.writeFileSync(blogPath, blogContent);
console.log('Updated date to 2026-08-21 in blog.astro');
