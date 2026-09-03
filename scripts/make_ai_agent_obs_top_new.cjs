const fs = require('fs');

const blogPath = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog.astro';
let content = fs.readFileSync(blogPath, 'utf8');

// Match BLOG_POSTS array
const match = content.match(/const BLOG_POSTS = (\[[\s\S]*?\n\];)/);
if (match) {
  let posts = eval(match[1]);

  // Find "ai-agent-observability-how-to-monitor"
  const targetIndex = posts.findIndex(p => p.link === '/blog/ai-agent-observability-how-to-monitor');
  if (targetIndex !== -1) {
    const [targetPost] = posts.splice(targetIndex, 1);
    targetPost.date = '2026-09-03';
    targetPost.tag = 'NEW';
    // Move to the very top (index 0 or right after hero)
    posts.unshift(targetPost);

    const formattedPosts = 'const BLOG_POSTS = ' + JSON.stringify(posts, null, 2) + ';';
    content = content.replace(/const BLOG_POSTS = \[[\s\S]*?\n\];/, formattedPosts);
    fs.writeFileSync(blogPath, content);
    console.log('Successfully updated AI Agent Observability date to 2026-09-03, tag to NEW, and moved to the top!');
    posts.forEach((p, idx) => console.log(`${idx + 1}. [${p.tag}] ${p.date} | ${p.title}`));
  }
}
