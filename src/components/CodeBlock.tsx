import { Badge } from './Badge.js';
import { CopyButton } from './CopyButton.js';

export interface CodeBlockProps {
  code: string;
  /** Small badge, e.g. "asm" or "diagram". Omit for a bare block. */
  language?: string;
  /** Max body height before scrolling. Defaults to 320. */
  maxHeight?: string | number;
  onCopy?: () => void;
  className?: string;
}

export function CodeBlock({ code, language, maxHeight = 320, onCopy, className = '' }: CodeBlockProps) {
  const text = code.replace(/\n$/, '');
  return (
    <div className={`overflow-hidden rounded-ot-md border border-ot-border bg-ot-bg font-sans ${className}`}>
      <div className="flex items-center gap-2 border-b border-ot-border bg-ot-surface px-3 py-1.5">
        <span className="min-w-0 flex-1">
          {language ? (
            <Badge tone="navy">{language}</Badge>
          ) : (
            <span className="font-mono text-xs text-ot-muted">snippet</span>
          )}
        </span>
        <CopyButton text={text} onCopy={onCopy} />
      </div>
      <pre
        className="scrollbar-thin overflow-auto p-3 font-mono text-[13px] leading-6 text-ot-text"
        style={{ maxHeight }}
      >
        <code className="block min-w-max whitespace-pre">{text}</code>
      </pre>
    </div>
  );
}
