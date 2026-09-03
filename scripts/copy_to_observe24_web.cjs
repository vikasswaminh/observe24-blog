const fs = require('fs');
const path = require('path');

function copyFolderRecursiveSync(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  if (fs.lstatSync(source).isDirectory()) {
    const files = fs.readdirSync(source);
    files.forEach((file) => {
      const curSource = path.join(source, file);
      const curTarget = path.join(target, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, curTarget);
      } else {
        fs.copyFileSync(curSource, curTarget);
      }
    });
  }
}

const sourceSrc = 'C:/Users/yyasw/.gemini/antigravity-ide/scratch/observe24-blog-copy-v6/src';
const targetSrc = 'C:/Users/yyasw/24observe/24observe-website-v3/src';

copyFolderRecursiveSync(sourceSrc, targetSrc);
console.log('Successfully copied src directory from observe24-blog-copy-v6 to 24observe-website-v3');
