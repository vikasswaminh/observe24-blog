const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog';

// 1. Clean website-uptime-monitoring-complete-guide.astro
let websiteUptimeContent = fs.readFileSync(path.join(dir, 'website-uptime-monitoring-complete-guide.astro'), 'utf8');

// Replace any unescaped quotes or JSX syntax issues
websiteUptimeContent = websiteUptimeContent.replace(/"did something answer\?"/g, '&quot;did something answer?&quot;');
websiteUptimeContent = websiteUptimeContent.replace(/"did the right thing answer\?"/g, '&quot;did the right thing answer?&quot;');
websiteUptimeContent = websiteUptimeContent.replace(/"having monitoring"/g, '&quot;having monitoring&quot;');
websiteUptimeContent = websiteUptimeContent.replace(/"having monitoring that actually catches the outages that matter"/g, '&quot;having monitoring that actually catches the outages that matter&quot;');
websiteUptimeContent = websiteUptimeContent.replace(/"everything fine"/g, '&quot;everything fine&quot;');
websiteUptimeContent = websiteUptimeContent.replace(/"Order placed successfully"/g, '&quot;Order placed successfully&quot;');
websiteUptimeContent = websiteUptimeContent.replace(/"buy"/g, '&quot;buy&quot;');
websiteUptimeContent = websiteUptimeContent.replace(/label: "The Problem Nobody's Talking About Openly"/g, 'label: "The Problem Nobody Talking About Openly"');
websiteUptimeContent = websiteUptimeContent.replace(/label: "The Silent Failures Nobody's Prepared For"/g, 'label: "The Silent Failures Nobody Prepared For"');

fs.writeFileSync(path.join(dir, 'website-uptime-monitoring-complete-guide.astro'), websiteUptimeContent);
console.log('Fixed quotes in website-uptime-monitoring-complete-guide.astro');

// 2. Clean best-uptime-monitoring-tools-2026.astro
let bestUptimeContent = fs.readFileSync(path.join(dir, 'best-uptime-monitoring-tools-2026.astro'), 'utf8');
bestUptimeContent = bestUptimeContent.replace(/"is the site up or down"/g, '&quot;is the site up or down&quot;');
bestUptimeContent = bestUptimeContent.replace(/"best"/g, '&quot;best&quot;');
bestUptimeContent = bestUptimeContent.replace(/"working"/g, '&quot;working&quot;');
bestUptimeContent = bestUptimeContent.replace(/"broken"/g, '&quot;broken&quot;');

fs.writeFileSync(path.join(dir, 'best-uptime-monitoring-tools-2026.astro'), bestUptimeContent);
console.log('Fixed quotes in best-uptime-monitoring-tools-2026.astro');
