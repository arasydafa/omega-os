import { Link } from 'react-router-dom';
import uiPkg from '@omega-os/ui/package.json';
import { Alert, Badge, Button, CodeBlock, Kbd, OMEGA_ICONS } from '@omega-os/ui';
import { ArrowRight, BookOpen, ChartColumn, Moon, Palette, Search, Shapes } from 'lucide-react';
import { DOC_GROUPS } from '../docs.js';

const FEATURES = [
  {
    icon: <Palette size={18} />,
    title: 'Design tokens',
    body: 'Navy primary, maroon danger-only, theme-aware surfaces. Light default, dark with one class.',
    to: '/foundations/colors',
  },
  {
    icon: <Moon size={18} />,
    title: 'Two themes',
    body: 'Every component flips with the theme toggle. Contrast checked in both modes.',
    to: '/foundations/colors',
  },
  {
    icon: <ChartColumn size={18} />,
    title: 'Charts included',
    body: 'Bar, line, pie, scatter, heatmap, treemap, word cloud, plus a graph viewer. No extra dependency.',
    to: '/components/charts/bar',
  },
  {
    icon: <Shapes size={18} />,
    title: 'Icons with meaning',
    body: 'Lucide only, one icon per meaning. No emoji anywhere in the UI.',
    to: '/foundations/icons',
  },
];

export function Home() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="overflow-hidden rounded-ot-lg border border-ot-border bg-ot-surface">
        <div className="bg-navy p-6 text-white md:p-10">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="rounded-full bg-white/15 px-3 py-1">Docs</span>
            <span className="rounded-full bg-white/15 px-3 py-1">v{uiPkg.version}</span>
            <span className="rounded-full bg-white/15 px-3 py-1">MIT</span>
          </div>
          <h1 className="mt-4 max-w-2xl text-3xl font-extrabold tracking-tight md:text-5xl">
            Modern minimalist components for every Omega web.
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-white/80 md:text-base">
            Navy primary, maroon danger-only, rounded everything, lucide icons only.
            Browse foundations and live examples, then copy the patterns.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <Link to="/components">
              <Button icon={<BookOpen size={16} />}>Browse components</Button>
            </Link>
            <Link to="/showcase">
              <Button variant="secondary" icon={<ArrowRight size={16} />}>
                Open showcase
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-white/70">
            Press <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> anywhere, or use <Search size={13} className="inline" /> Search in the
            header to jump to any page.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-px bg-ot-border md:grid-cols-4">
          {[
            ['50+', 'component pages'],
            ['140+', 'passing tests'],
            ['2', 'themes'],
            [`${OMEGA_ICONS.length}`, 'approved icons'],
          ].map(([num, label]) => (
            <div key={label} className="bg-ot-surface p-4 text-center">
              <p className="text-2xl font-extrabold tracking-tight">{num}</p>
              <p className="text-xs text-ot-muted">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="mt-4 rounded-ot-lg border border-ot-border bg-ot-surface p-5">
        <h2 className="mb-1 text-lg font-bold">Why OmegaOS</h2>
        <p className="mb-4 text-sm text-ot-muted">Four ideas carry the whole system.</p>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <Link
              key={f.title}
              to={f.to}
              className="grid content-start gap-1.5 rounded-ot-md border border-ot-border bg-ot-bg p-4 transition-colors hover:border-navy"
            >
              <span className="grid h-9 w-9 place-items-center rounded-ot-sm bg-navy-bg text-navy-text">{f.icon}</span>
              <p className="text-sm font-bold">{f.title}</p>
              <p className="text-[13px] text-ot-muted">{f.body}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-ot-lg border border-ot-border bg-ot-surface p-5">
        <h2 className="mb-1 text-lg font-bold">Taste</h2>
        <p className="mb-4 text-sm text-ot-muted">Real components, live on this page.</p>
        <div className="grid gap-2.5">
          <Alert tone="info" title="Info.">
            Status colors now live in tokens.
          </Alert>
          <div className="flex flex-wrap gap-2.5">
            <Badge tone="navy">Navy</Badge>
            <Badge tone="grey">Draft</Badge>
            <Badge tone="success">Active</Badge>
            <Badge tone="danger">Error</Badge>
          </div>
        </div>
      </section>

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
        <h2 className="mb-1 text-lg font-bold">Explore</h2>
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
            <p className="mt-0.5 text-[13px] text-navy-text">Preview, usage, variants, and API per component.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
