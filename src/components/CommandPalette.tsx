import { useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Search, X } from 'lucide-react';
import { EmptyState } from './EmptyState.js';

export interface PaletteItem {
  id: string;
  label: ReactNode;
  /** Plain-text haystack for filtering. Defaults to the label when it is a string. */
  keywords?: string;
  hint?: ReactNode;
  group?: string;
  onSelect?: () => void;
}

export interface CommandPaletteProps {
  items: PaletteItem[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  label?: string;
}

/** Subsequence fuzzy match with a simple contiguity bonus. Higher is better. */
export function fuzzyScore(query: string, text: string): number {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (q.length === 0) return 1;
  let score = 0;
  let ti = 0;
  let streak = 0;
  for (let qi = 0; qi < q.length; qi++) {
    const found = t.indexOf(q[qi], ti);
    if (found === -1) return -1;
    streak = found === ti ? streak + 1 : 0;
    score += 1 + streak;
    ti = found + 1;
  }
  if (t.startsWith(q)) score += q.length;
  return score;
}

function haystack(item: PaletteItem): string {
  if (item.keywords !== undefined) return item.keywords;
  return typeof item.label === 'string' ? item.label : '';
}

export function CommandPalette({ items, open, defaultOpen = false, onOpenChange, placeholder = 'Type a command…', label = 'Command palette' }: CommandPaletteProps) {
  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const [query, setQuery] = useState('');
  const [highlight, setHighlight] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const isOpen = open !== undefined ? open : innerOpen;

  const setOpen = (next: boolean) => {
    if (open === undefined) setInnerOpen(next);
    onOpenChange?.(next);
    if (next) {
      setQuery('');
      setHighlight(0);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setHighlight(0);
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const isOpenRef = useRef(isOpen);
  isOpenRef.current = isOpen;

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const next = !isOpenRef.current;
        if (open === undefined) setInnerOpen(next);
        onOpenChange?.(next);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onOpenChange]);

  const filtered = useMemo(() => {
    const scored = items
      .map((item) => ({ item, score: fuzzyScore(query.trim(), haystack(item)) }))
      .filter((s) => s.score >= 0)
      .sort((a, b) => b.score - a.score || items.indexOf(a.item) - items.indexOf(b.item));
    return scored.map((s) => s.item);
  }, [items, query]);

  useEffect(() => {
    setHighlight(0);
  }, [query]);

  if (!isOpen) return null;

  const run = (item: PaletteItem) => {
    setOpen(false);
    item.onSelect?.();
  };

  let lastGroup: string | undefined;
  return (
    <div
      className="fixed inset-0 z-ot-modal flex items-start justify-center bg-black/50 p-4 pt-[12vh] backdrop-blur-sm ot-anim-fade-in"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className="ot-anim-pop-in w-full max-w-lg overflow-hidden rounded-ot-lg border border-ot-border bg-ot-surface shadow-ot-lg"
      >
        <div className="flex items-center gap-2.5 border-b border-ot-border px-4">
          <Search size={16} aria-hidden className="shrink-0 text-ot-muted" />
          <input
            ref={inputRef}
            role="combobox"
            aria-expanded
            aria-autocomplete="list"
            aria-label={label}
            autoComplete="off"
            value={query}
            placeholder={placeholder}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setOpen(false);
              else if (e.key === 'ArrowDown') {
                e.preventDefault();
                setHighlight((h) => (filtered.length ? (h + 1) % filtered.length : 0));
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setHighlight((h) => (filtered.length ? (h - 1 + filtered.length) % filtered.length : 0));
              } else if (e.key === 'Enter' && filtered[highlight]) {
                e.preventDefault();
                run(filtered[highlight]);
              }
            }}
            className="h-12 w-full bg-transparent font-sans text-sm text-ot-text outline-none placeholder:text-ot-muted"
          />
          {query ? (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setQuery('')}
              className="grid h-7 w-7 shrink-0 place-items-center rounded-ot-sm text-ot-muted transition-colors hover:bg-ot-surface-2 hover:text-ot-text"
            >
              <X size={15} aria-hidden />
            </button>
          ) : null}
        </div>
        {filtered.length === 0 ? (
          <EmptyState title="No matches" description={`Nothing found for “${query}”.`} />
        ) : (
          <ul role="listbox" aria-label="Matches" className="max-h-72 overflow-y-auto p-1.5">
            {filtered.map((item, i) => {
              const showGroup = item.group !== undefined && item.group !== lastGroup;
              lastGroup = item.group;
              return (
                <li key={item.id}>
                  {showGroup ? (
                    <p className="px-2.5 pb-1 pt-2 font-sans text-xs font-semibold uppercase tracking-wide text-ot-muted">
                      {item.group}
                    </p>
                  ) : null}
                  <button
                    type="button"
                    role="option"
                    aria-selected={i === highlight}
                    onMouseEnter={() => setHighlight(i)}
                    onClick={() => run(item)}
                    className={`flex w-full items-center gap-2 rounded-ot-sm px-2.5 py-2 text-left font-sans text-sm transition-colors ${
                      i === highlight ? 'bg-ot-surface-2 text-ot-text' : 'text-ot-muted'
                    }`}
                  >
                    <span className="min-w-0 flex-1 truncate">{item.label}</span>
                    {item.hint ? <span className="shrink-0 text-xs text-ot-muted">{item.hint}</span> : null}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
