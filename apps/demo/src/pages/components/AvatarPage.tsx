import { Avatar, Badge } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

export function AvatarPage() {
  return (
    <ComponentPage
      title="Avatar"
      desc="Person marker with photo or initials fallback. Broken photos fall back to initials, never a broken image icon."
      badges={
        <>
          <Badge tone="navy">photo</Badge>
          <Badge tone="grey">initials fallback</Badge>
        </>
      }
      importCode={`import { Avatar } from '@omega-os/ui';

<Avatar name="Alex Morgan" />
<Avatar name="Alex Morgan" src="/photos/alex.png" size="lg" />`}
      preview={
        <div className="flex items-center gap-3">
          <Avatar name="Alex Morgan" />
          <Avatar name="Sam Rivera" size="sm" />
          <Avatar name="Maria Santos" size="lg" />
          <Avatar name="Broken Link" src="https://example.com/missing.png" />
          <span className="text-sm text-ot-muted">Initials, then broken-photo fallback.</span>
        </div>
      }
      variants={[
        {
          id: 'initials',
          title: 'Initials',
          desc: 'Derived from the first two words of the name.',
          code: `<Avatar name="Alex Morgan" />`,
          demo: <Avatar name="Alex Morgan" />,
        },
        {
          id: 'sizes',
          title: 'Sizes',
          desc: 'sm for dense rows, md default, lg for profiles.',
          code: `<Avatar name="Sam Rivera" size="sm" />
<Avatar name="Sam Rivera" size="md" />
<Avatar name="Sam Rivera" size="lg" />`,
          demo: (
            <>
              <Avatar name="Sam Rivera" size="sm" />
              <Avatar name="Sam Rivera" size="md" />
              <Avatar name="Sam Rivera" size="lg" />
            </>
          ),
        },
        {
          id: 'photo',
          title: 'Photo with fallback',
          desc: 'Pass src for the photo. A failed load renders initials instead.',
          code: `<Avatar name="Jo Lee" src="/photos/jo.png" />`,
          demo: <Avatar name="Broken Link" src="https://example.com/missing.png" />,
        },
      ]}
      propsRows={[
        { name: 'name', type: 'string', defaultValue: '-', desc: 'Full name. Initials come from the first two words.' },
        { name: 'src', type: 'string', defaultValue: '-', desc: 'Photo URL. Failures fall back to initials.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: "'md'", desc: '32, 40, or 48px.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the marker.' },
      ]}
      rules={[
        'Always pass a real name so initials and labels stay correct.',
        'Avatars are always round. Never square them.',
        'Groups of people use AvatarGroup, not a row of Avatars.',
      ]}
      prev={{ to: '/components/alert', label: 'Alert' }}
      next={{ to: '/components/avatar-group', label: 'AvatarGroup' }}
    />
  );
}
