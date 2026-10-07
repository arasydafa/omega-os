import { Badge, Input } from '@omega-os/ui';
import { Search } from 'lucide-react';
import { ComponentPage } from '../ComponentPage.js';

export function InputPage() {
  return (
    <ComponentPage
      title="Input"
      desc="40px text field with label, helper, maroon error state, and optional leading icon."
      badges={
        <>
          <Badge tone="navy">40px</Badge>
          <Badge tone="grey">label + helper</Badge>
          <Badge tone="danger">error state</Badge>
        </>
      }
      importCode={`import { Input } from '@omega-os/ui';

<Input label="Project name" placeholder="e.g. riverside-cafe" helper="Lowercase, no spaces." />
<Input label="Slug" error="This slug is taken." />`}
      preview={
        <div className="grid max-w-md gap-3.5">
          <Input label="Project name" placeholder="e.g. riverside-cafe" helper="Lowercase, no spaces." />
          <Input label="Required field" error="This field is required." />
        </div>
      }
      variants={[
        {
          id: 'icon',
          title: 'With icon',
          desc: 'A 16px leading icon marks search and similar fields.',
          code: `<Input label="Search" icon={<Search size={16} />} placeholder="Search…" />`,
          demo: (
            <div className="w-full max-w-md">
              <Input label="Search" icon={<Search size={16} />} placeholder="Search…" />
            </div>
          ),
        },
        {
          id: 'error',
          title: 'Error',
          desc: 'Error swaps the border to maroon and replaces the helper.',
          code: `<Input label="Slug" error="This slug is taken." />`,
          demo: (
            <div className="w-full max-w-md">
              <Input label="Slug" error="This slug is taken." />
            </div>
          ),
        },
      ]}
      propsRows={[
        { name: 'label', type: 'ReactNode', defaultValue: '-', desc: 'Field label, linked to the control.' },
        { name: 'helper', type: 'ReactNode', defaultValue: '-', desc: 'Muted help. Hidden when error is set.' },
        { name: 'error', type: 'ReactNode', defaultValue: '-', desc: 'Error text. Turns the border maroon.' },
        { name: 'icon', type: 'ReactNode', defaultValue: '-', desc: 'Leading 16px icon. Lucide only.' },
        { name: 'placeholder', type: 'string', defaultValue: '-', desc: 'Native placeholder, e.g. a format example.' },
        { name: 'disabled', type: 'boolean', defaultValue: '-', desc: 'Native disabled state.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the field.' },
      ]}
      propsNote="InputProps extends native input attributes. Type, value, onChange, and friends pass through."
      rules={[
        'Every field has a label. Placeholders never replace labels.',
        'Helpers show format first. Errors replace helpers, never stack with them.',
        'Focus ring is navy. Error ring is maroon.',
      ]}
      prev={{ to: '/components/image', label: 'Image' }}
      next={{ to: '/components/select', label: 'Select' }}
    />
  );
}
