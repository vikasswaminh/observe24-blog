const fs = require('fs');

const filePath = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog.astro';
let content = fs.readFileSync(filePath, 'utf8');

// Match BLOG_POSTS array
const match = content.match(/const BLOG_POSTS = (\[[\s\S]*?\n\];)/);
if (match) {
  let posts = eval(match[1]);

  // Find "what-is-uptime-monitoring-guide"
  const targetIndex = posts.findIndex(p => p.link === '/blog/what-is-uptime-monitoring-guide');
  if (targetIndex !== -1) {
    const [targetPost] = posts.splice(targetIndex, 1);
    // Push targetPost to the very end of the array
    posts.push(targetPost);

    const formattedPosts = 'const BLOG_POSTS = ' + JSON.stringify(posts, null, 2) + ';';
    content = content.replace(/const BLOG_POSTS = \[[\s\S]*?\n\];/, formattedPosts);
    fs.writeFileSync(filePath, content);
    console.log('Successfully moved "What Is Uptime Monitoring?" to the very last position in BLOG_POSTS!');
    posts.forEach((p, idx) => console.log(`${idx + 1}. ${p.date} | ${p.title}`));
  }
}
