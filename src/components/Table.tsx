import type { ReactNode } from 'react';
import { EmptyState } from './EmptyState.js';
import { Skeleton } from './Skeleton.js';

export type TableAlign = 'left' | 'center' | 'right';

export interface TableColumn<T> {
  key: string;
  header: ReactNode;
  render?: (row: T, index: number) => ReactNode;
  align?: TableAlign;
  /** Loading placeholder for this column. Defaults to a text-width bar. */
  skeleton?: ReactNode;
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
  className = '',
}: TableProps<T>) {
  const showEmpty = !loading && rows.length === 0;
  return (
    <div className={`overflow-hidden rounded-ot-lg border border-ot-border bg-ot-bg font-sans ${className}`}>
      <table className="w-full border-collapse text-sm" aria-busy={loading || undefined}>
        <thead>
          <tr className="bg-ot-surface text-left text-xs uppercase tracking-wide text-ot-muted">
            {columns.map((col) => (
              <th key={col.key} scope="col" className={`px-3 py-2.5 font-semibold ${ALIGN[col.align ?? 'left']}`}>
                {col.header}
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
            : rows.map((row, i) => {
                const key = keyOf(row, i);
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
