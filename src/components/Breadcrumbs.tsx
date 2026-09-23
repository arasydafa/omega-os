import { Fragment } from 'react';
import type { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';

export interface Crumb {
  label: ReactNode;
  href?: string;
  onClick?: () => void;
  /** Leading icon (14px) for the first crumb, e.g. Home. Use lucide-react, never emoji. */
  icon?: ReactNode;
}

export interface BreadcrumbsProps {
  items: Crumb[];
  className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  if (items.length === 0) return null;
  return (
    <nav aria-label="Breadcrumb" className={`font-sans text-[13px] ${className}`}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((crumb, i) => {
          const last = i === items.length - 1;
          const content = (
            <span className="inline-flex items-center gap-1.5">
              {crumb.icon}
              {crumb.label}
            </span>
          );
          return (
            <Fragment key={i}>
              {i > 0 ? (
                <ChevronRight size={14} aria-hidden className="shrink-0 text-ot-muted" />
              ) : null}
              <li className={last ? 'font-semibold text-ot-text' : 'text-ot-muted'}>
                {last ? (
                  <span aria-current="page">{content}</span>
                ) : crumb.href ? (
                  <a
                    href={crumb.href}
                    onClick={crumb.onClick}
                    className="transition-colors hover:text-ot-text hover:underline"
                  >
                    {content}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={crumb.onClick}
                    className="transition-colors hover:text-ot-text hover:underline"
                  >
                    {content}
                  </button>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
