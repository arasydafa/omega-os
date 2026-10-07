import { Alert, Badge, Button, FileUpload, Input, Select, Textarea, useToast } from '@omega-os/ui';
import type { AlertTone } from '@omega-os/ui';
import { Check, Plus, Settings, Trash2 } from 'lucide-react';
import {
  ChartsDemo,
  CommandDemo,
  ComplexDemo,
  ComplementsDemo,
  DataDemo,
  FoundationsDemo,
  NavigationDemo,
  OverlayDemo,
  PrimitivesDemo,
  ViewersDemo,
} from './showcase-sections.js';
import { DndDemo } from '../DndDemo.js';
import { DOC_GROUPS, scrollToId } from '../docs.js';
import { IconsDemo } from './IconsDemo.js';

const ALERTS: AlertTone[] = ['info', 'warning', 'success', 'danger'];

function UploadDemo() {
  const toast = useToast();
  return (
    <FileUpload
      label="Attachments"
      helper="PNG or JPG up to 5 MB."
      accept=".png,.jpg,image/png,image/jpeg"
      onFiles={(files) => toast.show('success', `${files.length} file(s) ready to upload.`)}
    />
  );
}

export function Showcase() {
  const openPalette = () => window.dispatchEvent(new Event('omega:palette'));
  return (
    <div className="grid min-w-0 flex-1 content-start gap-4">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {DOC_GROUPS.map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => scrollToId(g.sections[0].id)}
            className="shrink-0 rounded-full border border-ot-border bg-ot-surface px-3 py-1.5 text-xs font-semibold text-ot-muted transition-colors hover:text-ot-text"
          >
            {g.label}
          </button>
        ))}
      </div>

      <FoundationsDemo />

      <section id="buttons" className="scroll-mt-36 rounded-ot-lg border border-ot-border bg-ot-surface p-5">
        <h2 className="mb-1 text-lg font-bold">Buttons</h2>
        <p className="mb-4 text-sm text-ot-muted">
          All rounded 12px, lucide icon required. Full page: <a href="#/components/button" className="text-info underline">Button</a>.
        </p>
        <div className="flex flex-wrap gap-2.5">
          <Button icon={<Plus size={16} />}>Primary</Button>
          <Button variant="secondary" icon={<Settings size={16} />}>
            Secondary
          </Button>
          <Button variant="solid" icon={<Plus size={16} />}>
            Solid
          </Button>
          <Button variant="danger" icon={<Trash2 size={16} />}>
            Danger
          </Button>
          <Button variant="secondary" size="sm">
            Small
          </Button>
          <Button loading>Loading</Button>
        </div>
      </section>

      <section id="badges" className="scroll-mt-36 rounded-ot-lg border border-ot-border bg-ot-surface p-5">
        <h2 className="mb-1 text-lg font-bold">Badges</h2>
        <p className="mb-4 text-sm text-ot-muted">Pill shape, one tone per meaning.</p>
        <div className="flex flex-wrap gap-2.5">
          <Badge tone="navy">Navy</Badge>
          <Badge tone="grey">Draft</Badge>
          <Badge tone="info">Info</Badge>
          <Badge tone="warning">Warning</Badge>
          <Badge tone="success" icon={<Check size={12} />}>
            Active
          </Badge>
          <Badge tone="danger">Error</Badge>
        </div>
      </section>

      <section id="alerts" className="scroll-mt-36 rounded-ot-lg border border-ot-border bg-ot-surface p-5">
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

      <section id="fields" className="scroll-mt-36 rounded-ot-lg border border-ot-border bg-ot-surface p-5">
        <h2 className="mb-1 text-lg font-bold">Fields</h2>
        <p className="mb-4 text-sm text-ot-muted">40px tall, 12px radius, navy focus ring.</p>
        <div className="grid gap-3.5">
          <Input label="Project name" placeholder="e.g. riverside-cafe" helper="Lowercase, no spaces." />
          <Input label="Required field" error="This field is required." />
          <UploadDemo />
          <Select label="Category">
            <option>Website</option>
            <option>Mobile app</option>
            <option>Design system</option>
            <option>Docs</option>
          </Select>
          <Textarea label="Description" placeholder="Short description…" />
        </div>
      </section>

      <div id="overlays-demo" className="scroll-mt-36">
        <OverlayDemo />
      </div>

      <div id="data-table" className="scroll-mt-36">
        <DataDemo />
      </div>

      <div id="complements" className="scroll-mt-36">
        <ComplementsDemo />
      </div>

      <div id="primitives" className="scroll-mt-36">
        <PrimitivesDemo />
      </div>

      <div id="command" className="scroll-mt-36">
        <CommandDemo onOpenPalette={openPalette} />
      </div>

      <div id="complex" className="scroll-mt-36">
        <ComplexDemo />
      </div>

      <div id="viewers-demo" className="scroll-mt-36">
        <ViewersDemo />
      </div>

      <div id="charts-demo" className="scroll-mt-36">
        <ChartsDemo />
      </div>

      <div id="playground" className="scroll-mt-36">
        <DndDemo />
      </div>

      <div id="navigation-demo" className="scroll-mt-36">
        <NavigationDemo />
      </div>

      <div id="icons-demo" className="scroll-mt-36">
        <IconsDemo />
      </div>
    </div>
  );
}
