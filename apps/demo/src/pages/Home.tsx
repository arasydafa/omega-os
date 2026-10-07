import { Link } from 'react-router-dom';
import uiPkg from '@omega-os/ui/package.json';
import { Badge, Button, CodeBlock, Kbd } from '@omega-os/ui';
import { ArrowRight, BookOpen, Search } from 'lucide-react';
import { DOC_GROUPS } from '../docs.js';

export function Home() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="rounded-ot-lg border border-ot-border bg-ot-surface p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <Badge tone="navy">Docs</Badge>
          <Badge tone="grey">v{uiPkg.version}</Badge>
          <Badge tone="success">145 tests</Badge>
          <span className="text-ot-muted">Light default, dark via .dark</span>
        </div>
        <h1 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight md:text-4xl">
          Modern minimalist components for every Omega web.
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ot-muted md:text-base">
          Navy primary, maroon danger-only, rounded everything, lucide icons only. Browse foundations, components,
          and patterns with live React examples.
        </p>
        <div className="mt-4 flex flex-wrap gap-2.5">
          <Link to="/components">
            <Button icon={<BookOpen size={16} />}>Browse components</Button>
          </Link>
          <Link to="/showcase">
            <Button variant="secondary" icon={<ArrowRight size={16} />}>
              Open showcase
            </Button>
          </Link>
        </div>
        <p className="mt-4 text-sm text-ot-muted">
          Press <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> anywhere, or use <Search size={13} className="inline" /> Search in the
          header to jump to any page.
        </p>
      </div>

      <section className="mt-4 rounded-ot-lg border border-ot-border bg-ot-surface p-5">
        <h2 className="mb-1 text-lg font-bold">Quickstart</h2>
        <p className="mb-4 text-sm text-ot-muted">Tokens, Tailwind preset, then semantic classes.</p>
        <div className="grid gap-3">
          <CodeBlock language="tsx" code={`import '@omega-os/ui/tokens.css';`} />
          <CodeBlock
            language="js"
            code={`export default {
  presets: [require('@omega-os/ui/tailwind.preset.js')],
  content: ['./index.html', './src/**/*.{ts,tsx}', './node_modules/@omega-os/ui/dist/**/*.js'],
};`}
          />
          <CodeBlock language="tsx" code={`<div className="bg-ot-bg text-ot-text">
  <div className="rounded-ot-md border border-ot-border bg-ot-surface">Card</div>
</div>`} />
        </div>
      </section>

      <section className="mt-4 rounded-ot-lg border border-ot-border bg-ot-surface p-5">
        <h2 className="mb-1 text-lg font-bold">Sections</h2>
        <p className="mb-4 text-sm text-ot-muted">Start with foundations, then pick a component.</p>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {DOC_GROUPS.map((g) => (
            <Link
              key={g.id}
              to="/showcase"
              className="rounded-ot-md border border-ot-border bg-ot-bg p-4 transition-colors hover:border-navy"
            >
              <p className="text-sm font-bold">{g.label}</p>
              <p className="mt-0.5 text-[13px] text-ot-muted">{g.sections.map((s) => s.label).join(' · ')}</p>
            </Link>
          ))}
          <Link
            to="/components"
            className="rounded-ot-md border border-ot-border bg-navy-bg p-4 transition-colors"
          >
            <p className="text-sm font-bold text-navy-text">Component pages</p>
            <p className="mt-0.5 text-[13px] text-navy-text">Button, Table, Modal. Preview, usage, API.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
