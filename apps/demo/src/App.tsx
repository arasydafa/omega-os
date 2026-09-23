import { useState } from 'react';
import uiPkg from '@omega-os/ui/package.json';
import {
  Alert,
  Avatar,
  Badge,
  Breadcrumbs,
  Button,
  Card,
  Checkbox,
  Dropdown,
  EmptyState,
  FileViewer,
  Image,
  Input,
  Modal,
  Navbar,
  OMEGA_ICONS,
  Pagination,
  Radio,
  SearchBar,
  Select,
  Sidebar,
  Skeleton,
  Spinner,
  SubmenuBar,
  Switch,
  Table,
  Tabs,
  Textarea,
  ToasterProvider,
  Tooltip,
  iconComponentName,
  toggleThemeReveal,
  useToast,
} from '@omega-os/ui';
import type { AlertTone } from '@omega-os/ui';
import {
  Bell,
  BookOpen,
  Check,
  ChevronDown,
  Copy,
  Crown,
  Folder,
  Home,
  LayoutDashboard,
  Moon,
  PanelLeft,
  Pencil,
  Plus,
  Settings,
  Sun,
  Trash2,
  Wrench,
} from 'lucide-react';
import * as lucideSet from 'lucide-react';

const ALERTS: AlertTone[] = ['info', 'warning', 'success', 'danger'];

export default function App() {
  const [dark, setDark] = useState(false);
  const [icon, setIcon] = useState<'sun' | 'moon'>('moon');

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

  return (
    <ToasterProvider>
    <div className="min-h-screen bg-ot-bg font-sans text-ot-text">
      <header
        className="sticky top-0 z-10 border-b border-ot-border backdrop-blur"
        style={{ background: 'color-mix(in srgb, var(--ot-bg) 85%, transparent)' }}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-ot-md bg-navy text-white">
              <Crown size={22} />
            </span>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight">OmegaOS UI</h1>
              <p className="text-xs text-ot-muted">Component showcase — v{uiPkg.version}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center gap-2 rounded-full border border-ot-border bg-ot-surface px-3.5 py-2 text-[13px] font-semibold transition-transform active:scale-90"
          >
            {icon === 'moon' ? <Moon size={15} /> : <Sun size={15} />}
            {dark ? 'Light' : 'Dark'}
          </button>
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl gap-4 px-5 py-8">
        <FoundationsDemo />

        <section className="rounded-ot-lg border border-ot-border bg-ot-surface p-5">
          <h2 className="mb-1 text-lg font-bold">Buttons</h2>
          <p className="mb-4 text-sm text-ot-muted">All rounded 12px, lucide icon required.</p>
          <div className="flex flex-wrap gap-2.5">
            <Button icon={<Plus size={16} />}>Primary</Button>
            <Button variant="secondary" icon={<Settings size={16} />}>Secondary</Button>
            <Button variant="danger" icon={<Trash2 size={16} />}>Danger</Button>
            <Button variant="secondary" size="sm">Small</Button>
            <Button loading>Loading</Button>
          </div>
        </section>

        <section className="rounded-ot-lg border border-ot-border bg-ot-surface p-5">
          <h2 className="mb-1 text-lg font-bold">Badges</h2>
          <p className="mb-4 text-sm text-ot-muted">Pill shape, one tone per meaning.</p>
          <div className="flex flex-wrap gap-2.5">
            <Badge tone="navy">Navy</Badge>
            <Badge tone="grey">Draft</Badge>
            <Badge tone="info">Info</Badge>
            <Badge tone="warning">Warning</Badge>
            <Badge tone="success" icon={<Check size={12} />}>Active</Badge>
            <Badge tone="danger">Error</Badge>
          </div>
        </section>

        <section className="rounded-ot-lg border border-ot-border bg-ot-surface p-5">
          <h2 className="mb-1 text-lg font-bold">Alerts</h2>
          <p className="mb-4 text-sm text-ot-muted">Info blue, warning yellow, success green, danger maroon.</p>
          <div className="grid gap-2.5">
            {ALERTS.map((tone) => (
              <Alert key={tone} tone={tone} title={`${tone[0].toUpperCase()}${tone.slice(1)}.`}>
                This is a live {tone} alert rendered by React.
              </Alert>
            ))}
          </div>
        </section>

        <section className="rounded-ot-lg border border-ot-border bg-ot-surface p-5">
          <h2 className="mb-1 text-lg font-bold">Fields</h2>
          <p className="mb-4 text-sm text-ot-muted">40px tall, 12px radius, navy focus ring.</p>
          <div className="grid gap-3.5">
            <Input label="Tool name" placeholder="e.g. vstack" helper="Lowercase, no spaces." />
            <Input label="Required field" error="This field is required." />
            <Select label="Category">
              <option>Security tools</option>
              <option>Portfolio</option>
              <option>Opensource</option>
            </Select>
            <Textarea label="Description" placeholder="Short description…" />
          </div>
        </section>

        <OverlayDemo />

        <DataDemo />

        <ComplementsDemo />

        <ViewersDemo />

        <NavigationDemo />

        <IconsDemo />
      </main>
    </div>
    </ToasterProvider>
  );
}

function FoundationsDemo() {
  const swatch = (bg: string, name: string, value: string) => (
    <div className="overflow-hidden rounded-ot-sm border border-ot-border bg-ot-bg">
      <div className="h-14" style={{ background: bg }} />
      <div className="px-2.5 py-2 text-xs">
        <b className="block">{name}</b>
        <span className="font-mono text-[11px] text-ot-muted">{value}</span>
      </div>
    </div>
  );
  const typeRow = (sample: React.ReactNode, example: React.ReactNode, use: string) => (
    <div className="py-2.5">
      <p>{sample}</p>
      <p className="mt-1 text-sm text-ot-muted">{example}</p>
      <p className="mt-0.5 text-xs text-ot-muted">
        <span className="font-semibold text-ot-text">Use for:</span> {use}
      </p>
    </div>
  );
  return (
    <>
      <section className="rounded-ot-lg border border-ot-border bg-ot-surface p-5">
        <h2 className="mb-1 text-lg font-bold">Typography</h2>
        <p className="mb-4 text-sm text-ot-muted">Plus Jakarta Sans for UI, JetBrains Mono for code.</p>
        <div className="divide-y divide-dashed divide-ot-border">
          {typeRow(
            <span className="text-3xl font-extrabold tracking-tight">Heading 30 / ExtraBold</span>,
            'VStack visualizes your ROP chain before you run it.',
            'page titles, hero numbers',
          )}
          {typeRow(
            <span className="text-2xl font-bold">Heading 24 / Bold</span>,
            'CI-CD Lab walks through pipelines step by step.',
            'section titles, card titles',
          )}
          {typeRow(
            <span className="text-lg font-semibold">Heading 18 / Semibold</span>,
            'Every tool ships with a guided workspace.',
            'subsections, modal titles',
          )}
          {typeRow(
            <span className="text-base">Body 16 / Regular</span>,
            'Modern minimalist interfaces for tools, portfolio, and docs.',
            'paragraphs, table cells, menu items',
          )}
          {typeRow(
            <span className="text-sm text-ot-muted">Muted 14</span>,
            'Helper text stays quiet so primary actions stand out.',
            'descriptions, helper text, table headers',
          )}
          {typeRow(
            <span className="font-mono text-sm">mono 14 — const theme = &quot;light&quot; | &quot;dark&quot;;</span>,
            'Code, addresses, and log output always use the mono face.',
            'code blocks, addresses, logs, badges with IDs',
          )}
          <div className="py-2.5 text-sm">
            <p className="mb-1 text-[13px] font-semibold">Rich text</p>
            <p>
              Run <code className="rounded-ot-sm bg-ot-surface-2 px-1.5 py-0.5 font-mono text-[13px]">npm test</code>{' '}
              before pushing, read the <strong>release checklist</strong>, and follow the{' '}
              <a href="#typography" className="text-info underline">
                theming guide
              </a>{' '}
              for details.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-ot-lg border border-ot-border bg-ot-surface p-5">
          <h2 className="mb-1 text-lg font-bold">Brand</h2>
          <p className="mb-4 text-sm text-ot-muted">Navy primary, maroon danger-only.</p>
          <div className="grid gap-3">
            {swatch('#1E3A5F', 'Navy primary', '#1E3A5F')}
            {swatch('#162C4A', 'Navy hover', '#162C4A')}
            {swatch('var(--ot-navy-bg)', 'Navy bg tint', 'theme-aware')}
            {swatch('#7B1E26', 'Maroon danger', '#7B1E26')}
            {swatch('#5F151D', 'Maroon hover', '#5F151D')}
            {swatch('var(--ot-danger-bg)', 'Maroon bg tint', 'theme-aware')}
            {swatch('#2B2F36', 'Dark grey', '#2B2F36')}
            {swatch('#0B0D10', 'Black', '#0B0D10')}
            {swatch('#FFFFFF', 'White', '#FFFFFF')}
          </div>
          <ul className="mt-4 grid gap-1 text-[13px] text-ot-muted">
            <li><b className="text-ot-text">Navy</b> — primary buttons, active nav, links, focus.</li>
            <li><b className="text-ot-text">Maroon</b> — destructive actions and errors only.</li>
            <li><b className="text-ot-text">Dark grey</b> — borders, hover fills, secondary surfaces.</li>
            <li><b className="text-ot-text">Black / white</b> — dark / light page base.</li>
          </ul>
        </div>
        <div className="rounded-ot-lg border border-ot-border bg-ot-surface p-5">
          <h2 className="mb-1 text-lg font-bold">Status</h2>
          <p className="mb-4 text-sm text-ot-muted">Shared by alerts and toasts.</p>
          <div className="grid gap-3">
            {swatch('var(--ot-info)', 'Info blue', 'light #1D4ED8')}
            {swatch('var(--ot-warning)', 'Warning yellow', 'light #B45309')}
            {swatch('var(--ot-success)', 'Success green', 'light #15803D')}
            {swatch('var(--ot-danger)', 'Danger maroon', '#7B1E26')}
          </div>
          <ul className="mt-4 grid gap-1 text-[13px] text-ot-muted">
            <li><b className="text-ot-text">Info</b> — neutral updates, tips, new features.</li>
            <li><b className="text-ot-text">Warning</b> — caution, unsaved changes, destructive confirmations.</li>
            <li><b className="text-ot-text">Success</b> — saved, deployed, completed.</li>
            <li><b className="text-ot-text">Danger</b> — errors, failures, destructive results.</li>
          </ul>
        </div>
        <div className="rounded-ot-lg border border-ot-border bg-ot-surface p-5">
          <h2 className="mb-1 text-lg font-bold">Surfaces</h2>
          <p className="mb-4 text-sm text-ot-muted">Follow the theme toggle.</p>
          <div className="grid gap-3">
            {swatch('var(--ot-bg)', 'bg', 'page')}
            {swatch('var(--ot-surface)', 'surface', 'card')}
            {swatch('var(--ot-surface-2)', 'surface-2', 'hover/input')}
            {swatch('var(--ot-border)', 'border', 'line')}
            {swatch('var(--ot-text)', 'text', 'foreground')}
            {swatch('var(--ot-muted)', 'muted', 'secondary text')}
          </div>
          <ul className="mt-4 grid gap-1 text-[13px] text-ot-muted">
            <li><b className="text-ot-text">bg</b> — page background.</li>
            <li><b className="text-ot-text">surface</b> — cards, panels, table headers.</li>
            <li><b className="text-ot-text">surface-2</b> — hover fills, input backgrounds, skeletons.</li>
            <li><b className="text-ot-text">border</b> — dividers, card outlines, thumbs.</li>
            <li><b className="text-ot-text">text / muted</b> — primary vs secondary copy.</li>
          </ul>
        </div>
      </section>

      <section className="rounded-ot-lg border border-ot-border bg-ot-surface p-5">
        <h2 className="mb-1 text-lg font-bold">Radius</h2>
        <p className="mb-4 text-sm text-ot-muted">No sharp corners — each size has one job.</p>
        <div className="flex flex-wrap gap-3">
          <span className="grid h-[72px] w-[120px] place-items-center bg-navy text-xs font-bold text-white" style={{ borderRadius: 8 }}>8 · inputs, badges</span>
          <span className="grid h-[72px] w-[120px] place-items-center bg-navy text-xs font-bold text-white" style={{ borderRadius: 12 }}>12 · buttons, alerts</span>
          <span className="grid h-[72px] w-[120px] place-items-center bg-navy text-xs font-bold text-white" style={{ borderRadius: 16 }}>16 · cards, modals</span>
          <span className="grid h-[72px] w-[120px] place-items-center bg-navy text-xs font-bold text-white" style={{ borderRadius: 20 }}>20 · large panels</span>
          <span className="grid h-[72px] w-[140px] place-items-center rounded-full bg-navy text-xs font-bold text-white">full · pills, avatars</span>
        </div>
      </section>
    </>
  );
}

function OverlayDemo() {
  const toast = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <section className="rounded-ot-lg border border-ot-border bg-ot-surface p-5">
        <h2 className="mb-1 text-lg font-bold">Overlays</h2>
        <p className="mb-4 text-sm text-ot-muted">Toast, modal, dropdown, tooltip.</p>
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="secondary"
            icon={<Bell size={16} />}
            onClick={() => toast.show('success', 'Tokens applied.', { title: 'Saved.' })}
          >
            Fire toast
          </Button>
          <Button variant="danger" icon={<Trash2 size={16} />} onClick={() => setModalOpen(true)}>
            Open modal
          </Button>
          <Dropdown
            trigger={
              <Button variant="secondary">
                Menu <ChevronDown size={16} />
              </Button>
            }
            items={[
              { label: 'Rename', onSelect: () => toast.show('info', 'Rename picked.') },
              {
                label: 'More',
                children: [
                  { label: 'Duplicate', onSelect: () => toast.show('info', 'Duplicate picked.') },
                  {
                    label: 'Settings',
                    children: [
                      { label: 'Workspace', onSelect: () => toast.show('info', 'Workspace picked.') },
                      { label: 'Preferences', onSelect: () => toast.show('info', 'Preferences picked.') },
                    ],
                  },
                ],
              },
              { label: 'Delete', danger: true, onSelect: () => toast.show('danger', 'Delete picked.') },
            ]}
          />
          <Tooltip content="Helpful hint">
            <Button variant="ghost">Hover me</Button>
          </Tooltip>
        </div>
      </section>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Delete tool?"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              icon={<Trash2 size={16} />}
              onClick={() => {
                setModalOpen(false);
                toast.show('success', 'Tool deleted (demo).');
              }}
            >
              Delete
            </Button>
          </>
        }
      >
        This action is permanent and cannot be undone.
      </Modal>
    </>
  );
}

interface DemoTool {
  id: string;
  name: string;
  status: 'Active' | 'Draft' | 'Archived' | 'Disabled' | 'Info' | 'Warning' | 'Error';
}

const DEMO_TOOLS: DemoTool[] = [
  { id: 'vstack', name: 'VStack', status: 'Active' },
  { id: 'cicd-lab', name: 'CI-CD Lab', status: 'Active' },
  { id: 'portfolio', name: 'Portfolio', status: 'Draft' },
  { id: 'omega-docs', name: 'Omega Docs', status: 'Draft' },
  { id: 'scanner', name: 'Scanner', status: 'Archived' },
  { id: 'playground', name: 'Playground', status: 'Draft' },
  { id: 'monitor', name: 'Monitor', status: 'Active' },
  { id: 'deployer', name: 'Deployer', status: 'Draft' },
  { id: 'vault', name: 'Vault', status: 'Archived' },
  { id: 'linter', name: 'Linter', status: 'Active' },
  { id: 'backup', name: 'Backup', status: 'Draft' },
  { id: 'proxy', name: 'Proxy', status: 'Archived' },
  { id: 'gateway', name: 'Gateway', status: 'Disabled' },
  { id: 'notifier', name: 'Notifier', status: 'Info' },
  { id: 'updater', name: 'Updater', status: 'Warning' },
  { id: 'crasher', name: 'Crasher', status: 'Error' },
];

const PAGE_SIZE = 5;

function statusBadge(status: DemoTool['status']) {
  if (status === 'Active') return <Badge tone="success" icon={<Check size={12} />}>Active</Badge>;
  if (status === 'Archived') return <Badge tone="grey">Archived</Badge>;
  if (status === 'Disabled') return <Badge tone="grey">Disabled</Badge>;
  if (status === 'Info') return <Badge tone="info">Info</Badge>;
  if (status === 'Warning') return <Badge tone="warning">Warning</Badge>;
  if (status === 'Error') return <Badge tone="danger">Error</Badge>;
  return <Badge tone="grey">Draft</Badge>;
}

function DataDemo() {
  const toast = useToast();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const totalPages = Math.ceil(DEMO_TOOLS.length / PAGE_SIZE);
  const rows = DEMO_TOOLS.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section className="rounded-ot-lg border border-ot-border bg-ot-surface p-5">
      <h2 className="mb-1 text-lg font-bold">Data</h2>
      <p className="mb-4 text-sm text-ot-muted">Click a row to select. Toggle loading for skeletons.</p>
      <div className="mb-3 flex flex-wrap gap-2.5">
        <Button variant="secondary" size="sm" onClick={() => setLoading((v) => !v)}>
          {loading ? 'Stop loading' : 'Show skeletons'}
        </Button>
      </div>
      <Table<DemoTool>
        columns={[
          { key: 'name', header: 'Tool', render: (r) => <span className="font-semibold">{r.name}</span> },
          { key: 'status', header: 'Status', render: (r) => statusBadge(r.status) },
          {
            key: 'actions',
            header: 'Actions',
            align: 'right',
            skeleton: (
              <span className="flex justify-end gap-3">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-5" />
              </span>
            ),
            render: (r) => (
              <span className="flex justify-end gap-3">
                <button
                  type="button"
                  title={`Rename ${r.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toast.show('info', `Rename "${r.name}" (demo).`);
                  }}
                  className="text-ot-muted transition-colors hover:text-ot-text"
                >
                  <Pencil size={15} />
                </button>
                <button
                  type="button"
                  title={`Duplicate ${r.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toast.show('info', `Duplicated "${r.name}" (demo).`);
                  }}
                  className="text-ot-muted transition-colors hover:text-ot-text"
                >
                  <Copy size={15} />
                </button>
                <button
                  type="button"
                  title={`Delete ${r.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toast.show('danger', `Delete "${r.name}" is destructive (demo).`);
                  }}
                  className="text-ot-muted transition-colors hover:text-danger"
                >
                  <Trash2 size={15} />
                </button>
              </span>
            ),
          },
        ]}
        rows={rows}
        keyOf={(r) => r.id}
        selectedKey={selected}
        onRowClick={(r) => setSelected(r.id)}
        loading={loading}
        emptyTitle="No tools yet"
        emptyDescription="Create one to get started."
      />
      <div className="mt-3">
        <Pagination
          page={page}
          totalPages={totalPages}
          onChange={setPage}
          note={`${DEMO_TOOLS.length} tools, ${PAGE_SIZE} per page`}
        />
      </div>
      <div className="mt-4 grid gap-2.5 rounded-ot-md border border-ot-border bg-ot-bg p-4">
        <p className="text-sm font-semibold">Standalone states</p>
        <div className="flex flex-wrap items-center gap-2.5">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-20" />
        </div>
        <EmptyState
          title="Nothing here"
          description="This is the standalone empty state."
          action={<Button size="sm">Create new</Button>}
        />
      </div>
    </section>
  );
}

function ComplementsDemo() {
  const [notify, setNotify] = useState(false);
  return (
    <section className="rounded-ot-lg border border-ot-border bg-ot-surface p-5">
      <h2 className="mb-1 text-lg font-bold">Complements</h2>
      <p className="mb-4 text-sm text-ot-muted">Card, avatar, spinner, and labeled controls.</p>
      <div className="grid gap-4">
        <Card padding="lg">
          <div className="flex items-center gap-3">
            <Avatar name="Omega Throne" />
            <Avatar name="Vstack" size="sm" />
            <Spinner />
            <span className="text-sm text-ot-muted">Card wraps any content.</span>
          </div>
        </Card>
        <div className="grid gap-2.5">
          <Radio name="demo-theme" label="Light" description="Default theme." defaultChecked />
          <Radio name="demo-theme" label="Dark" description="Optional theme." />
          <Checkbox label="Icons only" description="No emoji in UI." defaultChecked />
          <Switch checked={notify} onChange={setNotify} label="Enable notifications" />
        </div>
      </div>
    </section>
  );
}

function IconsDemo() {
  const set = lucideSet as unknown as Record<string, React.ComponentType<{ size?: number }>>;
  return (
    <section className="rounded-ot-lg border border-ot-border bg-ot-surface p-5">
      <h2 className="mb-1 text-lg font-bold">Icons</h2>
      <p className="mb-4 text-sm text-ot-muted">
        {OMEGA_ICONS.length} approved lucide icons — same list as preview and docs. No emoji.
      </p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-2">
        {OMEGA_ICONS.map((name) => {
          const Cmp = set[iconComponentName(name)];
          return (
            <div
              key={name}
              className="grid place-items-center gap-1.5 rounded-ot-sm border border-ot-border bg-ot-bg px-2 py-2.5 text-center"
            >
              {Cmp ? <Cmp size={18} /> : <span className="text-xs text-danger">missing</span>}
              <code className="font-mono text-[10px] text-ot-muted [overflow-wrap:anywhere]">{name}</code>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const DEMO_PHOTO =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96'><rect width='96' height='96' fill='%231E3A5F'/><text x='48' y='62' font-size='36' text-anchor='middle' fill='white' font-family='sans-serif'>OT</text></svg>";

function ViewersDemo() {
  const toast = useToast();
  return (
    <section className="rounded-ot-lg border border-ot-border bg-ot-surface p-5">
      <h2 className="mb-1 text-lg font-bold">Viewers</h2>
      <p className="mb-4 text-sm text-ot-muted">Photo avatars with fallback, images, and code files.</p>
      <div className="grid gap-4">
        <div className="flex items-center gap-3">
          <Avatar name="Omega Throne" src={DEMO_PHOTO} />
          <Avatar name="Broken Link" src="https://example.com/missing.png" />
          <span className="text-sm text-ot-muted">Photo, then broken-photo fallback.</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Image src={DEMO_PHOTO} alt="Demo cover" aspect="16/10" />
          <Image
            src="https://example.com/missing.png"
            alt="Missing cover"
            aspect="16/10"
            fallbackLabel="Cover unavailable"
          />
        </div>
        <FileViewer
          filename="theme.ts"
          language="ts"
          maxHeight={220}
          onCopy={() => toast.show('success', 'Code copied to clipboard.')}
          code={`export function toggleThemeReveal(x: number, y: number, apply: () => void): void {
  document.documentElement.classList.toggle('dark');
  apply();
}`}
        />
      </div>
    </section>
  );
}

function NavigationDemo() {
  const toast = useToast();
  const [collapsed, setCollapsed] = useState(false);
  const [tab, setTab] = useState('overview');
  return (
    <section className="rounded-ot-lg border border-ot-border bg-ot-surface p-5">
      <h2 className="mb-1 text-lg font-bold">Navigation</h2>
      <p className="mb-4 text-sm text-ot-muted">Navbar, sidebar with collapse, breadcrumbs, tabs.</p>
      <div className="grid gap-4">
        <Navbar
          brand={
            <>
              <span className="grid h-8 w-8 place-items-center rounded-ot-sm bg-navy text-white">
                <Crown size={16} />
              </span>
              <b className="text-sm">OmegaOS</b>
            </>
          }
          links={[{ label: 'Dashboard', active: true }, { label: 'Tools' }, { label: 'Docs' }]}
          actions={<Button size="sm" icon={<Plus size={16} />}>New</Button>}
        />
        <SubmenuBar
          label="Project section"
          links={[
            { id: 'code', label: 'Code', active: true, count: 12 },
            { id: 'issues', label: 'Issues', count: 3 },
            { id: 'pulls', label: 'Pulls' },
          ]}
        />
        <div className="max-w-sm">
          <SearchBar shortcut="Ctrl K" onClear={() => toast.show('info', 'Search cleared.')} />
        </div>
        <Breadcrumbs
          items={[
            { label: 'Home', icon: <Home size={14} /> },
            { label: 'Tools' },
            { label: 'VStack' },
          ]}
        />
        <div className="flex flex-wrap items-start gap-4">
          <div className="grid gap-2">
            <Button size="sm" variant="secondary" icon={<PanelLeft size={16} />} onClick={() => setCollapsed((v) => !v)}>
              {collapsed ? 'Expand' : 'Collapse'}
            </Button>
            <Sidebar
              collapsed={collapsed}
              items={[
                { id: 'dash', label: 'Dashboard', icon: <LayoutDashboard size={16} />, active: true },
                {
                  id: 'tools',
                  label: 'Tools',
                  icon: <Wrench size={16} />,
                  children: [
                    { id: 'vstack', label: 'VStack' },
                    { id: 'lab', label: 'CI-CD lab' },
                  ],
                },
                { id: 'projects', label: 'Projects', icon: <Folder size={16} /> },
                { id: 'docs', label: 'Docs', icon: <BookOpen size={16} /> },
              ]}
            />
          </div>
          <div className="min-w-0 flex-1 rounded-ot-md border border-ot-border bg-ot-bg p-4">
            <Tabs
              value={tab}
              onChange={setTab}
              tabs={[
                { id: 'overview', label: 'Overview' },
                { id: 'tools', label: 'Tools' },
                { id: 'settings', label: 'Settings', disabled: true },
              ]}
            />
            <p className="mt-3 text-sm text-ot-muted">Active tab: {tab}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
