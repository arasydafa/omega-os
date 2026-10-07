import { useState } from 'react';
import { Badge, Combobox } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

const MEMBERS = [
  { value: 'alex', label: 'Alex Morgan' },
  { value: 'sam', label: 'Sam Rivera' },
  { value: 'jo', label: 'Jo Lee' },
];

export function ComboboxPage() {
  const [assignee, setAssignee] = useState<string | null>(null);
  return (
    <ComponentPage
      title="Combobox"
      desc="Searchable single picker with keyboard support. Type to filter, arrows to move, Enter to pick."
      badges={
        <>
          <Badge tone="navy">searchable</Badge>
          <Badge tone="grey">keyboard ready</Badge>
        </>
      }
      importCode={`import { Combobox } from '@omega-os/ui';

<Combobox
  label="Assignee"
  placeholder="Search members…"
  options={[
    { value: 'alex', label: 'Alex Morgan' },
    { value: 'sam', label: 'Sam Rivera' },
  ]}
/>`}
      preview={
        <Combobox label="Assignee" placeholder="Search members…" options={MEMBERS} value={assignee} onChange={setAssignee} />
      }
      variants={[
        {
          id: 'uncontrolled',
          title: 'Uncontrolled',
          desc: 'defaultValue sets the start. The component keeps the rest.',
          code: `<Combobox label="Assignee" defaultValue="sam" options={members} />`,
          demo: <Combobox label="Assignee" defaultValue="sam" options={MEMBERS} />,
        },
        {
          id: 'states',
          title: 'Helper and error',
          desc: 'Helper explains the field. Error swaps in maroon and hides the helper.',
          code: `<Combobox label="Assignee" error="Pick someone first." options={members} />`,
          demo: <Combobox label="Assignee" error="Pick someone first." options={MEMBERS} />,
        },
      ]}
      propsRows={[
        { name: 'options', type: 'ComboboxOption[]', defaultValue: '-', desc: 'Choices: value plus label.' },
        { name: 'value / defaultValue', type: 'string | null', defaultValue: 'null', desc: 'Controlled or uncontrolled selection.' },
        { name: 'onChange', type: '(value) => void', defaultValue: '-', desc: 'Fires with the picked value.' },
        { name: 'label', type: 'string', defaultValue: '-', desc: 'Field label.' },
        { name: 'placeholder', type: 'string', defaultValue: "'Select…'", desc: 'Empty state text.' },
        { name: 'helper', type: 'string', defaultValue: '-', desc: 'Helper text. Hidden when error is set.' },
        { name: 'error', type: 'string', defaultValue: '-', desc: 'Error text with maroon border.' },
        { name: 'disabled', type: 'boolean', defaultValue: 'false', desc: 'Locked state.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the field.' },
      ]}
      rules={[
        'Options stay short. Labels read as names, not sentences.',
        'Filtering matches substrings case-insensitively.',
        'Native Select fits tiny fixed lists. Combobox fits searchable ones.',
      ]}
      doDont={{
        doTitle: 'Searchable lists.',
        doBody: 'Member pickers and long option lists belong in Combobox.',
        dontTitle: 'Tiny fixed lists.',
        dontBody: 'Under seven fixed options takes a native Select.',
      }}
      a11y={[
        'Type to filter. Arrows move, Enter picks, Escape closes.',
        'Label links to the field.',
        'Error swaps helper so one message reads.',
      ]}
      prev={{ to: '/components/code-block', label: 'CodeBlock' }}
      next={{ to: '/components/command-palette', label: 'CommandPalette' }}
    />
  );
}
