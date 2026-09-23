import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Tooltip } from './Tooltip.js';

describe('Tooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows on hover after the delay and hides on leave', () => {
    render(
      <Tooltip content="Helpful hint" delay={100}>
        <button type="button">Target</button>
      </Tooltip>,
    );
    const btn = screen.getByRole('button', { name: 'Target' });
    fireEvent.mouseEnter(btn);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(screen.getByRole('tooltip')).toHaveTextContent('Helpful hint');
    fireEvent.mouseLeave(btn);
    // Exit animation still playing.
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(120);
    });
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows on keyboard focus and hides on ESC', () => {
    render(
      <Tooltip content="Hint" delay={50}>
        <button type="button">Target</button>
      </Tooltip>,
    );
    const btn = screen.getByRole('button', { name: 'Target' });
    fireEvent.focus(btn);
    act(() => {
      vi.advanceTimersByTime(50);
    });
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    fireEvent.keyDown(btn, { key: 'Escape' });
    act(() => {
      vi.advanceTimersByTime(120);
    });
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});
