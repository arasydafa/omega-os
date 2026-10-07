import { useEffect, useMemo, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import uiPkg from '@omega-os/ui/package.json';
import {
  Badge,
  Button,
  CommandPalette,
  Kbd,
  Sidebar,
  ToasterProvider,
  toggleThemeReveal,
} from '@omega-os/ui';
import {
  Activity,
  Bell,
  BookOpen,
  Crown,
  Database,
  FileText,
  Folder,
  Github,
  Globe,
  Home,
  Layers,
  List,
  Moon,
  PanelLeft,
  Search,
  Sun,
} from 'lucide-react';
import type { SidebarItemDef } from '@omega-os/ui';

function routeIcon(id: string) {
  switch (id) {
    case 'home':
      return <Home size={16} />;
    case 'components':
      return <Layers size={16} />;
    case 'showcase':
      return <Globe size={16} />;
    case 'foundations':
      return <BookOpen size={16} />;
    case 'overlays':
      return <Bell size={16} />;
    case 'data':
      return <Database size={16} />;
    case 'viewers':
      return <FileText size={16} />;
    case 'charts':
      return <Activity size={16} />;
    default:
      return <Folder size={16} />;
  }
}

export function DocsLayout() {
  const [dark, setDark] = useState(false);
  const [icon, setIcon] = useState<'sun' | 'moon'>('moon');
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [docsCollapsed, setDocsCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  useEffect(() => {
    const open = () => setPaletteOpen(true);
    window.addEventListener('omega:palette', open);
    return () => window.removeEventListener('omega:palette', open);
  }, []);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const x = e.clientX || window.innerWidth - 60;
    const y = e.clientY || 40;
    toggleThemeReveal(x, y, () => {
      const next = !dark;
      setDark(next);
      setIcon(next ? 'sun' : 'moon');
      document.documentElement.classList.toggle('dark', next);
    });
  };

  const go = (to: string) => {
    setMobileNavOpen(false);
    navigate(to);
  };

  const navStart: SidebarItemDef[] = useMemo(
    () => [
      { id: 'home', label: 'Home', icon: <Home size={16} />, active: path === '/', onClick: () => go('/') },
      { id: 'showcase', label: 'Showcase', icon: routeIcon('showcase'), active: path === '/showcase', onClick: () => go('/showcase') },
    ],
    [path],
  );

  const navFoundations: SidebarItemDef[] = useMemo(
    () => [
      { id: 'typography', label: 'Typography', active: path === '/foundations/typography', onClick: () => go('/foundations/typography') },
      { id: 'colors', label: 'Colors', active: path === '/foundations/colors', onClick: () => go('/foundations/colors') },
      { id: 'radius', label: 'Radius', active: path === '/foundations/radius', onClick: () => go('/foundations/radius') },
      { id: 'icons', label: 'Icons', active: path === '/foundations/icons', onClick: () => go('/foundations/icons') },
    ],
    [path],
  );

  const navActions: SidebarItemDef[] = useMemo(
    () => [
      { id: 'all', label: 'All components', active: path === '/components', onClick: () => go('/components') },
      { id: 'button', label: 'Button', active: path === '/components/button', onClick: () => go('/components/button') },
      { id: 'badge', label: 'Badge', active: path === '/components/badge', onClick: () => go('/components/badge') },
      { id: 'copy-button', label: 'CopyButton', active: path === '/components/copy-button', onClick: () => go('/components/copy-button') },
    ],
    [path],
  );

  const navData: SidebarItemDef[] = useMemo(
    () => [
      { id: 'table', label: 'Table', active: path === '/components/table', onClick: () => go('/components/table') },
      { id: 'pagination', label: 'Pagination', active: path === '/components/pagination', onClick: () => go('/components/pagination') },
      { id: 'empty-state', label: 'EmptyState', active: path === '/components/empty-state', onClick: () => go('/components/empty-state') },
      { id: 'skeleton', label: 'Skeleton', active: path === '/components/skeleton', onClick: () => go('/components/skeleton') },
    ],
    [path],
  );

  const navOverlays: SidebarItemDef[] = useMemo(
    () => [
      { id: 'modal', label: 'Modal', active: path === '/components/modal', onClick: () => go('/components/modal') },
      { id: 'toast', label: 'Toast', active: path === '/components/toast', onClick: () => go('/components/toast') },
      { id: 'dropdown', label: 'Dropdown', active: path === '/components/dropdown', onClick: () => go('/components/dropdown') },
      { id: 'tooltip', label: 'Tooltip', active: path === '/components/tooltip', onClick: () => go('/components/tooltip') },
      { id: 'drawer', label: 'Drawer', active: path === '/components/drawer', onClick: () => go('/components/drawer') },
      { id: 'command-palette', label: 'CommandPalette', active: path === '/components/command-palette', onClick: () => go('/components/command-palette') },
    ],
    [path],
  );

  const navForms: SidebarItemDef[] = useMemo(
    () => [
      { id: 'input', label: 'Input', active: path === '/components/input', onClick: () => go('/components/input') },
      { id: 'select', label: 'Select', active: path === '/components/select', onClick: () => go('/components/select') },
      { id: 'textarea', label: 'Textarea', active: path === '/components/textarea', onClick: () => go('/components/textarea') },
      { id: 'checkbox', label: 'Checkbox', active: path === '/components/checkbox', onClick: () => go('/components/checkbox') },
      { id: 'radio', label: 'Radio', active: path === '/components/radio', onClick: () => go('/components/radio') },
      { id: 'switch', label: 'Switch', active: path === '/components/switch', onClick: () => go('/components/switch') },
      { id: 'combobox', label: 'Combobox', active: path === '/components/combobox', onClick: () => go('/components/combobox') },
      { id: 'slider', label: 'Slider', active: path === '/components/slider', onClick: () => go('/components/slider') },
      { id: 'date-picker', label: 'DatePicker', active: path === '/components/date-picker', onClick: () => go('/components/date-picker') },
      { id: 'file-upload', label: 'FileUpload', active: path === '/components/file-upload', onClick: () => go('/components/file-upload') },
    ],
    [path],
  );

  const navNavigation: SidebarItemDef[] = useMemo(
    () => [
      { id: 'navbar', label: 'Navbar', active: path === '/components/navbar', onClick: () => go('/components/navbar') },
      { id: 'sidebar', label: 'Sidebar', active: path === '/components/sidebar', onClick: () => go('/components/sidebar') },
      { id: 'breadcrumbs', label: 'Breadcrumbs', active: path === '/components/breadcrumbs', onClick: () => go('/components/breadcrumbs') },
      { id: 'tabs', label: 'Tabs', active: path === '/components/tabs', onClick: () => go('/components/tabs') },
      { id: 'search-bar', label: 'SearchBar', active: path === '/components/search-bar', onClick: () => go('/components/search-bar') },
      { id: 'submenu-bar', label: 'SubmenuBar', active: path === '/components/submenu-bar', onClick: () => go('/components/submenu-bar') },
      { id: 'stepper', label: 'Stepper', active: path === '/components/stepper', onClick: () => go('/components/stepper') },
    ],
    [path],
  );

  const navContent: SidebarItemDef[] = useMemo(
    () => [
      { id: 'card', label: 'Card', active: path === '/components/card', onClick: () => go('/components/card') },
      { id: 'accordion', label: 'Accordion', active: path === '/components/accordion', onClick: () => go('/components/accordion') },
      { id: 'alert', label: 'Alert', active: path === '/components/alert', onClick: () => go('/components/alert') },
      { id: 'kbd', label: 'Kbd', active: path === '/components/kbd', onClick: () => go('/components/kbd') },
      { id: 'carousel', label: 'Carousel', active: path === '/components/carousel', onClick: () => go('/components/carousel') },
      { id: 'timeline', label: 'Timeline', active: path === '/components/timeline', onClick: () => go('/components/timeline') },
      { id: 'tree-view', label: 'TreeView', active: path === '/components/tree-view', onClick: () => go('/components/tree-view') },
      { id: 'markdown', label: 'Markdown', active: path === '/components/markdown', onClick: () => go('/components/markdown') },
      { id: 'log-viewer', label: 'LogViewer', active: path === '/components/log-viewer', onClick: () => go('/components/log-viewer') },
    ],
    [path],
  );

  const navViewers: SidebarItemDef[] = useMemo(
    () => [
      { id: 'file-viewer', label: 'FileViewer', active: path === '/components/file-viewer', onClick: () => go('/components/file-viewer') },
      { id: 'code-block', label: 'CodeBlock', active: path === '/components/code-block', onClick: () => go('/components/code-block') },
      { id: 'image', label: 'Image', active: path === '/components/image', onClick: () => go('/components/image') },
      { id: 'avatar', label: 'Avatar', active: path === '/components/avatar', onClick: () => go('/components/avatar') },
      { id: 'avatar-group', label: 'AvatarGroup', active: path === '/components/avatar-group', onClick: () => go('/components/avatar-group') },
    ],
    [path],
  );

  const navCharts: SidebarItemDef[] = useMemo(
    () => [
      { id: 'bar', label: 'Bar', active: path === '/components/charts/bar', onClick: () => go('/components/charts/bar') },
      { id: 'line', label: 'Line', active: path === '/components/charts/line', onClick: () => go('/components/charts/line') },
      { id: 'pie', label: 'Pie', active: path === '/components/charts/pie', onClick: () => go('/components/charts/pie') },
      { id: 'scatter', label: 'Scatter', active: path === '/components/charts/scatter', onClick: () => go('/components/charts/scatter') },
      { id: 'heatmap', label: 'Heatmap', active: path === '/components/heatmap', onClick: () => go('/components/heatmap') },
      { id: 'treemap', label: 'Treemap', active: path === '/components/charts/treemap', onClick: () => go('/components/charts/treemap') },
      { id: 'wordcloud', label: 'WordCloud', active: path === '/components/charts/wordcloud', onClick: () => go('/components/charts/wordcloud') },
      { id: 'graph-viewer', label: 'GraphViewer', active: path === '/components/graph-viewer', onClick: () => go('/components/graph-viewer') },
      { id: 'progress', label: 'Progress', active: path === '/components/progress', onClick: () => go('/components/progress') },
      { id: 'timing-bar', label: 'TimingBar', active: path === '/components/timing-bar', onClick: () => go('/components/timing-bar') },
      { id: 'spinner', label: 'Spinner', active: path === '/components/spinner', onClick: () => go('/components/spinner') },
    ],
    [path],
  );

  const navGroups: Array<{ label: string; items: SidebarItemDef[] }> = useMemo(
    () => [
      { label: 'Start', items: navStart },
      { label: 'Foundations', items: navFoundations },
      { label: 'Actions', items: navActions },
      { label: 'Data', items: navData },
      { label: 'Overlays', items: navOverlays },
      { label: 'Forms', items: navForms },
      { label: 'Navigation', items: navNavigation },
      { label: 'Content', items: navContent },
      { label: 'Viewers', items: navViewers },
      { label: 'Charts', items: navCharts },
    ],
    [navStart, navFoundations, navActions, navData, navOverlays, navForms, navNavigation, navContent, navViewers, navCharts],
  );

  const paletteItems = useMemo(
    () => [
      { id: 'home', label: 'Home', group: 'Pages', keywords: 'home start', onSelect: () => go('/') },
      { id: 'components', label: 'All components', group: 'Pages', keywords: 'components index directory', onSelect: () => go('/components') },
      { id: 'showcase', label: 'Showcase', group: 'Pages', keywords: 'showcase all examples anchors', onSelect: () => go('/showcase') },
      ...navGroups.flatMap((g) =>
        g.items
          .filter((item) => item.id !== 'home' && item.id !== 'showcase' && item.id !== 'all')
          .map((item) => ({
            id: `page-${item.id}`,
            label: String(item.label),
            group: g.label,
            keywords: `${String(item.label)} ${g.label}`,
            onSelect: () => go(
              g.label === 'Foundations'
                ? `/foundations/${item.id}`
                : item.id === 'bar' || item.id === 'line' || item.id === 'pie' || item.id === 'scatter' || item.id === 'treemap' || item.id === 'wordcloud'
                  ? `/components/charts/${item.id}`
                  : `/components/${item.id}`,
            ),
          })),
      ),
    ],
    [],
  );

  return (
    <ToasterProvider>
      <div className="min-h-screen bg-ot-bg font-sans text-ot-text">
        <header
          className="sticky top-0 z-10 border-b border-ot-border backdrop-blur"
          style={{ background: 'color-mix(in srgb, var(--ot-bg) 85%, transparent)' }}
        >
          <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-3">
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open docs navigation"
              className="grid h-10 w-10 place-items-center rounded-ot-md border border-ot-border bg-ot-surface text-ot-muted lg:hidden"
            >
              <List size={18} />
            </button>
            <Link to="/" className="flex min-w-0 items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-ot-md bg-navy text-white">
                <Crown size={22} />
              </span>
              <span className="min-w-0">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="truncate text-lg font-extrabold tracking-tight">OmegaOS UI</span>
                  <Badge tone="grey">v{uiPkg.version}</Badge>
                </span>
                <span className="hidden truncate text-xs text-ot-muted sm:block">
                  Design system docs. Navy and maroon, light and dark, lucide only
                </span>
              </span>
            </Link>
            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPaletteOpen(true)}
                className="hidden h-10 min-w-0 items-center gap-2.5 rounded-ot-md border border-ot-border bg-ot-bg px-3 text-sm text-ot-muted transition-colors hover:text-ot-text md:inline-flex md:w-64"
              >
                <Search size={15} aria-hidden className="shrink-0" />
                <span className="flex-1 truncate text-left">Search docs…</span>
                <span className="flex shrink-0 items-center gap-1">
                  <Kbd>Ctrl</Kbd>
                  <Kbd>K</Kbd>
                </span>
              </button>
              <a
                href="https://github.com/arasydafa/omega-os"
                target="_blank"
                rel="noreferrer"
                aria-label="Open GitHub repository"
                className="grid h-10 w-10 place-items-center rounded-ot-md border border-ot-border bg-ot-surface text-ot-muted transition-colors hover:text-ot-text"
              >
                <Github size={17} />
              </a>
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex h-10 items-center gap-2 rounded-full border border-ot-border bg-ot-surface px-3.5 text-[13px] font-semibold transition-transform active:scale-90"
              >
                {icon === 'moon' ? <Moon size={15} /> : <Sun size={15} />}
                {dark ? 'Light' : 'Dark'}
              </button>
            </div>
          </div>
          <div className="border-t border-ot-border lg:hidden">
            <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 py-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/components', label: 'Components' },
                { to: '/showcase', label: 'Showcase' },
              ].map((r) => (
                <button
                  key={r.to}
                  type="button"
                  onClick={() => go(r.to)}
                  className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    path === r.to || (r.to === '/components' && path.startsWith('/components/'))
                      ? 'border-transparent bg-navy-bg text-navy-text'
                      : 'border-ot-border text-ot-muted'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="mx-auto flex max-w-7xl gap-6 px-5 py-8">
          <aside className="hidden w-60 shrink-0 lg:block">
            <div className="sticky top-32 grid max-h-[calc(100vh-9rem)] content-start gap-2 overflow-y-auto">
              <Button
                size="sm"
                variant="secondary"
                icon={<PanelLeft size={16} />}
                onClick={() => setDocsCollapsed((v) => !v)}
              >
                {docsCollapsed ? 'Expand nav' : 'Collapse nav'}
              </Button>
              {navGroups.map((group) => (
                <div key={group.label} className="grid content-start gap-1.5">
                  <p className="px-1 pt-1 text-[11px] font-bold uppercase tracking-wide text-ot-muted">
                    {group.label}
                  </p>
                  <Sidebar collapsed={docsCollapsed} items={group.items} label={`${group.label} pages`} />
                </div>
              ))}
            </div>
          </aside>

          <main className="min-w-0 flex-1">
            <Outlet />
          </main>
        </div>

        <footer className="border-t border-ot-border">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-5 py-6 text-sm text-ot-muted">
            <span className="grid h-8 w-8 place-items-center rounded-ot-sm bg-navy text-white">
              <Crown size={16} />
            </span>
            <span>
              <b className="text-ot-text">OmegaOS UI</b> v{uiPkg.version} · MIT. Tokens, Tailwind preset, lucide
              only.
            </span>
            <span className="ml-auto flex flex-wrap gap-2">
              <a className="underline" href="https://github.com/arasydafa/omega-os" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <button type="button" className="underline" onClick={() => go('/components')}>
                Components
              </button>
              <button type="button" className="underline" onClick={() => setPaletteOpen(true)}>
                Search
              </button>
            </span>
          </div>
        </footer>

        <CommandPalette
          open={paletteOpen}
          onOpenChange={setPaletteOpen}
          placeholder="Search docs pages…"
          label="Search docs"
          items={paletteItems}
        />

        {mobileNavOpen ? (
          <div className="fixed inset-0 z-ot-modal lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileNavOpen(false)} aria-hidden />
            <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw] overflow-y-auto border-r border-ot-border bg-ot-bg p-4">
              <div className="mb-3 flex items-center justify-between">
                <b className="text-sm">Docs pages</b>
                <Button size="sm" variant="secondary" onClick={() => setMobileNavOpen(false)}>
                  Close
                </Button>
              </div>
              <div className="grid content-start gap-3">
                {navGroups.map((group) => (
                  <div key={group.label} className="grid content-start gap-1.5">
                    <p className="px-1 text-[11px] font-bold uppercase tracking-wide text-ot-muted">
                      {group.label}
                    </p>
                    <Sidebar items={group.items} label={`${group.label} pages`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </ToasterProvider>
  );
}
