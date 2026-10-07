import { Badge, TimingBar } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

const SEGMENTS = [
  { id: 'enc', label: 'Encrypt', value: 1.2, tone: 'navy' as const },
  { id: 'tx', label: 'Transmit', value: 8.4, tone: 'warning' as const },
  { id: 'dec', label: 'Decrypt', value: 0.9, tone: 'success' as const },
];

export function TimingBarPage() {
  return (
    <ComponentPage
      title="TimingBar"
      desc="Stacked duration bar with per-segment labels, a legend, and a total. Zero totals render an empty note."
      badges={
        <>
          <Badge tone="navy">stacked</Badge>
          <Badge tone="grey">legend + total</Badge>
        </>
      }
      importCode={`import { TimingBar } from '@omega-os/ui';

<TimingBar
  label="Encrypt, transmit, decrypt breakdown"
  segments={[
    { id: 'enc', label: 'Encrypt', value: 1.2, tone: 'navy' },
    { id: 'tx', label: 'Transmit', value: 8.4, tone: 'warning' },
    { id: 'dec', label: 'Decrypt', value: 0.9, tone: 'success' },
  ]}
/>`}
      preview={<TimingBar label="Encrypt, transmit, decrypt breakdown" segments={SEGMENTS} />}
      variants={[
        {
          id: 'unit',
          title: 'Units',
          desc: 'Unit suffix follows every value. Totals compute from the segments.',
          code: `<TimingBar unit="s" totalLabel="Total" segments={segments} />`,
          demo: <TimingBar unit="s" totalLabel="Total" segments={SEGMENTS} />,
        },
        {
          id: 'empty',
          title: 'Empty',
          desc: 'No segments, or a zero total, renders a quiet note instead of a bar.',
          code: `<TimingBar segments={[]} />`,
          demo: <TimingBar segments={[]} />,
        },
      ]}
      propsRows={[
        { name: 'segments', type: 'TimingSegment[]', defaultValue: '-', desc: 'Parts: id, label, value, optional tone.' },
        { name: 'unit', type: 'string', defaultValue: "'ms'", desc: 'Unit suffix appended to values.' },
        { name: 'totalLabel', type: 'string', defaultValue: "'Total'", desc: 'Total row label.' },
        { name: 'label', type: 'string', defaultValue: '-', desc: 'Accessible name for the breakdown.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the wrapper.' },
      ]}
      rules={[
        'Segments share one unit. Mixed units need separate bars.',
        'Tones follow meaning. Navy leads, status tones report.',
        'Tiny segments still get legend rows so nothing hides.',
      ]}
      prev={{ to: '/components/timeline', label: 'Timeline' }}
      next={{ to: '/components/toast', label: 'Toast' }}
    />
  );
}
