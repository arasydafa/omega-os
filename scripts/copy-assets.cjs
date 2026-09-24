// Copies static assets (tokens.css) into dist after tsc emit.
const fs = require('fs');
const path = require('path');

const root = __dirname + '/..';
const files = ['src/tokens.css'];

for (const file of files) {
  const src = path.join(root, file);
  const dest = path.join(root, 'dist', path.basename(file));
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  console.log('copied ' + file + ' -> dist/' + path.basename(file));
}
