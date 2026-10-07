import { useState } from 'react';
import { Badge, Button, Modal } from '@omega-os/ui';
import { Trash2 } from 'lucide-react';
import { ComponentPage } from '../ComponentPage.js';

function ModalPreview() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="danger" icon={<Trash2 size={16} />} onClick={() => setOpen(true)}>
        Open modal
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Delete tool?"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" icon={<Trash2 size={16} />} onClick={() => setOpen(false)}>
              Delete
            </Button>
          </>
        }
      >
        This action is permanent and cannot be undone.
      </Modal>
    </>
  );
}

export function ModalPage() {
  return (
    <ComponentPage
      title="Modal"
      desc="Blocking dialog with overlay, focus trap, ESC and overlay-click close, and an exit animation before unmount. Radius 16."
      badges={
        <>
          <Badge tone="navy">portal</Badge>
          <Badge tone="grey">sm · md · lg · xl</Badge>
          <Badge tone="danger">destructive confirm</Badge>
        </>
      }
      importCode={`import { Modal, Button } from '@omega-os/ui';
import { Trash2 } from 'lucide-react';

const [open, setOpen] = useState(false);

<Button variant="danger" icon={<Trash2 size={16} />} onClick={() => setOpen(true)}>
  Open modal
</Button>
<Modal open={open} onClose={() => setOpen(false)} title="Delete tool?">
  This action is permanent and cannot be undone.
</Modal>`}
      preview={<ModalPreview />}
      previewNote="Focus moves into the dialog, Tab cycles inside, ESC or overlay click closes."
      variants={[
        {
          id: 'sizes',
          title: 'Sizes',
          desc: 'sm 380px, md 420px default, lg 640px, xl 896px. Pick the smallest size that fits the content.',
          code: `<Modal size="sm" … />  {/* 380px */}
<Modal size="md" … />  {/* 420px, default */}
<Modal size="lg" … />  {/* 640px */}
<Modal size="xl" … />  {/* 896px */}`,
          demo: <span className="text-sm text-ot-muted">Try the size selector in Showcase → Overlays.</span>,
        },
        {
          id: 'footer',
          title: 'Footer actions',
          desc: 'Right-aligned actions: safe choice (secondary) left, destructive (danger) right.',
          code: `<Modal
  title="Delete tool?"
  footer={
    <>
      <Button variant="secondary" size="sm" onClick={close}>Cancel</Button>
      <Button variant="danger" size="sm" icon={<Trash2 size={16} />}>Delete</Button>
    </>
  }
>
  This action is permanent and cannot be undone.
</Modal>`,
          demo: <span className="text-sm text-ot-muted">Cancel left, Delete right — as in the preview above.</span>,
        },
        {
          id: 'vs-popup',
          title: 'Modal vs popup',
          desc: 'Modal blocks the screen with an overlay. For small menus near a trigger, use Dropdown instead.',
          code: `// Blocking confirm → Modal
// Context menu near trigger → Dropdown`,
          demo: <span className="text-sm text-ot-muted">Rule of thumb: irreversible → Modal, reversible menu → Dropdown.</span>,
        },
      ]}
      propsRows={[
        { name: 'open', type: 'boolean', defaultValue: '—', desc: 'Controls visibility (exit animation plays on close).' },
        { name: 'onClose', type: '() => void', defaultValue: '—', desc: 'Fired on ESC, overlay click, and the close button.' },
        { name: 'title', type: 'ReactNode', defaultValue: '—', desc: 'Dialog title, announced to assistive tech.' },
        { name: 'children', type: 'ReactNode', defaultValue: '—', desc: 'Body copy (muted 14px recommended).' },
        { name: 'footer', type: 'ReactNode', defaultValue: '—', desc: 'Right-aligned action row.' },
        { name: 'icon', type: 'ReactNode', defaultValue: '—', desc: 'Leading title icon, e.g. trash-2 for destructive confirms.' },
        { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", defaultValue: "'md'", desc: 'Panel width: 380 / 420 / 640 / 896px.' },
      ]}
      rules={[
        'Destructive confirms use maroon + trash-2, with Cancel (secondary) beside Delete.',
        'Modal blocks with an overlay (radius 16); popups near a trigger are Dropdown (radius 12).',
        'Focus trap + ESC + overlay click follow the same contract as Drawer.',
      ]}
      prev={{ to: '/components/table', label: 'Table' }}
      next={{ to: '/showcase', label: 'Showcase' }}
    />
  );
}
