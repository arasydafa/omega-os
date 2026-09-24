import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { GraphViewer } from './GraphViewer.js';

const NODES = [
  { id: 'app', label: 'App', sub: 'entry' },
  { id: 'auth', label: 'Auth', sub: 'login' },
  { id: 'db', label: 'DB', sub: 'store' },
];
const EDGES: [string, string][] = [
  ['app', 'auth'],
  ['auth', 'db'],
];

describe('GraphViewer', () => {
  it('renders nodes and edges', () => {
    const { container } = render(<GraphViewer nodes={NODES} edges={EDGES} />);
    expect(screen.getByText('App')).toBeInTheDocument();
    expect(screen.getByText('DB')).toBeInTheDocument();
    expect(container.querySelectorAll('line').length).toBe(2);
  });

  it('selects a node on click', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<GraphViewer nodes={NODES} edges={EDGES} onSelect={onSelect} />);
    await user.click(screen.getByRole('button', { name: /Node Auth/ }));
    expect(onSelect).toHaveBeenCalledWith('auth');
  });

  it('zooms in steps, traps wheel scroll, and resets', async () => {    const user = userEvent.setup();
    render(<GraphViewer nodes={NODES} edges={EDGES} />);
    expect(screen.getByText(/100%/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Zoom in' }));
    expect(screen.getByText(/125%/)).toBeInTheDocument();
    const svg = screen.getByRole('img', { name: /Graph with 3 nodes/ });
    fireEvent.wheel(svg, { deltaY: 100 });
    expect(screen.getByText(/115%/)).toBeInTheDocument();
    // Wheel over the graph must not bubble a scrollable default.
    const prevented = fireEvent.wheel(svg, { deltaY: -100, cancelable: true });
    expect(prevented).toBe(false);
    await user.click(screen.getByRole('button', { name: 'Reset view' }));
    expect(screen.getByText(/100%/)).toBeInTheDocument();
  });

  it('toggles node groups from the legend', async () => {
    const user = userEvent.setup();
    const grouped = NODES.map((n, i) => ({ ...n, group: i < 2 ? 'core' : 'store' }));
    render(<GraphViewer nodes={grouped} edges={EDGES} />);
    expect(screen.getByRole('button', { name: 'Toggle core nodes' })).toHaveAttribute('aria-pressed', 'true');
    await user.click(screen.getByRole('button', { name: 'Toggle store nodes' }));
    expect(screen.queryByText('DB')).not.toBeInTheDocument();
    expect(screen.getByText('App')).toBeInTheDocument();
  });
});
