import { useId, useRef, useState } from 'react';
import { FileText, UploadCloud, X } from 'lucide-react';

export interface UploadItem {
  id: number;
  file: File;
  error?: string;
}

export interface FileUploadProps {
  /** input accept string, e.g. "image/png,image/jpeg" or ".png,.jpg". */
  accept?: string;
  multiple?: boolean;
  /** Max bytes per file. Defaults to 5 MB. */
  maxSize?: number;
  /** Max files in the list. Extra files are rejected. */
  maxFiles?: number;
  label?: string;
  helper?: string;
  disabled?: boolean;
  onFiles?: (files: File[]) => void;
  className?: string;
}

const DEFAULT_MAX_SIZE = 5 * 1024 * 1024;

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${parseFloat((bytes / 1024).toFixed(1))} KB`;
  return `${parseFloat((bytes / (1024 * 1024)).toFixed(1))} MB`;
}

function accepted(file: File, accept?: string): boolean {
  if (!accept) return true;
  const rules = accept.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  return rules.some((rule) => {
    if (rule.startsWith('.')) return name.endsWith(rule);
    if (rule.endsWith('/*')) return type.startsWith(rule.slice(0, -1));
    return type === rule;
  });
}

export function FileUpload({
  accept,
  multiple = true,
  maxSize = DEFAULT_MAX_SIZE,
  maxFiles,
  label = 'Upload files',
  helper,
  disabled = false,
  onFiles,
  className = '',
}: FileUploadProps) {
  const fieldId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const idRef = useRef(0);
  const [dragging, setDragging] = useState(false);
  const [items, setItems] = useState<UploadItem[]>([]);

  const addFiles = (list: FileList | File[]) => {
    const incoming = Array.from(list);
    const room = maxFiles === undefined ? incoming.length : Math.max(maxFiles - items.length, 0);
    const fresh: UploadItem[] = [];
    const valid: File[] = [];
    incoming.forEach((file, i) => {
      idRef.current += 1;
      const id = idRef.current;
      if (i >= room) {
        fresh.push({ id, file, error: maxFiles !== undefined ? `Only ${maxFiles} files allowed` : 'Rejected' });
      } else if (!accepted(file, accept)) {
        fresh.push({ id, file, error: 'Type not accepted' });
      } else if (file.size > maxSize) {
        fresh.push({ id, file, error: `Exceeds ${formatBytes(maxSize)}` });
      } else {
        fresh.push({ id, file });
        valid.push(file);
      }
    });
    if (fresh.length > 0) setItems((prev) => [...prev, ...fresh]);
    if (valid.length > 0) onFiles?.(valid);
  };

  const remove = (id: number) => setItems((prev) => prev.filter((it) => it.id !== id));

  return (
    <div className={`font-sans ${className}`}>
      <span id={`${fieldId}-label`} className="mb-1.5 block text-[13px] font-semibold text-ot-text">
        {label}
      </span>
      <div
        role="button"
        tabIndex={disabled ? undefined : 0}
        aria-labelledby={`${fieldId}-label`}
        aria-disabled={disabled || undefined}
        onClick={() => {
          if (!disabled) inputRef.current?.click();
        }}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (!disabled) addFiles(e.dataTransfer.files);
        }}
        className={`grid place-items-center gap-1.5 rounded-ot-md border border-dashed px-4 py-8 text-center transition-colors ${
          dragging ? 'border-navy bg-navy-bg' : 'border-ot-border bg-ot-bg hover:border-navy'
        } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
      >
        <UploadCloud size={24} aria-hidden className={dragging ? 'text-navy-text' : 'text-ot-muted'} />
        <p className="text-sm font-medium text-ot-text">Drop files here or click to browse</p>
        {helper ? <p className="text-[13px] text-ot-muted">{helper}</p> : null}
        <input
          ref={inputRef}
          id={fieldId}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="sr-only"
          onChange={(e) => {
            if (e.target.files) addFiles(e.target.files);
            e.target.value = '';
          }}
        />
      </div>
      {items.length > 0 ? (
        <ul className="mt-3 grid gap-2">
          {items.map((it) => (
            <li
              key={it.id}
              className={`flex items-center gap-2.5 rounded-ot-md border px-3 py-2.5 text-sm ${
                it.error ? 'border-danger bg-danger-bg' : 'border-ot-border bg-ot-surface'
              }`}
            >
              <FileText size={16} aria-hidden className={`shrink-0 ${it.error ? 'text-danger' : 'text-ot-muted'}`} />
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium text-ot-text">{it.file.name}</span>
                <span className={`text-xs ${it.error ? 'text-danger' : 'text-ot-muted'}`}>
                  {it.error ?? formatBytes(it.file.size)}
                </span>
              </span>
              <button
                type="button"
                onClick={() => remove(it.id)}
                aria-label={`Remove ${it.file.name}`}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-ot-sm text-ot-muted transition-colors hover:bg-ot-surface-2 hover:text-ot-text"
              >
                <X size={15} aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
