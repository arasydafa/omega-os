import { useState } from 'react';
import { Badge, Button, Drawer } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

export function DrawerPage() {
  const [open, setOpen] = useState(false);
  return (
    <ComponentPage
      title="Drawer"
      desc="Side panel with the same contract as Modal. Focus trap, ESC, overlay click, and exit animation included."
      badges={
        <>
          <Badge tone="navy">side panel</Badge>
          <Badge tone="grey">left / right</Badge>
        </>
      }
      importCode={`import { Drawer, Button } from '@omega-os/ui';

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open drawer</Button>
<Drawer open={open} onClose={() => setOpen(false)} title="Details">
  Panel content goes here.
</Drawer>`}
      preview={
        <>
          <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
            Open drawer
          </Button>
          <Drawer
            open={open}
            onClose={() => setOpen(false)}
            title="Details"
            footer={
              <Button size="sm" variant="secondary" onClick={() => setOpen(false)}>
                Close
              </Button>
            }
          >
            Side panel with focus trap, ESC, and overlay click. Same contract as Modal.
          </Drawer>
        </>
      }
      variants={[
        {
          id: 'side',
          title: 'Sides',
          desc: 'Right is the default home for details. Left fits navigation drawers.',
          code: `<Drawer side="right" … />  {/* default */}
<Drawer side="left" … />`,
          demo: <span className="text-sm text-ot-muted">The preview above slides from the right.</span>,
        },
        {
          id: 'footer',
          title: 'Footer',
          desc: 'Sticky actions stay visible while long content scrolls.',
          code: `<Drawer title="Details" footer={<Button>Close</Button>}>…</Drawer>`,
          demo: <span className="text-sm text-ot-muted">Close sits in the footer of the preview above.</span>,
        },
      ]}
      propsRows={[
        { name: 'open', type: 'boolean', defaultValue: '-', desc: 'Controls visibility with exit animation.' },
        { name: 'onClose', type: '() => void', defaultValue: '-', desc: 'Fires on ESC, overlay click, and close.' },
        { name: 'title', type: 'ReactNode', defaultValue: '-', desc: 'Panel heading.' },
        { name: 'children', type: 'ReactNode', defaultValue: '-', desc: 'Panel body.' },
        { name: 'footer', type: 'ReactNode', defaultValue: '-', desc: 'Sticky action row.' },
        { name: 'side', type: "'left' | 'right'", defaultValue: "'right'", desc: 'Screen edge.' },
        { name: 'icon', type: 'ReactNode', defaultValue: '-', desc: 'Leading title icon.' },
      ]}
      rules={[
        'Drawers hold details and filters. Blocking confirms use Modal.',
        'Same contract as Modal. Focus trap, ESC, overlay click.',
        'One drawer at a time. Never stack drawers.',
      ]}
      a11y={[
        'Same contract as Modal. Focus trap, ESC, overlay click.',
        'One drawer at a time. Never stack drawers.',
        'Title announces the panel purpose.',
      ]}
      prev={{ to: '/components/date-picker', label: 'DatePicker' }}
      next={{ to: '/components/dropdown', label: 'Dropdown' }}
    />
  );
}
