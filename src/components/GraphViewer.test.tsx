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

  it('zooms in steps and resets', async () => {
    const user = userEvent.setup();
    render(<GraphViewer nodes={NODES} edges={EDGES} />);
    expect(screen.getByText(/100%/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Zoom in' }));
    expect(screen.getByText(/125%/)).toBeInTheDocument();
    fireEvent.wheel(screen.getByRole('img', { name: /Graph with 3 nodes/ }), { deltaY: 100 });
    expect(screen.getByText(/115%/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Reset view' }));
    expect(screen.getByText(/100%/)).toBeInTheDocument();
  });
});
