const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog';

['website-uptime-monitoring-complete-guide.astro', 'best-uptime-monitoring-tools-2026.astro'].forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Strip JSX comments outside of frontmatter
  const fmEnd = content.indexOf('---', 4);
  const frontmatter = content.substring(0, fmEnd + 3);
  let body = content.substring(fmEnd + 3);

  body = body.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');

  fs.writeFileSync(filePath, frontmatter + body);
  console.log('Stripped JSX comments from:', file);
});
