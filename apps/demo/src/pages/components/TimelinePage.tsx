import { Badge, Timeline } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

export function TimelinePage() {
  return (
    <ComponentPage
      title="Timeline"
      desc="Vertical event feed with tone dots, mono timestamps, and optional descriptions."
      badges={
        <>
          <Badge tone="navy">tone dots</Badge>
          <Badge tone="grey">mono time</Badge>
        </>
      }
      importCode={`import { Timeline } from '@omega-os/ui';

<Timeline
  items={[
    { id: '1', time: '09:00', title: 'Build started', tone: 'info' },
    { id: '2', time: '09:04', title: 'Tests passed', tone: 'success' },
    { id: '3', time: '09:05', title: 'Deployed', description: 'Production', tone: 'navy' },
  ]}
/>`}
      preview={
        <Timeline
          items={[
            { id: '1', time: '09:00', title: 'Build started', tone: 'info' },
            { id: '2', time: '09:04', title: 'Tests passed', tone: 'success' },
            { id: '3', time: '09:05', title: 'Deployed', description: 'Production', tone: 'navy' },
          ]}
        />
      }
      variants={[
        {
          id: 'tones',
          title: 'Tones',
          desc: 'Dots borrow the status palette. Navy marks milestones, grey marks plain events.',
          code: `items={[
  { id: '1', title: 'Milestone', tone: 'navy' },
  { id: '2', title: 'Note', tone: 'grey' },
]}`,
          demo: (
            <Timeline
              items={[
                { id: '1', title: 'Milestone reached', tone: 'navy' },
                { id: '2', title: 'Note added', tone: 'grey' },
              ]}
            />
          ),
        },
      ]}
      propsRows={[
        { name: 'items', type: 'TimelineItemDef[]', defaultValue: '-', desc: 'Events: id, time, title, description, tone, icon.' },
        { name: 'label', type: 'string', defaultValue: "'Timeline'", desc: 'Accessible name for the feed.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the list.' },
      ]}
      rules={[
        'Events order newest last for progress, newest first for activity.',
        'Timestamps stay mono and muted.',
        'Empty feeds render nothing. Pair with EmptyState when the void needs words.',
      ]}
      prev={{ to: '/components/tabs', label: 'Tabs' }}
      next={{ to: '/components/timing-bar', label: 'TimingBar' }}
    />
  );
}
