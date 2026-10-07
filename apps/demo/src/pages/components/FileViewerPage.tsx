import { Badge, FileViewer, useToast } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

const SAMPLE = `export function toggleThemeReveal(x: number, y: number, apply: () => void): void {
  document.documentElement.classList.toggle('dark');
  apply();
}`;

export function FileViewerPage() {
  const toast = useToast();
  return (
    <ComponentPage
      title="FileViewer"
      desc="Named code file with line numbers, a language badge, and copy. Bare snippets use CodeBlock."
      badges={
        <>
          <Badge tone="navy">line numbers</Badge>
          <Badge tone="grey">copy included</Badge>
        </>
      }
      importCode={`import { FileViewer } from '@omega-os/ui';

<FileViewer
  filename="theme.ts"
  language="ts"
  maxHeight={220}
  code={source}
/>`}
      preview={
        <FileViewer
          filename="theme.ts"
          language="ts"
          maxHeight={220}
          onCopy={() => toast.show('success', 'Code copied to clipboard.')}
          code={SAMPLE}
        />
      }
      variants={[
        {
          id: 'language',
          title: 'Language badge',
          desc: 'Names the file type beside the filename.',
          code: `<FileViewer filename="notes.md" language="md" code={notes} />`,
          demo: <FileViewer filename="notes.md" language="md" maxHeight={120} code={'# Notes\n\n- Keep it short.'} />,
        },
        {
          id: 'height',
          title: 'Max height',
          desc: 'Long files scroll inside the panel instead of stretching the page.',
          code: `<FileViewer filename="app.tsx" maxHeight={220} code={source} />`,
          demo: <span className="text-sm text-ot-muted">The preview above scrolls past 220px.</span>,
        },
      ]}
      propsRows={[
        { name: 'filename', type: 'string', defaultValue: '-', desc: 'Name shown in the header.' },
        { name: 'language', type: 'string', defaultValue: '-', desc: 'Badge label, e.g. ts or md.' },
        { name: 'code', type: 'string', defaultValue: '-', desc: 'File text. Split into numbered lines.' },
        { name: 'maxHeight', type: 'string | number', defaultValue: '320', desc: 'Body height before scrolling.' },
        { name: 'onCopy', type: '() => void', defaultValue: '-', desc: 'Fires after copy, e.g. for a toast.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the panel.' },
      ]}
      rules={[
        'Filenames are real and mono. Never placeholder names.',
        'Line numbers are muted and unselectable.',
        'Rows highlight on hover to aid reading long files.',
      ]}
      prev={{ to: '/components/file-upload', label: 'FileUpload' }}
      next={{ to: '/components/graph-viewer', label: 'GraphViewer' }}
    />
  );
}
