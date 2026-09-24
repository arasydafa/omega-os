import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { EmptyState } from './EmptyState.js';
import { Skeleton } from './Skeleton.js';

export type TableAlign = 'left' | 'center' | 'right';
export type SortDir = 'asc' | 'desc';

export interface TableColumn<T> {
  key: string;
  header: ReactNode;
  render?: (row: T, index: number) => ReactNode;
  align?: TableAlign;
  /** Loading placeholder for this column. Defaults to a text-width bar. */
  skeleton?: ReactNode;
  /** Enables header-click sorting. */
  sortable?: boolean;
  /** Value used for sorting. Defaults to the column key lookup. */
  sortValue?: (row: T) => string | number | null | undefined;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  rows: T[];
  keyOf: (row: T, index: number) => string | number;
  /** Key of the highlighted row. */
  selectedKey?: string | number | null;
  onRowClick?: (row: T) => void;
  loading?: boolean;
  loadingRows?: number;
  emptyTitle?: ReactNode;
  emptyDescription?: ReactNode;
  emptyAction?: ReactNode;
  /** Controlled sort. Omit both for uncontrolled. */
  sortKey?: string | null;
  sortDir?: SortDir | null;
  onSort?: (key: string | null, dir: SortDir | null) => void;
  className?: string;
}

const ALIGN: Record<TableAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export function Table<T>({
  columns,
  rows,
  keyOf,
  selectedKey,
  onRowClick,
  loading = false,
  loadingRows = 3,
  emptyTitle = 'No data',
  emptyDescription,
  emptyAction,
  sortKey: controlledKey,
  sortDir: controlledDir,
  onSort,
  className = '',
}: TableProps<T>) {
  const [innerKey, setInnerKey] = useState<string | null>(null);
  const [innerDir, setInnerDir] = useState<SortDir | null>(null);
  const sortKey = controlledKey !== undefined ? controlledKey : innerKey;
  const sortDir = controlledDir !== undefined ? controlledDir : innerDir;
  const showEmpty = !loading && rows.length === 0;

  const cycleSort = (key: string) => {
    let nextKey: string | null = key;
    let nextDir: SortDir | null = 'asc';
    if (sortKey === key) {
      if (sortDir === 'asc') nextDir = 'desc';
      else {
        nextKey = null;
        nextDir = null;
      }
    }
    if (controlledKey === undefined) {
      setInnerKey(nextKey);
      setInnerDir(nextDir);
    }
    onSort?.(nextKey, nextDir);
  };

  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return rows;
    const col = columns.find((c) => c.key === sortKey);
    if (!col?.sortable) return rows;
    const get = col.sortValue ?? ((row: T) => (row as Record<string, unknown>)[sortKey] as string | number | null | undefined);
    const dir = sortDir === 'asc' ? 1 : -1;
    return [...rows].sort((a, b) => {
      const va = get(a);
      const vb = get(b);
      if (va == null && vb == null) return 0;
      if (va == null) return 1;
      if (vb == null) return -1;
      if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dir;
      return String(va).localeCompare(String(vb)) * dir;
    });
  }, [rows, sortKey, sortDir, columns]);
  return (
    <div className={`overflow-hidden rounded-ot-lg border border-ot-border bg-ot-bg font-sans ${className}`}>
      <table className="w-full border-collapse text-sm" aria-busy={loading || undefined}>
        <thead>
          <tr className="bg-ot-surface text-left text-xs uppercase tracking-wide text-ot-muted">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                aria-sort={col.sortable ? (sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none') : undefined}
                className={`px-3 py-2.5 font-semibold ${ALIGN[col.align ?? 'left']}`}
              >
                {col.sortable ? (
                  <button
                    type="button"
                    onClick={() => cycleSort(col.key)}
                    className="inline-flex items-center gap-1 uppercase tracking-wide transition-colors hover:text-ot-text"
                  >
                    {col.header}
                    {sortKey === col.key && sortDir === 'asc' ? (
                      <ArrowUp size={12} aria-hidden />
                    ) : sortKey === col.key && sortDir === 'desc' ? (
                      <ArrowDown size={12} aria-hidden />
                    ) : (
                      <ArrowUpDown size={12} aria-hidden className="opacity-50" />
                    )}
                  </button>
                ) : (
                  col.header
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading
            ? Array.from({ length: loadingRows }, (_, i) => (
                <tr key={`loading-${i}`} className="border-t border-ot-border">
                  {columns.map((col) => (
                    <td key={col.key} className={`px-3 py-2.5 ${ALIGN[col.align ?? 'left']}`}>
                      {col.skeleton ?? (
                        <span
                          className={`flex ${
                            col.align === 'right'
                              ? 'justify-end'
                              : col.align === 'center'
                                ? 'justify-center'
                                : 'justify-start'
                          }`}
                        >
                          <Skeleton className="h-5 w-3/4" />
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))
            : sorted.map((row, i) => {                const key = keyOf(row, i);
                const selected = selectedKey != null && key === selectedKey;
                return (
                  <tr
                    key={key}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                    aria-selected={selected || undefined}
                    className={`border-t border-ot-border ${
                      onRowClick ? 'cursor-pointer hover:bg-ot-surface' : ''
                    } ${selected ? 'bg-navy-bg' : ''}`}
                  >
                    {columns.map((col) => (
                      <td key={col.key} className={`px-3 py-2.5 text-ot-text ${ALIGN[col.align ?? 'left']}`}>
                        {col.render ? col.render(row, i) : null}
                      </td>
                    ))}
                  </tr>
                );
              })}
        </tbody>
      </table>
      {showEmpty ? (
        <EmptyState title={emptyTitle} description={emptyDescription} action={emptyAction} />
      ) : null}
    </div>
  );
}
