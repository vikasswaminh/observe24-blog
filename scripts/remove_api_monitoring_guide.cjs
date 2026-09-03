const fs = require('fs');

const blogPath = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog.astro';
let content = fs.readFileSync(blogPath, 'utf8');

// Match BLOG_POSTS array
const match = content.match(/const BLOG_POSTS = (\[[\s\S]*?\n\];)/);
if (match) {
  let posts = eval(match[1]);

  // Remove "api-monitoring-complete-guide"
  const filteredPosts = posts.filter(p => p.link !== '/blog/api-monitoring-complete-guide');

  const formattedPosts = 'const BLOG_POSTS = ' + JSON.stringify(filteredPosts, null, 2) + ';';
  content = content.replace(/const BLOG_POSTS = \[[\s\S]*?\n\];/, formattedPosts);
  fs.writeFileSync(blogPath, content);
  console.log('Successfully removed "API Monitoring Complete Guide" from BLOG_POSTS in blog.astro!');
  console.log('Remaining posts count:', filteredPosts.length);
  filteredPosts.forEach((p, idx) => console.log(`${idx + 1}. [${p.tag}] ${p.date} | ${p.title}`));
}
