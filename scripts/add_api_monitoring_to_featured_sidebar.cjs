const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.astro'));

const apiGuideEntry = `{ title: "API Monitoring Complete Guide (2026)", link: "/blog/api-monitoring-complete-guide" },`;

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('const FEATURED_GUIDES = [') && !content.includes('api-monitoring-complete-guide')) {
    content = content.replace(
      'const FEATURED_GUIDES = [\n',
      `const FEATURED_GUIDES = [\n  ${apiGuideEntry}\n`
    );
    content = content.replace(
      'const FEATURED_GUIDES = [',
      `const FEATURED_GUIDES = [\n  ${apiGuideEntry}`
    );

    // Deduplicate if needed
    fs.writeFileSync(filePath, content);
    console.log('Added API Monitoring Guide to FEATURED_GUIDES sidebar in:', file);
  }
});
