import { useEffect, useId, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export type DrawerSide = 'left' | 'right';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  side?: DrawerSide;
  icon?: ReactNode;
}

function focusables(root: HTMLElement): HTMLElement[] {
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  );
}

export function Drawer({ open, onClose, title, children, footer, side = 'right', icon }: DrawerProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const prevFocus = useRef<Element | null>(null);
  const [rendered, setRendered] = useState(open);
  const [closing, setClosing] = useState(false);

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
    }, 300);
    return () => clearTimeout(t);
  }, [open, rendered]);

  useEffect(() => {
    if (!rendered) return;
    prevFocus.current = document.activeElement;
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const items = focusables(panelRef.current);
      if (items.length === 0) {
        e.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      (prevFocus.current as HTMLElement | null)?.focus?.();
    };
  }, [rendered, onClose]);

  if (!rendered) return null;

  const slideIn = side === 'right' ? 'ot-drawer-in-right' : 'ot-drawer-in-left';
  const slideOut = side === 'right' ? 'ot-drawer-out-right' : 'ot-drawer-out-left';

  return createPortal(
    <div
      className={`fixed inset-0 z-ot-modal bg-black/50 backdrop-blur-sm ${
        closing ? 'ot-anim-fade-out' : 'ot-anim-fade-in'
      }`}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`absolute inset-y-0 flex w-full max-w-sm flex-col overflow-hidden border-ot-border bg-ot-surface font-sans outline-none shadow-ot-lg ${
          side === 'right' ? 'right-0 border-l' : 'left-0 border-r'
        } ${closing ? slideOut : slideIn}`}
      >
        <div className="flex items-center gap-2 border-b border-ot-border px-4 py-3">
          {icon}
          <h2 id={titleId} className="text-sm font-bold text-ot-text">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="ml-auto grid h-8 w-8 place-items-center rounded-ot-sm text-ot-muted transition-colors hover:bg-ot-surface-2 hover:text-ot-text"
          >
            <X size={16} aria-hidden />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-3.5 text-sm text-ot-muted">{children}</div>
        {footer ? (
          <div className="flex justify-end gap-2 border-t border-ot-border px-4 py-3">{footer}</div>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}
