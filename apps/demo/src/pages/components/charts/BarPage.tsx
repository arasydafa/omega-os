import { Badge, Bar } from '@omega-os/ui';
import { ComponentPage } from '../../ComponentPage.js';

const DATA = [
  { label: 'Mon', value: 4 },
  { label: 'Tue', value: 9 },
  { label: 'Wed', value: 6 },
  { label: 'Thu', value: 12 },
  { label: 'Fri', value: 7 },
];

export function BarPage() {
  return (
    <ComponentPage
      title="Bar"
      desc="Theme-aware bar chart with a toggleable legend. No charting dependency."
      badges={
        <>
          <Badge tone="navy">custom SVG</Badge>
          <Badge tone="grey">legend toggle</Badge>
        </>
      }
      importCode={`import { Bar } from '@omega-os/ui';

<Bar
  data={[
    { label: 'Mon', value: 4 },
    { label: 'Tue', value: 9 },
  ]}
/>`}
      preview={<Bar data={DATA} />}
      variants={[
        {
          id: 'legend',
          title: 'Legend toggle',
          desc: 'Click a legend entry to hide its bar. The scale locks so survivors never jump.',
          code: `<Bar data={data} showLegend />`,
          demo: <span className="text-sm text-ot-muted">Toggle a legend entry in the preview above.</span>,
        },
        {
          id: 'height',
          title: 'Height',
          desc: 'Chart height in px. Bars rescale to fit.',
          code: `<Bar data={data} height={240} />`,
          demo: <Bar data={DATA} height={240} />,
        },
      ]}
      propsRows={[
        { name: 'data', type: 'BarDatum[]', defaultValue: '-', desc: 'Bars: label, value, optional CSS color.' },
        { name: 'height', type: 'number', defaultValue: '180', desc: 'Chart height in px.' },
        { name: 'showLegend', type: 'boolean', defaultValue: 'true', desc: 'Toggleable legend row.' },
        { name: 'label', type: 'string', defaultValue: '-', desc: 'Accessible name for the chart.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the figure.' },
      ]}
      rules={[
        'Bars compare one unit across few categories.',
        'Colors default to navy. Meaning colors follow status tones.',
        'Empty data shows the empty state, never bare axes.',
      ]}
      prev={{ to: '/components/carousel', label: 'Carousel' }}
      next={{ to: '/components/charts/line', label: 'Line' }}
    />
  );
}
