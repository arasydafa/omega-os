import { Badge, Markdown } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

export function MarkdownPage() {
  return (
    <ComponentPage
      title="Markdown"
      desc="GitHub-flavored markdown rendered in Omega type, with code blocks that copy."
      badges={
        <>
          <Badge tone="navy">GFM</Badge>
          <Badge tone="grey">copyable code</Badge>
        </>
      }
      importCode={`import { Markdown } from '@omega-os/ui';

<Markdown source={'## Notes\\n\\nUpdate the **checklist** first.'} />`}
      preview={
        <Markdown
          source={`## Project notes

Update the **checklist** and read the [guide](https://example.com).

| Version | Status |
|---|---|
| 1.0.0 | Shipped |
| 1.1.0 | Next |
`}
        />
      }
      variants={[
        {
          id: 'tables',
          title: 'Tables',
          desc: 'GFM tables render with Omega borders and muted headers.',
          code: `<Markdown source={'| A | B |\\n|---|---|\\n| 1 | 2 |'} />`,
          demo: <Markdown source={'| A | B |\n|---|---|\n| 1 | 2 |'} />,
        },
        {
          id: 'code',
          title: 'Fenced code',
          desc: 'Fences render as copyable blocks with a language label.',
          code: '<Markdown source={"```js\\nrun()\\n```"} />',
          demo: <Markdown source={'```js\nrun()\n```'} />,
        },
      ]}
      propsRows={[
        { name: 'source', type: 'string', defaultValue: '-', desc: 'Markdown text with GFM tables and fences.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the wrapper.' },
      ]}
      rules={[
        'Docs content uses Markdown. App chrome uses components.',
        'Links underline on hover so they read as links.',
        'Code fences always name a language when one fits.',
      ]}
      prev={{ to: '/components/log-viewer', label: 'LogViewer' }}
      next={{ to: '/components/modal', label: 'Modal' }}
    />
  );
}
