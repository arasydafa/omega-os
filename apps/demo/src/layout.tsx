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

  const sidebarItems: SidebarItemDef[] = useMemo(
    () => [
      { id: 'home', label: 'Home', icon: routeIcon('home'), active: path === '/', onClick: () => go('/') },
      {
        id: 'components',
        label: 'Components',
        icon: routeIcon('components'),
        active: path.startsWith('/components'),
        onClick: () => go('/components'),
        children: [
          { id: 'all', label: 'All components', active: path === '/components', onClick: () => go('/components') },
          { id: 'button', label: 'Button', active: path === '/components/button', onClick: () => go('/components/button') },
          { id: 'table', label: 'Table', active: path === '/components/table', onClick: () => go('/components/table') },
          { id: 'modal', label: 'Modal', active: path === '/components/modal', onClick: () => go('/components/modal') },
        ],
      },
      { id: 'showcase', label: 'Showcase', icon: routeIcon('showcase'), active: path === '/showcase', onClick: () => go('/showcase') },
    ],
    [path],
  );

  const paletteItems = useMemo(
    () => [
      { id: 'home', label: 'Home', group: 'Pages', keywords: 'home landing start', onSelect: () => go('/') },
      { id: 'components', label: 'All components', group: 'Pages', keywords: 'components index directory', onSelect: () => go('/components') },
      { id: 'button', label: 'Button', group: 'Components', keywords: 'button primary danger loading', onSelect: () => go('/components/button') },
      { id: 'table', label: 'Table', group: 'Components', keywords: 'table sort filter pagination data', onSelect: () => go('/components/table') },
      { id: 'modal', label: 'Modal', group: 'Components', keywords: 'modal dialog confirm overlay', onSelect: () => go('/components/modal') },
      { id: 'showcase', label: 'Showcase', group: 'Pages', keywords: 'showcase all examples anchors', onSelect: () => go('/showcase') },
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
                  Design system docs — navy/maroon, light + dark, lucide only
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
              <Sidebar collapsed={docsCollapsed} items={sidebarItems} label="Docs pages" />
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
              <b className="text-ot-text">OmegaOS UI</b> v{uiPkg.version} — MIT. Tokens + Tailwind preset + lucide
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
              <Sidebar items={sidebarItems} label="Docs pages" />
            </div>
          </div>
        ) : null}
      </div>
    </ToasterProvider>
  );
}
