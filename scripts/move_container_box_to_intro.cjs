const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.astro'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove the outer blog-main-content-box wrapper from right after <main style="flex: 1; min-width: 0;">
  if (content.includes('class="blog-main-content-box"')) {
    content = content.replace(
      /<main style="flex:\s*1;\s*min-width:\s*0;">\s*<div style="background:[^"]*?" class="blog-main-content-box">\s*/g,
      '<main style="flex: 1; min-width: 0;">\n'
    );
    // Remove the matching closing </div> right before </main>
    content = content.replace(
      /\s*<\/div>\s*(<\/main>\s*\{?\/\*?\s*RIGHT SIDEBAR)/g,
      '\n$1'
    );
  }

  // Now wrap from <section id="introduction" (or the first body section starting with intro paragraph) down to </section> before </main>
  if (!content.includes('class="article-body-box"')) {
    // Find where the introduction section starts (or the first section after key-takeaways)
    content = content.replace(
      /(\{?\/\*?\s*MAIN BODY SECTIONS?\s*\*?\/?\}\s*<section id="(?:introduction|overview|what-is|body-[^"]*)"[\s\S]*?)(\s*<\/main>)/g,
      '<div style="background: var(--bg-card, #ffffff); border: 1.5px solid #e2e8f0; border-radius: 16px; padding: 28px 32px; margin-bottom: 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.03);" class="article-body-box">\n$1\n</div>$2'
    );
    fs.writeFileSync(filePath, content);
    console.log('Moved box to start from introduction section in:', file);
  }
});
