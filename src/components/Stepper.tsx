import type { ReactNode } from 'react';
import { Check } from 'lucide-react';

export interface StepDef {
  id: string;
  label: ReactNode;
  description?: ReactNode;
}

export interface StepperProps {
  steps: StepDef[];
  /** Id of the current step. */
  current: string;
  onStep?: (id: string) => void;
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  className?: string;
}

export function Stepper({ steps, current, onStep, orientation = 'horizontal', label = 'Progress', className = '' }: StepperProps) {
  const currentIndex = Math.max(
    steps.findIndex((s) => s.id === current),
    0,
  );
  return (
    <ol
      aria-label={label}
      className={`flex font-sans ${orientation === 'vertical' ? 'flex-col gap-0' : 'flex-row items-start gap-2'} ${className}`}
    >
      {steps.map((step, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        return (
          <li key={step.id} className={`flex ${orientation === 'vertical' ? 'flex-row gap-3' : 'flex-1 flex-col'} min-w-0`}>
            <button
              type="button"
              aria-current={active ? 'step' : undefined}
              onClick={onStep ? () => onStep(step.id) : undefined}
              disabled={!onStep}
              className={`group flex items-center gap-2.5 rounded-ot-sm text-left ${
                orientation === 'vertical' ? '' : 'w-full flex-col items-center text-center'
              } ${onStep ? '' : 'cursor-default'} disabled:cursor-default`}
            >
              <span
                aria-hidden
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border text-sm font-semibold transition-colors ${
                  done
                    ? 'border-navy bg-navy text-white'
                    : active
                      ? 'border-navy bg-navy-bg text-navy-text'
                      : 'border-ot-border bg-ot-surface text-ot-muted'
                }`}
              >
                {done ? <Check size={15} /> : i + 1}
              </span>
              <span className="min-w-0">
                <span className={`block truncate text-sm ${active ? 'font-semibold text-ot-text' : 'text-ot-muted'}`}>
                  {step.label}
                </span>
                {step.description ? (
                  <span className="block truncate text-xs text-ot-muted">{step.description}</span>
                ) : null}
              </span>
            </button>
            {orientation === 'vertical' && i < steps.length - 1 ? (
              <span aria-hidden className={`ml-4 w-px flex-1 ${i < currentIndex ? 'bg-navy' : 'bg-ot-border'}`} style={{ minHeight: 16 }} />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
