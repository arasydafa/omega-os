import { useState } from 'react';
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
  Input,
  Modal,
  Navbar,
  Pagination,
  Radio,
  Select,
  Sidebar,
  Skeleton,
  Spinner,
  Switch,
  Table,
  Tabs,
  Textarea,
  ToasterProvider,
  Tooltip,
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

const ALERTS: AlertTone[] = ['info', 'warning', 'success', 'danger'];

export default function App() {
  const [dark, setDark] = useState(false);
  const [icon, setIcon] = useState<'sun' | 'moon'>('moon');

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const x = e.clientX || window.innerWidth - 60;
    const y = e.clientY || 40;
    const apply = () => {
      const next = !dark;
      setDark(next);
      setIcon(next ? 'sun' : 'moon');
      document.documentElement.classList.toggle('dark', next);
    };
    const vt = (
      document as Document & {
        startViewTransition?: (cb: () => void) => { ready: Promise<void> };
      }
    ).startViewTransition;
    if (vt) {
      const t = vt(apply);
      t.ready.then(() => {
        const r = Math.hypot(window.innerWidth, window.innerHeight);
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${r}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 550,
            easing: 'ease-out',
            pseudoElement: '::view-transition-new(root)',
          },
        );
      });
    } else {
      apply();
    }
  };

  return (
    <ToasterProvider>
    <div className="min-h-screen bg-ot-bg font-sans text-ot-text">
      <header className="sticky top-0 z-10 border-b border-ot-border bg-ot-bg/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-ot-md bg-navy text-white">
              <Crown size={22} />
            </span>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight">OmegaOS UI</h1>
              <p className="text-xs text-ot-muted">React demo — v0.4.0 infra</p>
            </div>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center gap-2 rounded-full border border-ot-border bg-ot-surface px-3.5 py-2 text-[13px] font-semibold"
          >
            {icon === 'moon' ? <Moon size={15} /> : <Sun size={15} />}
            {dark ? 'Light' : 'Dark'}
          </button>
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl gap-4 px-5 py-8">
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

        <NavigationDemo />
      </main>
    </div>
    </ToasterProvider>
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
                children: [{ label: 'Duplicate', onSelect: () => toast.show('info', 'Duplicate picked.') }],
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
  status: 'Active' | 'Draft' | 'Archived';
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
];

const PAGE_SIZE = 5;

function statusBadge(status: DemoTool['status']) {
  if (status === 'Active') return <Badge tone="success" icon={<Check size={12} />}>Active</Badge>;
  if (status === 'Archived') return <Badge tone="grey">Archived</Badge>;
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

function NavigationDemo() {
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
