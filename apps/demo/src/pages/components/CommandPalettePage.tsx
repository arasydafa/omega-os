import { useState } from 'react';
import { Badge, Button, CommandPalette, useToast } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

export function CommandPalettePage() {
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const pick = (name: string) => () => toast.show('info', `${name} selected.`);
  return (
    <ComponentPage
      title="CommandPalette"
      desc="Fuzzy command dialog on Ctrl+K with grouping, keyboard model, and an empty state."
      badges={
        <>
          <Badge tone="navy">Ctrl+K</Badge>
          <Badge tone="grey">fuzzy filter</Badge>
        </>
      }
      importCode={`import { CommandPalette } from '@omega-os/ui';

const [open, setOpen] = useState(false);

<CommandPalette
  open={open}
  onOpenChange={setOpen}
  items={[
    { id: 'overview', label: 'Overview', group: 'Pages', onSelect: goOverview },
  ]}
/>`}
      preview={
        <>
          <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
            Open palette
          </Button>
          <CommandPalette
            open={open}
            onOpenChange={setOpen}
            placeholder="Type a command…"
            items={[
              { id: 'overview', label: 'Overview', group: 'Pages', onSelect: pick('Overview') },
              { id: 'reports', label: 'Reports', group: 'Pages', onSelect: pick('Reports') },
              { id: 'settings', label: 'Settings', group: 'Pages', onSelect: pick('Settings') },
            ]}
          />
        </>
      }
      variants={[
        {
          id: 'groups',
          title: 'Groups',
          desc: 'Items with the same group render under one heading.',
          code: `items={[
  { id: 'overview', label: 'Overview', group: 'Pages' },
  { id: 'reports', label: 'Reports', group: 'Pages' },
]}`,
          demo: <span className="text-sm text-ot-muted">Open the preview and type to see grouping and ranking.</span>,
        },
        {
          id: 'keyboard',
          title: 'Keyboard',
          desc: 'Arrows move, Enter runs, Escape closes. Ctrl+K toggles from anywhere.',
          code: `// arrows move the highlight
// Enter runs the highlighted item
// Escape closes`,
          demo: <span className="text-sm text-ot-muted">Try it in the preview above.</span>,
        },
      ]}
      propsRows={[
        { name: 'items', type: 'PaletteItem[]', defaultValue: '-', desc: 'Commands: id, label, keywords, hint, group, onSelect.' },
        { name: 'open / defaultOpen', type: 'boolean', defaultValue: 'false', desc: 'Controlled or uncontrolled visibility.' },
        { name: 'onOpenChange', type: '(open) => void', defaultValue: '-', desc: 'Fires on toggle, select, and overlay click.' },
        { name: 'placeholder', type: 'string', defaultValue: "'Type a command…'", desc: 'Input hint.' },
        { name: 'label', type: 'string', defaultValue: "'Command palette'", desc: 'Accessible name for the dialog.' },
      ]}
      rules={[
        'Labels are actions or places. Keep them under three words.',
        'Filtering is fuzzy with a contiguity bonus. Keywords widen matching.',
        'Running a command always closes the palette first.',
      ]}
      prev={{ to: '/components/combobox', label: 'Combobox' }}
      next={{ to: '/components/copy-button', label: 'CopyButton' }}
    />
  );
}
