/**
 * Static preview drift check.
 *
 * Verifies preview.html stays in sync with the library:
 * - the ICONS array matches OMEGA_ICONS in src/icons.ts,
 * - every docs anchor referenced by the sidenav, TOC, and mobile pills
 *   exists as an element id in the file.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

function sectionIds(preview) {
  const ids = new Set();
  const re = /id="([^"]+)"/g;
  let m;
  while ((m = re.exec(preview)) !== null) ids.add(m[1]);
  return ids;
}

function main() {
  let errors = 0;

  const preview = fs.readFileSync(path.join(root, 'preview.html'), 'utf8');
  const iconsSrc = fs.readFileSync(path.join(root, 'src', 'icons.ts'), 'utf8');

  const libIcons = [];
  const libMatch = iconsSrc.match(/OMEGA_ICONS\s*=\s*\[([\s\S]*?)\]/);
  if (!libMatch) {
    console.error('OMEGA_ICONS not found in src/icons.ts');
    process.exit(1);
  }
  const nameRe = /'([^']+)'/g;
  let nm;
  while ((nm = nameRe.exec(libMatch[1])) !== null) libIcons.push(nm[1]);

  const previewMatch = preview.match(/const ICONS = \[([\s\S]*?)\];/);
  if (!previewMatch) {
    console.error('ICONS array not found in preview.html');
    process.exit(1);
  }
  const previewIcons = [];
  const pRe = /'([^']+)'/g;
  let pm;
  while ((pm = pRe.exec(previewMatch[1])) !== null) previewIcons.push(pm[1]);

  const missing = libIcons.filter((n) => !previewIcons.includes(n));
  const extra = previewIcons.filter((n) => !libIcons.includes(n));
  if (missing.length > 0) {
    console.error(`preview ICONS missing: ${missing.join(', ')}`);
    errors++;
  }
  if (extra.length > 0) {
    console.error(`preview ICONS extra: ${extra.join(', ')}`);
    errors++;
  }

  const ids = sectionIds(preview);
  const anchorRe = /href="#([a-z][a-z0-9-]*)"/g;
  const wanted = new Set();
  let am;
  while ((am = anchorRe.exec(preview)) !== null) {
    if (am[1].length > 1) wanted.add(am[1]);
  }
  // Docs sections mirrored from the demo anchor groups.
  const docsSections = [
    'typography',
    'colors',
    'surfaces',
    'radius',
    'buttons',
    'fields',
    'alerts',
    'navbar',
    'sidebar',
    'table',
    'toasts',
    'modal',
    'icons',
  ];
  for (const id of docsSections) wanted.add(id);
  const absent = [...wanted].filter((id) => !ids.has(id));
  if (absent.length > 0) {
    console.error(`preview missing section ids: ${absent.join(', ')}`);
    errors++;
  }

  if (errors > 0) {
    console.error('\npreview drift: update preview.html to match the library.');
    process.exit(1);
  }
  console.log(`preview check: ${libIcons.length} icons and ${docsSections.length} sections in sync.`);
}

main();
