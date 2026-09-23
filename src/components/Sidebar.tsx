import { useState } from 'react';
import type { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

export interface SidebarChild {
  id: string;
  label: ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export interface SidebarItemDef {
  id: string;
  label: ReactNode;
  /** Leading icon (16px). Use lucide-react, never emoji. */
  icon?: ReactNode;
  active?: boolean;
  onClick?: () => void;
  children?: SidebarChild[];
}

export interface SidebarProps {
  items: SidebarItemDef[];
  /** Rail mode: icons only, 64px wide. */
  collapsed?: boolean;
  onSelect?: (id: string) => void;
  label?: string;
  className?: string;
}

export function Sidebar({ items, collapsed = false, onSelect, label = 'Sidebar', className = '' }: SidebarProps) {
  const [expanded, setExpanded] = useState<string[]>(() =>
    items.filter((i) => i.children?.some((c) => c.active)).map((i) => i.id),
  );

  const toggle = (id: string) =>
    setExpanded((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const pick = (id: string, cb?: () => void) => {
    cb?.();
    onSelect?.(id);
  };

  return (
    <nav
      aria-label={label}
      className={`grid content-start gap-1 rounded-ot-md border border-ot-border bg-ot-bg p-2.5 font-sans text-sm ${
        collapsed ? 'w-16' : 'w-60'
      } ${className}`}
    >
      {items.map((item) => {
        const hasKids = !!item.children?.length;
        const isOpen = expanded.includes(item.id);
        return (
          <div key={item.id}>
            <button
              type="button"
              aria-expanded={hasKids && !collapsed ? isOpen : undefined}
              onClick={() => {
                if (hasKids && !collapsed) toggle(item.id);
                else pick(item.id, item.onClick);
              }}
              title={collapsed ? String(item.label) : undefined}
              className={`flex w-full items-center gap-2.5 rounded-ot-md px-3 py-2.5 transition-colors ${
                collapsed ? 'justify-center px-0' : ''
              } ${
                item.active
                  ? 'bg-navy-bg font-semibold text-navy-text'
                  : 'text-ot-muted hover:bg-ot-surface hover:text-ot-text'
              }`}
            >
              {item.icon}
              {collapsed ? null : (
                <>
                  <span>{item.label}</span>
                  {hasKids ? (
                    <ChevronDown
                      size={14}
                      aria-hidden
                      className={`ml-auto text-ot-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  ) : null}
                </>
              )}
            </button>
            {hasKids && isOpen && !collapsed ? (
              <div className="ml-[26px] mt-1 grid gap-0.5">
                {item.children!.map((child) => (
                  <button
                    key={child.id}
                    type="button"
                    onClick={() => pick(child.id, child.onClick)}
                    className={`rounded-ot-sm px-2.5 py-2 text-left text-[13px] transition-colors ${
                      child.active
                        ? 'bg-navy-bg font-semibold text-navy-text'
                        : 'text-ot-muted hover:bg-ot-surface hover:text-ot-text'
                    }`}
                  >
                    {child.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}
