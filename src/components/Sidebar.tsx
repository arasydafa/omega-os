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
      className={`grid content-start gap-1 overflow-hidden rounded-ot-md border border-ot-border bg-ot-bg p-2.5 font-sans text-sm transition-[width] duration-200 ease-out ${
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
              className={`flex w-full items-center gap-2.5 rounded-ot-md py-2.5 transition-all duration-200 ease-out ${
                collapsed ? 'px-3.5' : 'px-3'
              } ${
                item.active
                  ? 'bg-navy-bg font-semibold text-navy-text'
                  : 'text-ot-muted hover:bg-ot-surface hover:text-ot-text'
              }`}
            >
              {item.icon ? (
                <span className="grid h-4 w-4 shrink-0 place-items-center [&>svg]:block">{item.icon}</span>
              ) : null}
              <span
                className={`flex min-w-0 flex-1 items-center gap-2 overflow-hidden whitespace-nowrap transition-all duration-200 ${
                  collapsed ? 'max-w-0 opacity-0' : 'max-w-[160px] opacity-100'
                }`}
              >
                <span className="truncate">{item.label}</span>
                {hasKids ? (
                  <ChevronDown
                    size={14}
                    aria-hidden
                    className={`ml-auto shrink-0 text-ot-muted transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                ) : null}
              </span>
            </button>
            {hasKids && !collapsed ? (
              <div
                data-testid={`submenu-${item.id}`}
                className={`grid transition-all duration-200 ease-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'invisible grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="min-h-0 overflow-hidden">
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
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}
