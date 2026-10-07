import { Badge } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

const ROWS = [
  { sample: <span className="text-3xl font-extrabold tracking-tight">Heading 30 / ExtraBold</span>, use: 'page titles, hero numbers' },
  { sample: <span className="text-2xl font-bold">Heading 24 / Bold</span>, use: 'section titles, card titles' },
  { sample: <span className="text-lg font-semibold">Heading 18 / Semibold</span>, use: 'subsections, modal titles' },
  { sample: <span className="text-base">Body 16 / Regular</span>, use: 'paragraphs, table cells, menu items' },
  { sample: <span className="text-sm text-ot-muted">Muted 14</span>, use: 'descriptions, helper text, table headers' },
  { sample: <span className="font-mono text-sm">mono 14: const theme = "light" | "dark"</span>, use: 'code blocks, addresses, logs' },
];

export function TypographyPage() {
  return (
    <ComponentPage
      title="Typography"
      desc="Plus Jakarta Sans for interface text, JetBrains Mono for code. Six sizes cover every view."
      badges={
        <>
          <Badge tone="navy">Plus Jakarta Sans</Badge>
          <Badge tone="grey">JetBrains Mono</Badge>
        </>
      }
      importCode={`import '@omega-os/ui/tokens.css';

<h1 className="font-sans text-3xl font-extrabold tracking-tight">Title</h1>
<code className="font-mono text-sm">const theme = "light"</code>`}
      preview={
        <div className="divide-y divide-dashed divide-ot-border">
          {ROWS.map((r) => (
            <div key={r.use} className="py-2.5">
              <p>{r.sample}</p>
              <p className="mt-0.5 text-xs text-ot-muted">
                <span className="font-semibold text-ot-text">Use for:</span> {r.use}
              </p>
            </div>
          ))}
        </div>
      }
      variants={[
        {
          id: 'headings',
          title: 'Headings',
          desc: 'Tight tracking, heavy weights. One H1 per page.',
          code: `<h1 className="text-3xl font-extrabold tracking-tight">Page title</h1>
<h2 className="text-2xl font-bold">Section title</h2>
<h3 className="text-lg font-semibold">Subsection</h3>`,
          demo: <span className="text-2xl font-bold">Section title</span>,
        },
        {
          id: 'body',
          title: 'Body and muted',
          desc: 'Regular for content, muted for helpers. Muted never carries the main message.',
          code: `<p className="text-base">Body copy goes here.</p>
<p className="text-sm text-ot-muted">Helper text stays quiet.</p>`,
          demo: <span className="text-sm text-ot-muted">Helper text stays quiet.</span>,
        },
        {
          id: 'mono',
          title: 'Mono',
          desc: 'Code, addresses, and log output always use the mono face.',
          code: `<code className="font-mono text-sm">npm test</code>`,
          demo: <code className="rounded-ot-sm bg-ot-surface-2 px-1.5 py-0.5 font-mono text-[13px]">npm test</code>,
        },
      ]}
      propsRows={[
        { name: 'font-sans', type: 'Plus Jakarta Sans', defaultValue: '-', desc: 'Interface text, headings, controls.' },
        { name: 'font-mono', type: 'JetBrains Mono', defaultValue: '-', desc: 'Code, addresses, logs, IDs.' },
        { name: '30 / 24 / 18', type: '800 / 700 / 600', defaultValue: '-', desc: 'Heading sizes with tight tracking.' },
        { name: '16 / 14', type: '400 / 400 muted', defaultValue: '-', desc: 'Body and helper sizes.' },
      ]}
      propsNote="Type tokens come from tokens.css and the Tailwind preset. No component props here."
      rules={[
        'Interface text uses Plus Jakarta Sans. Code uses JetBrains Mono.',
        'Muted text supports the message. It never carries it alone.',
        'Mono is reserved for code, addresses, and logs.',
      ]}
      prev={{ to: '/components', label: 'Components' }}
      next={{ to: '/foundations/colors', label: 'Colors' }}
    />
  );
}
