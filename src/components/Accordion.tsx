import { useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItemDef {
  id: string;
  title: ReactNode;
  content: ReactNode;
  defaultOpen?: boolean;
}

export interface AccordionProps {
  items: AccordionItemDef[];
  /** Single allows one open panel, multiple allows many. Defaults to single. */
  mode?: 'single' | 'multiple';
  onChange?: (openIds: string[]) => void;
  className?: string;
}

export function Accordion({ items, mode = 'single', onChange, className = '' }: AccordionProps) {
  const [open, setOpen] = useState<string[]>(() => items.filter((i) => i.defaultOpen).map((i) => i.id));
  const headerRefs = useRef(new Map<string, HTMLButtonElement>());

  const apply = (next: string[]) => {
    setOpen(next);
    onChange?.(next);
  };

  const toggle = (id: string) => {
    if (mode === 'single') {
      apply(open.includes(id) ? [] : [id]);
    } else {
      apply(open.includes(id) ? open.filter((x) => x !== id) : [...open, id]);
    }
  };

  const focusHeader = (id: string) => headerRefs.current.get(id)?.focus();

  const move = (id: string, dir: 1 | -1) => {
    const ids = items.map((i) => i.id);
    const next = ids[(ids.indexOf(id) + dir + ids.length) % ids.length];
    focusHeader(next);
  };

  return (
    <div className={`grid gap-2 font-sans ${className}`}>
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        return (
          <div key={item.id} className="overflow-hidden rounded-ot-md border border-ot-border bg-ot-surface">
            <button
              ref={(el) => {
                if (el) headerRefs.current.set(item.id, el);
                else headerRefs.current.delete(item.id);
              }}
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggle(item.id)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  move(item.id, 1);
                } else if (e.key === 'ArrowUp') {
                  e.preventDefault();
                  move(item.id, -1);
                }
              }}
              className="flex w-full items-center gap-2.5 px-4 py-3 text-left text-sm font-semibold text-ot-text transition-colors hover:bg-ot-surface-2"
            >
              <span className="min-w-0 flex-1 truncate">{item.title}</span>
              <ChevronDown
                size={16}
                aria-hidden
                className={`shrink-0 text-ot-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              role="region"
              className={`grid ot-transition-slow ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'invisible grid-rows-[0fr] opacity-0'}`}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="border-t border-ot-border px-4 py-3 text-sm text-ot-muted">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
