import { Badge, Kbd } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

export function KbdPage() {
  return (
    <ComponentPage
      title="Kbd"
      desc="Keyboard key chip in mono 11px. Marks shortcuts inside copy and buttons."
      badges={
        <>
          <Badge tone="navy">mono 11px</Badge>
          <Badge tone="grey">shortcut hint</Badge>
        </>
      }
      importCode={`import { Kbd } from '@omega-os/ui';

<p>
  Press <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> to search.
</p>`}
      preview={
        <p className="text-sm text-ot-muted">
          Press <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> to search. <Kbd>Esc</Kbd> closes dialogs.
        </p>
      }
      variants={[
        {
          id: 'combo',
          title: 'Combos',
          desc: 'Join keys with a plus sign in muted text.',
          code: `<Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd> + <Kbd>P</Kbd>`,
          demo: (
            <span className="text-sm text-ot-muted">
              <Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd> + <Kbd>P</Kbd>
            </span>
          ),
        },
      ]}
      propsRows={[
        { name: 'children', type: 'ReactNode', defaultValue: '-', desc: 'Key name, e.g. Ctrl or Esc.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the chip.' },
      ]}
      rules={[
        'Key names match the keyboard. Ctrl on Windows, Cmd on Mac where relevant.',
        'Chips sit inline in copy. Never as standalone buttons.',
        'Document every shortcut the UI actually supports.',
      ]}
      prev={{ to: '/components/textarea', label: 'Textarea' }}
      next={{ to: '/components/log-viewer', label: 'LogViewer' }}
    />
  );
}
