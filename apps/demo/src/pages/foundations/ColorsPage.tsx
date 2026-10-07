import { Badge } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

function Swatch({ bg, name, value }: { bg: string; name: string; value: string }) {
  return (
    <div className="overflow-hidden rounded-ot-sm border border-ot-border bg-ot-bg">
      <div className="h-14" style={{ background: bg }} />
      <div className="px-2.5 py-2 text-xs">
        <b className="block">{name}</b>
        <span className="font-mono text-[11px] text-ot-muted">{value}</span>
      </div>
    </div>
  );
}

export function ColorsPage() {
  return (
    <ComponentPage
      title="Colors"
      desc="Navy leads, maroon deletes, status colors inform. Surfaces follow the theme toggle."
      badges={
        <>
          <Badge tone="navy">navy primary</Badge>
          <Badge tone="danger">maroon danger</Badge>
          <Badge tone="info">status set</Badge>
        </>
      }
      importCode={`<button className="bg-navy text-white">Primary</button>
<div className="bg-navy-bg text-navy-text">Tinted panel</div>
<div className="bg-ot-surface border border-ot-border">Card</div>`}
      preview={
        <div className="grid gap-3">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Swatch bg="#1E3A5F" name="Navy primary" value="#1E3A5F" />
            <Swatch bg="#162C4A" name="Navy hover" value="#162C4A" />
            <Swatch bg="#7B1E26" name="Maroon danger" value="#7B1E26" />
            <Swatch bg="#2B2F36" name="Dark grey" value="#2B2F36" />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Swatch bg="var(--ot-info)" name="Info blue" value="light #1D4ED8" />
            <Swatch bg="var(--ot-warning)" name="Warning yellow" value="light #B45309" />
            <Swatch bg="var(--ot-success)" name="Success green" value="light #15803D" />
            <Swatch bg="var(--ot-danger)" name="Danger maroon" value="#7B1E26" />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Swatch bg="var(--ot-bg)" name="bg" value="page" />
            <Swatch bg="var(--ot-surface)" name="surface" value="card" />
            <Swatch bg="var(--ot-surface-2)" name="surface-2" value="hover" />
          </div>
        </div>
      }
      variants={[
        {
          id: 'brand',
          title: 'Brand',
          desc: 'Navy for primary actions and active states. Maroon for destructive only.',
          code: `<button className="bg-navy text-white">Save</button>
<button className="bg-maroon text-white">Delete</button>`,
          demo: <span className="text-sm text-ot-muted">Navy saves, maroon deletes. Nothing else uses maroon.</span>,
        },
        {
          id: 'status',
          title: 'Status',
          desc: 'Shared by alerts, toasts, and badges. One tone per meaning.',
          code: `<div className="bg-info-bg text-info">Info</div>
<div className="bg-warning-bg text-warning">Warning</div>
<div className="bg-success-bg text-success">Success</div>
<div className="bg-danger-bg text-danger">Error</div>`,
          demo: <span className="text-sm text-ot-muted">Info is blue, warning is yellow, success is green, error is maroon.</span>,
        },
        {
          id: 'surfaces',
          title: 'Surfaces',
          desc: 'Theme-aware tokens. Toggle dark mode and watch them flip.',
          code: `<div className="bg-ot-bg text-ot-text">Page</div>
<div className="bg-ot-surface border-ot-border">Card</div>`,
          demo: <span className="text-sm text-ot-muted">bg for pages, surface for cards, surface-2 for hover fills.</span>,
        },
      ]}
      propsRows={[
        { name: '--ot-navy', type: '#1E3A5F', defaultValue: '-', desc: 'Primary buttons, active nav, links, focus.' },
        { name: '--ot-maroon', type: '#7B1E26', defaultValue: '-', desc: 'Destructive actions and errors only.' },
        { name: '--ot-info', type: '#1D4ED8', defaultValue: '-', desc: 'Neutral updates and tips.' },
        { name: '--ot-warning', type: '#B45309', defaultValue: '-', desc: 'Caution and unsaved changes.' },
        { name: '--ot-success', type: '#15803D', defaultValue: '-', desc: 'Saved, deployed, completed.' },
        { name: '--ot-bg / surface', type: 'theme-aware', defaultValue: '-', desc: 'Page and card backgrounds.' },
      ]}
      propsNote="Color tokens live in tokens.css. Values shown are light mode."
      rules={[
        'Navy text sits on navy-bg tint through navy-text. Never raw navy on tint.',
        'Maroon is destructive-only. Warning stays yellow, errors stay maroon.',
        'Surfaces come from tokens so dark mode works everywhere.',
      ]}
      prev={{ to: '/foundations/typography', label: 'Typography' }}
      next={{ to: '/foundations/radius', label: 'Radius' }}
    />
  );
}
