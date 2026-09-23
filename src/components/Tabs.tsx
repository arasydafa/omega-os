import { useLayoutEffect, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';

export interface TabDef {
  id: string;
  label: ReactNode;
  /** Leading icon (15px). Use lucide-react, never emoji. */
  icon?: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabDef[];
  value: string;
  onChange: (id: string) => void;
  label?: string;
  className?: string;
}

export function Tabs({ tabs, value, onChange, label = 'Tabs', className = '' }: TabsProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const [bar, setBar] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const place = () => {
      const el = listRef.current?.querySelector<HTMLElement>(`[data-tab="${CSS.escape(value)}"]`);
      if (el) setBar({ left: el.offsetLeft, width: el.offsetWidth });
    };
    place();
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [value, tabs]);

  const focusTab = (id: string) => {
    listRef.current?.querySelector<HTMLElement>(`[data-tab="${id}"]`)?.focus();
  };

  const move = (from: string, dir: 1 | -1) => {
    const enabled = tabs.filter((t) => !t.disabled);
    const i = enabled.findIndex((t) => t.id === from);
    const next = enabled[(i + dir + enabled.length) % enabled.length];
    if (next) {
      onChange(next.id);
      focusTab(next.id);
    }
  };

  const onKeyDown = (e: KeyboardEvent, id: string) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      move(id, 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      move(id, -1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      const first = tabs.find((t) => !t.disabled);
      if (first) {
        onChange(first.id);
        focusTab(first.id);
      }
    } else if (e.key === 'End') {
      e.preventDefault();
      const last = [...tabs].reverse().find((t) => !t.disabled);
      if (last) {
        onChange(last.id);
        focusTab(last.id);
      }
    }
  };

  return (
    <div ref={listRef} role="tablist" aria-label={label} className={`relative flex gap-1 font-sans ${className}`}>
      {tabs.map((tab) => {
        const active = tab.id === value;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            data-tab={tab.id}
            aria-selected={active}
            disabled={tab.disabled}
            onClick={() => onChange(tab.id)}
            onKeyDown={(e) => onKeyDown(e, tab.id)}
            className={`flex items-center gap-2 rounded-ot-sm px-3.5 py-2.5 text-sm outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
              active ? 'font-semibold text-navy-text' : 'text-ot-muted hover:bg-ot-surface hover:text-ot-text'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        );
      })}
      <span
        aria-hidden
        data-testid="tabs-slide-bar"
        className="ot-transition pointer-events-none absolute bottom-0 h-0.5 rounded-full bg-navy"
        style={{ left: bar.left + 12, width: Math.max(bar.width - 24, 0) }}
      />
    </div>
  );
}
