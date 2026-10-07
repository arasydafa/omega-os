import { Badge, Progress } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

export function ProgressPage() {
  return (
    <ComponentPage
      title="Progress"
      desc="Determinate bar with tone and label, plus an indeterminate slide for unknown waits."
      badges={
        <>
          <Badge tone="navy">determinate</Badge>
          <Badge tone="grey">indeterminate</Badge>
        </>
      }
      importCode={`import { Progress } from '@omega-os/ui';

<Progress value={65} label="Uploading bundle" />
<Progress value={0} indeterminate label="Syncing" />`}
      preview={
        <div className="grid gap-4">
          <Progress value={65} label="Uploading bundle" />
          <Progress value={0} indeterminate label="Syncing" />
        </div>
      }
      variants={[
        {
          id: 'tones',
          title: 'Tones',
          desc: 'Navy tracks work, status tones track results.',
          code: `<Progress value={65} tone="navy" />
<Progress value={90} tone="success" />
<Progress value={20} tone="danger" />`,
          demo: (
            <div className="grid w-full gap-4">
              <Progress value={65} tone="navy" />
              <Progress value={90} tone="success" />
              <Progress value={20} tone="danger" />
            </div>
          ),
        },
        {
          id: 'indeterminate',
          title: 'Indeterminate',
          desc: 'Unknown waits slide instead of filling. Label says what is happening.',
          code: `<Progress value={0} indeterminate label="Syncing" />`,
          demo: <Progress value={0} indeterminate label="Syncing" />,
        },
      ]}
      propsRows={[
        { name: 'value', type: 'number', defaultValue: '-', desc: 'Current amount toward max.' },
        { name: 'max', type: 'number', defaultValue: '100', desc: 'Full amount.' },
        { name: 'tone', type: "'navy' | 'info' | 'success' | 'warning' | 'danger'", defaultValue: "'navy'", desc: 'Bar color.' },
        { name: 'indeterminate', type: 'boolean', defaultValue: 'false', desc: 'Sliding bar for unknown waits.' },
        { name: 'label', type: 'string', defaultValue: '-', desc: 'Accessible name plus visible caption.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the wrapper.' },
      ]}
      rules={[
        'Labels name the task. Percentages ride beside the label.',
        'Unknown waits use indeterminate, never a fake 99 percent.',
        'Stacked breakdowns use TimingBar instead.',
      ]}
      prev={{ to: '/components/pagination', label: 'Pagination' }}
      next={{ to: '/components/search-bar', label: 'SearchBar' }}
    />
  );
}
