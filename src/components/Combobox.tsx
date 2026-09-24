import { useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Check, ChevronDown } from 'lucide-react';

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string | null;
  defaultValue?: string | null;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  helper?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export function Combobox({
  options,
  value,
  defaultValue = null,
  onChange,
  label,
  placeholder = 'Select…',
  helper,
  error,
  disabled = false,
  className = '',
}: ComboboxProps) {
  const fieldId = useId();
  const [inner, setInner] = useState<string | null>(defaultValue);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = value !== undefined ? value : inner;
  const selected = options.find((o) => o.value === current) ?? null;
  const filtered = options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()));

  const close = () => {
    setOpen(false);
    setQuery('');
    setHighlight(0);
  };

  const pick = (val: string) => {
    if (value === undefined) setInner(val);
    onChange?.(val);
    close();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown' && !open) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (e.key === 'Escape') {
      close();
      return;
    }
    if (!open || filtered.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlight((h) => (h + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight((h) => (h - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      pick(filtered[highlight].value);
    }
  };

  return (
    <div
      ref={rootRef}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) close();
      }}
      className={className}
    >
      {label ? (
        <label htmlFor={fieldId} className="mb-1.5 block font-sans text-[13px] font-semibold text-ot-text">
          {label}
        </label>
      ) : null}
      <div className="relative">
        <input
          id={fieldId}
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          autoComplete="off"
          value={open ? query : (selected?.label ?? '')}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => {
            setQuery(e.target.value);
            setHighlight(0);
            setOpen(true);
          }}
          onFocus={() => {
            if (!disabled) setOpen(true);
          }}
          onKeyDown={onKeyDown}
          aria-invalid={error ? true : undefined}
          className={`h-10 w-full rounded-ot-md border bg-ot-bg pr-9 font-sans text-sm text-ot-text outline-none transition-shadow placeholder:text-ot-muted focus:border-navy focus:shadow-ot-ring ${
            error ? 'border-danger focus:border-danger' : 'border-ot-border'
          } px-3 disabled:cursor-not-allowed disabled:opacity-50`}
        />
        <ChevronDown
          size={16}
          aria-hidden
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ot-muted"
        />
        {open && !disabled ? (
          <ul
            role="listbox"
            aria-label={typeof label === 'string' ? label : 'Options'}
            className="ot-anim-pop-in absolute inset-x-0 top-[calc(100%+8px)] z-ot-dropdown grid max-h-56 gap-0.5 overflow-y-auto rounded-ot-md border border-ot-border bg-ot-surface p-1.5 shadow-ot-md"
          >
            {filtered.length === 0 ? (
              <li className="px-2.5 py-2 font-sans text-sm text-ot-muted">No matches.</li>
            ) : (
              filtered.map((o, i) => (
                <li key={o.value}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={current === o.value}
                    onMouseEnter={() => setHighlight(i)}
                    onClick={() => pick(o.value)}
                    className={`flex w-full items-center gap-2 rounded-ot-sm px-2.5 py-2 text-left font-sans text-sm transition-colors ${
                      i === highlight ? 'bg-ot-surface-2 text-ot-text' : 'text-ot-muted'
                    } ${current === o.value ? 'font-semibold text-navy-text' : ''}`}
                  >
                    <span className="min-w-0 flex-1 truncate">{o.label}</span>
                    {current === o.value ? <Check size={14} aria-hidden className="shrink-0" /> : null}
                  </button>
                </li>
              ))
            )}
          </ul>
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

