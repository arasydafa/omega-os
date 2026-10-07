import { useState } from 'react';
import { Badge, Button, Sidebar } from '@omega-os/ui';
import { BookOpen, Folder, LayoutDashboard, PanelLeft, Wrench } from 'lucide-react';
import { ComponentPage } from '../ComponentPage.js';

export function SidebarPage() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <ComponentPage
      title="Sidebar"
      desc="App navigation with inline submenus and a collapse rail. Submenus nest three levels deep."
      badges={
        <>
          <Badge tone="navy">active tint</Badge>
          <Badge tone="grey">collapse rail</Badge>
        </>
      }
      importCode={`import { Sidebar } from '@omega-os/ui';

<Sidebar
  collapsed={collapsed}
  items={[
    { id: 'dash', label: 'Dashboard', active: true },
    {
      id: 'projects',
      label: 'Projects',
      children: [{ id: 'website', label: 'Website' }],
    },
  ]}
/>`}
      preview={
        <div className="grid gap-2">
          <Button size="sm" variant="secondary" icon={<PanelLeft size={16} />} onClick={() => setCollapsed((v) => !v)}>
            {collapsed ? 'Expand' : 'Collapse'}
          </Button>
          <Sidebar
            collapsed={collapsed}
            items={[
              { id: 'dash', label: 'Dashboard', icon: <LayoutDashboard size={16} />, active: true },
              {
                id: 'projects',
                label: 'Projects',
                icon: <Wrench size={16} />,
                children: [
                  { id: 'website', label: 'Website' },
                  { id: 'mobile-app', label: 'Mobile app' },
                ],
              },
              { id: 'files', label: 'Files', icon: <Folder size={16} /> },
              { id: 'docs', label: 'Docs', icon: <BookOpen size={16} /> },
            ]}
          />
        </div>
      }
      variants={[
        {
          id: 'collapsed',
          title: 'Collapsed rail',
          desc: 'Icons only at 64px. Labels hide, titles stay on hover.',
          code: `<Sidebar collapsed items={items} />`,
          demo: <span className="text-sm text-ot-muted">Toggle Collapse in the preview above.</span>,
        },
        {
          id: 'nested',
          title: 'Nested submenus',
          desc: 'Children expand inline. Grandchildren indent with a guide line.',
          code: `children: [{ id: 'a', label: 'A', children: [{ id: 'a1', label: 'A1' }] }]`,
          demo: <span className="text-sm text-ot-muted">Expand Projects in the preview above.</span>,
        },
      ]}
      propsRows={[
        { name: 'items', type: 'SidebarItemDef[]', defaultValue: '-', desc: 'Rows: id, label, icon, active, onClick, children.' },
        { name: 'collapsed', type: 'boolean', defaultValue: 'false', desc: 'Rail mode. Icons only, 64px wide.' },
        { name: 'onSelect', type: '(id) => void', defaultValue: '-', desc: 'Fires for leaf picks.' },
        { name: 'label', type: 'string', defaultValue: "'Sidebar'", desc: 'Accessible name for the nav.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the nav.' },
      ]}
      rules={[
        'Active rows use navy-bg with navy-text. One active row max.',
        'Icons are 16px and constant across expanded and rail modes.',
        'Submenu children stay 13px and muted until active.',
      ]}
      prev={{ to: '/components/search-bar', label: 'SearchBar' }}
      next={{ to: '/components/breadcrumbs', label: 'Breadcrumbs' }}
    />
  );
}
