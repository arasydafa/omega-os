import { Badge, Image } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';
import { DEMO_PHOTO } from '../showcase-sections.js';

export function ImagePage() {
  return (
    <ComponentPage
      title="Image"
      desc="Aspect-locked image with skeleton loading and a labeled fallback when the file fails."
      badges={
        <>
          <Badge tone="navy">aspect lock</Badge>
          <Badge tone="grey">fallback ready</Badge>
        </>
      }
      importCode={`import { Image } from '@omega-os/ui';

<Image
  src="/covers/report.png"
  alt="Weekly report cover"
  aspect="16/10"
  fallbackLabel="Cover unavailable"
/>`}
      preview={
        <div className="grid gap-4 md:grid-cols-2">
          <Image src={DEMO_PHOTO} alt="Demo cover" aspect="16/10" />
          <Image
            src="https://example.com/missing.png"
            alt="Missing cover"
            aspect="16/10"
            fallbackLabel="Cover unavailable"
          />
        </div>
      }
      variants={[
        {
          id: 'aspect',
          title: 'Aspect',
          desc: 'CSS aspect-ratio string locks the frame while the file loads.',
          code: `<Image src={src} alt="Cover" aspect="16/10" />
<Image src={src} alt="Avatar" aspect="1/1" />`,
          demo: <Image src={DEMO_PHOTO} alt="Square cover" aspect="1/1" />,
        },
        {
          id: 'rounded',
          title: 'Rounded',
          desc: 'Follows the radius scale. Large panels default to lg.',
          code: `<Image src={src} alt="Cover" rounded="lg" />`,
          demo: <Image src={DEMO_PHOTO} alt="Rounded cover" aspect="16/10" rounded="md" />,
        },
        {
          id: 'fallback',
          title: 'Fallback',
          desc: 'Failed files show the fallback label instead of a broken icon.',
          code: `<Image src={bad} alt="Cover" fallbackLabel="Cover unavailable" />`,
          demo: (
            <Image
              src="https://example.com/missing.png"
              alt="Missing cover"
              aspect="16/10"
              fallbackLabel="Cover unavailable"
            />
          ),
        },
      ]}
      propsRows={[
        { name: 'src', type: 'string', defaultValue: '-', desc: 'Image URL.' },
        { name: 'alt', type: 'string', defaultValue: '-', desc: 'Accessible name. Always meaningful.' },
        { name: 'aspect', type: 'string', defaultValue: "'16/10'", desc: 'CSS aspect-ratio, e.g. 16/10 or 1/1.' },
        { name: 'rounded', type: "'sm' | 'md' | 'lg' | 'xl'", defaultValue: "'lg'", desc: 'Corner radius from the scale.' },
        { name: 'fallbackLabel', type: 'ReactNode', defaultValue: '-', desc: 'Shown when the file fails to load.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the frame.' },
      ]}
      propsNote="ImageProps extends native img attributes, which pass through to the inner img."
      rules={[
        'Alt text describes the image. Decorative images still get empty alt through meaningful use.',
        'Frames lock aspect so loading never shifts the layout.',
        'Failures show a label. Never a broken image icon.',
      ]}
      a11y={[
        'Alt text stays required and meaningful.',
        'Aspect lock stops layout shift while loading.',
        'Failures announce the fallback label.',
      ]}
      prev={{ to: '/components/heatmap', label: 'Heatmap' }}
      next={{ to: '/components/input', label: 'Input' }}
    />
  );
}
