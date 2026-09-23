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
  if (links.length === 0) return null;
  return (
    <nav aria-label={label} className={`border-b border-ot-border font-sans ${className}`}>
      <div className="flex items-center gap-1 overflow-x-auto">
        {links.map((link) => (
          <button
            key={link.id}
            type="button"
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
            {link.active ? (
              <span aria-hidden className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-navy" />
            ) : null}
          </button>
        ))}
      </div>
    </nav>
  );
}
