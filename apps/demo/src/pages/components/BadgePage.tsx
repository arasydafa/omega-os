import { Badge } from '@omega-os/ui';
import { Check } from 'lucide-react';
import { ComponentPage } from '../ComponentPage.js';

export function BadgePage() {
  return (
    <ComponentPage
      title="Badge"
      desc="Pill status with one tone per meaning. Navy for brand, grey for drafts, status tones for states."
      badges={
        <>
          <Badge tone="navy">Navy</Badge>
          <Badge tone="grey">Draft</Badge>
          <Badge tone="info">Info</Badge>
          <Badge tone="warning">Warning</Badge>
          <Badge tone="success" icon={<Check size={12} />}>Active</Badge>
          <Badge tone="danger">Error</Badge>
        </>
      }
      importCode={`import { Badge } from '@omega-os/ui';
import { Check } from 'lucide-react';

<Badge tone="success" icon={<Check size={12} />}>Active</Badge>`}
      preview={
        <div className="flex flex-wrap gap-2.5">
          <Badge tone="navy">Navy</Badge>
          <Badge tone="grey">Draft</Badge>
          <Badge tone="info">Info</Badge>
          <Badge tone="warning">Warning</Badge>
          <Badge tone="success" icon={<Check size={12} />}>Active</Badge>
          <Badge tone="danger">Error</Badge>
        </div>
      }
      variants={[
        {
          id: 'tones',
          title: 'Tones',
          desc: 'Grey is the quiet default. Status tones mirror Alert exactly.',
          code: `<Badge tone="grey">Draft</Badge>
<Badge tone="info">Info</Badge>
<Badge tone="warning">Warning</Badge>`,
          demo: (
            <>
              <Badge tone="grey">Draft</Badge>
              <Badge tone="info">Info</Badge>
              <Badge tone="warning">Warning</Badge>
            </>
          ),
        },
        {
          id: 'icon',
          title: 'With icon',
          desc: 'A 12px leading icon adds scan speed for key states.',
          code: `<Badge tone="success" icon={<Check size={12} />}>Active</Badge>`,
          demo: <Badge tone="success" icon={<Check size={12} />}>Active</Badge>,
        },
      ]}
      propsRows={[
        { name: 'tone', type: "'navy' | 'grey' | 'info' | 'warning' | 'success' | 'danger'", defaultValue: "'grey'", desc: 'Pill color. One tone per meaning.' },
        { name: 'icon', type: 'ReactNode', defaultValue: '-', desc: 'Leading 12px icon. Lucide only.' },
        { name: 'children', type: 'ReactNode', defaultValue: '-', desc: 'Short label, one or two words.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the pill.' },
      ]}
      rules={[
        'Labels stay short. Counts and states, not sentences.',
        'Tone matches Alert for the same meaning.',
        'Icons are 12px and optional. Text never wraps.',
      ]}
      doDont={{
        doTitle: 'Short labels.',
        doBody: 'Counts and states in one or two words.',
        dontTitle: 'Sentences in pills.',
        dontBody: 'Long text wraps and breaks the pill rhythm.',
      }}
      prev={{ to: '/components/avatar-group', label: 'AvatarGroup' }}
      next={{ to: '/components/button', label: 'Button' }}
    />
  );
}
