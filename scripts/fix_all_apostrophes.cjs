const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog';

['website-uptime-monitoring-complete-guide.astro', 'best-uptime-monitoring-tools-2026.astro'].forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  const fmEnd = content.indexOf('---', 4);
  const frontmatter = content.substring(0, fmEnd + 3);
  let body = content.substring(fmEnd + 3);

  // Replace single quotes inside HTML tags text content: >text's text<
  body = body.replace(/>([^<]*?)</g, (match, p1) => {
    // If p1 contains single quotes and doesn't look like an attribute
    if (p1.includes("'")) {
      const fixed = p1.replace(/'/g, '&apos;');
      return `>${fixed}<`;
    }
    return match;
  });

  fs.writeFileSync(filePath, frontmatter + body);
  console.log('Fixed apostrophes in body of:', file);
});
