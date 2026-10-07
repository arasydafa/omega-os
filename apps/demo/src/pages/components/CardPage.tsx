import { Avatar, Badge, Card, Spinner } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

export function CardPage() {
  return (
    <ComponentPage
      title="Card"
      desc="Bordered surface panel in three paddings. Cards group related content, never whole pages."
      badges={
        <>
          <Badge tone="navy">surface</Badge>
          <Badge tone="grey">none / md / lg</Badge>
        </>
      }
      importCode={`import { Card } from '@omega-os/ui';

<Card padding="lg">
  <h2>Weekly summary</h2>
  <p>Sales rose 12 percent.</p>
</Card>`}
      preview={
        <Card padding="lg">
          <div className="flex items-center gap-3">
            <Avatar name="Alex Morgan" />
            <Avatar name="Sam Rivera" size="sm" />
            <Spinner />
            <span className="text-sm text-ot-muted">Card wraps any content.</span>
          </div>
        </Card>
      }
      variants={[
        {
          id: 'padding',
          title: 'Padding',
          desc: 'none for edge-to-edge media, md default, lg for roomy panels.',
          code: `<Card padding="none">…</Card>
<Card padding="md">…</Card>
<Card padding="lg">…</Card>`,
          demo: (
            <div className="grid w-full gap-2.5">
              <Card padding="md">Compact panel.</Card>
              <Card padding="lg">Roomy panel.</Card>
            </div>
          ),
        },
      ]}
      propsRows={[
        { name: 'children', type: 'ReactNode', defaultValue: '-', desc: 'Card content.' },
        { name: 'padding', type: "'none' | 'md' | 'lg'", defaultValue: "'md'", desc: 'Inner spacing: 0, 20, or 24px.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the panel.' },
      ]}
      rules={[
        'Cards hold one topic. Split topics into separate cards.',
        'Radius is always 16. Cards never use sharp corners.',
        'Page background shows between cards. Never nest cards deeply.',
      ]}
      prev={{ to: '/components/button', label: 'Button' }}
      next={{ to: '/components/checkbox', label: 'Checkbox' }}
    />
  );
}
