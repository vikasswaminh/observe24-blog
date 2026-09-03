const fs = require('fs');

const filePath = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src/pages/blog.astro';
let content = fs.readFileSync(filePath, 'utf8');

// Parse BLOG_POSTS array content and replace with date-sorted array
const blogPostsMatch = content.match(/const BLOG_POSTS = (\[[\s\S]*?\n\];)/);
if (blogPostsMatch) {
  let postsCode = blogPostsMatch[1];
  // evaluate postsCode into javascript object
  let posts = eval(postsCode);

  // Sort descending by date
  posts.sort((a, b) => {
    if (b.date !== a.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });

  const formattedPosts = 'const BLOG_POSTS = ' + JSON.stringify(posts, null, 2) + ';';
  content = content.replace(/const BLOG_POSTS = \[[\s\S]*?\n\];/, formattedPosts);

  // Add auto-sort backup in frontmatter
  if (!content.includes('const SORTED_BLOG_POSTS')) {
    content = content.replace(
      'const BLOG_POSTS = ',
      '// AUTO-SORTED BY DATE DESCENDING\nconst BLOG_POSTS = '
    );
  }

  fs.writeFileSync(filePath, content);
  console.log('Successfully sorted BLOG_POSTS in blog.astro by date descending!');
  console.log('New Order:');
  posts.forEach(p => console.log(`- ${p.date} | ${p.title}`));
}
