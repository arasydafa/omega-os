import { OMEGA_ICONS, iconComponentName } from '@omega-os/ui';
import * as lucideSet from 'lucide-react';

export function IconsDemo() {
  const set = lucideSet as unknown as Record<string, React.ComponentType<{ size?: number }>>;
  return (
    <section className="rounded-ot-lg border border-ot-border bg-ot-surface p-5">
      <h2 className="mb-1 text-lg font-bold">Icons</h2>
      <p className="mb-4 text-sm text-ot-muted">
        {OMEGA_ICONS.length} approved lucide icons. Same list as preview and docs. No emoji.
      </p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-2">
        {OMEGA_ICONS.map((name) => {
          const Cmp = set[iconComponentName(name)];
          return (
            <div key={name} className="grid place-items-center gap-1.5 rounded-ot-sm border border-ot-border bg-ot-bg px-2 py-2.5 text-center">
              {Cmp ? <Cmp size={18} /> : <span className="text-xs text-danger">missing</span>}
              <code className="font-mono text-[10px] text-ot-muted [overflow-wrap:anywhere]">{name}</code>
            </div>
          );
        })}
      </div>
    </section>
  );
}
