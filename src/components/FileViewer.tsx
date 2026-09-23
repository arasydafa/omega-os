import { useState } from 'react';
import { Check, Copy, FileText } from 'lucide-react';
import { Badge } from './Badge.js';

export interface FileViewerProps {
  filename: string;
  language?: string;
  code: string;
  /** Max body height before scrolling. Defaults to 320. */
  maxHeight?: string | number;
  onCopy?: () => void;
  className?: string;
}

export function FileViewer({ filename, language, code, maxHeight = 320, onCopy, className = '' }: FileViewerProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard?.writeText(code);
    } catch {
      // Clipboard unavailable (permissions, insecure context) — still confirm.
    }
    setCopied(true);
    onCopy?.();
    setTimeout(() => setCopied(false), 1500);
  };

  const lines = code.replace(/\n$/, '').split('\n');

  return (
    <div className={`overflow-hidden rounded-ot-lg border border-ot-border bg-ot-bg font-sans ${className}`}>
      <div className="flex items-center gap-2 border-b border-ot-border bg-ot-surface px-3.5 py-2.5">
        <FileText size={15} aria-hidden className="shrink-0 text-ot-muted" />
        <span className="min-w-0 flex-1 truncate font-mono text-[13px] font-medium text-ot-text">{filename}</span>
        {language ? <Badge tone="navy">{language}</Badge> : null}
        <button
          type="button"
          onClick={() => void copy()}
          aria-label={copied ? 'Copied' : 'Copy code'}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-ot-sm text-ot-muted transition-colors hover:bg-ot-surface-2 hover:text-ot-text"
        >
          {copied ? <Check size={15} aria-hidden /> : <Copy size={15} aria-hidden />}
        </button>
      </div>
      <pre
        className="scrollbar-thin overflow-auto p-0 font-mono text-[13px] leading-6 text-ot-text"
        style={{ maxHeight }}
        aria-label={`Code: ${filename}`}
      >
        <code className="block min-w-max">
          {lines.map((line, i) => (
            <span key={i} className="flex hover:bg-ot-surface">
              <span aria-hidden className="w-12 shrink-0 select-none pr-3 text-right text-ot-muted">
                {i + 1}
              </span>
              <span className="whitespace-pre pr-4">{line || ' '}</span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

