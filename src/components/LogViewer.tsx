import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDownToLine, Copy, Trash2 } from 'lucide-react';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogLine {
  id: string;
  level: LogLevel;
  text: string;
  time?: string;
}

export interface LogViewerProps {
  lines: LogLine[];
  /** Trims oldest lines beyond this count. Defaults to 2000. */
  maxLines?: number;
  follow?: boolean;
  defaultFollow?: boolean;
  onClear?: () => void;
  onCopy?: (text: string) => void;
  className?: string;
}

const LEVEL_COLOR: Record<LogLevel, string> = {
  debug: 'text-ot-muted',
  info: 'text-ot-text',
  warn: 'text-warning',
  error: 'text-danger',
};

export function LogViewer({ lines, maxLines = 2000, follow, defaultFollow = true, onClear, onCopy, className = '' }: LogViewerProps) {
  const [innerFollow, setInnerFollow] = useState(defaultFollow);
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const following = follow !== undefined ? follow : innerFollow;

  const shown = useMemo(() => {
    const trimmed = lines.length > maxLines ? lines.slice(lines.length - maxLines) : lines;
    const q = query.trim().toLowerCase();
    if (!q) return trimmed;
    return trimmed.filter((l) => l.text.toLowerCase().includes(q) || l.level.includes(q));
  }, [lines, maxLines, query]);

  useEffect(() => {
    const box = boxRef.current;
    if (following && box) {
      if (typeof box.scrollTo === 'function') box.scrollTo({ top: box.scrollHeight });
      else box.scrollTop = box.scrollHeight;
    }
  }, [shown, following]);

  const copyAll = async () => {
    const text = shown.map((l) => `${l.time ? `[${l.time}] ` : ''}${l.level.toUpperCase()}: ${l.text}`).join('\n');
    try {
      await navigator.clipboard?.writeText(text);
    } catch {
      // Clipboard unavailable — still confirm.
    }
    setCopied(true);
    onCopy?.(text);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={`overflow-hidden rounded-ot-lg border border-ot-border bg-ot-bg font-sans ${className}`}>
      <div className="flex flex-wrap items-center gap-2 border-b border-ot-border bg-ot-surface px-3.5 py-2">
        <div className="relative min-w-0 flex-1">
          <input
            aria-label="Filter logs"
            value={query}
            placeholder="Filter…"
            onChange={(e) => setQuery(e.target.value)}
            className="h-8 w-full rounded-ot-sm border border-ot-border bg-ot-bg pl-2.5 pr-2 font-sans text-[13px] text-ot-text outline-none placeholder:text-ot-muted focus:border-navy"
          />
        </div>
        <button
          type="button"
          aria-pressed={following}
          onClick={() => setInnerFollow((v) => !v)}
          className={`inline-flex h-8 items-center gap-1.5 rounded-ot-sm px-2.5 text-[13px] font-medium transition-colors ${
            following ? 'bg-navy-bg text-navy-text' : 'text-ot-muted hover:bg-ot-surface-2 hover:text-ot-text'
          }`}
        >
          <ArrowDownToLine size={14} aria-hidden /> Follow
        </button>
        <button
          type="button"
          onClick={() => void copyAll()}
          aria-label={copied ? 'Copied logs' : 'Copy logs'}
          className="grid h-8 w-8 place-items-center rounded-ot-sm text-ot-muted transition-colors hover:bg-ot-surface-2 hover:text-ot-text"
        >
          <Copy size={15} aria-hidden />
        </button>
        {onClear ? (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear logs"
            className="grid h-8 w-8 place-items-center rounded-ot-sm text-ot-muted transition-colors hover:bg-ot-surface-2 hover:text-ot-text"
          >
            <Trash2 size={15} aria-hidden />
          </button>
        ) : null}
      </div>
      <div
        ref={boxRef}
        role="log"
        aria-label="Logs"
        aria-live={following ? 'polite' : 'off'}
        className="scrollbar-thin h-64 overflow-y-auto bg-ot-bg p-3 font-mono text-[13px] leading-6"
      >
        {shown.length === 0 ? (
          <p className="text-ot-muted">No log lines.</p>
        ) : (
          shown.map((l) => (
            <p key={l.id} className="whitespace-pre-wrap break-all">
              {l.time ? <span className="text-ot-muted">[{l.time}] </span> : null}
              <span className={`mr-2 inline-block w-12 font-semibold ${LEVEL_COLOR[l.level]}`}>{l.level.toUpperCase()}</span>
              <span className={LEVEL_COLOR[l.level]}>{l.text}</span>
            </p>
          ))
        )}
      </div>
    </div>
  );
}
