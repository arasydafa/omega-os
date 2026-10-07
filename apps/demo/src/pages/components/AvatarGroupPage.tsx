import { AvatarGroup, Badge } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

const TEAM = [
  { name: 'Alex Morgan' },
  { name: 'Sam Rivera' },
  { name: 'Jo Lee' },
  { name: 'Maria Santos' },
  { name: 'Tom Baker' },
];

export function AvatarGroupPage() {
  return (
    <ComponentPage
      title="AvatarGroup"
      desc="Overlapping people stack that collapses extra members into a +N marker."
      badges={
        <>
          <Badge tone="navy">+N overflow</Badge>
          <Badge tone="grey">max 4</Badge>
        </>
      }
      importCode={`import { AvatarGroup } from '@omega-os/ui';

<AvatarGroup
  avatars={[{ name: 'Alex Morgan' }, { name: 'Sam Rivera' }, { name: 'Jo Lee' }]}
  max={3}
/>`}
      preview={<AvatarGroup avatars={TEAM} max={3} />}
      variants={[
        {
          id: 'max',
          title: 'Max visible',
          desc: 'Members past max collapse into +N. Defaults to 4.',
          code: `<AvatarGroup avatars={team} max={3} />`,
          demo: <AvatarGroup avatars={TEAM} max={2} />,
        },
        {
          id: 'size',
          title: 'Sizes',
          desc: 'Follows Avatar sizes so stacks match nearby markers.',
          code: `<AvatarGroup avatars={team} size="sm" />`,
          demo: <AvatarGroup avatars={TEAM.slice(0, 3)} size="sm" />,
        },
      ]}
      propsRows={[
        { name: 'avatars', type: 'AvatarPerson[]', defaultValue: '-', desc: 'Members: name plus optional photo src.' },
        { name: 'max', type: 'number', defaultValue: '4', desc: 'Visible members before collapsing into +N.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", desc: 'Marker size for the whole stack.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the stack.' },
      ]}
      rules={[
        'Use for people only. Counts of things use Badge.',
        'Keep max small so the +N marker stays readable.',
        'Photos and initials mix freely inside one stack.',
      ]}
      prev={{ to: '/components/avatar', label: 'Avatar' }}
      next={{ to: '/components/badge', label: 'Badge' }}
    />
  );
}
