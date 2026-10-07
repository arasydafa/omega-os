import { Badge, FileUpload, useToast } from '@omega-os/ui';
import { ComponentPage } from '../ComponentPage.js';

export function FileUploadPage() {
  const toast = useToast();
  return (
    <ComponentPage
      title="FileUpload"
      desc="Dropzone plus browse button with type, size, and count validation and a removable file list."
      badges={
        <>
          <Badge tone="navy">dropzone</Badge>
          <Badge tone="grey">5 MB default</Badge>
        </>
      }
      importCode={`import { FileUpload } from '@omega-os/ui';

<FileUpload
  label="Attachments"
  helper="PNG or JPG up to 5 MB."
  accept=".png,.jpg,image/png,image/jpeg"
  onFiles={(files) => upload(files)}
/>`}
      preview={
        <FileUpload
          label="Attachments"
          helper="PNG or JPG up to 5 MB."
          accept=".png,.jpg,image/png,image/jpeg"
          onFiles={(files) => toast.show('success', `${files.length} file(s) ready to upload.`)}
        />
      }
      variants={[
        {
          id: 'limits',
          title: 'Limits',
          desc: 'maxSize guards bytes per file. maxFiles caps the list. Extras reject with a reason.',
          code: `<FileUpload maxSize={5 * 1024 * 1024} maxFiles={3} onFiles={upload} />`,
          demo: (
            <FileUpload
              label="Capped upload"
              helper="Up to 3 files."
              maxFiles={3}
              onFiles={(files) => toast.show('success', `${files.length} file(s) ready to upload.`)}
            />
          ),
        },
      ]}
      propsRows={[
        { name: 'accept', type: 'string', defaultValue: '-', desc: 'Input accept string, e.g. image/png or .png.' },
        { name: 'multiple', type: 'boolean', defaultValue: 'true', desc: 'Allow more than one file.' },
        { name: 'maxSize', type: 'number', defaultValue: '5 MB', desc: 'Max bytes per file.' },
        { name: 'maxFiles', type: 'number', defaultValue: '-', desc: 'Max files in the list. Extras reject.' },
        { name: 'label', type: 'string', defaultValue: "'Upload files'", desc: 'Field label.' },
        { name: 'helper', type: 'string', defaultValue: '-', desc: 'Format and limit hints.' },
        { name: 'disabled', type: 'boolean', defaultValue: 'false', desc: 'Locked state.' },
        { name: 'onFiles', type: '(files) => void', defaultValue: '-', desc: 'Fires with valid files.' },
        { name: 'className', type: 'string', defaultValue: "''", desc: 'Extra classes on the zone.' },
      ]}
      rules={[
        'Helpers name formats and limits before the first drop.',
        'Rejected files explain why in plain words.',
        'Picked files stay removable until upload starts.',
      ]}
      a11y={[
        'Native file input with label and hints.',
        'Rejected files explain why in plain words.',
        'Picked files stay removable by keyboard.',
      ]}
      prev={{ to: '/components/empty-state', label: 'EmptyState' }}
      next={{ to: '/components/file-viewer', label: 'FileViewer' }}
    />
  );
}
