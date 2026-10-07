import { Badge, Skeleton } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

export function SkeletonPage() {
  return (
    <ComponentPage
      title="Skeleton"
      desc="Pulsing placeholder that holds layout while content loads. Tables can override per column."
      badges={
        <>
          <Badge tone="navy">pulse</Badge>
          <Badge tone="grey">layout holder</Badge>
        </>
      }
      importCode={`import { Skeleton } from '@omega-os/ui';

<div className="grid gap-2">
  <Skeleton className="h-5 w-32" />
  <Skeleton className="h-5 w-20" />
</div>`}
      preview={
        <div className="flex flex-wrap items-center gap-2.5">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      }
      variants={[
        {
          id: 'sizes',
          title: 'Sizes',
          desc: 'Width and height props size boxes without classes. Classes shape the rest.',
          code: `<Skeleton width={128} height={20} />
<Skeleton className="h-10 w-10 rounded-full" />`,
          demo: (
            <div className="flex w-full flex-wrap items-center gap-2.5">
              <Skeleton width={128} height={20} />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          ),
        },
        {
          id: 'table',
          title: 'In tables',
          desc: 'Table columns accept a skeleton override so loading rows match real rows.',
          code: `columns={[{ key: 'actions', header: 'Actions', skeleton: <Skeleton className="h-5 w-5" /> }]}`,
          demo: <span className="text-sm text-ot-muted">Toggle skeletons on the Table page.</span>,
        },
      ]}
      propsRows={[
        { name: 'width', type: 'string | number', defaultValue: '-', desc: 'Box width.' },
        { name: 'height', type: 'string | number', defaultValue: '-', desc: 'Box height.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Shape and size via classes.' },
      ]}
      rules={[
        'Skeletons mirror the shape of incoming content.',
        'Pulse only under motion-safe. Reduced motion stays still.',
        'Skeletons are aria-hidden. Screen readers wait for real content.',
      ]}
      prev={{ to: '/components/breadcrumbs', label: 'Breadcrumbs' }}
      next={{ to: '/components/slider', label: 'Slider' }}
    />
  );
}
