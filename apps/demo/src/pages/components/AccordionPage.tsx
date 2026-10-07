import { Accordion, Badge } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

const ITEMS = [
  { id: 'a', title: 'What is OmegaOS?', content: 'A design system for Omega web projects.' },
  { id: 'b', title: 'Dark mode?', content: 'Toggle the header button. The wipe starts from your click.' },
];

export function AccordionPage() {
  return (
    <ComponentPage
      title="Accordion"
      desc="Stacked collapsible panels. Single mode keeps one open, multiple mode allows many."
      badges={
        <>
          <Badge tone="navy">single</Badge>
          <Badge tone="grey">multiple</Badge>
        </>
      }
      importCode={`import { Accordion } from '@omega-os/ui';

<Accordion
  items={[
    { id: 'a', title: 'What is OmegaOS?', content: 'A design system.' },
    { id: 'b', title: 'Dark mode?', content: 'Toggle the header button.' },
  ]}
/>`}
      preview={<Accordion items={ITEMS} />}
      variants={[
        {
          id: 'single',
          title: 'Single',
          desc: 'Default. Opening one panel closes the rest. Best for FAQs.',
          code: `<Accordion mode="single" items={items} />`,
          demo: <Accordion items={ITEMS} />,
        },
        {
          id: 'multiple',
          title: 'Multiple',
          desc: 'Panels open independently. Best for settings groups.',
          code: `<Accordion mode="multiple" items={items} />`,
          demo: <Accordion mode="multiple" items={ITEMS} />,
        },
        {
          id: 'default-open',
          title: 'Default open',
          desc: 'Mark an item defaultOpen to start expanded.',
          code: `<Accordion items={[{ id: 'a', title: 'Start here', content: '...', defaultOpen: true }]} />`,
          demo: <Accordion items={[{ id: 'a', title: 'Start here', content: 'This panel starts open.', defaultOpen: true }]} />,
        },
      ]}
      propsRows={[
        { name: 'items', type: 'AccordionItemDef[]', defaultValue: '-', desc: 'Panels: id, title, content, optional defaultOpen.' },
        { name: 'mode', type: "'single' | 'multiple'", defaultValue: "'single'", desc: 'One open panel or many.' },
        { name: 'onChange', type: '(openIds) => void', defaultValue: '-', desc: 'Fires with the open panel ids.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the stack.' },
      ]}
      rules={[
        'Headers are buttons with arrows. Arrow keys move between them.',
        'Content uses muted 14px so titles stay dominant.',
        'FAQs use single mode. Settings groups may use multiple.',
      ]}
      a11y={[
        'Headers are buttons with expanded state.',
        'Arrow keys move between headers.',
        'Regions label through their headers.',
      ]}
      prev={{ to: '/foundations/icons', label: 'Icons' }}
      next={{ to: '/components/alert', label: 'Alert' }}
    />
  );
}
