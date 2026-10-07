import { Badge, CodeBlock } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

export function CodeBlockPage() {
  return (
    <ComponentPage
      title="CodeBlock"
      desc="Bare snippet with a language badge and copy button. For files with names and line numbers, use FileViewer."
      badges={
        <>
          <Badge tone="navy">snippet</Badge>
          <Badge tone="grey">copy included</Badge>
        </>
      }
      importCode={`import { CodeBlock } from '@omega-os/ui';

<CodeBlock language="tsx" code={'<Button>Save</Button>'} />`}
      preview={
        <CodeBlock
          language="tsx"
          code={`<Button icon={<Plus size={16} />}>Save</Button>`}
        />
      }
      variants={[
        {
          id: 'language',
          title: 'Language badge',
          desc: 'Names the snippet so readers know the context at a glance.',
          code: `<CodeBlock language="css" code={'.card { border-radius: 16px }'} />`,
          demo: <CodeBlock language="css" code={'.card { border-radius: 16px }'} />,
        },
        {
          id: 'bare',
          title: 'Bare block',
          desc: 'Omit language for a plain block labeled snippet.',
          code: `<CodeBlock code={'plain text'} />`,
          demo: <CodeBlock code={'plain text'} />,
        },
        {
          id: 'tall',
          title: 'Max height',
          desc: 'Long snippets scroll past maxHeight instead of stretching the page.',
          code: `<CodeBlock language="log" maxHeight={160} code={longText} />`,
          demo: <CodeBlock language="log" maxHeight={120} code={Array.from({ length: 20 }, (_, i) => `line ${i + 1}`).join('\n')} />,
        },
      ]}
      propsRows={[
        { name: 'code', type: 'string', defaultValue: '-', desc: 'Snippet text. Trailing newline is trimmed.' },
        { name: 'language', type: 'string', defaultValue: '-', desc: 'Badge label, e.g. tsx or css. Omit for bare.' },
        { name: 'maxHeight', type: 'string | number', defaultValue: '320', desc: 'Body height before scrolling.' },
        { name: 'onCopy', type: '() => void', defaultValue: '-', desc: 'Fires after copy, e.g. for a toast.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the block.' },
      ]}
      rules={[
        'Snippets use mono 13px with comfortable line height.',
        'Files with names and line numbers use FileViewer, not CodeBlock.',
        'Copy button always works, even where clipboard access fails.',
      ]}
      prev={{ to: '/components/carousel', label: 'Carousel' }}
      next={{ to: '/components/combobox', label: 'Combobox' }}
    />
  );
}
