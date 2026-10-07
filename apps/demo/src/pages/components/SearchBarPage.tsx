import { useState } from 'react';
import { Badge, SearchBar, useToast } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

export function SearchBarPage() {
  const toast = useToast();
  const [query, setQuery] = useState('');
  return (
    <ComponentPage
      title="SearchBar"
      desc="Search field with icon, clear button, shortcut hint, and Escape to clear."
      badges={
        <>
          <Badge tone="navy">clear button</Badge>
          <Badge tone="grey">shortcut hint</Badge>
        </>
      }
      importCode={`import { SearchBar } from '@omega-os/ui';

<SearchBar
  shortcut="Ctrl K"
  onChange={setQuery}
  onClear={() => toast.show('info', 'Search cleared.')}
/>`}
      preview={
        <div className="max-w-sm">
          <SearchBar value={query} onChange={setQuery} shortcut="Ctrl K" onClear={() => toast.show('info', 'Search cleared.')} />
          <p className="mt-2 text-sm text-ot-muted">Query: {query || 'empty'}</p>
        </div>
      }
      variants={[
        {
          id: 'shortcut',
          title: 'Shortcut hint',
          desc: 'Shows when the field is empty. Hides once typing starts.',
          code: `<SearchBar shortcut="Ctrl K" />`,
          demo: (
            <div className="w-full max-w-sm">
              <SearchBar shortcut="Ctrl K" />
            </div>
          ),
        },
        {
          id: 'clear',
          title: 'Clear',
          desc: 'The clear button appears with text. Escape clears too.',
          code: `<SearchBar defaultValue="report" onClear={clear} />`,
          demo: (
            <div className="w-full max-w-sm">
              <SearchBar defaultValue="report" onClear={() => toast.show('info', 'Search cleared.')} />
            </div>
          ),
        },
      ]}
      propsRows={[
        { name: 'value / defaultValue', type: 'string', defaultValue: "''", desc: 'Controlled or uncontrolled text.' },
        { name: 'onChange', type: '(value) => void', defaultValue: '-', desc: 'Fires with the next text.' },
        { name: 'onClear', type: '() => void', defaultValue: '-', desc: 'Fires on clear button and Escape.' },
        { name: 'shortcut', type: 'ReactNode', defaultValue: '-', desc: 'Hint chip shown when empty, e.g. Ctrl K.' },
        { name: 'label', type: 'string', defaultValue: "'Search'", desc: 'Accessible label, visually hidden.' },
        { name: 'placeholder', type: 'string', defaultValue: "'Search…'", desc: 'Empty hint.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the field.' },
      ]}
      rules={[
        'Escape clears the field. Never trap the user in a query.',
        'Shortcut hints match the real shortcut exactly.',
        'Filtering lists debounce input. The field itself stays instant.',
      ]}
      prev={{ to: '/components/progress', label: 'Progress' }}
      next={{ to: '/components/sidebar', label: 'Sidebar' }}
    />
  );
}
