import { useLocation, useNavigate } from 'react-router-dom';

interface NavItem {
  label: string;
  to: string;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Start',
    items: [
      { label: 'Home', to: '/' },
      { label: 'All components', to: '/components' },
      { label: 'Showcase', to: '/showcase' },
    ],
  },
  {
    label: 'Foundations',
    items: [
      { label: 'Typography', to: '/foundations/typography' },
      { label: 'Colors', to: '/foundations/colors' },
      { label: 'Radius', to: '/foundations/radius' },
      { label: 'Icons', to: '/foundations/icons' },
    ],
  },
  {
    label: 'Actions',
    items: [
      { label: 'Button', to: '/components/button' },
      { label: 'Badge', to: '/components/badge' },
      { label: 'CopyButton', to: '/components/copy-button' },
    ],
  },
  {
    label: 'Data',
    items: [
      { label: 'Table', to: '/components/table' },
      { label: 'Pagination', to: '/components/pagination' },
      { label: 'EmptyState', to: '/components/empty-state' },
      { label: 'Skeleton', to: '/components/skeleton' },
    ],
  },
  {
    label: 'Overlays',
    items: [
      { label: 'Modal', to: '/components/modal' },
      { label: 'Toast', to: '/components/toast' },
      { label: 'Dropdown', to: '/components/dropdown' },
      { label: 'Tooltip', to: '/components/tooltip' },
      { label: 'Drawer', to: '/components/drawer' },
      { label: 'CommandPalette', to: '/components/command-palette' },
    ],
  },
  {
    label: 'Forms',
    items: [
      { label: 'Input', to: '/components/input' },
      { label: 'Select', to: '/components/select' },
      { label: 'Textarea', to: '/components/textarea' },
      { label: 'Checkbox', to: '/components/checkbox' },
      { label: 'Radio', to: '/components/radio' },
      { label: 'Switch', to: '/components/switch' },
      { label: 'Combobox', to: '/components/combobox' },
      { label: 'Slider', to: '/components/slider' },
      { label: 'DatePicker', to: '/components/date-picker' },
      { label: 'FileUpload', to: '/components/file-upload' },
    ],
  },
  {
    label: 'Navigation',
    items: [
      { label: 'Navbar', to: '/components/navbar' },
      { label: 'Sidebar', to: '/components/sidebar' },
      { label: 'Breadcrumbs', to: '/components/breadcrumbs' },
      { label: 'Tabs', to: '/components/tabs' },
      { label: 'SearchBar', to: '/components/search-bar' },
      { label: 'SubmenuBar', to: '/components/submenu-bar' },
      { label: 'Stepper', to: '/components/stepper' },
    ],
  },
  {
    label: 'Content',
    items: [
      { label: 'Card', to: '/components/card' },
      { label: 'Accordion', to: '/components/accordion' },
      { label: 'Alert', to: '/components/alert' },
      { label: 'Kbd', to: '/components/kbd' },
      { label: 'Carousel', to: '/components/carousel' },
      { label: 'Timeline', to: '/components/timeline' },
      { label: 'TreeView', to: '/components/tree-view' },
      { label: 'Markdown', to: '/components/markdown' },
      { label: 'LogViewer', to: '/components/log-viewer' },
    ],
  },
  {
    label: 'Viewers',
    items: [
      { label: 'FileViewer', to: '/components/file-viewer' },
      { label: 'CodeBlock', to: '/components/code-block' },
      { label: 'Image', to: '/components/image' },
      { label: 'Avatar', to: '/components/avatar' },
      { label: 'AvatarGroup', to: '/components/avatar-group' },
    ],
  },
  {
    label: 'Charts',
    items: [
      { label: 'Bar', to: '/components/charts/bar' },
      { label: 'Line', to: '/components/charts/line' },
      { label: 'Pie', to: '/components/charts/pie' },
      { label: 'Scatter', to: '/components/charts/scatter' },
      { label: 'Heatmap', to: '/components/heatmap' },
      { label: 'Treemap', to: '/components/charts/treemap' },
      { label: 'WordCloud', to: '/components/charts/wordcloud' },
      { label: 'GraphViewer', to: '/components/graph-viewer' },
      { label: 'Progress', to: '/components/progress' },
      { label: 'TimingBar', to: '/components/timing-bar' },
      { label: 'Spinner', to: '/components/spinner' },
    ],
  },
];

/**
 * Single-panel docs navigation. Rendered inside one bordered panel whose
 * inner list scrolls, so the panel border never hides behind a scrollbar.
 */
export function DocsNav({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const go = (to: string) => {
    onNavigate?.();
    navigate(to);
  };
  return (
    <nav aria-label="Docs pages" className="grid content-start gap-1 font-sans text-sm">
      {NAV_GROUPS.map((group, i) => (
        <div key={group.label} className={i === 0 ? '' : 'border-t border-ot-border pt-3'}>
          <p className="mb-1 px-3 text-[11px] font-bold uppercase tracking-wide text-ot-muted">{group.label}</p>
          <div className="grid gap-0.5">
            {group.items.map((item) => {
              const active = pathname === item.to;
              return (
                <button
                  key={item.to}
                  type="button"
                  onClick={() => go(item.to)}
                  aria-current={active ? 'page' : undefined}
                  className={`flex w-full items-center rounded-ot-sm px-3 py-2 text-left transition-colors ${
                    active
                      ? 'bg-navy-bg font-semibold text-navy-text'
                      : 'text-ot-muted hover:bg-ot-surface hover:text-ot-text'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
