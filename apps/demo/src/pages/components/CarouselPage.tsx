import { Badge, Carousel } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

export function CarouselPage() {
  return (
    <ComponentPage
      title="Carousel"
      desc="Sliding panels with dots and arrows. Autoplay pauses on hover, focus, and reduced motion."
      badges={
        <>
          <Badge tone="navy">dots + arrows</Badge>
          <Badge tone="grey">autoplay ready</Badge>
        </>
      }
      importCode={`import { Carousel } from '@omega-os/ui';

<Carousel autoplay={5000}>
  <div>Slide one</div>
  <div>Slide two</div>
</Carousel>`}
      preview={
        <Carousel autoplay={5000}>
          <div className="grid place-items-center bg-navy-bg p-10 text-lg font-bold text-navy-text">Slide one</div>
          <div className="grid place-items-center bg-maroon-bg p-10 text-lg font-bold text-danger">Slide two</div>
        </Carousel>
      }
      variants={[
        {
          id: 'manual',
          title: 'Manual',
          desc: 'No autoplay prop means the visitor drives. Dots and arrows always show for two or more slides.',
          code: `<Carousel>
  <div>Slide one</div>
  <div>Slide two</div>
</Carousel>`,
          demo: (
            <Carousel>
              <div className="grid w-full place-items-center bg-navy-bg p-8 text-base font-bold text-navy-text">Slide one</div>
              <div className="grid w-full place-items-center bg-ot-surface-2 p-8 text-base font-bold text-ot-muted">Slide two</div>
            </Carousel>
          ),
        },
        {
          id: 'autoplay',
          title: 'Autoplay',
          desc: 'Milliseconds between slides. Hover or focus pauses it, reduced motion disables it.',
          code: `<Carousel autoplay={5000}>…</Carousel>`,
          demo: <span className="text-sm text-ot-muted">The preview above advances every 5 seconds until hovered.</span>,
        },
      ]}
      propsRows={[
        { name: 'children', type: 'ReactNode[]', defaultValue: '-', desc: 'Slides. Each fills the viewport width.' },
        { name: 'autoplay', type: 'number', defaultValue: '-', desc: 'Auto-advance interval in ms. Off by default.' },
        { name: 'label', type: 'string', defaultValue: "'Carousel'", desc: 'Accessible name for the region.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the carousel.' },
      ]}
      rules={[
        'Slides carry one idea each. Never put forms inside autoplay slides.',
        'Autoplay is decoration-safe only. Reduced motion always wins.',
        'Dots show position. Arrows move one slide at a time.',
      ]}
      a11y={[
        'Region labeled with slide positions.',
        'Autoplay pauses on hover and focus. Reduced motion disables it.',
        'Dots and arrows both drive.',
      ]}
      prev={{ to: '/components/switch', label: 'Switch' }}
      next={{ to: '/components/charts/bar', label: 'Bar' }}
    />
  );
}
