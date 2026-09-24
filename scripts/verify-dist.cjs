// Verifies the packed output: every exports-map target exists on disk.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));

const targets = new Set();
const collect = (node) => {
  if (typeof node === 'string') {
    if (!node.startsWith('./')) return;
    targets.add(node);
  } else if (node && typeof node === 'object') {
    Object.values(node).forEach(collect);
  }
};
collect(pkg.exports);
targets.add(pkg.main);
targets.add(pkg.module);
targets.add(pkg.types);

let ok = true;
for (const t of targets) {
  const full = path.join(root, t);
  const exists = fs.existsSync(full);
  console.log((exists ? 'OK   ' : 'MISS ') + t);
  if (!exists) ok = false;
}
if (!ok) process.exit(1);
