import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { LogViewer } from './LogViewer.js';

const LINES = [
  { id: '1', level: 'info' as const, text: 'Build started', time: '09:00' },
  { id: '2', level: 'error' as const, text: 'Deploy failed', time: '09:05' },
];

describe('LogViewer', () => {
  it('renders levels with colors and filters text', async () => {
    const user = userEvent.setup();
    render(<LogViewer lines={LINES} />);
    expect(screen.getByText('Build started')).toBeInTheDocument();
    await user.type(screen.getByLabelText('Filter logs'), 'failed');
    expect(screen.queryByText('Build started')).not.toBeInTheDocument();
    expect(screen.getByText('Deploy failed')).toBeInTheDocument();
  });

  it('toggles follow mode and clears', async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    render(<LogViewer lines={LINES} onClear={onClear} />);
    const follow = screen.getByRole('button', { name: /Follow/ });
    expect(follow).toHaveAttribute('aria-pressed', 'true');
    await user.click(follow);
    expect(follow).toHaveAttribute('aria-pressed', 'false');
    await user.click(screen.getByRole('button', { name: 'Clear logs' }));
    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
