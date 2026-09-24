import { useState } from 'react';
import type { ReactNode } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

export interface TreeNodeDef {
  id: string;
  label: ReactNode;
  /** Leading icon (15px). Use lucide-react, never emoji. */
  icon?: ReactNode;
  children?: TreeNodeDef[];
}

export interface TreeViewProps {
  nodes: TreeNodeDef[];
  selectedId?: string | null;
  defaultExpanded?: string[];
  onSelect?: (id: string) => void;
  label?: string;
  className?: string;
}

export function TreeView({ nodes, selectedId, defaultExpanded = [], onSelect, label = 'Tree', className = '' }: TreeViewProps) {
  const [expanded, setExpanded] = useState<string[]>(defaultExpanded);

  const toggle = (id: string) =>
    setExpanded((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const renderNodes = (list: TreeNodeDef[], depth: number): ReactNode => (
    <ul role={depth === 0 ? 'tree' : 'group'} aria-label={depth === 0 ? label : undefined} className="grid gap-0.5">
      {list.map((node) => {
        const hasKids = !!node.children?.length;
        const open = expanded.includes(node.id);
        const selected = selectedId === node.id;
        return (
          <li key={node.id} role="treeitem" aria-expanded={hasKids ? open : undefined} aria-selected={selected || undefined}>
            <div
              className={`flex items-center gap-1 rounded-ot-sm transition-colors ${
                selected ? 'bg-navy-bg' : 'hover:bg-ot-surface'
              }`}
              style={{ paddingLeft: depth * 16 }}
            >
              {hasKids ? (
                <button
                  type="button"
                  aria-label={`${open ? 'Collapse' : 'Expand'} ${typeof node.label === 'string' ? node.label : node.id}`}
                  onClick={() => toggle(node.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowRight' && !open) {
                      e.preventDefault();
                      toggle(node.id);
                    } else if (e.key === 'ArrowLeft' && open) {
                      e.preventDefault();
                      toggle(node.id);
                    }
                  }}
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-ot-sm text-ot-muted transition-colors hover:text-ot-text"
                >
                  {open ? <ChevronDown size={14} aria-hidden /> : <ChevronRight size={14} aria-hidden />}
                </button>
              ) : (
                <span aria-hidden className="h-7 w-7 shrink-0" />
              )}
              <button
                type="button"
                onClick={() => onSelect?.(node.id)}
                className={`flex min-w-0 flex-1 items-center gap-2 rounded-ot-sm px-1.5 py-1.5 text-left text-sm ${
                  selected ? 'font-semibold text-navy-text' : 'text-ot-text'
                }`}
              >
                {node.icon}
                <span className="truncate">{node.label}</span>
              </button>
            </div>
            {hasKids && open ? renderNodes(node.children!, depth + 1) : null}
          </li>
        );
      })}
    </ul>
  );

  return <div className={`font-sans ${className}`}>{renderNodes(nodes, 0)}</div>;
}
