import { useId, useState } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { Search, X } from 'lucide-react';

export interface SearchBarProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'value' | 'defaultValue' | 'onChange'> {
  /** Accessible label. Visually hidden. Defaults to "Search". */
  label?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  /** Hint shown when empty, e.g. "Ctrl K". */
  shortcut?: ReactNode;
  className?: string;
}

export function SearchBar({
  label = 'Search',
  value,
  defaultValue = '',
  onChange,
  onClear,
  shortcut,
  className = '',
  placeholder = 'Search…',
  ...rest
}: SearchBarProps) {
  const fieldId = useId();
  const [inner, setInner] = useState(defaultValue);
  const current = value ?? inner;

  const set = (next: string) => {
    if (value === undefined) setInner(next);
    onChange?.(next);
  };

  const clear = () => {
    set('');
    onClear?.();
  };

  return (
    <div className={`relative font-sans ${className}`}>
      <label htmlFor={fieldId} className="sr-only">
        {label}
      </label>
      <Search
        size={16}
        aria-hidden
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ot-muted"
      />
      <input
        id={fieldId}
        type="search"
        role="searchbox"
        value={current}
        placeholder={placeholder}
        onChange={(e) => set(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Escape' && current) {
            e.stopPropagation();
            clear();
          }
          rest.onKeyDown?.(e);
        }}
        className="h-10 w-full rounded-ot-md border border-ot-border bg-ot-bg pl-9 pr-20 font-sans text-sm text-ot-text outline-none transition-shadow placeholder:text-ot-muted focus:border-navy focus:shadow-ot-ring disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-search-cancel-button]:hidden"
        {...rest}
      />
      {current ? (
        <button
          type="button"
          onClick={clear}
          aria-label="Clear search"
          className="absolute right-2.5 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-ot-sm text-ot-muted transition-colors hover:bg-ot-surface-2 hover:text-ot-text"
        >
          <X size={15} aria-hidden />
        </button>
      ) : shortcut ? (
        <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-ot-sm border border-ot-border bg-ot-surface px-1.5 py-0.5 font-mono text-[11px] text-ot-muted">
          {shortcut}
        </kbd>
      ) : null}
    </div>
  );
}
