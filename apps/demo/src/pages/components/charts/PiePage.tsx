import { Badge, Pie } from '@omega-os/ui';
import { ComponentPage } from '../../ComponentPage.js';

const DATA = [
  { label: 'Projects', value: 6 },
  { label: 'Reports', value: 3 },
  { label: 'Other', value: 1 },
];

export function PiePage() {
  return (
    <ComponentPage
      title="Pie"
      desc="Donut or pie with a recomputing legend. Toggling a segment rescales the rest."
      badges={
        <>
          <Badge tone="navy">donut default</Badge>
          <Badge tone="grey">legend toggle</Badge>
        </>
      }
      importCode={`import { Pie } from '@omega-os/ui';

<Pie
  data={[
    { label: 'Projects', value: 6 },
    { label: 'Reports', value: 3 },
  ]}
/>`}
      preview={<Pie data={DATA} />}
      variants={[
        {
          id: 'hole',
          title: 'Hole',
          desc: 'Donut by default. Disable the hole for a classic pie.',
          code: `<Pie data={data} hole={false} />`,
          demo: <Pie data={DATA} hole={false} />,
        },
        {
          id: 'size',
          title: 'Size',
          desc: 'SVG viewport size in px. Legends wrap beside narrow pies.',
          code: `<Pie data={data} size={240} />`,
          demo: <Pie data={DATA} size={240} />,
        },
      ]}
      propsRows={[
        { name: 'data', type: 'PieDatum[]', defaultValue: '-', desc: 'Slices: label, value, optional CSS color.' },
        { name: 'size', type: 'number', defaultValue: '200', desc: 'SVG viewport size.' },
        { name: 'hole', type: 'boolean', defaultValue: 'true', desc: 'Donut hole on or off.' },
        { name: 'showLegend', type: 'boolean', defaultValue: 'true', desc: 'Toggleable legend with recompute.' },
        { name: 'label', type: 'string', defaultValue: '-', desc: 'Accessible name for the chart.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the figure.' },
      ]}
      rules={[
        'Pies show parts of one whole. Few slices read best.',
        'Slice colors cycle the Omega palette in order.',
        'Hidden slices recompute shares. Totals always match visible data.',
      ]}
      prev={{ to: '/components/charts/line', label: 'Line' }}
      next={{ to: '/components/charts/scatter', label: 'Scatter' }}
    />
  );
}
