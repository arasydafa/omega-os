import { Badge, Treemap, useToast } from '@omega-os/ui';
import { ComponentPage } from '../../ComponentPage.js';

const DATA = [
  { label: 'Projects', value: 6 },
  { label: 'Reports', value: 3 },
  { label: 'Media', value: 2 },
  { label: 'Other', value: 1 },
];

export function TreemapPage() {
  const toast = useToast();
  return (
    <ComponentPage
      title="Treemap"
      desc="Squarified rectangles sized by value. Area reads share at a glance."
      badges={
        <>
          <Badge tone="navy">squarified</Badge>
          <Badge tone="grey">clickable</Badge>
        </>
      }
      importCode={`import { Treemap } from '@omega-os/ui';

<Treemap
  data={[
    { label: 'Projects', value: 6 },
    { label: 'Reports', value: 3 },
  ]}
  onSelect={(label) => show(label)}
/>`}
      preview={<Treemap data={DATA} onSelect={(label) => toast.show('info', `${label} selected.`)} />}
      variants={[
        {
          id: 'select',
          title: 'Selection',
          desc: 'onSelect reports the clicked block label.',
          code: `<Treemap data={data} onSelect={(label) => show(label)} />`,
          demo: <span className="text-sm text-ot-muted">Click a block in the preview above.</span>,
        },
      ]}
      propsRows={[
        { name: 'data', type: 'TreemapDatum[]', defaultValue: '-', desc: 'Blocks: label, value, optional CSS color.' },
        { name: 'width / height', type: 'number', defaultValue: '-', desc: 'Viewport size in px.' },
        { name: 'onSelect', type: '(label) => void', defaultValue: '-', desc: 'Fires on block click.' },
        { name: 'label', type: 'string', defaultValue: '-', desc: 'Accessible name for the chart.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the figure.' },
      ]}
      rules={[
        'Values share one unit. Labels stay short enough for small blocks.',
        'Colors cycle the Omega palette in order.',
        'Tiny blocks keep labels only when they fit.',
      ]}
      prev={{ to: '/components/charts/scatter', label: 'Scatter' }}
      next={{ to: '/components/charts/wordcloud', label: 'WordCloud' }}
    />
  );
}
