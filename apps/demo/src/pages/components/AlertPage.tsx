import { useState } from 'react';
import { Alert, Badge } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

export function AlertPage() {
  const [closed, setClosed] = useState(false);
  return (
    <ComponentPage
      title="Alert"
      desc="Inline status with a fixed icon and tone. Info is blue, warning is yellow, success is green, danger is maroon."
      badges={
        <>
          <Badge tone="info">info</Badge>
          <Badge tone="warning">warning</Badge>
          <Badge tone="success">success</Badge>
          <Badge tone="danger">danger</Badge>
        </>
      }
      importCode={`import { Alert } from '@omega-os/ui';

<Alert tone="warning" title="Warning.">
  Unsaved changes will be lost.
</Alert>`}
      preview={
        <div className="grid gap-2.5">
          <Alert tone="info" title="Info.">Status colors now live in tokens.</Alert>
          <Alert tone="warning" title="Warning.">Unsaved changes will be lost.</Alert>
          <Alert tone="success" title="Success.">Design tokens applied.</Alert>
          <Alert tone="danger" title="Error.">Build failed. Tokens not found.</Alert>
        </div>
      }
      variants={[
        {
          id: 'tones',
          title: 'Tones',
          desc: 'Each tone pairs a fixed icon with its color. Never swap them.',
          code: `<Alert tone="info" title="Info.">…</Alert>
<Alert tone="warning" title="Warning.">…</Alert>
<Alert tone="success" title="Success.">…</Alert>
<Alert tone="danger" title="Error.">…</Alert>`,
          demo: (
            <div className="grid w-full gap-2.5">
              <Alert tone="info" title="Info.">Neutral update.</Alert>
              <Alert tone="danger" title="Error.">Failed save.</Alert>
            </div>
          ),
        },
        {
          id: 'dismissible',
          title: 'Dismissible',
          desc: 'Pass onClose to render a close button.',
          code: `<Alert tone="info" title="Info." onClose={() => setClosed(true)}>
  Dismiss me.
</Alert>`,
          demo: closed ? (
            <span className="text-sm text-ot-muted">Dismissed. Reload the page to see it again.</span>
          ) : (
            <Alert tone="info" title="Info." onClose={() => setClosed(true)}>
              Dismiss me.
            </Alert>
          ),
        },
      ]}
      propsRows={[
        { name: 'tone', type: "'info' | 'warning' | 'success' | 'danger'", defaultValue: '-', desc: 'Color and fixed icon.' },
        { name: 'title', type: 'ReactNode', defaultValue: '-', desc: 'Bold lead-in, e.g. Warning.' },
        { name: 'children', type: 'ReactNode', defaultValue: '-', desc: 'Message body.' },
        { name: 'onClose', type: '() => void', defaultValue: '-', desc: 'Renders a close button when provided.' },
        { name: 'icon', type: 'ReactNode', defaultValue: '-', desc: 'Overrides the default tone icon.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the alert.' },
      ]}
      rules={[
        'triangle-alert is warning-only and yellow. octagon-x is error-only and maroon.',
        'Title is one bold word with a period. Body is one short sentence.',
        'Block-level errors use danger. Inline hints use muted text instead.',
      ]}
      doDont={{
        doTitle: 'Match tone to meaning.',
        doBody: 'Info for updates, warning for caution, success for done, danger for errors.',
        dontTitle: 'Swapped icons.',
        dontBody: 'Never put triangle-alert on errors or octagon-x on warnings.',
      }}
      a11y={[
        'Role alert announces the message on render.',
        'Dismiss button carries a Dismiss label.',
        'Icons never replace text. Meaning stays in words.',
      ]}
      prev={{ to: '/components/accordion', label: 'Accordion' }}
      next={{ to: '/components/avatar', label: 'Avatar' }}
    />
  );
}
