import type { ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface PaginationProps {
  /** 1-based current page. */
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  /** Max numbered buttons. Defaults to 5. */
  maxVisible?: number;
  note?: ReactNode;
}

type Slot = number | '…';

export function pageSlots(page: number, total: number, max: number): Slot[] {
  const range = (lo: number, hi: number) => Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
  if (total <= max) return range(1, total);
  const inner = Math.max(max - 2, 1);
  const lo = Math.min(Math.max(page - Math.floor(inner / 2), 2), total - inner);
  const hi = lo + inner - 1;
  const slots: Slot[] = [1];
  if (lo > 2) slots.push('…');
  slots.push(...range(lo, hi));
  if (hi < total - 1) slots.push('…');
  slots.push(total);
  return slots;
}

const NAV =
  'inline-flex h-8 items-center gap-1.5 rounded-ot-sm border border-ot-border bg-transparent px-3 font-sans text-[13px] font-semibold text-ot-text transition-colors hover:bg-ot-surface disabled:cursor-not-allowed disabled:opacity-50';

export function Pagination({ page, totalPages, onChange, maxVisible = 5, note }: PaginationProps) {
  if (totalPages < 1) return null;
  const current = Math.min(Math.max(page, 1), totalPages);
  return (
    <nav aria-label="Pagination" className="flex flex-wrap items-center gap-2 font-sans">
      <button type="button" className={NAV} disabled={current <= 1} onClick={() => onChange(current - 1)}>
        <ChevronLeft size={15} aria-hidden /> Prev
      </button>
      {pageSlots(current, totalPages, maxVisible).map((slot, i) =>
        slot === '…' ? (
          <span key={`gap-${i}`} aria-hidden className="px-1 text-sm text-ot-muted">
            …
          </span>
        ) : (
          <button
            key={slot}
            type="button"
            aria-label={`Page ${slot}`}
            aria-current={slot === current ? 'page' : undefined}
            onClick={() => onChange(slot)}
            className={`h-8 min-w-8 rounded-full px-2.5 text-[13px] font-semibold transition-colors ${
              slot === current ? 'bg-navy text-white' : 'text-ot-muted hover:bg-ot-surface hover:text-ot-text'
            }`}
          >
            {slot}
          </button>
        ),
      )}
      <button
        type="button"
        className={NAV}
        disabled={current >= totalPages}
        onClick={() => onChange(current + 1)}
      >
        Next <ChevronRight size={15} aria-hidden />
      </button>
      {note ? <span className="ml-1 text-[13px] text-ot-muted">{note}</span> : null}
    </nav>
  );
}
