import { useState } from 'react';
import { Badge, TreeView } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

const NODES = [
  {
    id: 'src',
    label: 'src',
    children: [
      { id: 'app', label: 'App.tsx' },
      {
        id: 'components',
        label: 'components',
        children: [{ id: 'btn', label: 'Button.tsx' }],
      },
    ],
  },
];

export function TreeViewPage() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <ComponentPage
      title="TreeView"
      desc="Accessible file-style tree with expand, select, and arrow-key support."
      badges={
        <>
          <Badge tone="navy">tree roles</Badge>
          <Badge tone="grey">arrow keys</Badge>
        </>
      }
      importCode={`import { TreeView } from '@omega-os/ui';

<TreeView
  selectedId={selected}
  onSelect={setSelected}
  defaultExpanded={['src']}
  nodes={[
    {
      id: 'src',
      label: 'src',
      children: [{ id: 'app', label: 'App.tsx' }],
    },
  ]}
/>`}
      preview={<TreeView selectedId={selected} onSelect={setSelected} defaultExpanded={['src']} nodes={NODES} />}
      variants={[
        {
          id: 'expanded',
          title: 'Default expanded',
          desc: 'Ids in defaultExpanded start open.',
          code: `<TreeView defaultExpanded={['src', 'components']} nodes={nodes} />`,
          demo: <TreeView defaultExpanded={['src', 'components']} nodes={NODES} />,
        },
        {
          id: 'select',
          title: 'Selection',
          desc: 'selectedId highlights one node. onSelect reports picks.',
          code: `<TreeView selectedId={selected} onSelect={setSelected} nodes={nodes} />`,
          demo: (
            <span className="text-sm text-ot-muted">
              Click a node in the preview above{selected ? `. Selected: ${selected}` : ''}.
            </span>
          ),
        },
      ]}
      propsRows={[
        { name: 'nodes', type: 'TreeNodeDef[]', defaultValue: '-', desc: 'Nodes: id, label, optional icon and children.' },
        { name: 'selectedId', type: 'string | null', defaultValue: '-', desc: 'Highlighted node.' },
        { name: 'defaultExpanded', type: 'string[]', defaultValue: '[]', desc: 'Ids that start open.' },
        { name: 'onSelect', type: '(id) => void', defaultValue: '-', desc: 'Fires on node pick.' },
        { name: 'label', type: 'string', defaultValue: "'Tree'", desc: 'Accessible name for the tree.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the tree.' },
      ]}
      rules={[
        'Labels name files and folders plainly. Icons stay 15px.',
        'Selected nodes tint navy-bg. Expanded chevrons rotate.',
        'Arrow keys walk the tree. Right opens, Left closes.',
      ]}
      prev={{ to: '/components/tooltip', label: 'Tooltip' }}
      next={{ to: '/showcase', label: 'Showcase' }}
    />
  );
}
