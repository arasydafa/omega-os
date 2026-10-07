import { Badge, WordCloud, useToast } from '@omega-os/ui';
import { ComponentPage } from '../../ComponentPage.js';

const WORDS = [
  { text: 'design', weight: 24 },
  { text: 'system', weight: 16 },
  { text: 'tokens', weight: 14 },
  { text: 'react', weight: 10 },
  { text: 'docs', weight: 8 },
  { text: 'minimal', weight: 5 },
  { text: 'navy', weight: 3 },
];

export function WordCloudPage() {
  const toast = useToast();
  return (
    <ComponentPage
      title="WordCloud"
      desc="Deterministic word cloud. Weight sets size, same input always yields the same cloud."
      badges={
        <>
          <Badge tone="navy">deterministic</Badge>
          <Badge tone="grey">draggable</Badge>
        </>
      }
      importCode={`import { WordCloud } from '@omega-os/ui';

<WordCloud
  words={[
    { text: 'design', weight: 24 },
    { text: 'system', weight: 16 },
  ]}
  onSelect={(text) => show(text)}
/>`}
      preview={<WordCloud words={WORDS} onSelect={(text) => toast.show('info', `${text} selected.`)} />}
      variants={[
        {
          id: 'drag',
          title: 'Draggable',
          desc: 'Words drag with proximity repulsion and snap back on release.',
          code: `<WordCloud words={words} />`,
          demo: <span className="text-sm text-ot-muted">Drag a word in the preview above.</span>,
        },
      ]}
      propsRows={[
        { name: 'words', type: 'WordDatum[]', defaultValue: '-', desc: 'Words: text, weight, optional CSS color.' },
        { name: 'onSelect', type: '(text) => void', defaultValue: '-', desc: 'Fires on word click.' },
        { name: 'label', type: 'string', defaultValue: '-', desc: 'Accessible name for the cloud.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the figure.' },
      ]}
      rules={[
        'Weights reflect real counts, not decoration.',
        'Words stay readable at every size. Tilt stays slight.',
        'Clouds summarize. Tables carry exact numbers.',
      ]}
      prev={{ to: '/components/charts/treemap', label: 'Treemap' }}
      next={{ to: '/components/code-block', label: 'CodeBlock' }}
    />
  );
}
