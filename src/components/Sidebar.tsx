import { useState } from 'react';
import type { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

export interface SidebarChild {
  id: string;
  label: ReactNode;
  active?: boolean;
  onClick?: () => void;
  /** One deeper level (max three nesting levels total). */
  children?: SidebarChild[];
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
  const hasActiveBelow = (kids?: SidebarChild[]): boolean =>
    !!kids?.some((c) => c.active || hasActiveBelow(c.children));
  const collectOpen = (kids?: SidebarChild[]): string[] =>
    (kids ?? []).flatMap((k) => (hasActiveBelow([k]) ? [k.id, ...collectOpen(k.children)] : []));
  const [expanded, setExpanded] = useState<string[]>(() =>
    items.flatMap((i) => (hasActiveBelow(i.children) ? [i.id, ...collectOpen(i.children)] : [])),
  );

  const toggle = (id: string) =>
    setExpanded((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const pick = (id: string, cb?: () => void) => {
    cb?.();
    onSelect?.(id);
  };

  const renderChildren = (kids: SidebarChild[], open: boolean, testId: string, depth: number) => (
    <div
      data-testid={testId}
      className={`grid ot-transition-slow ${
        open ? 'grid-rows-[1fr] opacity-100' : 'invisible grid-rows-[0fr] opacity-0'
      }`}
    >
      <div className="min-h-0 overflow-hidden">
        <div className={`mt-1 grid gap-0.5 ${depth === 0 ? 'ml-[26px]' : 'ml-3 border-l border-ot-border pl-2'}`}>
          {kids.map((child) => {
            const hasGrandkids = !!child.children?.length;
            const childOpen = expanded.includes(child.id);
            return (
              <div key={child.id}>
                <button
                  type="button"
                  aria-expanded={hasGrandkids ? childOpen : undefined}
                  onClick={() => {
                    if (hasGrandkids) toggle(child.id);
                    else pick(child.id, child.onClick);
                  }}
                  className={`flex w-full items-center gap-1.5 rounded-ot-sm px-2.5 py-2 text-left text-[13px] transition-colors ${
                    child.active
                      ? 'bg-navy-bg font-semibold text-navy-text'
                      : 'text-ot-muted hover:bg-ot-surface hover:text-ot-text'
                  }`}
                >
                  <span className="min-w-0 flex-1 truncate">{child.label}</span>
                  {hasGrandkids ? (
                    <ChevronDown
                      size={13}
                      aria-hidden
                      className={`shrink-0 text-ot-muted transition-transform duration-200 ${
                        childOpen ? 'rotate-180' : ''
                      }`}
                    />
                  ) : null}
                </button>
                {hasGrandkids
                  ? renderChildren(child.children!, childOpen, `submenu-${child.id}`, depth + 1)
                  : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <nav
      aria-label={label}
      className={`ot-transition-slow grid content-start gap-1 overflow-hidden rounded-ot-md border border-ot-border bg-ot-bg p-2.5 font-sans text-sm ${
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
              className={`flex w-full items-center rounded-ot-md py-2.5 ot-transition-slow ${
                collapsed ? 'gap-0 px-3.5' : 'gap-2.5 px-3'
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
                className={`flex min-w-0 flex-1 items-center gap-2 overflow-hidden whitespace-nowrap ot-transition-slow ${
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
            {hasKids && !collapsed ? renderChildren(item.children!, isOpen, `submenu-${item.id}`, 0) : null}
          </div>
        );
      })}
    </nav>
  );
}
