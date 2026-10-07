import { Badge, Button } from '@omega-os/ui';
import { Check, Plus, Settings, Trash2 } from 'lucide-react';
import { ComponentPage } from '../ComponentPage.js';

export function ButtonPage() {
  return (
    <ComponentPage
      title="Button"
      desc="Trigger for actions. Navy primary, maroon destructive-only, every button carries a lucide icon. Never emoji."
      badges={
        <>
          <Badge tone="navy">primary</Badge>
          <Badge tone="grey">secondary · solid · ghost</Badge>
          <Badge tone="danger">danger</Badge>
        </>
      }
      importCode={`import { Button } from '@omega-os/ui';
import { Plus } from 'lucide-react';

<Button icon={<Plus size={16} />}>Primary</Button>`}
      preview={
        <div className="flex flex-wrap gap-2.5">
          <Button icon={<Plus size={16} />}>Primary</Button>
          <Button variant="secondary" icon={<Settings size={16} />}>
            Secondary
          </Button>
          <Button variant="solid" icon={<Plus size={16} />}>
            Solid
          </Button>
          <Button variant="danger" icon={<Trash2 size={16} />}>
            Danger
          </Button>
          <Button loading>Loading</Button>
        </div>
      }
      variants={[
        {
          id: 'primary',
          title: 'Primary',
          desc: 'The single main action per view. Navy fill, white text.',
          code: `<Button icon={<Plus size={16} />}>Primary</Button>`,
          demo: <Button icon={<Plus size={16} />}>Primary</Button>,
        },
        {
          id: 'secondary',
          title: 'Secondary',
          desc: 'Supporting actions next to a primary. Transparent with border.',
          code: `<Button variant="secondary" icon={<Settings size={16} />}>
  Secondary
</Button>`,
          demo: (
            <Button variant="secondary" icon={<Settings size={16} />}>
              Secondary
            </Button>
          ),
        },
        {
          id: 'danger',
          title: 'Danger',
          desc: 'Destructive actions only. Always paired with the trash-2 icon and maroon fill.',
          code: `<Button variant="danger" icon={<Trash2 size={16} />}>
  Delete
</Button>`,
          demo: (
            <Button variant="danger" icon={<Trash2 size={16} />}>
              Delete
            </Button>
          ),
        },
        {
          id: 'sizes',
          title: 'Sizes',
          desc: 'sm for dense toolbars, md default, lg for hero actions.',
          code: `<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`,
          demo: (
            <>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </>
          ),
        },
        {
          id: 'loading',
          title: 'Loading',
          desc: 'Shows a spinner and disables the button until the async work settles.',
          code: `<Button loading>Saving…</Button>`,
          demo: <Button loading>Saving…</Button>,
        },
        {
          id: 'badge-proof',
          title: 'With status',
          desc: 'Buttons often sit next to status badges. One tone per meaning.',
          code: `<Badge tone="success" icon={<Check size={12} />}>Active</Badge>`,
          demo: (
            <Badge tone="success" icon={<Check size={12} />}>
              Active
            </Badge>
          ),
        },
      ]}
      propsRows={[
        { name: 'variant', type: "'primary' | 'secondary' | 'solid' | 'danger' | 'ghost'", defaultValue: "'primary'", desc: 'Visual weight. Danger is destructive-only.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", desc: 'Height, padding, and text size.' },
        { name: 'icon', type: 'ReactNode', defaultValue: '-', desc: 'Leading 16px icon. Use lucide-react, never emoji.' },
        { name: 'loading', type: 'boolean', defaultValue: 'false', desc: 'Shows a spinner and disables the button.' },
        { name: 'disabled', type: 'boolean', defaultValue: 'false', desc: 'Native disabled state (also set while loading).' },
        { name: 'children', type: 'ReactNode', defaultValue: '-', desc: 'Button label.' },
        { name: 'onClick', type: '(e) => void', defaultValue: '-', desc: 'Native button attributes pass through.' },
      ]}
      propsNote="ButtonProps extends native button attributes. Type, onClick, aria, and form props all pass through."
      rules={[
        'Every button carries a lucide icon. No emoji, no icon-less buttons.',
        'Maroon + trash-2 are destructive-only; never use them for neutral actions.',
        'One primary per view; secondary actions use secondary, solid, or ghost.',
        'Rounded 12px (sm uses 8px); never rounded-none.',
      ]}
      doDont={{
        doTitle: 'One primary per view.',
        doBody: 'Give the main action the primary variant. Supporting actions use secondary or ghost.',
        dontTitle: 'Maroon for neutral actions.',
        dontBody: 'Reserve danger plus trash-2 for destructive confirms only.',
      }}
      a11y={[
        'Native button element with focus ring and disabled state.',
        'Loading sets disabled so double submits never happen.',
        'Icon plus text label. Icon-only buttons need an aria-label.',
      ]}
      prev={{ to: '/components/badge', label: 'Badge' }}
      next={{ to: '/components/card', label: 'Card' }}
    />
  );
}
