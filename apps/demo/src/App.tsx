import { useState } from 'react';
import {
  Alert,
  Badge,
  Button,
  Dropdown,
  Input,
  Modal,
  Select,
  Textarea,
  ToasterProvider,
  Tooltip,
  useToast,
} from '@omega-os/ui';
import type { AlertTone } from '@omega-os/ui';
import {
  Bell,
  Check,
  ChevronDown,
  Crown,
  Moon,
  Plus,
  Settings,
  Sun,
  Trash2,
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
