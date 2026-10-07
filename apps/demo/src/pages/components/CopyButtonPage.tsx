import { Badge, CopyButton, Kbd } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

export function CopyButtonPage() {
  return (
    <ComponentPage
      title="CopyButton"
      desc="One-click clipboard copy that flips to a check for 1.5 seconds. Never dead-ends, even without clipboard access."
      badges={
        <>
          <Badge tone="navy">clipboard</Badge>
          <Badge tone="grey">sm / md</Badge>
        </>
      }
      importCode={`import { CopyButton } from '@omega-os/ui';

<CopyButton text="omega-os" />`}
      preview={
        <p className="text-sm text-ot-muted">
          Copy <CopyButton text="omega-os" /> with <Kbd>Ctrl</Kbd> + <Kbd>C</Kbd> and see the confirm state.
        </p>
      }
      variants={[
        {
          id: 'sizes',
          title: 'Sizes',
          desc: 'sm sits in headers, md stands alone next to content.',
          code: `<CopyButton text="omega-os" size="sm" />
<CopyButton text="omega-os" size="md" />`,
          demo: (
            <>
              <CopyButton text="omega-os" size="sm" />
              <CopyButton text="omega-os" size="md" />
            </>
          ),
        },
        {
          id: 'callback',
          title: 'Callback',
          desc: 'onCopy fires after copy, e.g. for a success toast.',
          code: `<CopyButton text="omega-os" onCopy={() => toast.show('success', 'Copied.')} />`,
          demo: <CopyButton text="omega-os" />,
        },
      ]}
      propsRows={[
        { name: 'text', type: 'string', defaultValue: '-', desc: 'Text written to the clipboard.' },
        { name: 'size', type: "'sm' | 'md'", defaultValue: "'sm'", desc: '32 or 40px hit area.' },
        { name: 'onCopy', type: '() => void', defaultValue: '-', desc: 'Fires after copy.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the button.' },
      ]}
      rules={[
        'Copy targets are exact text. Never prettify what gets copied.',
        'The check confirm lasts 1.5 seconds, then resets.',
        'Pair with a toast only when the copy matters for the next step.',
      ]}
      a11y={[
        'Plain button with a clear name.',
        'Confirm state pairs icon plus text.',
        'Callback toasts confirm only when the copy matters.',
      ]}
      prev={{ to: '/components/command-palette', label: 'CommandPalette' }}
      next={{ to: '/components/date-picker', label: 'DatePicker' }}
    />
  );
}
