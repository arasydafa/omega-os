import { Badge } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';
import { IconsDemo } from '../showcase-sections.js';

export function IconsPage() {
  return (
    <ComponentPage
      title="Icons"
      desc="Lucide only, one icon per meaning. The full approved set lives here and in docs/ICONS.md."
      badges={
        <>
          <Badge tone="navy">lucide-react</Badge>
          <Badge tone="grey">no emoji</Badge>
        </>
      }
      importCode={`import { OMEGA_ICONS, iconComponentName } from '@omega-os/ui';
import { Trash2 } from 'lucide-react';

<Trash2 size={16} />`}
      preview={<IconsDemo />}
      previewNote="Every approved icon with its kebab-case name."
      variants={[
        {
          id: 'sizes',
          title: 'Sizes',
          desc: '16px in buttons, 18px in headings, 12px in badges. The rule keeps rhythm steady.',
          code: `<Button icon={<Plus size={16} />}>Add</Button>
<Badge tone="success" icon={<Check size={12} />}>Active</Badge>`,
          demo: <span className="text-sm text-ot-muted">Match the icon size to its container.</span>,
        },
        {
          id: 'meaning',
          title: 'One meaning',
          desc: 'trash-2 means delete everywhere. triangle-alert means warning. octagon-x means error.',
          code: `// delete -> trash-2 + maroon
// warning -> triangle-alert + yellow
// error -> octagon-x + maroon`,
          demo: <span className="text-sm text-ot-muted">Reuse the same icon for the same meaning on every page.</span>,
        },
      ]}
      propsRows={[
        { name: 'OMEGA_ICONS', type: 'string[]', defaultValue: '-', desc: 'Canonical kebab-case icon names.' },
        { name: 'iconComponentName', type: '(name) => string', defaultValue: '-', desc: 'Maps kebab-case to the lucide export.' },
        { name: 'size', type: 'number', defaultValue: '24', desc: 'Lucide size prop. Omega uses 12, 16, or 18.' },
      ]}
      propsNote="Icons come from lucide-react. The library never renders emoji."
      rules={[
        'Icons come from lucide-react only. No emoji in UI.',
        'One icon keeps one meaning across the whole product.',
        'Destructive uses trash-2, warning uses triangle-alert, error uses octagon-x.',
      ]}
      prev={{ to: '/foundations/radius', label: 'Radius' }}
      next={{ to: '/components/accordion', label: 'Accordion' }}
    />
  );
}
