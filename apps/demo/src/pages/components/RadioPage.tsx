import { Badge, Radio } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

export function RadioPage() {
  return (
    <ComponentPage
      title="Radio"
      desc="Labeled single-select control. Radios travel in named groups where exactly one wins."
      badges={
        <>
          <Badge tone="navy">single-select</Badge>
          <Badge tone="grey">native input</Badge>
        </>
      }
      importCode={`import { Radio } from '@omega-os/ui';

<Radio name="theme" label="Light" description="Default theme." defaultChecked />
<Radio name="theme" label="Dark" description="Optional theme." />`}
      preview={
        <div className="grid gap-2.5">
          <Radio name="page-theme" label="Light" description="Default theme." defaultChecked />
          <Radio name="page-theme" label="Dark" description="Optional theme." />
        </div>
      }
      variants={[
        {
          id: 'group',
          title: 'Grouped',
          desc: 'Same name groups the options. The browser enforces one choice.',
          code: `<Radio name="plan" label="Starter" />
<Radio name="plan" label="Growth" defaultChecked />
<Radio name="plan" label="Scale" />`,
          demo: (
            <div className="grid w-full gap-2.5">
              <Radio name="page-plan" label="Starter" />
              <Radio name="page-plan" label="Growth" defaultChecked />
              <Radio name="page-plan" label="Scale" />
            </div>
          ),
        },
        {
          id: 'disabled',
          title: 'Disabled',
          desc: 'Unavailable options stay visible but dimmed.',
          code: `<Radio name="plan" label="Legacy" disabled />`,
          demo: <Radio name="page-legacy" label="Legacy" disabled />,
        },
      ]}
      propsRows={[
        { name: 'label', type: 'ReactNode', defaultValue: '-', desc: 'Choice label. Clicking it selects the option.' },
        { name: 'description', type: 'ReactNode', defaultValue: '-', desc: 'Helper line under the label.' },
        { name: 'name', type: 'string', defaultValue: '-', desc: 'Groups options so exactly one wins.' },
        { name: 'checked / defaultChecked', type: 'boolean', defaultValue: '-', desc: 'Controlled or uncontrolled state.' },
        { name: 'onChange', type: '(e) => void', defaultValue: '-', desc: 'Native radio change event.' },
        { name: 'disabled', type: 'boolean', defaultValue: '-', desc: 'Native disabled state.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the label.' },
      ]}
      propsNote="RadioProps extends native input attributes."
      rules={[
        'Radios pick exactly one option. Zero or more takes Checkbox.',
        'Options in one question share one name.',
        'Never use a lone radio. Two options minimum.',
      ]}
      a11y={[
        'Native radios grouped by name. One wins.',
        'Arrow keys move within the group natively.',
        'Never a lone radio. Two options minimum.',
      ]}
      prev={{ to: '/components/checkbox', label: 'Checkbox' }}
      next={{ to: '/components/switch', label: 'Switch' }}
    />
  );
}
