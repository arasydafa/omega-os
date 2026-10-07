/**
 * Docs props drift check.
 *
 * Parses every `*Props` interface in src and verifies that the matching
 * demo docs page lists each prop in its API table. Fails CI when the
 * library gains a prop that the docs do not mention.
 *
 * Extra names in docs (native attributes, combined rows) only warn.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const SRC_DIR = path.join(root, 'src');
const PAGES_DIR = path.join(root, 'apps', 'demo', 'src', 'pages');

/** Demo page file (relative to PAGES_DIR) -> library interfaces. Null skips (token tables). */
const PAGE_MAP = {
  'foundations/TypographyPage.tsx': null,
  'foundations/ColorsPage.tsx': null,
  'foundations/RadiusPage.tsx': null,
  'foundations/IconsPage.tsx': null,
  'components/AccordionPage.tsx': ['AccordionProps'],
  'components/AlertPage.tsx': ['AlertProps'],
  'components/AvatarPage.tsx': ['AvatarProps'],
  'components/AvatarGroupPage.tsx': ['AvatarGroupProps'],
  'components/BadgePage.tsx': ['BadgeProps'],
  'components/ButtonPage.tsx': ['ButtonProps'],
  'components/CardPage.tsx': ['CardProps'],
  'components/CheckboxPage.tsx': ['CheckboxProps'],
  'components/RadioPage.tsx': ['RadioProps'],
  'components/SwitchPage.tsx': ['SwitchProps'],
  'components/CarouselPage.tsx': ['CarouselProps'],
  'components/charts/BarPage.tsx': ['BarProps'],
  'components/charts/LinePage.tsx': ['LineProps'],
  'components/charts/PiePage.tsx': ['PieProps'],
  'components/charts/ScatterPage.tsx': ['ScatterProps'],
  'components/charts/TreemapPage.tsx': ['TreemapProps'],
  'components/charts/WordCloudPage.tsx': ['WordCloudProps'],
  'components/CodeBlockPage.tsx': ['CodeBlockProps'],
  'components/ComboboxPage.tsx': ['ComboboxProps'],
  'components/CommandPalettePage.tsx': ['CommandPaletteProps'],
  'components/CopyButtonPage.tsx': ['CopyButtonProps'],
  'components/DatePickerPage.tsx': ['DatePickerProps'],
  'components/DrawerPage.tsx': ['DrawerProps'],
  'components/DropdownPage.tsx': ['DropdownProps'],
  'components/EmptyStatePage.tsx': ['EmptyStateProps'],
  'components/FileUploadPage.tsx': ['FileUploadProps'],
  'components/FileViewerPage.tsx': ['FileViewerProps'],
  'components/GraphViewerPage.tsx': ['GraphViewerProps'],
  'components/HeatmapPage.tsx': ['HeatmapProps'],
  'components/ImagePage.tsx': ['ImageProps'],
  'components/InputPage.tsx': ['InputProps'],
  'components/SelectPage.tsx': ['SelectProps'],
  'components/TextareaPage.tsx': ['TextareaProps'],
  'components/KbdPage.tsx': ['KbdProps'],
  'components/LogViewerPage.tsx': ['LogViewerProps'],
  'components/MarkdownPage.tsx': ['MarkdownProps'],
  'components/ModalPage.tsx': ['ModalProps'],
  'components/NavbarPage.tsx': ['NavbarProps'],
  'components/PaginationPage.tsx': ['PaginationProps'],
  'components/ProgressPage.tsx': ['ProgressProps'],
  'components/SearchBarPage.tsx': ['SearchBarProps'],
  'components/SidebarPage.tsx': ['SidebarProps'],
  'components/BreadcrumbsPage.tsx': ['BreadcrumbsProps'],
  'components/SkeletonPage.tsx': ['SkeletonProps'],
  'components/SliderPage.tsx': ['SliderProps'],
  'components/SpinnerPage.tsx': ['SpinnerProps'],
  'components/StepperPage.tsx': ['StepperProps'],
  'components/SubmenuBarPage.tsx': ['SubmenuBarProps'],
  'components/TablePage.tsx': ['TableProps'],
  'components/TabsPage.tsx': ['TabsProps'],
  'components/TimelinePage.tsx': ['TimelineProps'],
  'components/TimingBarPage.tsx': ['TimingBarProps'],
  'components/ToastPage.tsx': ['ToastApi', 'ToastOptions'],
  'components/TooltipPage.tsx': ['TooltipProps'],
  'components/TreeViewPage.tsx': ['TreeViewProps'],
};

function listFiles(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) listFiles(full, out);
    else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) out.push(full);
  }
  return out;
}

/** Parse every `interface X ... { ... }` with balanced braces. */
function parseInterfaces(src) {
  const result = new Map();
  const re = /interface\s+(\w+)(?:\s*<[^>]*>)?\s*(?:extends\s+([^{]*?))?\s*\{/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const name = m[1];
    const extendsClause = (m[2] || '').trim();
    const openIdx = m.index + m[0].length - 1;
    let depth = 0;
    let end = -1;
    for (let i = openIdx; i < src.length; i++) {
      if (src[i] === '{') depth++;
      else if (src[i] === '}') {
        depth--;
        if (depth === 0) {
          end = i;
          break;
        }
      }
    }
    if (end === -1) continue;
    const body = src.slice(openIdx + 1, end);
    const members = [];
    for (const line of body.split('\n')) {
      const mm = line.match(/^\s*(\w+)\??:/);
      if (mm && !members.includes(mm[1])) members.push(mm[1]);
    }
    const bases = extendsClause
      ? extendsClause
          .split(',')
          .map((s) => s.trim().split('<')[0].trim())
          .filter(Boolean)
      : [];
    result.set(name, { bases, members });
    re.lastIndex = end + 1;
  }
  return result;
}

/** Union of members across an interface plus local (non-DOM) bases. */
function resolveProps(ifaces, name, seen = new Set()) {
  if (seen.has(name)) return [];
  seen.add(name);
  const def = ifaces.get(name);
  if (!def) return [];
  let props = [...def.members];
  for (const base of def.bases) {
    if (/Attributes$/.test(base)) continue; // native DOM props are docs-optional
    if (base === 'Omit' || base === 'Pick' || base === 'Partial' || base === 'Record') continue;
    props = props.concat(resolveProps(ifaces, base, seen));
  }
  return [...new Set(props)];
}

function main() {
  const ifaces = new Map();
  for (const file of listFiles(SRC_DIR)) {
    const parsed = parseInterfaces(fs.readFileSync(file, 'utf8'));
    for (const [name, def] of parsed) {
      if (!ifaces.has(name)) ifaces.set(name, def);
    }
  }

  let errors = 0;
  for (const [page, wanted] of Object.entries(PAGE_MAP)) {
    const file = path.join(PAGES_DIR, page);
    if (!fs.existsSync(file)) {
      console.error(`missing page file: ${page}`);
      errors++;
      continue;
    }
    if (wanted === null) continue; // token tables, not prop tables
    const src = fs.readFileSync(file, 'utf8');
    const table = src.match(/propsRows=\{\[([\s\S]*?)\n {6}\]\}/);
    if (!table) {
      console.error(`${page}: no propsRows table found`);
      errors++;
      continue;
    }
    const documented = new Set();
    const nameRe = /(?:^|[\s{,])name\s*:\s*'([^']+)'/gm;
    let nm;
    while ((nm = nameRe.exec(table[1])) !== null) {
      for (const part of nm[1].split('/')) {
        const clean = part.trim();
        if (clean) documented.add(clean);
      }
    }
    const required = new Set();
    for (const iface of wanted) {
      if (!ifaces.has(iface)) {
        console.error(`${page}: interface ${iface} not found in src`);
        errors++;
        continue;
      }
      for (const prop of resolveProps(ifaces, iface)) required.add(prop);
    }
    const missing = [...required].filter((p) => !documented.has(p));
    if (missing.length > 0) {
      console.error(`${page}: undocumented props: ${missing.join(', ')}`);
      errors++;
    }
    const extra = [...documented].filter((p) => !required.has(p));
    if (extra.length > 0) console.warn(`${page}: extra docs names (native or combined): ${extra.join(', ')}`);
  }

  if (errors > 0) {
    console.error(`\ndocs props drift: ${errors} problem(s). Update the API tables.`);
    process.exit(1);
  }
  console.log('docs props check: every library prop is documented.');
}

main();
