import { Badge, Button, Navbar } from '@omega-os/ui';
import { Crown, Plus } from 'lucide-react';
import { ComponentPage } from '../ComponentPage.js';

export function NavbarPage() {
  return (
    <ComponentPage
      title="Navbar"
      desc="Top bar with brand slot, link row with active state, and right-side actions. Links can host dropdown menus."
      badges={
        <>
          <Badge tone="navy">brand slot</Badge>
          <Badge tone="grey">dropdown links</Badge>
        </>
      }
      importCode={`import { Navbar, Button } from '@omega-os/ui';

<Navbar
  brand={<b>OmegaOS</b>}
  links={[{ label: 'Dashboard', active: true }, { label: 'Projects' }]}
  actions={<Button size="sm">New</Button>}
/>`}
      preview={
        <Navbar
          brand={
            <>
              <span className="grid h-8 w-8 place-items-center rounded-ot-sm bg-navy text-white">
                <Crown size={16} />
              </span>
              <b className="text-sm">OmegaOS</b>
            </>
          }
          links={[{ label: 'Dashboard', active: true }, { label: 'Projects' }, { label: 'Docs' }]}
          actions={
            <Button size="sm" icon={<Plus size={16} />}>
              New
            </Button>
          }
        />
      }
      variants={[
        {
          id: 'dropdown',
          title: 'Dropdown links',
          desc: 'A link with children renders as a dropdown trigger with nested items.',
          code: `links={[{ label: 'Projects', children: [{ label: 'Website' }] }]}`,
          demo: (
            <Navbar
              brand={<b className="text-sm">OmegaOS</b>}
              links={[
                {
                  label: 'Projects',
                  children: [{ label: 'Website' }, { label: 'Mobile app' }],
                },
                { label: 'Docs' },
              ]}
            />
          ),
        },
      ]}
      propsRows={[
        { name: 'brand', type: 'ReactNode', defaultValue: '-', desc: 'Logo plus product name slot.' },
        { name: 'links', type: 'NavbarLink[]', defaultValue: '-', desc: 'Links: label, active, onClick, icon, children.' },
        { name: 'actions', type: 'ReactNode', defaultValue: '-', desc: 'Right-side actions, e.g. search plus New.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the bar.' },
      ]}
      rules={[
        'One active link per bar. Active uses navy-bg with navy-text.',
        'Brand slot holds a 32px navy logo and the product name.',
        'Actions stay right. Search before New.',
      ]}
      a11y={[
        'Primary nav landmark with one active link.',
        'Active link uses aria-current.',
        'Dropdown links open menus with keyboard support.',
      ]}
      prev={{ to: '/components/modal', label: 'Modal' }}
      next={{ to: '/components/pagination', label: 'Pagination' }}
    />
  );
}
