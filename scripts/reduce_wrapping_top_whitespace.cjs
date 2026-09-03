const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.astro'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  let updated = false;

  // 1. Change section#wrapping-it-up padding from 18px 24px to 10px 24px 18px 24px
  if (content.includes('id="wrapping-it-up"')) {
    content = content.replace(
      /(id="wrapping-it-up"[^>]*?style="[^"]*?padding:\s*)18px 24px;/g,
      '$110px 24px 18px 24px;'
    );
    
    // 2. Reduce bottom margin of h2 in wrapping-it-up to 10px
    content = content.replace(
      /(id="wrapping-it-up"[\s\S]*?<h2 style="font-size:\s*1\.8rem;\s*font-weight:\s*800;\s*)margin:\s*0 0 14px 0;/g,
      '$1margin: 0 0 10px 0;'
    );

    fs.writeFileSync(filePath, content);
    console.log('Reduced wrapping-it-up top whitespace in:', file);
  }
});
