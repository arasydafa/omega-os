import { Badge, Checkbox } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

export function CheckboxPage() {
  return (
    <ComponentPage
      title="Checkbox"
      desc="Labeled multi-select control with navy accent and optional description."
      badges={
        <>
          <Badge tone="navy">multi-select</Badge>
          <Badge tone="grey">native input</Badge>
        </>
      }
      importCode={`import { Checkbox } from '@omega-os/ui';

<Checkbox label="Icons only" description="No emoji in UI." defaultChecked />`}
      preview={
        <div className="grid gap-2.5">
          <Checkbox label="Icons only" description="No emoji in UI." defaultChecked />
          <Checkbox label="Weekly digest" description="One email every Monday." />
        </div>
      }
      variants={[
        {
          id: 'description',
          title: 'With description',
          desc: 'A short second line explains the consequence of the choice.',
          code: `<Checkbox label="Weekly digest" description="One email every Monday." />`,
          demo: <Checkbox label="Weekly digest" description="One email every Monday." />,
        },
        {
          id: 'disabled',
          title: 'Disabled',
          desc: 'Disabled keeps its label readable at reduced opacity.',
          code: `<Checkbox label="Archived" disabled />`,
          demo: <Checkbox label="Archived" disabled />,
        },
      ]}
      propsRows={[
        { name: 'label', type: 'ReactNode', defaultValue: '-', desc: 'Choice label. Clicking it toggles the box.' },
        { name: 'description', type: 'ReactNode', defaultValue: '-', desc: 'Helper line under the label.' },
        { name: 'checked / defaultChecked', type: 'boolean', defaultValue: '-', desc: 'Controlled or uncontrolled state.' },
        { name: 'onChange', type: '(e) => void', defaultValue: '-', desc: 'Native checkbox change event.' },
        { name: 'disabled', type: 'boolean', defaultValue: '-', desc: 'Native disabled state.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the label.' },
      ]}
      propsNote="CheckboxProps extends native input attributes."
      rules={[
        'Labels are short and sit beside the box, never below it.',
        'Use Checkbox for zero or more choices. Use Radio for exactly one.',
        'Descriptions explain consequences in one line.',
      ]}
      prev={{ to: '/components/card', label: 'Card' }}
      next={{ to: '/components/radio', label: 'Radio' }}
    />
  );
}
