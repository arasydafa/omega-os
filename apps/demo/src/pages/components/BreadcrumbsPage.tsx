import { Badge, Breadcrumbs } from '@omega-os/ui';
import { Home } from 'lucide-react';
import { ComponentPage } from '../ComponentPage.js';

export function BreadcrumbsPage() {
  return (
    <ComponentPage
      title="Breadcrumbs"
      desc="Hierarchy trail with chevron separators. The last crumb is the page, the rest are links."
      badges={
        <>
          <Badge tone="navy">aria-current</Badge>
          <Badge tone="grey">chevron split</Badge>
        </>
      }
      importCode={`import { Breadcrumbs } from '@omega-os/ui';
import { Home } from 'lucide-react';

<Breadcrumbs
  items={[
    { label: 'Home', icon: <Home size={14} />, onClick: goHome },
    { label: 'Projects' },
    { label: 'Website' },
  ]}
/>`}
      preview={
        <Breadcrumbs
          items={[{ label: 'Home', icon: <Home size={14} /> }, { label: 'Projects' }, { label: 'Website' }]}
        />
      }
      variants={[
        {
          id: 'links',
          title: 'Links',
          desc: 'Crumbs with href render anchors. Crumbs with onClick render buttons.',
          code: `items={[
  { label: 'Home', href: '#/' },
  { label: 'Projects', onClick: goProjects },
  { label: 'Website' },
]}`,
          demo: (
            <Breadcrumbs
              items={[
                { label: 'Home', href: '#/' },
                { label: 'Projects' },
                { label: 'Website' },
              ]}
            />
          ),
        },
        {
          id: 'icon',
          title: 'First icon',
          desc: 'A 14px leading icon marks the root crumb, usually home.',
          code: `{ label: 'Home', icon: <Home size={14} /> }`,
          demo: (
            <Breadcrumbs
              items={[{ label: 'Home', icon: <Home size={14} /> }, { label: 'Website' }]}
            />
          ),
        },
      ]}
      propsRows={[
        { name: 'items', type: 'Crumb[]', defaultValue: '-', desc: 'Crumbs: label, href, onClick, optional icon.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the nav.' },
      ]}
      rules={[
        'Trails mirror the real hierarchy. Never invent levels.',
        'The last crumb is plain text with aria-current. It never links.',
        'Root crumb carries the home icon. The rest carry text only.',
      ]}
      a11y={[
        'Nav landmark labeled Breadcrumb.',
        'Last crumb uses aria-current page and never links.',
        'Root carries the home icon plus text.',
      ]}
      prev={{ to: '/components/sidebar', label: 'Sidebar' }}
      next={{ to: '/components/skeleton', label: 'Skeleton' }}
    />
  );
}
