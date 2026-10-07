import { Badge, Button, useToast } from '@omega-os/ui';
import { Bell } from 'lucide-react';
import { ComponentPage } from '../ComponentPage.js';

export function ToastPage() {
  const toast = useToast();
  return (
    <ComponentPage
      title="Toast"
      desc="Bottom-right notifications with icon, title, and close. Four at most, newest on top, gone in four seconds."
      badges={
        <>
          <Badge tone="info">info</Badge>
          <Badge tone="warning">warning</Badge>
          <Badge tone="success">success</Badge>
          <Badge tone="danger">danger</Badge>
        </>
      }
      importCode={`import { ToasterProvider, useToast } from '@omega-os/ui';

function App() {
  return (
    <ToasterProvider>
      <SaveButton />
    </ToasterProvider>
  );
}

function SaveButton() {
  const toast = useToast();
  return (
    <Button onClick={() => toast.show('success', 'Saved.', { title: 'Done.' })}>
      Save
    </Button>
  );
}`}
      preview={
        <div className="flex flex-wrap gap-2.5">
          <Button variant="secondary" size="sm" icon={<Bell size={16} />} onClick={() => toast.show('info', 'New comment arrived.')}>
            Info
          </Button>
          <Button variant="secondary" size="sm" onClick={() => toast.show('warning', 'Unsaved changes remain.')}>
            Warning
          </Button>
          <Button variant="secondary" size="sm" onClick={() => toast.show('success', 'Report saved.', { title: 'Done.' })}>
            Success
          </Button>
          <Button variant="secondary" size="sm" onClick={() => toast.show('danger', 'Save failed. Retry.')}>
            Error
          </Button>
        </div>
      }
      variants={[
        {
          id: 'title',
          title: 'With title',
          desc: 'A bold lead plus a plain message. Titles stay under three words.',
          code: `toast.show('success', 'Report saved.', { title: 'Done.' })`,
          demo: (
            <Button variant="secondary" size="sm" onClick={() => toast.show('success', 'Report saved.', { title: 'Done.' })}>
              Titled toast
            </Button>
          ),
        },
        {
          id: 'duration',
          title: 'Duration',
          desc: 'Auto-dismiss delay in ms. Sticky toasts pass a long duration.',
          code: `toast.show('info', 'Syncing…', { duration: 8000 })`,
          demo: (
            <Button variant="secondary" size="sm" onClick={() => toast.show('info', 'Syncing…', { duration: 8000 })}>
              Long toast
            </Button>
          ),
        },
      ]}
      propsRows={[
        { name: 'show', type: '(kind, message, opts?) => number', defaultValue: '-', desc: 'Queues a toast. Returns its id.' },
        { name: 'dismiss', type: '(id) => void', defaultValue: '-', desc: 'Closes one toast early.' },
        { name: 'kind', type: "'info' | 'warning' | 'success' | 'danger'", defaultValue: '-', desc: 'Icon and tone.' },
        { name: 'title', type: 'ReactNode', defaultValue: '-', desc: 'Bold lead inside ToastOptions.' },
        { name: 'duration', type: 'number', defaultValue: '4000', desc: 'Auto-dismiss delay in ms.' },
      ]}
      propsNote="useToast only works inside ToasterProvider. Mount the provider once at the app root."
      rules={[
        'Toasts confirm results. Forms still show inline errors beside fields.',
        'Kinds match Alert exactly. Same icon, same color, same words.',
        'Four visible max. Bursts queue instead of flooding.',
      ]}
      doDont={{
        doTitle: 'Confirm results.',
        doBody: 'Saved, sent, and deployed moments deserve a toast.',
        dontTitle: 'Replace inline errors.',
        dontBody: 'Field problems stay beside the field where users fix them.',
      }}
      a11y={[
        'Toasts reuse Alert role so readers hear them.',
        'Auto-dismiss runs four seconds. Sticky content takes longer duration.',
        'Every toast carries a close button.',
      ]}
      prev={{ to: '/components/timing-bar', label: 'TimingBar' }}
      next={{ to: '/components/tooltip', label: 'Tooltip' }}
    />
  );
}
