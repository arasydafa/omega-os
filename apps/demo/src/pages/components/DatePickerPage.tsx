import { useState } from 'react';
import { Badge, DatePicker } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

export function DatePickerPage() {
  const [due, setDue] = useState<string | null>('2026-09-10');
  return (
    <ComponentPage
      title="DatePicker"
      desc="Custom calendar with month and year drill-down, keyboard support, and inclusive min and max bounds."
      badges={
        <>
          <Badge tone="navy">ISO dates</Badge>
          <Badge tone="grey">id-ID default</Badge>
        </>
      }
      importCode={`import { DatePicker } from '@omega-os/ui';

<DatePicker
  label="Due date"
  defaultValue="2026-09-10"
  min="2026-01-01"
  max="2026-12-31"
/>`}
      preview={
        <div className="max-w-sm">
          <DatePicker label="Due date" value={due} onChange={setDue} min="2026-01-01" max="2026-12-31" />
          <p className="mt-2 text-sm text-ot-muted">Picked: {due ?? 'none'}</p>
        </div>
      }
      variants={[
        {
          id: 'bounds',
          title: 'Bounds',
          desc: 'min and max are inclusive ISO dates. Out-of-range days disable.',
          code: `<DatePicker label="Due date" min="2026-01-01" max="2026-12-31" />`,
          demo: (
            <div className="w-full max-w-sm">
              <DatePicker label="Due date" defaultValue="2026-06-15" min="2026-06-01" max="2026-06-30" />
            </div>
          ),
        },
        {
          id: 'states',
          title: 'Helper and error',
          desc: 'Helper guides the format. Error flags invalid picks in maroon.',
          code: `<DatePicker label="Start" helper="YYYY-MM-DD." />
<DatePicker label="Start" error="Pick a future date." />`,
          demo: (
            <div className="grid w-full gap-3">
              <DatePicker label="Start" helper="YYYY-MM-DD." />
              <DatePicker label="Start" error="Pick a future date." />
            </div>
          ),
        },
      ]}
      propsRows={[
        { name: 'value / defaultValue', type: 'string | null', defaultValue: 'null', desc: 'ISO date YYYY-MM-DD. Controlled or not.' },
        { name: 'onChange', type: '(iso | null) => void', defaultValue: '-', desc: 'Fires with the picked ISO date.' },
        { name: 'label', type: 'string', defaultValue: '-', desc: 'Field label.' },
        { name: 'helper', type: 'string', defaultValue: '-', desc: 'Helper text. Hidden when error is set.' },
        { name: 'error', type: 'string', defaultValue: '-', desc: 'Error text with maroon border.' },
        { name: 'min / max', type: 'string', defaultValue: '-', desc: 'Inclusive ISO bounds.' },
        { name: 'locale', type: 'string', defaultValue: "'id-ID'", desc: 'BCP 47 locale for names and display.' },
        { name: 'weekStart', type: '0 | 1', defaultValue: '1', desc: 'First day column. Monday by default.' },
        { name: 'placeholder', type: 'string', defaultValue: "'Pick a date'", desc: 'Empty text.' },
        { name: 'disabled', type: 'boolean', defaultValue: 'false', desc: 'Locked state.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the field.' },
      ]}
      rules={[
        'Dates travel as ISO strings. Display follows the locale.',
        'Bounds disable days instead of hiding them.',
        'Drill-down goes day to month to year and back.',
      ]}
      a11y={[
        'Calendar grid with full keyboard model.',
        'Bounds disable days instead of hiding them.',
        'Value travels as ISO text for readers.',
      ]}
      prev={{ to: '/components/copy-button', label: 'CopyButton' }}
      next={{ to: '/components/drawer', label: 'Drawer' }}
    />
  );
}
