import type { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CircleCheck, OctagonX } from 'lucide-react';
import { Breadcrumbs, Button, CodeBlock, Table } from '@omega-os/ui';
import { scrollToId } from '../docs.js';

export interface PropRow {
  name: string;
  type: string;
  defaultValue: string;
  desc: string;
}

export interface VariantDef {
  id: string;
  title: string;
  desc?: string;
  code: string;
  demo: ReactNode;
}

export interface DoDont {
  doTitle: string;
  doBody: string;
  dontTitle: string;
  dontBody: string;
}

export interface ComponentPageProps {
  title: string;
  desc: string;
  badges?: ReactNode;
  importCode: string;
  preview: ReactNode;
  previewNote?: string;
  variants: VariantDef[];
  propsRows: PropRow[];
  propsNote?: string;
  doDont?: DoDont;
  a11y?: string[];
  rules: string[];
  prev?: { to: string; label: string };
  next?: { to: string; label: string };
}

const PAGE_SECTIONS = [
  { id: 'preview', label: 'Preview' },
  { id: 'usage', label: 'Usage' },
  { id: 'variants', label: 'Variants' },
  { id: 'guidelines', label: 'Guidelines', optional: true },
  { id: 'api', label: 'API' },
  { id: 'access', label: 'Accessibility', optional: true },
  { id: 'rules', label: 'Rules' },
];

export function ComponentPage(props: ComponentPageProps) {
  const {
    title,
    desc,
    badges,
    importCode,
    preview,
    previewNote,
    variants,
    propsRows,
    propsNote,
    doDont,
    a11y,
    rules,
    prev,
    next,
  } = props;
  const navigate = useNavigate();
  const pills = PAGE_SECTIONS.filter((s) => !s.optional || (s.id === 'guidelines' && doDont) || (s.id === 'access' && a11y?.length));
  return (
    <div className="mx-auto w-full max-w-4xl">
      <Breadcrumbs
        items={[
          { label: 'Home', onClick: () => navigate('/') },
          { label: 'Components', onClick: () => navigate('/components') },
          { label: title },
        ]}
      />
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight">{title}</h1>
      <p className="mt-1.5 max-w-2xl text-[15px] text-ot-muted">{desc}</p>
      {badges ? <div className="mt-3 flex flex-wrap gap-2">{badges}</div> : null}

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {pills.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => scrollToId(`doc-${s.id}`)}
            className="shrink-0 rounded-full border border-ot-border px-3 py-1.5 text-xs font-semibold text-ot-muted transition-colors hover:text-ot-text"
          >
            {s.label}
          </button>
        ))}
      </div>

      <section id="doc-preview" className="mt-4 scroll-mt-36 rounded-ot-lg border border-ot-border bg-ot-surface p-5">
        <h2 className="mb-1 text-lg font-bold">Preview</h2>
        <p className="mb-4 text-sm text-ot-muted">Live interactive demo. {previewNote ?? 'Try it. This is the same component shipped by the library.'}</p>
        {preview}
      </section>

      <section id="doc-usage" className="mt-4 scroll-mt-36 rounded-ot-lg border border-ot-border bg-ot-surface p-5">
        <h2 className="mb-1 text-lg font-bold">Usage</h2>
        <p className="mb-4 text-sm text-ot-muted">Import from the package root. Icons come from lucide-react, never emoji.</p>
        <CodeBlock language="tsx" code={importCode} />
      </section>

      <section id="doc-variants" className="mt-4 scroll-mt-36 rounded-ot-lg border border-ot-border bg-ot-surface p-5">
        <h2 className="mb-1 text-lg font-bold">Variants</h2>
        <p className="mb-4 text-sm text-ot-muted">Each variant with its snippet. Copy and adapt it.</p>
        <div className="grid gap-4">
          {variants.map((v) => (
            <div key={v.id} id={`variant-${v.id}`} className="grid gap-2.5 rounded-ot-md border border-ot-border bg-ot-bg p-4">
              <p className="text-sm font-bold">{v.title}</p>
              {v.desc ? <p className="text-sm text-ot-muted">{v.desc}</p> : null}
              <div className="flex flex-wrap items-center gap-2.5">{v.demo}</div>
              <CodeBlock language="tsx" code={v.code} />
            </div>
          ))}
        </div>
      </section>

      <section id="doc-api" className="mt-4 scroll-mt-36 rounded-ot-lg border border-ot-border bg-ot-surface p-5">
        <h2 className="mb-1 text-lg font-bold">API</h2>
        <p className="mb-4 text-sm text-ot-muted">
          Props accepted by the component. {propsNote ?? 'Native element attributes pass through where the underlying element supports them.'}
        </p>
        <Table<PropRow>
          columns={[
            { key: 'name', header: 'Prop', render: (r) => <code className="rounded-ot-sm bg-ot-surface-2 px-1.5 py-0.5 font-mono text-[13px]">{r.name}</code> },
            { key: 'type', header: 'Type', render: (r) => <code className="font-mono text-[13px] text-ot-muted">{r.type}</code> },
            { key: 'default', header: 'Default', render: (r) => <code className="font-mono text-[13px] text-ot-muted">{r.defaultValue}</code> },
            { key: 'desc', header: 'Description', render: (r) => <span className="text-sm">{r.desc}</span> },
          ]}
          rows={propsRows}
          keyOf={(r) => r.name}
        />
      </section>

      {doDont ? (
        <section id="doc-guidelines" className="mt-4 scroll-mt-36 rounded-ot-lg border border-ot-border bg-ot-surface p-5">
          <h2 className="mb-1 text-lg font-bold">Guidelines</h2>
          <p className="mb-4 text-sm text-ot-muted">One correct pattern and one to avoid.</p>
          <div className="grid gap-2.5 md:grid-cols-2">
            <div className="grid content-start gap-1.5 rounded-ot-md border border-success bg-success-bg p-4">
              <p className="flex items-center gap-2 text-sm font-bold text-success">
                <CircleCheck size={15} /> Do. {doDont.doTitle}
              </p>
              <p className="text-sm text-ot-text">{doDont.doBody}</p>
            </div>
            <div className="grid content-start gap-1.5 rounded-ot-md border border-danger bg-danger-bg p-4">
              <p className="flex items-center gap-2 text-sm font-bold text-danger">
                <OctagonX size={15} /> Avoid. {doDont.dontTitle}
              </p>
              <p className="text-sm text-ot-text">{doDont.dontBody}</p>
            </div>
          </div>
        </section>
      ) : null}

      {a11y?.length ? (
        <section id="doc-access" className="mt-4 scroll-mt-36 rounded-ot-lg border border-ot-border bg-ot-surface p-5">
          <h2 className="mb-1 text-lg font-bold">Accessibility</h2>
          <p className="mb-4 text-sm text-ot-muted">Keyboard and screen-reader behavior.</p>
          <ul className="grid list-disc gap-1.5 pl-5 text-sm text-ot-muted">
            {a11y.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <section id="doc-rules" className="mt-4 scroll-mt-36 rounded-ot-lg border border-ot-border bg-ot-surface p-5">
        <h2 className="mb-1 text-lg font-bold">Rules</h2>
        <p className="mb-4 text-sm text-ot-muted">Design-system constraints every usage must follow.</p>
        <ul className="grid list-disc gap-1.5 pl-5 text-sm text-ot-muted">
          {rules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </section>

      <div className="mt-4 flex flex-wrap justify-between gap-2.5">
        {prev ? (
          <Link to={prev.to}>
            <Button variant="secondary" icon={<ArrowLeft size={16} />}>
              {prev.label}
            </Button>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={next.to}>
            <Button variant="secondary" icon={<ArrowRight size={16} />}>
              {next.label}
            </Button>
          </Link>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}
