import { Badge, Select } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

export function SelectPage() {
  return (
    <ComponentPage
      title="Select"
      desc="Native dropdown with label, helper, and maroon error state. Fixed lists use Select, searchable lists use Combobox."
      badges={
        <>
          <Badge tone="navy">native select</Badge>
          <Badge tone="grey">label + helper</Badge>
        </>
      }
      importCode={`import { Select } from '@omega-os/ui';

<Select label="Category">
  <option>Website</option>
  <option>Mobile app</option>
  <option>Design system</option>
</Select>`}
      preview={
        <div className="grid max-w-md gap-3.5">
          <Select label="Category">
            <option>Website</option>
            <option>Mobile app</option>
            <option>Design system</option>
          </Select>
          <Select label="Required choice" error="Pick one to continue.">
            <option>Website</option>
            <option>Mobile app</option>
          </Select>
        </div>
      }
      variants={[
        {
          id: 'error',
          title: 'Error',
          desc: 'Error swaps the border to maroon and replaces the helper.',
          code: `<Select label="Category" error="Pick one to continue.">…</Select>`,
          demo: (
            <div className="w-full max-w-md">
              <Select label="Category" error="Pick one to continue.">
                <option>Website</option>
                <option>Mobile app</option>
              </Select>
            </div>
          ),
        },
      ]}
      propsRows={[
        { name: 'label', type: 'ReactNode', defaultValue: '-', desc: 'Field label, linked to the control.' },
        { name: 'helper', type: 'ReactNode', defaultValue: '-', desc: 'Muted help. Hidden when error is set.' },
        { name: 'error', type: 'ReactNode', defaultValue: '-', desc: 'Error text. Turns the border maroon.' },
        { name: 'children', type: 'ReactNode', defaultValue: '-', desc: 'Native option elements.' },
        { name: 'disabled', type: 'boolean', defaultValue: '-', desc: 'Native disabled state.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the field.' },
      ]}
      propsNote="SelectProps extends native select attributes. Value, onChange, and friends pass through."
      rules={[
        'Options read as nouns. Keep them short and parallel.',
        'Under seven fixed options takes Select. Searchable takes Combobox.',
        'Focus ring is navy. Error ring is maroon.',
      ]}
      prev={{ to: '/components/input', label: 'Input' }}
      next={{ to: '/components/textarea', label: 'Textarea' }}
    />
  );
}
