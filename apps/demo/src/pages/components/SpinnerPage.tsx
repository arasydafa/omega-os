import { Badge, Button, Spinner } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

export function SpinnerPage() {
  return (
    <ComponentPage
      title="Spinner"
      desc="Loading indicator with an accessible label. Buttons render it automatically in loading state."
      badges={
        <>
          <Badge tone="navy">loading</Badge>
          <Badge tone="grey">labeled</Badge>
        </>
      }
      importCode={`import { Spinner } from '@omega-os/ui';

<Spinner />
<Spinner size={24} label="Saving report" />`}
      preview={
        <div className="flex items-center gap-3">
          <Spinner />
          <Spinner size={24} label="Saving report" />
          <span className="text-sm text-ot-muted">Spinning with a screen-reader label.</span>
        </div>
      }
      variants={[
        {
          id: 'button',
          title: 'Inside buttons',
          desc: 'Button loading swaps the icon for a spinner and disables itself.',
          code: `<Button loading>Saving…</Button>`,
          demo: <Button loading>Saving…</Button>,
        },
      ]}
      propsRows={[
        { name: 'size', type: 'number', defaultValue: '16', desc: 'Pixel size.' },
        { name: 'label', type: 'string', defaultValue: "'Loading'", desc: 'Accessible name for the status.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the marker.' },
      ]}
      rules={[
        'Spinners mark waits. Progress bars mark measurable work.',
        'Labels name the wait for screen readers.',
        'Never freeze a spinner. Pair it with a timeout or cancel path.',
      ]}
      prev={{ to: '/components/slider', label: 'Slider' }}
      next={{ to: '/components/stepper', label: 'Stepper' }}
    />
  );
}
