const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.astro'));

const LINK_STYLES = 'color: #2A680D; font-weight: 700; text-decoration: underline; text-underline-offset: 3px;';
const MAIN_LINK_STYLES = 'color: #2A680D; font-weight: 800; text-decoration: underline; text-underline-offset: 4px;';

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Find TLDR section
  const tldrMatch = content.match(/<section id="tldr"[\s\S]*?<\/section>/);
  if (!tldrMatch) return;

  let tldrBlock = tldrMatch[0];

  // Helper to safely replace text inside TLDR block if not already linked
  function addLink(targetText, url, isMain = false) {
    if (tldrBlock.includes(`href="${url}"`) || tldrBlock.includes(`href='${url}'`)) return;
    const regex = new RegExp(`\\b${targetText}\\b`, 'i');
    if (regex.test(tldrBlock)) {
      const style = isMain ? MAIN_LINK_STYLES : LINK_STYLES;
      const target = isMain ? ` target="_blank" rel="noopener noreferrer"` : '';
      tldrBlock = tldrBlock.replace(regex, `<a href="${url}"${target} style="${style}">${targetText}</a>`);
    }
  }

  // Common Backlinks Replacement Rules
  addLink('24Observe', 'https://24observe.com', true);
  addLink('AI analyst', '/product/ai-analyst');
  addLink('SIEM', '/product/siem');
  addLink('uptime monitoring', '/product/uptime');
  addLink('Website uptime monitoring', '/product/uptime');
  addLink('AI observability', '/llm-observability');
  addLink('AI agent observability', '/llm-observability');
  addLink('AI agent security', '/product/ai-agent-security');
  addLink('AI agents', '/product/ai-agent-security');
  addLink('status pages', '/product/status-pages');
  addLink('status page', '/product/status-pages');
  addLink('context graph', '/product/context-graph');
  addLink('OpenTelemetry', '/docs/collector');
  addLink('logs', '/product/logs');
  addLink('metrics', '/product/metrics');
  addLink('traces', '/product/tracing');
  addLink('Datadog', '/compare/datadog');
  addLink('Better Stack', '/compare/datadog');
  addLink('Pingdom', '/docs/migrate/pingdom');

  // Replace TLDR block back into content
  content = content.replace(tldrMatch[0], tldrBlock);
  fs.writeFileSync(filePath, content);
  console.log('Added TL;DR backlinks to:', file);
});
