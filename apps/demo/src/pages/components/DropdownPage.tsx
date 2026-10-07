import { Badge, Button, Dropdown, useToast } from '@omega-os/ui';
import { ChevronDown } from 'lucide-react';
import { ComponentPage } from '../ComponentPage.js';

export function DropdownPage() {
  const toast = useToast();
  return (
    <ComponentPage
      title="Dropdown"
      desc="Menu near its trigger with flyout submenus up to three levels. Small menus use Dropdown, blocking confirms use Modal."
      badges={
        <>
          <Badge tone="navy">flyouts</Badge>
          <Badge tone="grey">3 levels max</Badge>
        </>
      }
      importCode={`import { Dropdown } from '@omega-os/ui';

<Dropdown
  trigger={<Button variant="secondary">Menu</Button>}
  items={[
    { label: 'Rename', onSelect: rename },
    { label: 'Delete', danger: true, onSelect: remove },
  ]}
/>`}
      preview={
        <Dropdown
          trigger={
            <Button variant="secondary">
              Menu <ChevronDown size={16} />
            </Button>
          }
          items={[
            { label: 'Rename', onSelect: () => toast.show('info', 'Rename picked.') },
            {
              label: 'More',
              children: [
                { label: 'Duplicate', onSelect: () => toast.show('info', 'Duplicate picked.') },
                {
                  label: 'Settings',
                  children: [{ label: 'Workspace', onSelect: () => toast.show('info', 'Workspace picked.') }],
                },
              ],
            },
            { label: 'Delete', danger: true, onSelect: () => toast.show('danger', 'Delete picked.') },
          ]}
        />
      }
      variants={[
        {
          id: 'danger',
          title: 'Danger item',
          desc: 'Maroon text marks the destructive choice. It still confirms in a Modal.',
          code: `{ label: 'Delete', danger: true, onSelect: confirmDelete }`,
          demo: <span className="text-sm text-ot-muted">Delete sits last and red in the preview above.</span>,
        },
        {
          id: 'nested',
          title: 'Nested flyouts',
          desc: 'Children open to the right. Three levels is the limit.',
          code: `{
  label: 'More',
  children: [{ label: 'Duplicate', onSelect: duplicate }],
}`,
          demo: <span className="text-sm text-ot-muted">Hover More in the preview above.</span>,
        },
      ]}
      propsRows={[
        { name: 'trigger', type: 'ReactNode', defaultValue: '-', desc: 'Element that toggles the menu.' },
        { name: 'items', type: 'DropdownItemDef[]', defaultValue: '-', desc: 'Rows: label, icon, danger, onSelect, children.' },
        { name: 'label', type: 'string', defaultValue: '-', desc: 'Accessible name for the menu.' },
      ]}
      rules={[
        'Panel radius is 12, item radius is 8. Flyouts open right.',
        'Danger rows use maroon text and sit last.',
        'Three nesting levels max. Deeper trees hurt usability.',
      ]}
      prev={{ to: '/components/drawer', label: 'Drawer' }}
      next={{ to: '/components/empty-state', label: 'EmptyState' }}
    />
  );
}
