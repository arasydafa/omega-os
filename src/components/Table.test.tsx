import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Table } from './Table.js';

interface Row {
  id: string;
  name: string;
}

const ROWS: Row[] = [
  { id: 'a', name: 'vstack' },
  { id: 'b', name: 'omega-docs' },
];

const COLUMNS = [
  { key: 'name', header: 'Tool', render: (r: Row) => r.name },
  { key: 'id', header: 'ID', align: 'right' as const, render: (r: Row) => r.id },
];

describe('Table', () => {
  it('renders headers and rows', () => {
    render(<Table columns={COLUMNS} rows={ROWS} keyOf={(r) => r.id} />);
    expect(screen.getByText('Tool')).toBeInTheDocument();
    expect(screen.getByText('vstack')).toBeInTheDocument();
    expect(screen.getByText('omega-docs')).toBeInTheDocument();
  });

  it('fires onRowClick and highlights the selected row', async () => {
    const user = userEvent.setup();
    let picked: Row | null = null;
    const { rerender } = render(
      <Table columns={COLUMNS} rows={ROWS} keyOf={(r) => r.id} onRowClick={(r) => (picked = r)} />,
    );
    await user.click(screen.getByText('vstack'));
    expect(picked).toEqual({ id: 'a', name: 'vstack' });
    rerender(<Table columns={COLUMNS} rows={ROWS} keyOf={(r) => r.id} selectedKey="a" />);
    expect(screen.getByText('vstack').closest('tr')).toHaveAttribute('aria-selected', 'true');
  });

  it('shows skeleton rows while loading', () => {
    const { container } = render(<Table columns={COLUMNS} rows={[]} keyOf={(r: Row) => r.id} loading />);
    expect(screen.getByRole('table')).toHaveAttribute('aria-busy', 'true');
    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThan(0);
  });

  it('uses the column skeleton override when provided', () => {
    const cols = [
      COLUMNS[0],
      { ...COLUMNS[1], skeleton: <span data-testid="custom-skeleton" /> },
    ];
    render(<Table columns={cols} rows={[]} keyOf={(r: Row) => r.id} loading loadingRows={1} />);
    expect(screen.getByTestId('custom-skeleton')).toBeInTheDocument();
  });

  it('shows the empty state when there are no rows', () => {
    render(
      <Table
        columns={COLUMNS}
        rows={[]}
        keyOf={(r: Row) => r.id}
        emptyTitle="No tools yet"
        emptyDescription="Create one to get started."
      />,
    );
    expect(screen.getByText('No tools yet')).toBeInTheDocument();
    expect(screen.getByText('Create one to get started.')).toBeInTheDocument();
  });
});
