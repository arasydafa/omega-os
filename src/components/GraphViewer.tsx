import { useEffect, useRef, useState } from 'react';
import { Minus, Plus, RotateCcw } from 'lucide-react';

export interface GraphNode {
  id: string;
  label: string;
  sub?: string;
  /** Optional grouping key — renders a toggleable legend. */
  group?: string;
}

export type GraphEdge = readonly [string, string];

export interface GraphViewerProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  /** Viewport height in px. Defaults to 320. */
  height?: number;
  className?: string;
}

const NW = 168;
const NH = 52;
const GAP_X = 72;
const GAP_Y = 16;
const PAD = 24;
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2;

const GROUP_COLORS = [
  'var(--ot-navy)',
  'var(--ot-maroon)',
  'var(--ot-info)',
  'var(--ot-warning)',
  'var(--ot-success)',
];

function layout(nodes: GraphNode[], edges: GraphEdge[]): Map<string, { x: number; y: number; depth: number }> {
  const incoming = new Map<string, number>();
  const outgoing = new Map<string, string[]>();
  nodes.forEach((n) => {
    incoming.set(n.id, 0);
    outgoing.set(n.id, []);
  });
  edges.forEach(([from, to]) => {
    if (!incoming.has(from) || !incoming.has(to)) return;
    incoming.set(to, (incoming.get(to) ?? 0) + 1);
    outgoing.get(from)!.push(to);
  });
  const depth = new Map<string, number>();
  const queue: string[] = nodes.filter((n) => (incoming.get(n.id) ?? 0) === 0).map((n) => n.id);
  queue.forEach((id) => depth.set(id, 0));
  // Unreached (cycles / islands) start their own column at the end.
  const unreached = nodes.map((n) => n.id).filter((id) => !depth.has(id));
  let overflow = Math.max(0, ...[...depth.values()], -1) + 1;
  unreached.forEach((id) => depth.set(id, overflow++));
  const seen = new Set(queue);
  while (queue.length > 0) {
    const id = queue.shift()!;
    const d = depth.get(id)!;
    for (const next of outgoing.get(id) ?? []) {
      if (!seen.has(next)) {
        seen.add(next);
        depth.set(next, Math.max(depth.get(next) ?? 0, d + 1));
        queue.push(next);
      }
    }
  }
  const cols = new Map<number, string[]>();
  nodes.forEach((n) => {
    const d = depth.get(n.id) ?? 0;
    if (!cols.has(d)) cols.set(d, []);
    cols.get(d)!.push(n.id);
  });
  const H = 320;
  const pos = new Map<string, { x: number; y: number; depth: number }>();
  cols.forEach((ids, d) => {
    const colH = ids.length * NH + (ids.length - 1) * GAP_Y;
    const y0 = Math.max(PAD, (H - colH) / 2);
    ids.forEach((id, i) => {
      pos.set(id, { x: PAD + d * (NW + GAP_X), y: y0 + i * (NH + GAP_Y), depth: d });
    });
  });
  return pos;
}

export function GraphViewer({ nodes, edges, selectedId, onSelect, height = 320, className = '' }: GraphViewerProps) {
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [hiddenGroups, setHiddenGroups] = useState<string[]>([]);
  const drag = useRef<{ sx: number; sy: number; px: number; py: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const groups = [...new Set(nodes.map((n) => n.group).filter((g): g is string => !!g))];
  const groupColor = (group: string) => GROUP_COLORS[groups.indexOf(group) % GROUP_COLORS.length];
  const shown = nodes.filter((n) => !n.group || !hiddenGroups.includes(n.group));
  const pos = layout(shown, edges);
  const maxX = Math.max(PAD * 2 + NW, ...[...pos.values()].map((p) => p.x + NW + PAD));
  const W = Math.max(maxX, 480);

  const clampZoom = (z: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Math.round(z * 100) / 100));

  // Non-passive wheel listener: React's onWheel is passive and cannot
  // preventDefault, which would scroll the page while zooming the graph.
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setZoom((z) => clampZoom(z + (e.deltaY < 0 ? 0.1 : -0.1)));
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <div className={`overflow-hidden rounded-ot-lg border border-ot-border bg-ot-bg font-sans ${className}`}>
      <div className="flex items-center gap-2 border-b border-ot-border bg-ot-surface px-3.5 py-2">
        <span className="text-[13px] text-ot-muted">
          {shown.length} nodes · {edges.length} edges · {Math.round(zoom * 100)}%
        </span>
        <span className="ml-auto flex gap-1.5">
          <button
            type="button"
            aria-label="Zoom out"
            onClick={() => setZoom((z) => clampZoom(z - 0.25))}
            className="grid h-8 w-8 place-items-center rounded-ot-sm text-ot-muted transition-colors hover:bg-ot-surface-2 hover:text-ot-text"
          >
            <Minus size={15} aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Zoom in"
            onClick={() => setZoom((z) => clampZoom(z + 0.25))}
            className="grid h-8 w-8 place-items-center rounded-ot-sm text-ot-muted transition-colors hover:bg-ot-surface-2 hover:text-ot-text"
          >
            <Plus size={15} aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Reset view"
            onClick={() => {
              setZoom(1);
              setPan({ x: 0, y: 0 });
            }}
            className="grid h-8 w-8 place-items-center rounded-ot-sm text-ot-muted transition-colors hover:bg-ot-surface-2 hover:text-ot-text"
          >
            <RotateCcw size={15} aria-hidden />
          </button>
        </span>
      </div>
      {groups.length > 0 ? (
        <div className="flex flex-wrap gap-x-2 gap-y-1.5 border-b border-ot-border bg-ot-surface px-3.5 py-2 text-[13px]">
          {groups.map((g) => {
            const off = hiddenGroups.includes(g);
            return (
              <button
                key={g}
                type="button"
                aria-pressed={!off}
                aria-label={`Toggle ${g} nodes`}
                onClick={() =>
                  setHiddenGroups((prev) => (prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]))
                }
                className={`inline-flex items-center gap-1.5 rounded-ot-sm px-1.5 py-0.5 transition-opacity ${
                  off ? 'opacity-50' : 'text-ot-muted hover:bg-ot-surface-2'
                }`}
              >
                <span aria-hidden className="h-3 w-3 rounded-full" style={{ background: groupColor(g) }} />
                {g}
              </button>
            );
          })}
        </div>
      ) : null}
      <svg
        ref={svgRef}
        width="100%"
        viewBox={`0 0 ${W} ${height}`}
        style={{ height }}
        role="img"
        aria-label={`Graph with ${nodes.length} nodes and ${edges.length} edges`}
        className="block cursor-grab touch-none select-none active:cursor-grabbing"
        onPointerDown={(e) => {
          (e.target as Element).setPointerCapture?.(e.pointerId);
          drag.current = { sx: e.clientX, sy: e.clientY, px: pan.x, py: pan.y };
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          setPan({ x: drag.current.px + e.clientX - drag.current.sx, y: drag.current.py + e.clientY - drag.current.sy });
        }}
        onPointerUp={() => (drag.current = null)}
        onPointerCancel={() => (drag.current = null)}
      >
        <defs>
          <marker id="ot-edge-arrow" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={7} markerHeight={7} orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="fill-ot-muted" />
          </marker>
        </defs>
        <g transform={`translate(${pan.x} ${pan.y}) scale(${zoom})`}>
          {edges.map(([from, to], i) => {
            const a = pos.get(from);
            const b = pos.get(to);
            if (!a || !b) return null;
            return (
              <line
                key={i}
                x1={a.x + NW}
                y1={a.y + NH / 2}
                x2={b.x}
                y2={b.y + NH / 2}
                className="stroke-ot-border"
                strokeWidth={1.5}
                markerEnd="url(#ot-edge-arrow)"
              />
            );
          })}
          {shown.map((n) => {
            const p = pos.get(n.id)!;
            const selected = selectedId === n.id;
            return (
              <g
                key={n.id}
                role="button"
                aria-label={`Node ${n.label}${selected ? ', selected' : ''}`}
                tabIndex={0}
                onClick={() => onSelect?.(n.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelect?.(n.id);
                  }
                }}
                className="cursor-pointer ot-anim-fade-in outline-none"
              >
                <rect
                  x={p.x}
                  y={p.y}
                  width={NW}
                  height={NH}
                  rx={12}
                  style={{
                    fill: selected ? 'var(--ot-navy-bg)' : 'var(--ot-surface)',
                    stroke: selected ? 'var(--ot-navy)' : 'var(--ot-border)',
                    strokeWidth: selected ? 2 : 1,
                  }}
                />
                {n.group ? (
                  <rect
                    x={p.x}
                    y={p.y + 8}
                    width={4}
                    height={NH - 16}
                    rx={2}
                    style={{ fill: groupColor(n.group) }}
                  />
                ) : null}
                <text x={p.x + 12} y={p.y + (n.sub ? 21 : 31)} fontSize={13} fontWeight={600} className="fill-ot-text">
                  {n.label.length > 20 ? `${n.label.slice(0, 19)}…` : n.label}
                </text>
                {n.sub ? (
                  <text x={p.x + 12} y={p.y + 38} fontSize={11} className="fill-ot-muted">
                    {n.sub.length > 24 ? `${n.sub.slice(0, 23)}…` : n.sub}
                  </text>
                ) : null}
              </g>
            );
          })}
        </g>
      </svg>
      <ul className="sr-only">
        {nodes.map((n) => (
          <li key={n.id}>{`${n.label}${n.sub ? ` — ${n.sub}` : ''}`}</li>
        ))}
      </ul>
    </div>
  );
}

