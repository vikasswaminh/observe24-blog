const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.astro'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  let updated = false;

  // 1. Change blog-main-content-box padding from 18px 24px to 10px 24px 18px 24px
  if (content.includes('class="blog-main-content-box"')) {
    content = content.replace(
      /class="blog-main-content-box"\s*style="padding:\s*18px 24px;/g,
      'class="blog-main-content-box" style="padding: 10px 24px 18px 24px;'
    );
    content = content.replace(
      /style="padding:\s*18px 24px;([^"]*?)"\s*class="blog-main-content-box"/g,
      'style="padding: 10px 24px 18px 24px;$1" class="blog-main-content-box"'
    );
    updated = true;
  }

  // 2. Reduce top margin on the introduction section or first h2 heading inside blog-main-content-box
  content = content.replace(
    /(<section id="introduction"[^>]*?>\s*<h2 style="font-size:\s*1\.8rem;\s*font-weight:\s*800;\s*)margin-bottom:\s*18px;/g,
    '$1margin: 0 0 12px 0;'
  );
  content = content.replace(
    /(<section id="introduction"[^>]*?>\s*<h2 style="font-size:\s*1\.8rem;\s*font-weight:\s*800;\s*)margin:\s*0 0 18px 0;/g,
    '$1margin: 0 0 12px 0;'
  );

  if (updated || content !== fs.readFileSync(filePath, 'utf8')) {
    fs.writeFileSync(filePath, content);
    console.log('Reduced intro top whitespace in:', file);
  }
});
