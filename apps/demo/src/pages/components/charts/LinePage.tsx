import { Badge, Line } from '@omega-os/ui';
import { ComponentPage } from '../../ComponentPage.js';

const POINTS = [
  { x: 'Mon', y: 4 },
  { x: 'Tue', y: 9 },
  { x: 'Wed', y: 6 },
  { x: 'Thu', y: 12 },
  { x: 'Fri', y: 7 },
];

export function LinePage() {
  return (
    <ComponentPage
      title="Line"
      desc="Area line chart with dots, rich hover tooltips, and multi-series legend toggles."
      badges={
        <>
          <Badge tone="navy">area + dots</Badge>
          <Badge tone="grey">multi-series</Badge>
        </>
      }
      importCode={`import { Line } from '@omega-os/ui';

<Line
  points={[
    { x: 'Mon', y: 4 },
    { x: 'Tue', y: 9 },
  ]}
/>`}
      preview={<Line points={POINTS} />}
      variants={[
        {
          id: 'series',
          title: 'Series',
          desc: 'Prefer series for named lines with legend toggles. Hover shows rich tooltips.',
          code: `<Line
  series={[
    { id: 'req', label: 'Requests', points: [{ x: 'Mon', y: 4 }] },
    { id: 'err', label: 'Errors', color: 'var(--ot-maroon)', points: [{ x: 'Mon', y: 1 }] },
  ]}
/>`,
          demo: (
            <Line
              series={[
                {
                  id: 'req',
                  label: 'Requests',
                  points: [
                    { x: 'Mon', y: 4 },
                    { x: 'Tue', y: 9 },
                    { x: 'Wed', y: 6 },
                  ],
                },
                {
                  id: 'err',
                  label: 'Errors',
                  color: 'var(--ot-maroon)',
                  points: [
                    { x: 'Mon', y: 1 },
                    { x: 'Tue', y: 2 },
                    { x: 'Wed', y: 1 },
                  ],
                },
              ]}
            />
          ),
        },
        {
          id: 'area',
          title: 'Area',
          desc: 'showArea fills under the line. Disable it for overlapping series.',
          code: `<Line points={points} showArea={false} />`,
          demo: <Line points={POINTS} showArea={false} />,
        },
      ]}
      propsRows={[
        { name: 'points', type: 'LinePoint[]', defaultValue: '-', desc: 'Legacy single series. Prefer series.' },
        { name: 'series', type: 'LineSeries[]', defaultValue: '-', desc: 'Named lines: id, label, color, points.' },
        { name: 'width / height', type: 'number', defaultValue: '320 / 180', desc: 'Viewport size in px.' },
        { name: 'showArea', type: 'boolean', defaultValue: 'true', desc: 'Fill under the line.' },
        { name: 'label', type: 'string', defaultValue: '-', desc: 'Accessible name for the chart.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the figure.' },
      ]}
      rules={[
        'Lines track change over ordered steps, usually time.',
        'Series colors cycle the Omega palette. Errors use maroon.',
        'Dots slide along the line direction instead of popping.',
      ]}
      prev={{ to: '/components/charts/bar', label: 'Bar' }}
      next={{ to: '/components/charts/pie', label: 'Pie' }}
    />
  );
}
