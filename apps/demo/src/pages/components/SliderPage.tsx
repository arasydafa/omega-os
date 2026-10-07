import { useState } from 'react';
import { Badge, Slider } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

export function SliderPage() {
  const [volume, setVolume] = useState(30);
  return (
    <ComponentPage
      title="Slider"
      desc="Numeric range input with label and live value readout. Controlled or uncontrolled."
      badges={
        <>
          <Badge tone="navy">range input</Badge>
          <Badge tone="grey">live value</Badge>
        </>
      }
      importCode={`import { Slider } from '@omega-os/ui';

const [volume, setVolume] = useState(30);

<Slider label="Volume" value={volume} onChange={setVolume} />`}
      preview={
        <div className="max-w-sm">
          <Slider label="Volume" value={volume} onChange={setVolume} />
        </div>
      }
      variants={[
        {
          id: 'bounds',
          title: 'Bounds and step',
          desc: 'min, max, and step shape the range. Value clamps to min when empty.',
          code: `<Slider label="Zoom" min={50} max={200} step={10} defaultValue={100} />`,
          demo: (
            <div className="w-full max-w-sm">
              <Slider label="Zoom" min={50} max={200} step={10} defaultValue={100} />
            </div>
          ),
        },
        {
          id: 'readonly',
          title: 'Hidden value',
          desc: 'showValue false hides the readout for decoration-adjacent sliders.',
          code: `<Slider label="Balance" showValue={false} defaultValue={50} />`,
          demo: (
            <div className="w-full max-w-sm">
              <Slider label="Balance" showValue={false} defaultValue={50} />
            </div>
          ),
        },
      ]}
      propsRows={[
        { name: 'label', type: 'string', defaultValue: '-', desc: 'Field label plus accessible name.' },
        { name: 'min', type: 'number', defaultValue: '0', desc: 'Range start.' },
        { name: 'max', type: 'number', defaultValue: '100', desc: 'Range end.' },
        { name: 'step', type: 'number', defaultValue: '1', desc: 'Snap increment.' },
        { name: 'value / defaultValue', type: 'number', defaultValue: '-', desc: 'Controlled or uncontrolled position.' },
        { name: 'onChange', type: '(value) => void', defaultValue: '-', desc: 'Fires with the numeric value.' },
        { name: 'showValue', type: 'boolean', defaultValue: 'true', desc: 'Live value readout.' },
        { name: 'disabled', type: 'boolean', defaultValue: 'false', desc: 'Locked state.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the wrapper.' },
      ]}
      rules={[
        'Labels name the value. Readouts stay mono.',
        'Steps match the domain. Prices step by whole units, zoom by tens.',
        'Disabled sliders dim but keep their position visible.',
      ]}
      a11y={[
        'Native range input with label.',
        'Live value readout in mono.',
        'min, max, and step shape keyboard steps.',
      ]}
      prev={{ to: '/components/skeleton', label: 'Skeleton' }}
      next={{ to: '/components/spinner', label: 'Spinner' }}
    />
  );
}
