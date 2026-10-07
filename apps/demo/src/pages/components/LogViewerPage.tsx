import { Badge, LogViewer } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

const LINES = [
  { id: '1', level: 'info' as const, text: 'Build started', time: '09:00' },
  { id: '2', level: 'info' as const, text: 'Tests passed (106)', time: '09:04' },
  { id: '3', level: 'success' as const, text: 'Deployed ok', time: '09:04' },
  { id: '4', level: 'warn' as const, text: 'Cache miss on install step', time: '09:04' },
  { id: '5', level: 'error' as const, text: 'Deploy failed: timeout', time: '09:05' },
];

export function LogViewerPage() {
  return (
    <ComponentPage
      title="LogViewer"
      desc="Mono log stream with level colors, text filter, follow mode, copy, and clear. Success lines render green."
      badges={
        <>
          <Badge tone="navy">levels</Badge>
          <Badge tone="grey">filter + follow</Badge>
          <Badge tone="success">success tone</Badge>
        </>
      }
      importCode={`import { LogViewer } from '@omega-os/ui';

<LogViewer
  lines={[
    { id: '1', level: 'info', text: 'Build started', time: '09:00' },
    { id: '2', level: 'success', text: 'Deployed ok', time: '09:04' },
  ]}
/>`}
      preview={<LogViewer lines={LINES} />}
      variants={[
        {
          id: 'levels',
          title: 'Levels',
          desc: 'debug is muted, info is plain, success is green, warn is yellow, error is maroon.',
          code: `lines={[
  { id: '1', level: 'debug', text: 'Cache check' },
  { id: '2', level: 'warn', text: 'Slow step' },
  { id: '3', level: 'error', text: 'Failed step' },
]}`,
          demo: (
            <LogViewer
              lines={[
                { id: 'a', level: 'debug', text: 'Cache check' },
                { id: 'b', level: 'warn', text: 'Slow step' },
                { id: 'c', level: 'error', text: 'Failed step' },
              ]}
            />
          ),
        },
        {
          id: 'cap',
          title: 'Line cap',
          desc: 'maxLines trims the oldest lines so long runs stay fast.',
          code: `<LogViewer lines={lines} maxLines={2000} />`,
          demo: <span className="text-sm text-ot-muted">Default keeps the newest 2000 lines.</span>,
        },
      ]}
      propsRows={[
        { name: 'lines', type: 'LogLine[]', defaultValue: '-', desc: 'Entries: id, level, text, optional time.' },
        { name: 'maxLines', type: 'number', defaultValue: '2000', desc: 'Trims oldest lines beyond this count.' },
        { name: 'follow / defaultFollow', type: 'boolean', defaultValue: 'true', desc: 'Auto-scroll to newest lines.' },
        { name: 'onClear', type: '() => void', defaultValue: '-', desc: 'Clears the stream when provided.' },
        { name: 'onCopy', type: '(text) => void', defaultValue: '-', desc: 'Fires with copied text, e.g. for a toast.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the viewer.' },
      ]}
      rules={[
        'Log text always uses mono. Timestamps stay muted.',
        'Success lines are green. Errors are maroon with plain wording.',
        'Filter matches text and level names.',
      ]}
      a11y={[
        'Filter matches text and level names.',
        'Follow mode tracks newest lines.',
        'Levels use color plus text names.',
      ]}
      prev={{ to: '/components/kbd', label: 'Kbd' }}
      next={{ to: '/components/markdown', label: 'Markdown' }}
    />
  );
}
