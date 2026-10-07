import { useState } from 'react';
import { Badge, GraphViewer } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

const NODES = [
  { id: 'app', label: 'App', sub: 'entrypoint', group: 'frontend' },
  { id: 'auth', label: 'Auth', sub: 'login flow', group: 'backend' },
  { id: 'api', label: 'API', sub: 'rest', group: 'backend' },
  { id: 'db', label: 'Database', sub: 'postgres', group: 'data' },
  { id: 'cache', label: 'Cache', sub: 'redis', group: 'data' },
];

const EDGES: Array<[string, string]> = [
  ['app', 'auth'],
  ['auth', 'api'],
  ['api', 'db'],
  ['api', 'cache'],
];

export function GraphViewerPage() {
  const [selected, setSelected] = useState<string | null>('auth');
  return (
    <ComponentPage
      title="GraphViewer"
      desc="Layered node graph with pan, zoom, selection, and a toggleable group legend. Zoom traps the wheel so the page never scrolls away."
      badges={
        <>
          <Badge tone="navy">pan + zoom</Badge>
          <Badge tone="grey">legend toggle</Badge>
        </>
      }
      importCode={`import { GraphViewer } from '@omega-os/ui';

<GraphViewer
  nodes={[
    { id: 'app', label: 'App', group: 'frontend' },
    { id: 'api', label: 'API', group: 'backend' },
  ]}
  edges={[['app', 'api']]}
  selectedId={selected}
  onSelect={setSelected}
/>`}
      preview={<GraphViewer selectedId={selected} onSelect={setSelected} nodes={NODES} edges={EDGES} />}
      variants={[
        {
          id: 'groups',
          title: 'Groups and legend',
          desc: 'Nodes with the same group share a color and a legend toggle. Toggling never moves survivors.',
          code: `nodes={[{ id: 'db', label: 'Database', group: 'data' }]}`,
          demo: <span className="text-sm text-ot-muted">Toggle a group in the legend of the preview above.</span>,
        },
        {
          id: 'height',
          title: 'Height',
          desc: 'Viewport height in px. Content scales to fit on reset.',
          code: `<GraphViewer height={320} nodes={nodes} edges={edges} />`,
          demo: <span className="text-sm text-ot-muted">The preview above uses the 320 default.</span>,
        },
      ]}
      propsRows={[
        { name: 'nodes', type: 'GraphNode[]', defaultValue: '-', desc: 'Nodes: id, label, optional sub and group.' },
        { name: 'edges', type: 'GraphEdge[]', defaultValue: '-', desc: 'Pairs of node ids.' },
        { name: 'selectedId', type: 'string | null', defaultValue: '-', desc: 'Highlighted node.' },
        { name: 'onSelect', type: '(id) => void', defaultValue: '-', desc: 'Fires on node click.' },
        { name: 'height', type: 'number', defaultValue: '320', desc: 'Viewport height in px.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the viewport.' },
      ]}
      rules={[
        'Labels stay short. Details belong in the sub line.',
        'Groups color nodes consistently with the legend.',
        'Zoom controls stay visible. Never hide the reset.',
      ]}
      a11y={[
        'Nodes expose labels plus sub lines.',
        'Selection pairs with highlight, not color alone.',
        'Zoom controls stay reachable by keyboard.',
      ]}
      prev={{ to: '/components/file-viewer', label: 'FileViewer' }}
      next={{ to: '/components/heatmap', label: 'Heatmap' }}
    />
  );
}
