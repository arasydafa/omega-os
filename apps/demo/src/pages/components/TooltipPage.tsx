import { Badge, Button, Tooltip } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

export function TooltipPage() {
  return (
    <ComponentPage
      title="Tooltip"
      desc="Hover hint with a short show delay and four positions. Hints explain, never carry critical info."
      badges={
        <>
          <Badge tone="navy">hover hint</Badge>
          <Badge tone="grey">4 positions</Badge>
        </>
      }
      importCode={`import { Tooltip, Button } from '@omega-os/ui';

<Tooltip content="Saves the current report">
  <Button>Save</Button>
</Tooltip>`}
      preview={
        <div className="flex flex-wrap gap-2.5">
          <Tooltip content="Helpful hint">
            <Button variant="ghost">Hover me</Button>
          </Tooltip>
          <Tooltip content="Bottom hint" position="bottom">
            <Button variant="secondary" size="sm">Bottom</Button>
          </Tooltip>
        </div>
      }
      variants={[
        {
          id: 'positions',
          title: 'Positions',
          desc: 'Top default. Pick the side with free space near edges.',
          code: `<Tooltip content="Hint" position="top">…</Tooltip>
<Tooltip content="Hint" position="right">…</Tooltip>`,
          demo: (
            <>
              <Tooltip content="Left hint" position="left">
                <Button variant="secondary" size="sm">Left</Button>
              </Tooltip>
              <Tooltip content="Right hint" position="right">
                <Button variant="secondary" size="sm">Right</Button>
              </Tooltip>
            </>
          ),
        },
        {
          id: 'delay',
          title: 'Delay',
          desc: 'Show delay in ms keeps passing hovers quiet.',
          code: `<Tooltip content="Hint" delay={400}>…</Tooltip>`,
          demo: (
            <Tooltip content="Slow hint" delay={400}>
              <Button variant="secondary" size="sm">Slow</Button>
            </Tooltip>
          ),
        },
      ]}
      propsRows={[
        { name: 'content', type: 'ReactNode', defaultValue: '-', desc: 'Hint text. Keep it short.' },
        { name: 'children', type: 'ReactNode', defaultValue: '-', desc: 'Trigger element.' },
        { name: 'position', type: "'top' | 'bottom' | 'left' | 'right'", defaultValue: "'top'", desc: 'Hint side.' },
        { name: 'delay', type: 'number', defaultValue: '200', desc: 'Show delay in ms.' },
      ]}
      rules={[
        'Hints explain icons and abbreviations. Critical info lives in copy.',
        'One idea per hint. Two lines max.',
        'Touch users never see hovers. Keep triggers self-evident.',
      ]}
      a11y={[
        'Hints explain on hover after a short delay.',
        'Touch users never see hovers. Keep triggers self-evident.',
        'Critical info lives in copy, not tooltips.',
      ]}
      prev={{ to: '/components/toast', label: 'Toast' }}
      next={{ to: '/components/tree-view', label: 'TreeView' }}
    />
  );
}
