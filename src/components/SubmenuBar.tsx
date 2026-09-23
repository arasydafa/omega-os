import { useLayoutEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

export interface SubmenuLink {
  id: string;
  label: ReactNode;
  /** Leading icon (15px). Use lucide-react, never emoji. */
  icon?: ReactNode;
  active?: boolean;
  /** Small count pill, e.g. open issues. */
  count?: number | string;
  onClick?: () => void;
}

export interface SubmenuBarProps {
  links: SubmenuLink[];
  onSelect?: (id: string) => void;
  label?: string;
  className?: string;
}

export function SubmenuBar({ links, onSelect, label = 'Section', className = '' }: SubmenuBarProps) {
  const stripRef = useRef<HTMLDivElement>(null);
  const [bar, setBar] = useState({ left: 0, width: 0 });
  const activeId = links.find((l) => l.active)?.id;

  useLayoutEffect(() => {
    const place = () => {
      const el = stripRef.current?.querySelector<HTMLElement>(
        activeId ? `[data-link="${CSS.escape(activeId)}"]` : '[aria-current="page"]',
      );
      if (el) setBar({ left: el.offsetLeft, width: el.offsetWidth });
    };
    place();
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [activeId, links]);

  if (links.length === 0) return null;
  return (
    <nav aria-label={label} className={`border-b border-ot-border font-sans ${className}`}>
      <div ref={stripRef} className="relative flex items-center gap-1 overflow-x-auto">
        {links.map((link) => (
          <button
            key={link.id}
            type="button"
            data-link={link.id}
            aria-current={link.active ? 'page' : undefined}
            onClick={() => {
              link.onClick?.();
              onSelect?.(link.id);
            }}
            className={`relative flex shrink-0 items-center gap-2 px-3.5 py-2.5 text-sm outline-none transition-colors ${
              link.active ? 'font-semibold text-navy-text' : 'text-ot-muted hover:text-ot-text'
            }`}
          >
            {link.icon}
            {link.label}
            {link.count !== undefined ? (
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                  link.active ? 'bg-navy-bg text-navy-text' : 'bg-ot-surface-2 text-ot-muted'
                }`}
              >
                {link.count}
              </span>
            ) : null}
          </button>
        ))}
        <span
          aria-hidden
          data-testid="submenu-slide-bar"
          className="ot-transition pointer-events-none absolute bottom-0 h-0.5 rounded-full bg-navy"
          style={{ left: bar.left + 12, width: Math.max(bar.width - 24, 0) }}
        />
      </div>
    </nav>
  );
}
