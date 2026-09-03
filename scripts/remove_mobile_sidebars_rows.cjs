const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.astro'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('class="mobile-sidebars"') || content.includes('FOUNDER SPECIAL')) {
    // Remove the mobile-sidebars HTML block
    content = content.replace(/\{\/\* MOBILE HORIZONTAL SCROLL CATEGORY CARDS \*\/\}[\s\S]*?<div class="mobile-sidebars"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g, '');
    content = content.replace(/<div class="mobile-sidebars"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g, '');
    
    // Remove .mobile-sidebars CSS rules
    content = content.replace(/\.mobile-sidebars\s*\{[^}]*?\}/g, '');
    content = content.replace(/@media\s*\([^)]*?\)\s*\{\s*\.mobile-sidebars\s*\{[^}]*?\}\s*\}/g, '');

    fs.writeFileSync(filePath, content);
    console.log('Removed mobile-sidebars 2 rows from:', file);
  }
});
