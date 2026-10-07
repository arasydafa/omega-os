import { useState } from 'react';
import { Badge, Tabs } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

export function TabsPage() {
  const [tab, setTab] = useState('overview');
  return (
    <ComponentPage
      title="Tabs"
      desc="Section switcher with arrow-key navigation and a sliding indicator. Disabled tabs stay visible."
      badges={
        <>
          <Badge tone="navy">arrow keys</Badge>
          <Badge tone="grey">sliding indicator</Badge>
        </>
      }
      importCode={`import { Tabs } from '@omega-os/ui';

const [tab, setTab] = useState('overview');

<Tabs
  value={tab}
  onChange={setTab}
  tabs={[
    { id: 'overview', label: 'Overview' },
    { id: 'reports', label: 'Reports' },
    { id: 'settings', label: 'Settings', disabled: true },
  ]}
/>`}
      preview={
        <div>
          <Tabs
            value={tab}
            onChange={setTab}
            tabs={[
              { id: 'overview', label: 'Overview' },
              { id: 'reports', label: 'Reports' },
              { id: 'settings', label: 'Settings', disabled: true },
            ]}
          />
          <p className="mt-3 text-sm text-ot-muted">Active tab: {tab}</p>
        </div>
      }
      variants={[
        {
          id: 'disabled',
          title: 'Disabled',
          desc: 'Unavailable tabs dim but keep their place so layouts stay stable.',
          code: `{ id: 'settings', label: 'Settings', disabled: true }`,
          demo: (
            <Tabs
              value="overview"
              onChange={() => {}}
              tabs={[
                { id: 'overview', label: 'Overview' },
                { id: 'settings', label: 'Settings', disabled: true },
              ]}
            />
          ),
        },
      ]}
      propsRows={[
        { name: 'tabs', type: 'TabDef[]', defaultValue: '-', desc: 'Tabs: id, label, optional icon and disabled.' },
        { name: 'value', type: 'string', defaultValue: '-', desc: 'Active tab id. Tabs are always controlled.' },
        { name: 'onChange', type: '(id) => void', defaultValue: '-', desc: 'Fires with the next tab id.' },
        { name: 'label', type: 'string', defaultValue: "'Tabs'", desc: 'Accessible name for the list.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the list.' },
      ]}
      rules={[
        'Tabs switch views on one page. Page jumps use Navbar or Sidebar.',
        'Arrow keys move between enabled tabs.',
        'Labels stay short. Content below swaps, the tab row never moves.',
      ]}
      prev={{ to: '/components/table', label: 'Table' }}
      next={{ to: '/components/timeline', label: 'Timeline' }}
    />
  );
}
