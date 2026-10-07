import { Badge, Button, EmptyState } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

export function EmptyStatePage() {
  return (
    <ComponentPage
      title="EmptyState"
      desc="Centered nothing-here panel with a muted icon tile, a title, and one action."
      badges={
        <>
          <Badge tone="navy">icon tile</Badge>
          <Badge tone="grey">one action</Badge>
        </>
      }
      importCode={`import { EmptyState, Button } from '@omega-os/ui';

<EmptyState
  title="Nothing here"
  description="Create one to get started."
  action={<Button size="sm">Create new</Button>}
/>`}
      preview={
        <EmptyState
          title="Nothing here"
          description="This is the standalone empty state."
          action={<Button size="sm">Create new</Button>}
        />
      }
      variants={[
        {
          id: 'action',
          title: 'With action',
          desc: 'One button that fixes the emptiness. The happy path in one click.',
          code: `<EmptyState title="No projects" action={<Button size="sm">Create new</Button>} />`,
          demo: (
            <EmptyState
              title="No projects"
              description="Create one to get started."
              action={<Button size="sm">Create new</Button>}
            />
          ),
        },
        {
          id: 'plain',
          title: 'Plain',
          desc: 'Title plus description when no action fits yet.',
          code: `<EmptyState title="No results" description="Try a shorter search." />`,
          demo: <EmptyState title="No results" description="Try a shorter search." />,
        },
      ]}
      propsRows={[
        { name: 'icon', type: 'ReactNode', defaultValue: 'Inbox', desc: '32px icon in a muted tile. Lucide only.' },
        { name: 'title', type: 'ReactNode', defaultValue: '-', desc: 'Short headline.' },
        { name: 'description', type: 'ReactNode', defaultValue: '-', desc: 'One helpful line.' },
        { name: 'action', type: 'ReactNode', defaultValue: '-', desc: 'Single button that fixes the state.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the panel.' },
      ]}
      rules={[
        'One action max. Two buttons make emptiness feel like work.',
        'Titles name the state. Descriptions say the next step.',
        'Tables render EmptyState through emptyTitle, not around it.',
      ]}
      prev={{ to: '/components/dropdown', label: 'Dropdown' }}
      next={{ to: '/components/file-upload', label: 'FileUpload' }}
    />
  );
}
