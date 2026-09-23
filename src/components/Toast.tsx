import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import { Alert } from './Alert.js';
import type { AlertTone } from './Alert.js';

export type ToastKind = AlertTone;

export interface ToastOptions {
  title?: ReactNode;
  /** Auto-dismiss delay in ms. Defaults to 4000. */
  duration?: number;
}

interface ToastItem {
  id: number;
  kind: ToastKind;
  message: ReactNode;
  title?: ReactNode;
  duration: number;
  leaving?: boolean;
}

export interface ToastApi {
  show: (kind: ToastKind, message: ReactNode, opts?: ToastOptions) => number;
  dismiss: (id: number) => void;
}

const ToastContext = createContext<ToastApi | null>(null);

export function useToast(): ToastApi {
  const api = useContext(ToastContext);
  if (!api) throw new Error('useToast must be used within <ToasterProvider>.');
  return api;
}

const DEFAULT_DURATION = 4000;
const MAX_VISIBLE = 4;

export function ToasterProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const idRef = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    [],
  );

  const dismiss = useCallback((id: number) => {
    setItems((prev) => prev.map((t) => (t.id === id ? { ...t, leaving: true } : t)));
    const timer = setTimeout(() => {
      setItems((prev) => prev.filter((t) => t.id !== id));
    }, 180);
    timers.current.push(timer);
  }, []);

  const show = useCallback<ToastApi['show']>((kind, message, opts) => {
    idRef.current += 1;
    const id = idRef.current;
    setItems((prev) => [
      ...prev.slice(-MAX_VISIBLE + 1),
      { id, kind, message, title: opts?.title, duration: opts?.duration ?? DEFAULT_DURATION },
    ]);
    return id;
  }, []);

  useEffect(() => {
    if (items.length === 0) return;
    const timers = items.map((t) => setTimeout(() => dismiss(t.id), t.duration));
    return () => {
      timers.forEach(clearTimeout);
    };
  }, [items, dismiss]);

  const api = useMemo(() => ({ show, dismiss }), [show, dismiss]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div
        role="region"
        aria-label="Notifications"
        className="fixed bottom-4 right-4 z-[50] grid w-[min(360px,calc(100vw-32px))] gap-2.5"
      >
        {items.map((t) => (
          <div
            key={t.id}
            className={`rounded-ot-lg border border-ot-border bg-ot-surface shadow-ot-md ${
              t.leaving ? 'ot-anim-slide-out-right' : 'ot-anim-slide-in-right'
            }`}
          >
            <Alert tone={t.kind} title={t.title} onClose={() => dismiss(t.id)}>
              {t.message}
            </Alert>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
