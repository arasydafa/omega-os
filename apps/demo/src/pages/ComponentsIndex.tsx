import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Badge, Button } from '@omega-os/ui';
import { scrollToId } from '../docs.js';

interface DirEntry {
  name: string;
  desc: string;
  to?: string;
  anchor?: string;
}

interface DirGroup {
  label: string;
  entries: DirEntry[];
}

const DIRECTORY: DirGroup[] = [
  {
    label: 'Foundations',
    entries: [
      { name: 'Typography', desc: 'Jakarta Sans plus JetBrains Mono scale.', to: '/foundations/typography' },
      { name: 'Colors', desc: 'Brand, status, and surfaces.', to: '/foundations/colors' },
      { name: 'Radius', desc: '8, 12, 16, 20, plus full.', to: '/foundations/radius' },
      { name: 'Icons', desc: 'Approved lucide set, no emoji.', to: '/foundations/icons' },
    ],
  },
  {
    label: 'Actions',
    entries: [
      { name: 'Button', desc: 'Primary, secondary, danger, sizes, loading.', to: '/components/button' },
      { name: 'Badge', desc: 'Pill status, one tone per meaning.', to: '/components/badge' },
      { name: 'CopyButton', desc: 'Copy to clipboard with confirm.', to: '/components/copy-button' },
    ],
  },
  {
    label: 'Data',
    entries: [
      { name: 'Table', desc: 'Sorting, filter, selection, skeletons.', to: '/components/table' },
      { name: 'Pagination', desc: 'Ellipsis window with row-count note.', to: '/components/pagination' },
      { name: 'EmptyState', desc: 'Standalone empty fallback.', to: '/components/empty-state' },
      { name: 'Skeleton', desc: 'Loading placeholders.', to: '/components/skeleton' },
    ],
  },
  {
    label: 'Overlays',
    entries: [
      { name: 'Modal', desc: 'Blocking dialog, focus trap, sizes.', to: '/components/modal' },
      { name: 'Toast', desc: 'ToasterProvider plus useToast.', to: '/components/toast' },
      { name: 'Dropdown', desc: 'Flyout submenus up to three levels.', to: '/components/dropdown' },
      { name: 'Tooltip', desc: 'Hover hints.', to: '/components/tooltip' },
      { name: 'Drawer', desc: 'Side panel, same contract as Modal.', to: '/components/drawer' },
      { name: 'CommandPalette', desc: 'Ctrl+K fuzzy commands.', to: '/components/command-palette' },
    ],
  },
  {
    label: 'Forms',
    entries: [
      { name: 'Input', desc: '40px field with label and error.', to: '/components/input' },
      { name: 'Select', desc: 'Native dropdown for fixed lists.', to: '/components/select' },
      { name: 'Textarea', desc: 'Multi-line with the same contract.', to: '/components/textarea' },
      { name: 'Checkbox', desc: 'Labeled multi-select.', to: '/components/checkbox' },
      { name: 'Radio', desc: 'Labeled single-select.', to: '/components/radio' },
      { name: 'Switch', desc: 'Instant on-off toggle.', to: '/components/switch' },
      { name: 'Combobox', desc: 'Searchable picker.', to: '/components/combobox' },
      { name: 'Slider', desc: 'Numeric range with live value.', to: '/components/slider' },
      { name: 'DatePicker', desc: 'Custom calendar with bounds.', to: '/components/date-picker' },
      { name: 'FileUpload', desc: 'Dropzone with validation.', to: '/components/file-upload' },
    ],
  },
  {
    label: 'Navigation',
    entries: [
      { name: 'Navbar', desc: 'Brand, links, actions.', to: '/components/navbar' },
      { name: 'Sidebar', desc: 'Submenus plus collapse rail.', to: '/components/sidebar' },
      { name: 'Breadcrumbs', desc: 'Hierarchy trail.', to: '/components/breadcrumbs' },
      { name: 'Tabs', desc: 'Section switcher with arrow keys.', to: '/components/tabs' },
      { name: 'SearchBar', desc: 'Filter field with shortcut hint.', to: '/components/search-bar' },
      { name: 'SubmenuBar', desc: 'Secondary strip with counts.', to: '/components/submenu-bar' },
      { name: 'Stepper', desc: 'Multi-step flows.', to: '/components/stepper' },
    ],
  },
  {
    label: 'Content',
    entries: [
      { name: 'Card', desc: 'Bordered panel, three paddings.', to: '/components/card' },
      { name: 'Accordion', desc: 'Collapsible panels, single or many.', to: '/components/accordion' },
      { name: 'Alert', desc: 'Inline status in four tones.', to: '/components/alert' },
      { name: 'Kbd', desc: 'Keyboard key chip.', to: '/components/kbd' },
      { name: 'Carousel', desc: 'Sliding panels with autoplay.', to: '/components/carousel' },
      { name: 'Timeline', desc: 'Vertical event feed.', to: '/components/timeline' },
      { name: 'TreeView', desc: 'File-style tree with select.', to: '/components/tree-view' },
      { name: 'Markdown', desc: 'GFM docs with copyable code.', to: '/components/markdown' },
      { name: 'LogViewer', desc: 'Level logs with filter.', to: '/components/log-viewer' },
    ],
  },
  {
    label: 'Viewers',
    entries: [
      { name: 'FileViewer', desc: 'Numbered code with copy.', to: '/components/file-viewer' },
      { name: 'CodeBlock', desc: 'Bare snippet with copy.', to: '/components/code-block' },
      { name: 'Image', desc: 'Aspect lock with fallback.', to: '/components/image' },
      { name: 'Avatar', desc: 'Photo or initials marker.', to: '/components/avatar' },
      { name: 'AvatarGroup', desc: 'People stack with +N.', to: '/components/avatar-group' },
    ],
  },
  {
    label: 'Charts',
    entries: [
      { name: 'Bar', desc: 'Bars with legend toggle.', to: '/components/charts/bar' },
      { name: 'Line', desc: 'Area lines with tooltips.', to: '/components/charts/line' },
      { name: 'Pie', desc: 'Donut with recompute.', to: '/components/charts/pie' },
      { name: 'Scatter', desc: 'Dot plot with series.', to: '/components/charts/scatter' },
      { name: 'Heatmap', desc: 'Intensity grid.', to: '/components/heatmap' },
      { name: 'Treemap', desc: 'Squarified rectangles.', to: '/components/charts/treemap' },
      { name: 'WordCloud', desc: 'Deterministic word cloud.', to: '/components/charts/wordcloud' },
      { name: 'GraphViewer', desc: 'Layered layout, pan and zoom.', to: '/components/graph-viewer' },
      { name: 'Progress', desc: 'Determinate and sliding bars.', to: '/components/progress' },
      { name: 'TimingBar', desc: 'Stacked duration segments.', to: '/components/timing-bar' },
    ],
  },
  {
    label: 'Utilities',
    entries: [
      { name: 'Spinner', desc: 'Loading indicator.', to: '/components/spinner' },
      { name: 'Drag and drop', desc: 'Sortable list pattern, showcase only.', anchor: 'playground' },
    ],
  },
];

export function ComponentsIndex() {
  const navigate = useNavigate();
  const goAnchor = (anchor: string) => {
    navigate('/showcase');
    setTimeout(() => scrollToId(anchor), 120);
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      <h1 className="text-3xl font-extrabold tracking-tight">Components</h1>
      <p className="mt-1.5 max-w-2xl text-[15px] text-ot-muted">
        Every page ships with preview, usage, variants, and API. Pick a card to open it.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge tone="navy">preview + usage</Badge>
        <Badge tone="grey">variants + API</Badge>
      </div>

      {DIRECTORY.map((group) => (
        <section key={group.label} className="mt-4 rounded-ot-lg border border-ot-border bg-ot-surface p-5">
          <h2 className="mb-3 text-lg font-bold">{group.label}</h2>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {group.entries.map((entry) =>
              entry.to ? (
                <button
                  key={entry.name}
                  type="button"
                  onClick={() => navigate(entry.to!)}
                  className="rounded-ot-md border border-ot-border bg-ot-bg p-4 text-left transition-colors hover:border-navy"
                >
                  <p className="flex items-center gap-2 text-sm font-bold">
                    {entry.name}
                    <ArrowRight size={14} className="ml-auto text-ot-muted" />
                  </p>
                  <p className="mt-0.5 text-[13px] text-ot-muted">{entry.desc}</p>
                </button>
              ) : (
                <button
                  key={entry.name}
                  type="button"
                  onClick={() => goAnchor(entry.anchor!)}
                  className="rounded-ot-md border border-dashed border-ot-border bg-ot-bg p-4 text-left transition-colors hover:border-navy"
                >
                  <p className="flex items-center gap-2 text-sm font-bold">
                    {entry.name}
                    <Badge tone="grey">showcase</Badge>
                    <ArrowRight size={14} className="ml-auto text-ot-muted" />
                  </p>
                  <p className="mt-0.5 text-[13px] text-ot-muted">{entry.desc}</p>
                </button>
              ),
            )}
          </div>
        </section>
      ))}

      <div className="mt-4 rounded-ot-lg border border-ot-border bg-ot-surface p-5">
        <h2 className="mb-1 text-lg font-bold">Everything at once</h2>
        <p className="mb-4 text-sm text-ot-muted">The showcase renders every component on one page with anchors.</p>
        <Button variant="secondary" onClick={() => navigate('/showcase')}>
          Open showcase <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
}
