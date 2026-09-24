import { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, X } from 'lucide-react';

export interface DatePickerProps {
  /** ISO date YYYY-MM-DD. */
  value?: string | null;
  defaultValue?: string | null;
  onChange?: (iso: string | null) => void;
  label?: string;
  helper?: string;
  error?: string;
  /** ISO bounds, inclusive. */
  min?: string;
  max?: string;
  /** BCP 47 locale for names and display. Defaults to id-ID. */
  locale?: string;
  /** 0 = Sunday, 1 = Monday. Defaults to Monday. */
  weekStart?: 0 | 1;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const ISO = /^(\d{4})-(\d{2})-(\d{2})$/;

function parseISO(s: string | null | undefined): Date | null {
  if (!s) return null;
  const m = ISO.exec(s);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return Number.isNaN(d.getTime()) ? null : d;
}

function toISO(d: Date): string {
  const m = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function DatePicker({
  value,
  defaultValue = null,
  onChange,
  label,
  helper,
  error,
  min,
  max,
  locale = 'id-ID',
  weekStart = 1,
  placeholder = 'Pick a date',
  disabled = false,
  className = '',
}: DatePickerProps) {
  const fieldId = useId();
  const [inner, setInner] = useState<string | null>(defaultValue);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = value !== undefined ? value : inner;
  const selected = parseISO(current);
  const today = useMemo(() => new Date(), []);
  const [view, setView] = useState(() => {
    const base = selected ?? today;
    return { year: base.getFullYear(), month: base.getMonth() };
  });
  const [focusDay, setFocusDay] = useState<Date | null>(selected);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open ]);

  const pick = (iso: string | null) => {
    if (value === undefined) setInner(iso);
    onChange?.(iso);
    setOpen(false);
  };

  const minD = parseISO(min);
  const maxD = parseISO(max);
  const inRange = (d: Date) => (!minD || d >= minD) && (!maxD || d <= maxD);

  const monthLabel = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(
    new Date(view.year, view.month, 1),
  );
  const weekdays = (() => {
    const base = new Date(2024, 0, 7 + weekStart); // a Sunday + offset
    return Array.from({ length: 7 }, (_, i) =>
      new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(new Date(base.getFullYear(), base.getMonth(), base.getDate() + i)),
    );
  })();

  const first = new Date(view.year, view.month, 1);
  const lead = (first.getDay() - weekStart + 7) % 7;
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array<null>(lead).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(view.year, view.month, i + 1)),
  ];

  const moveMonth = (dir: 1 | -1) => {
    const d = new Date(view.year, view.month + dir, 1);
    setView({ year: d.getFullYear(), month: d.getMonth() });
  };

  const moveFocus = (e: KeyboardEvent, d: Date) => {
    const delta =
      e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : e.key === 'ArrowDown' ? 7 : e.key === 'ArrowUp' ? -7 : 0;
    if (delta === 0) return;
    e.preventDefault();
    const next = new Date(d.getFullYear(), d.getMonth(), d.getDate() + delta);
    if (!inRange(next)) return;
    setFocusDay(next);
    setView({ year: next.getFullYear(), month: next.getMonth() });
    requestAnimationFrame(() => {
      rootRef.current?.querySelector<HTMLElement>(`[data-day="${toISO(next)}"]`)?.focus();
    });
  };

  const display = selected
    ? selected.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' })
    : '';

  return (
    <div ref={rootRef} className={className}>
      {label ? (
        <label htmlFor={fieldId} className="mb-1.5 block font-sans text-[13px] font-semibold text-ot-text">
          {label}
        </label>
      ) : null}
      <div className="relative">
        <input
          id={fieldId}
          readOnly
          value={display}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => {
            if (!disabled) {
              setFocusDay(selected);
              setOpen(true);
            }
          }}
          onClick={() => {
            // Focus already opens; keep idempotent so focus+click never toggles shut.
            if (!disabled) setOpen(true);
          }}
          aria-invalid={error ? true : undefined}
          aria-haspopup="dialog"
          aria-expanded={open}
          className={`h-10 w-full cursor-pointer rounded-ot-md border bg-ot-bg pl-3 pr-16 font-sans text-sm text-ot-text outline-none transition-shadow placeholder:text-ot-muted focus:border-navy focus:shadow-ot-ring ${
            error ? 'border-danger focus:border-danger' : 'border-ot-border'
          } disabled:cursor-not-allowed disabled:opacity-50`}
        />
        <span className="pointer-events-none absolute right-10 top-1/2 -translate-y-1/2 text-ot-muted">
          <CalendarDays size={16} aria-hidden />
        </span>
        {current && !disabled ? (
          <button
            type="button"
            aria-label="Clear date"
            onClick={() => pick(null)}
            className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-ot-sm text-ot-muted transition-colors hover:bg-ot-surface-2 hover:text-ot-text"
          >
            <X size={15} aria-hidden />
          </button>
        ) : null}
        {open && !disabled ? (
          <div
            role="dialog"
            aria-label={label ?? 'Choose date'}
            className="ot-anim-pop-in absolute inset-x-0 top-[calc(100%+8px)] z-ot-dropdown rounded-ot-md border border-ot-border bg-ot-surface p-3 shadow-ot-md"
          >
            <div className="mb-2 flex items-center justify-between">
              <button
                type="button"
                aria-label="Previous month"
                onClick={() => moveMonth(-1)}
                className="grid h-8 w-8 place-items-center rounded-ot-sm text-ot-muted transition-colors hover:bg-ot-surface-2 hover:text-ot-text"
              >
                <ChevronLeft size={16} aria-hidden />
              </button>
              <p className="font-sans text-sm font-semibold capitalize text-ot-text">{monthLabel}</p>
              <button
                type="button"
                aria-label="Next month"
                onClick={() => moveMonth(1)}
                className="grid h-8 w-8 place-items-center rounded-ot-sm text-ot-muted transition-colors hover:bg-ot-surface-2 hover:text-ot-text"
              >
                <ChevronRight size={16} aria-hidden />
              </button>
            </div>
            <div role="grid" aria-label={monthLabel} className="grid grid-cols-7 gap-0.5">
              {weekdays.map((w, i) => (
                <span key={i} className="py-1 text-center font-sans text-xs text-ot-muted" aria-hidden>
                  {w}
                </span>
              ))}
              {cells.map((d, i) =>
                d === null ? (
                  <span key={`gap-${i}`} />
                ) : (
                  <button
                    key={toISO(d)}
                    type="button"
                    role="gridcell"
                    data-day={toISO(d)}
                    aria-label={d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })}
                    aria-selected={selected ? sameDay(d, selected) : false}
                    aria-current={sameDay(d, today) ? 'date' : undefined}
                    autoFocus={focusDay ? sameDay(d, focusDay) : false}
                    disabled={!inRange(d)}
                    onClick={() => pick(toISO(d))}
                    onKeyDown={(e) => moveFocus(e, d)}
                    onMouseEnter={() => setFocusDay(d)}
                    className={`grid h-9 place-items-center rounded-ot-sm font-sans text-[13px] transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${
                      selected && sameDay(d, selected)
                        ? 'bg-navy font-semibold text-white'
                        : 'text-ot-text hover:bg-ot-surface-2'
                    } ${sameDay(d, today) && !(selected && sameDay(d, selected)) ? 'underline underline-offset-4' : ''}`}
                  >
                    {d.getDate()}
                  </button>
                ),
              )}
            </div>
          </div>
        ) : null}
      </div>
      {error ? (
        <p role="alert" className="mt-1.5 font-sans text-[13px] text-danger">
          {error}
        </p>
      ) : helper ? (
        <p className="mt-1.5 font-sans text-[13px] text-ot-muted">{helper}</p>
      ) : null}
    </div>
  );
}

