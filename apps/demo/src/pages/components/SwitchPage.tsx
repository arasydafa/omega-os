import { useState } from 'react';
import { Badge, Switch } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

export function SwitchPage() {
  const [notify, setNotify] = useState(false);
  return (
    <ComponentPage
      title="Switch"
      desc="Instant on-off toggle for settings that apply immediately, no submit needed."
      badges={
        <>
          <Badge tone="navy">instant apply</Badge>
          <Badge tone="grey">controlled</Badge>
        </>
      }
      importCode={`import { Switch } from '@omega-os/ui';

const [notify, setNotify] = useState(false);

<Switch checked={notify} onChange={setNotify} label="Enable notifications" />`}
      preview={<Switch checked={notify} onChange={setNotify} label="Enable notifications" />}
      variants={[
        {
          id: 'label',
          title: 'Labeled',
          desc: 'The label names the setting. The switch shows its state.',
          code: `<Switch checked={dark} onChange={setDark} label="Dark mode" />`,
          demo: <Switch checked={notify} onChange={setNotify} label="Enable notifications" />,
        },
        {
          id: 'disabled',
          title: 'Disabled',
          desc: 'Locked settings stay visible but dimmed.',
          code: `<Switch checked={false} onChange={() => {}} label="Locked" disabled />`,
          demo: <Switch checked={false} onChange={() => {}} label="Locked" disabled />,
        },
      ]}
      propsRows={[
        { name: 'checked', type: 'boolean', defaultValue: '-', desc: 'On or off. Switch is always controlled.' },
        { name: 'onChange', type: '(checked) => void', defaultValue: '-', desc: 'Fires with the next state.' },
        { name: 'label', type: 'ReactNode', defaultValue: '-', desc: 'Setting name beside the switch.' },
        { name: 'disabled', type: 'boolean', defaultValue: 'false', desc: 'Locked state.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the label.' },
      ]}
      rules={[
        'Switches apply instantly. Choices that need submit use Checkbox.',
        'Label the setting, not the action. Say Dark mode, not Turn on dark mode.',
        'Navy means on. Never use maroon for a switch.',
      ]}
      prev={{ to: '/components/radio', label: 'Radio' }}
      next={{ to: '/components/carousel', label: 'Carousel' }}
    />
  );
}
