import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Badge, Button } from '@omega-os/ui';
import { scrollToId } from '../docs.js';

interface DirEntry {
  name: string;
  desc: string;
  to?: string;
  anchor?: string;
  pilot?: boolean;
}

interface DirGroup {
  label: string;
  entries: DirEntry[];
}

const DIRECTORY: DirGroup[] = [
  {
    label: 'Actions',
    entries: [
      { name: 'Button', desc: 'Primary, secondary, danger, sizes, loading.', to: '/components/button', pilot: true },
      { name: 'Badge', desc: 'Pill status, one tone per meaning.', anchor: 'badges' },
      { name: 'CopyButton', desc: 'Copy-to-clipboard with confirm.', anchor: 'primitives' },
    ],
  },
  {
    label: 'Data',
    entries: [
      { name: 'Table', desc: 'Sorting, filter, selection, skeletons.', to: '/components/table', pilot: true },
      { name: 'Pagination', desc: 'Ellipsis window with row-count note.', anchor: 'data-table' },
      { name: 'EmptyState', desc: 'Standalone empty fallback.', anchor: 'data-table' },
      { name: 'Skeleton', desc: 'Loading placeholders.', anchor: 'data-table' },
    ],
  },
  {
    label: 'Overlays',
    entries: [
      { name: 'Modal', desc: 'Blocking dialog, focus trap, sizes.', to: '/components/modal', pilot: true },
      { name: 'Toast', desc: 'ToasterProvider + useToast.', anchor: 'overlays-demo' },
      { name: 'Dropdown', desc: 'Flyout submenus up to three levels.', anchor: 'overlays-demo' },
      { name: 'Tooltip', desc: 'Hover hints.', anchor: 'overlays-demo' },
      { name: 'Drawer', desc: 'Side panel, same contract as Modal.', anchor: 'primitives' },
      { name: 'CommandPalette', desc: 'Cmd/Ctrl+K fuzzy commands.', anchor: 'command' },
    ],
  },
  {
    label: 'Forms',
    entries: [
      { name: 'Input / Select / Textarea', desc: '40px fields, navy focus ring.', anchor: 'fields' },
      { name: 'Checkbox / Radio / Switch', desc: 'Labeled controls.', anchor: 'complements' },
      { name: 'Combobox', desc: 'Searchable picker.', anchor: 'primitives' },
      { name: 'Slider / DatePicker', desc: 'Complex inputs.', anchor: 'complex' },
      { name: 'FileUpload', desc: 'Dropzone with validation.', anchor: 'fields' },
    ],
  },
  {
    label: 'Navigation',
    entries: [
      { name: 'Navbar / Sidebar', desc: 'Brand, links, collapse rail.', anchor: 'navigation-demo' },
      { name: 'Breadcrumbs / Tabs', desc: 'Hierarchy and sections.', anchor: 'navigation-demo' },
      { name: 'SearchBar / SubmenuBar', desc: 'Filter and secondary nav.', anchor: 'navigation-demo' },
      { name: 'Stepper', desc: 'Multi-step flows.', anchor: 'complex' },
    ],
  },
  {
    label: 'Viewers',
    entries: [
      { name: 'FileViewer / CodeBlock', desc: 'Numbered code with copy.', anchor: 'viewers-demo' },
      { name: 'Image / Avatar', desc: 'Aspect, fallback, initials.', anchor: 'viewers-demo' },
      { name: 'Markdown / LogViewer', desc: 'GFM docs and level logs.', anchor: 'command' },
      { name: 'Carousel / Timeline / TreeView', desc: 'Complex displays.', anchor: 'complex' },
    ],
  },
  {
    label: 'Charts',
    entries: [
      { name: 'Bar / Line / Pie / Scatter', desc: 'Theme-aware SVG, no dependency.', anchor: 'charts-demo' },
      { name: 'Heatmap / Treemap / WordCloud', desc: 'Density and hierarchy.', anchor: 'charts-demo' },
      { name: 'GraphViewer', desc: 'Layered layout, pan/zoom.', anchor: 'charts-demo' },
      { name: 'Progress / TimingBar', desc: 'Determinate and stacked segments.', anchor: 'primitives' },
    ],
  },
  {
    label: 'Foundations',
    entries: [
      { name: 'Typography', desc: 'Jakarta Sans + JetBrains Mono scale.', anchor: 'typography' },
      { name: 'Colors', desc: 'Brand, status, and surfaces.', anchor: 'colors' },
      { name: 'Radius', desc: '8 / 12 / 16 / 20 + full.', anchor: 'radius' },
      { name: 'Icons', desc: 'Approved lucide set, no emoji.', anchor: 'icons-demo' },
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
        Pilot pages ship with preview, usage, variants, and API. Everything else lives in the showcase until its
        page lands.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge tone="navy">3 pilot pages</Badge>
        <Badge tone="grey">showcase for the rest</Badge>
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
                  className="rounded-ot-md border border-navy bg-navy-bg p-4 text-left transition-colors"
                >
                  <p className="flex items-center gap-2 text-sm font-bold text-navy-text">
                    {entry.name}
                    <Badge tone="navy">page</Badge>
                    <ArrowRight size={14} className="ml-auto" />
                  </p>
                  <p className="mt-0.5 text-[13px] text-navy-text">{entry.desc}</p>
                </button>
              ) : (
                <button
                  key={entry.name}
                  type="button"
                  onClick={() => goAnchor(entry.anchor!)}
                  className="rounded-ot-md border border-ot-border bg-ot-bg p-4 text-left transition-colors hover:border-navy"
                >
                  <p className="flex items-center gap-2 text-sm font-bold">
                    {entry.name}
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
        <h2 className="mb-1 text-lg font-bold">Can’t find a page?</h2>
        <p className="mb-4 text-sm text-ot-muted">The showcase renders every component on one page with anchors.</p>
        <Button variant="secondary" onClick={() => navigate('/showcase')}>
          Open showcase <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
}
