import { Badge } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

const RADII = [
  { r: 8, label: '8', use: 'inputs, badges' },
  { r: 12, label: '12', use: 'buttons, alerts' },
  { r: 16, label: '16', use: 'cards, modals' },
  { r: 20, label: '20', use: 'large panels' },
];

export function RadiusPage() {
  return (
    <ComponentPage
      title="Radius"
      desc="No sharp corners. Each size has one job, from inputs to pills."
      badges={
        <>
          <Badge tone="navy">8 / 12 / 16 / 20</Badge>
          <Badge tone="grey">full for pills</Badge>
        </>
      }
      importCode={`<input className="rounded-ot-sm" />
<button className="rounded-ot-md">Save</button>
<div className="rounded-ot-lg">Card</div>
<span className="rounded-full">Pill</span>`}
      preview={
        <div className="flex flex-wrap gap-3">
          {RADII.map((d) => (
            <span
              key={d.label}
              className="grid h-[72px] w-[120px] place-items-center bg-navy text-xs font-bold text-white"
              style={{ borderRadius: d.r }}
            >
              {d.label} · {d.use}
            </span>
          ))}
          <span className="grid h-[72px] w-[140px] place-items-center rounded-full bg-navy text-xs font-bold text-white">
            full · pills, avatars
          </span>
        </div>
      }
      variants={[
        {
          id: 'small',
          title: 'Small radii',
          desc: '8 for inputs and badges. 12 for buttons and alerts.',
          code: `<input className="rounded-ot-sm" />
<button className="rounded-ot-md">Save</button>`,
          demo: <span className="text-sm text-ot-muted">Fields feel tight, buttons feel soft.</span>,
        },
        {
          id: 'large',
          title: 'Large radii',
          desc: '16 for cards and modals. 20 for large panels. Full for pills and avatars.',
          code: `<div className="rounded-ot-lg">Card</div>
<span className="rounded-full">Pill</span>`,
          demo: <span className="text-sm text-ot-muted">Panels float, pills read as tags.</span>,
        },
      ]}
      propsRows={[
        { name: 'rounded-ot-sm', type: '8px', defaultValue: '-', desc: 'Inputs, badges, thumbs.' },
        { name: 'rounded-ot-md', type: '12px', defaultValue: '-', desc: 'Buttons, alerts, fields.' },
        { name: 'rounded-ot-lg', type: '16px', defaultValue: '-', desc: 'Cards, modals, drawers.' },
        { name: 'rounded-ot-xl', type: '20px', defaultValue: '-', desc: 'Large panels.' },
        { name: 'rounded-full', type: 'pill', defaultValue: '-', desc: 'Badges, pills, avatars.' },
      ]}
      propsNote="Radius tokens come from the Tailwind preset. No sharp corners anywhere."
      rules={[
        'Pick the radius by element type, not by taste.',
        'Pills and avatars always use full.',
        'Never use rounded-none.',
      ]}
      prev={{ to: '/foundations/colors', label: 'Colors' }}
      next={{ to: '/foundations/icons', label: 'Icons' }}
    />
  );
}
