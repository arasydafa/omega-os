/**
 * GitHub Pages SPA fallback.
 *
 * Project pages serve 404.html for unknown paths, so copy the built
 * demo index.html. BrowserRouter then renders the matching route (or the
 * docs 404 page) on refresh and deep links.
 */
const fs = require('fs');
const path = require('path');

const dist = path.join(__dirname, '..', 'apps', 'demo', 'dist');
fs.copyFileSync(path.join(dist, 'index.html'), path.join(dist, '404.html'));
console.log('copied apps/demo/dist/index.html -> apps/demo/dist/404.html');
