import type { ReactNode } from 'react';

export interface NavbarLink {
  label: ReactNode;
  active?: boolean;
  onClick?: () => void;
  /** Leading icon (15px). Use lucide-react, never emoji. */
  icon?: ReactNode;
}

export interface NavbarProps {
  /** Logo + product name slot. */
  brand: ReactNode;
  links: NavbarLink[];
  /** Right-side actions, e.g. search + New buttons. */
  actions?: ReactNode;
  className?: string;
}

export function Navbar({ brand, links, actions, className = '' }: NavbarProps) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-4 gap-y-2 rounded-ot-md border border-ot-border bg-ot-bg px-3.5 py-2.5 font-sans ${className}`}
    >
      <div className="flex items-center gap-2">{brand}</div>
      <nav aria-label="Primary" className="flex flex-wrap items-center gap-1 text-sm">
        {links.map((link, i) => (
          <button
            key={i}
            type="button"
            onClick={link.onClick}
            aria-current={link.active ? 'page' : undefined}
            className={`flex items-center gap-2 rounded-ot-sm px-3 py-1.5 transition-colors ${
              link.active
                ? 'bg-navy-bg font-semibold text-navy-text'
                : 'text-ot-muted hover:bg-ot-surface hover:text-ot-text'
            }`}
          >
            {link.icon}
            {link.label}
          </button>
        ))}
      </nav>
      {actions ? <div className="ml-auto flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}
