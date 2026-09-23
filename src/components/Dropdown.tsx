import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';

export interface DropdownItemDef {
  label: ReactNode;
  /** Leading icon (14px). Use lucide-react, never emoji. */
  icon?: ReactNode;
  /** Maroon text for destructive actions. */
  danger?: boolean;
  onSelect?: () => void;
  /** One nested flyout level max. */
  children?: DropdownItemDef[];
}

export interface DropdownProps {
  /** Element that toggles the menu. */
  trigger: ReactNode;
  items: DropdownItemDef[];
  label?: string;
}

function ItemRow({
  item,
  onPick,
}: {
  item: DropdownItemDef;
  onPick: (item: DropdownItemDef) => void;
}) {
  const [subOpen, setSubOpen] = useState(false);
  const hasSub = !!item.children?.length;
  return (
    <div
      className="relative"
      onMouseEnter={() => hasSub && setSubOpen(true)}
      onMouseLeave={() => hasSub && setSubOpen(false)}
    >
      <div
        role="menuitem"
        tabIndex={0}
        onClick={() => {
          if (hasSub) {
            setSubOpen((v) => !v);
            return;
          }
          onPick(item);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (hasSub) setSubOpen((v) => !v);
            else onPick(item);
          }
        }}
        className={`flex cursor-pointer items-center gap-2 rounded-ot-sm px-2.5 py-2 font-sans text-sm outline-none transition-colors hover:bg-ot-surface-2 focus-visible:bg-ot-surface-2 ${
          item.danger ? 'text-danger' : 'text-ot-text'
        }`}
      >
        {item.icon}
        <span>{item.label}</span>
        {hasSub ? <ChevronRight size={14} aria-hidden className="ml-auto text-ot-muted" /> : null}
      </div>
      {hasSub && subOpen ? (
        <div
          role="menu"
          aria-label={`${typeof item.label === 'string' ? item.label : 'Submenu'}`}
          className="absolute left-full top-[-6px] z-ot-dropdown grid min-w-[200px] gap-0.5 rounded-ot-md border border-ot-border bg-ot-surface p-1.5 shadow-ot-md"
        >
          {item.children!.map((sub, i) => (
            <ItemRow key={i} item={sub} onPick={onPick} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function Dropdown({ trigger, items, label }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [closing, setClosing] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Delayed unmount so the exit animation can play.
  useEffect(() => {
    if (open) {
      setRendered(true);
      setClosing(false);
      return;
    }
    if (!rendered) return;
    setClosing(true);
    const t = setTimeout(() => {
      setRendered(false);
      setClosing(false);
    }, 130);
    return () => clearTimeout(t);
  }, [open, rendered]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        (triggerRef.current?.firstElementChild as HTMLElement | null)?.focus?.();
      }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open ]);

  return (
    <div ref={rootRef} className="relative inline-block">
      <div
        ref={triggerRef}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
            e.preventDefault();
            setOpen(true);
          }
        }}
      >
        {trigger}
      </div>
      {rendered ? (
        <div
          role="menu"
          aria-label={label ?? 'Menu'}
          className={`absolute left-0 top-[calc(100%+8px)] z-ot-dropdown grid min-w-[220px] gap-0.5 rounded-ot-md border border-ot-border bg-ot-surface p-1.5 shadow-ot-md ${
            closing ? 'ot-anim-pop-out' : 'ot-anim-pop-in'
          }`}
        >
          {items.map((item, i) => (
            <ItemRow
              key={i}
              item={item}
              onPick={(picked) => {
                setOpen(false);
                picked.onSelect?.();
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
