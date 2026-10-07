import { Badge, Heatmap, useToast } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

const CELLS = [
  { x: 'Mon', y: 'CPU', value: 20 },
  { x: 'Tue', y: 'CPU', value: 80 },
  { x: 'Wed', y: 'CPU', value: 45 },
  { x: 'Mon', y: 'Mem', value: 60 },
  { x: 'Tue', y: 'Mem', value: 30 },
  { x: 'Wed', y: 'Mem', value: 95 },
];

export function HeatmapPage() {
  const toast = useToast();
  return (
    <ComponentPage
      title="Heatmap"
      desc="Intensity grid for two dimensions. Darker cells mean higher values, scaled across the data range."
      badges={
        <>
          <Badge tone="navy">intensity grid</Badge>
          <Badge tone="grey">empty safe</Badge>
        </>
      }
      importCode={`import { Heatmap } from '@omega-os/ui';

<Heatmap
  data={[
    { x: 'Mon', y: 'CPU', value: 20 },
    { x: 'Tue', y: 'CPU', value: 80 },
  ]}
  onSelect={(cell) => show(cell)}
/>`}
      preview={<Heatmap data={CELLS} onSelect={(c) => toast.show('info', `${c.x} ${c.y}: ${c.value}`)} />}
      variants={[
        {
          id: 'order',
          title: 'Label order',
          desc: 'xLabels and yLabels pin the axis order. Default follows first appearance.',
          code: `<Heatmap data={cells} xLabels={['Mon', 'Tue', 'Wed']} yLabels={['CPU', 'Mem']} />`,
          demo: <Heatmap data={CELLS} xLabels={['Wed', 'Tue', 'Mon']} yLabels={['Mem', 'CPU']} />,
        },
        {
          id: 'empty',
          title: 'Empty',
          desc: 'No cells render an empty state instead of a blank grid.',
          code: `<Heatmap data={[]} />`,
          demo: <Heatmap data={[]} />,
        },
      ]}
      propsRows={[
        { name: 'data', type: 'HeatDatum[]', defaultValue: '-', desc: 'Cells: x, y, and numeric value.' },
        { name: 'xLabels', type: 'string[]', defaultValue: '-', desc: 'Column order. Defaults to first appearance.' },
        { name: 'yLabels', type: 'string[]', defaultValue: '-', desc: 'Row order. Defaults to first appearance.' },
        { name: 'onSelect', type: '(cell) => void', defaultValue: '-', desc: 'Fires on cell click.' },
        { name: 'label', type: 'string', defaultValue: '-', desc: 'Accessible name for the grid.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the figure.' },
      ]}
      rules={[
        'Values share one unit. Mixed units need separate charts.',
        'Axis labels stay short so cells stay square-ish.',
        'Empty data shows the empty state, never a blank grid.',
      ]}
      prev={{ to: '/components/graph-viewer', label: 'GraphViewer' }}
      next={{ to: '/components/image', label: 'Image' }}
    />
  );
}
