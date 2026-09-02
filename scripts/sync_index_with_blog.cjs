const fs = require('fs');

const blogPath = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog.astro';
const indexPath = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/index.astro';

let content = fs.readFileSync(blogPath, 'utf8');

// Ensure activeNav="blog" is used
content = content.replace(/activeNav="[^"]*?"/, 'activeNav="blog"');

fs.writeFileSync(indexPath, content);
console.log('Synced index.astro with blog.astro 100%');
