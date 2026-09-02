const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog';

['best-uptime_monitoring-tools-2026.astro', 'best_uptime_monitoring_tools_2026.astro'].forEach(f => {
  const p = path.join(dir, f);
  if (fs.existsSync(p)) {
    fs.unlinkSync(p);
    console.log('Removed duplicate file:', f);
  }
});
