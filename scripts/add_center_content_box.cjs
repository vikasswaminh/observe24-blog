const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.astro'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if center content already has <div style="background: var(--bg-card, #ffffff); border: 1.5px solid #e2e8f0;
  if (!content.includes('border: 1.5px solid #e2e8f0; border-radius: 16px; padding: 28px 32px;')) {
    if (content.includes('class="blog-main-content-box"')) {
      content = content.replace(
        /style="[^"]*?"\s*class="blog-main-content-box"/g,
        'style="background: var(--bg-card, #ffffff); border: 1.5px solid #e2e8f0; border-radius: 16px; padding: 28px 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.03);" class="blog-main-content-box"'
      );
    } else {
      content = content.replace(
        /(<main style="flex:\s*1;\s*min-width:\s*0;">\s*)([\s\S]*?)(\s*<\/main>\s*\{?\/\*?\s*RIGHT SIDEBAR)/g,
        '$1<div style="background: var(--bg-card, #ffffff); border: 1.5px solid #e2e8f0; border-radius: 16px; padding: 28px 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.03);" class="blog-main-content-box">\n$2\n</div>$3'
      );
    }
    fs.writeFileSync(filePath, content);
    console.log('Ensured center container box in:', file);
  }
});
