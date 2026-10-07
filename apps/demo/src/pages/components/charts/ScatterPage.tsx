import { Badge, Scatter } from '@omega-os/ui';
import { ComponentPage } from '../../ComponentPage.js';

const POINTS = [
  { x: 1, y: 2, label: 'Item A' },
  { x: 2, y: 5, label: 'Item B' },
  { x: 3, y: 3, label: 'Item C' },
  { x: 4, y: 8, label: 'Item D' },
  { x: 5, y: 6, label: 'Item E' },
];

export function ScatterPage() {
  return (
    <ComponentPage
      title="Scatter"
      desc="Dot plot for two numeric dimensions with tooltips, tweened domains, and multi-series toggles."
      badges={
        <>
          <Badge tone="navy">tooltips</Badge>
          <Badge tone="grey">multi-series</Badge>
        </>
      }
      importCode={`import { Scatter } from '@omega-os/ui';

<Scatter
  points={[
    { x: 1, y: 2, label: 'Item A' },
    { x: 2, y: 5, label: 'Item B' },
  ]}
/>`}
      preview={<Scatter points={POINTS} />}
      variants={[
        {
          id: 'series',
          title: 'Series',
          desc: 'Named groups with legend toggles. Domains tween toward visible data.',
          code: `<Scatter
  series={[
    { id: 'alpha', label: 'Alpha', points: [{ x: 1, y: 2 }] },
    { id: 'beta', label: 'Beta', points: [{ x: 3, y: 3 }] },
  ]}
/>`,
          demo: (
            <Scatter
              series={[
                {
                  id: 'alpha',
                  label: 'Alpha',
                  points: [
                    { x: 1, y: 2, label: 'Alpha 1' },
                    { x: 2, y: 5, label: 'Alpha 2' },
                  ],
                },
                {
                  id: 'beta',
                  label: 'Beta',
                  color: 'var(--ot-maroon)',
                  points: [
                    { x: 3, y: 3, label: 'Beta 1' },
                    { x: 4, y: 8, label: 'Beta 2' },
                  ],
                },
              ]}
            />
          ),
        },
      ]}
      propsRows={[
        { name: 'points', type: 'ScatterPoint[]', defaultValue: '-', desc: 'Legacy single series. Prefer series.' },
        { name: 'series', type: 'ScatterSeries[]', defaultValue: '-', desc: 'Named groups: id, label, color, points.' },
        { name: 'width / height', type: 'number', defaultValue: '-', desc: 'Viewport size in px.' },
        { name: 'label', type: 'string', defaultValue: '-', desc: 'Accessible name for the chart.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the figure.' },
      ]}
      rules={[
        'Dots map two numbers. Labels name the dot on hover.',
        'Axis ticks stay clean while domains glide.',
        'Series colors cycle the Omega palette.',
      ]}
      prev={{ to: '/components/charts/pie', label: 'Pie' }}
      next={{ to: '/components/charts/treemap', label: 'Treemap' }}
    />
  );
}
