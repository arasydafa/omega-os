import { useState } from 'react';
import { Badge, SubmenuBar } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

export function SubmenuBarPage() {
  const [section, setSection] = useState('code');
  return (
    <ComponentPage
      title="SubmenuBar"
      desc="Secondary strip with count badges and a sliding active indicator. Code, issues, pulls style."
      badges={
        <>
          <Badge tone="navy">count badges</Badge>
          <Badge tone="grey">sliding indicator</Badge>
        </>
      }
      importCode={`import { SubmenuBar } from '@omega-os/ui';

<SubmenuBar
  label="Project section"
  onSelect={setSection}
  links={[
    { id: 'code', label: 'Code', active: section === 'code', count: 12 },
    { id: 'issues', label: 'Issues', active: section === 'issues', count: 3 },
  ]}
/>`}
      preview={
        <SubmenuBar
          label="Project section"
          onSelect={setSection}
          links={[
            { id: 'code', label: 'Code', active: section === 'code', count: 12 },
            { id: 'issues', label: 'Issues', active: section === 'issues', count: 3 },
            { id: 'pulls', label: 'Pulls', active: section === 'pulls' },
          ]}
        />
      }
      variants={[
        {
          id: 'counts',
          title: 'Counts',
          desc: 'Count pills flag open work without stealing focus.',
          code: `{ id: 'issues', label: 'Issues', count: 3 }`,
          demo: (
            <SubmenuBar
              label="Counts"
              links={[
                { id: 'open', label: 'Open', active: true, count: 7 },
                { id: 'closed', label: 'Closed', count: 42 },
              ]}
            />
          ),
        },
      ]}
      propsRows={[
        { name: 'links', type: 'SubmenuLink[]', defaultValue: '-', desc: 'Tabs: id, label, icon, active, count, onClick.' },
        { name: 'onSelect', type: '(id) => void', defaultValue: '-', desc: 'Fires with the picked link id.' },
        { name: 'label', type: 'string', defaultValue: "'Section'", desc: 'Accessible name for the strip.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the nav.' },
      ]}
      rules={[
        'Strips hold sibling views of one section. Cross-section jumps use Navbar.',
        'Counts show open work. Zero counts hide the pill.',
        'The sliding indicator tracks the active link on resize.',
      ]}
      a11y={[
        'Active link uses aria-current page.',
        'Indicator tracks on resize.',
        'Counts read as plain numbers.',
      ]}
      prev={{ to: '/components/stepper', label: 'Stepper' }}
      next={{ to: '/components/table', label: 'Table' }}
    />
  );
}
