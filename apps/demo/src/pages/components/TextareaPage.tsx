import { Badge, Textarea } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

export function TextareaPage() {
  return (
    <ComponentPage
      title="Textarea"
      desc="Multi-line field with the same label, helper, and error contract as Input."
      badges={
        <>
          <Badge tone="navy">multi-line</Badge>
          <Badge tone="grey">label + helper</Badge>
        </>
      }
      importCode={`import { Textarea } from '@omega-os/ui';

<Textarea label="Description" placeholder="Short description…" />
<Textarea label="Notes" error="Keep it under 280 characters." />`}
      preview={
        <div className="grid max-w-md gap-3.5">
          <Textarea label="Description" placeholder="Short description…" />
          <Textarea label="Notes" error="Keep it under 280 characters." />
        </div>
      }
      variants={[
        {
          id: 'helper',
          title: 'Helper',
          desc: 'Helpers set length and tone expectations before typing starts.',
          code: `<Textarea label="Bio" helper="Two sentences max." />`,
          demo: (
            <div className="w-full max-w-md">
              <Textarea label="Bio" helper="Two sentences max." />
            </div>
          ),
        },
      ]}
      propsRows={[
        { name: 'label', type: 'ReactNode', defaultValue: '-', desc: 'Field label, linked to the control.' },
        { name: 'helper', type: 'ReactNode', defaultValue: '-', desc: 'Muted help. Hidden when error is set.' },
        { name: 'error', type: 'ReactNode', defaultValue: '-', desc: 'Error text. Turns the border maroon.' },
        { name: 'rows', type: 'number', defaultValue: '-', desc: 'Native rows attribute.' },
        { name: 'disabled', type: 'boolean', defaultValue: '-', desc: 'Native disabled state.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the field.' },
      ]}
      propsNote="TextareaProps extends native textarea attributes. Value, onChange, rows, and friends pass through."
      rules={[
        'Multi-line input uses Textarea. Single-line uses Input.',
        'Placeholders show an example, never the instruction.',
        'Resize stays vertical so layouts never break sideways.',
      ]}
      prev={{ to: '/components/select', label: 'Select' }}
      next={{ to: '/components/kbd', label: 'Kbd' }}
    />
  );
}
