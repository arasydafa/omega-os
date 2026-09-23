import { describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToasterProvider, useToast } from './Toast.js';

function FireButton() {
  const toast = useToast();
  return (
    <button type="button" onClick={() => toast.show('success', 'Saved.', { title: 'Done.' })}>
      Fire
    </button>
  );
}

describe('Toast', () => {
  it('throws when useToast is used outside the provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<FireButton />)).toThrow('useToast must be used within <ToasterProvider>.');
    spy.mockRestore();
  });

  it('shows and dismisses a toast', async () => {
    const user = userEvent.setup();
    render(
      <ToasterProvider>
        <FireButton />
      </ToasterProvider>,
    );
    await user.click(screen.getByRole('button', { name: 'Fire' }));
    expect(screen.getByText('Saved.')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Dismiss' }));
    await waitFor(() => {
      expect(screen.queryByText('Saved.')).not.toBeInTheDocument();
    });
  });

  it('auto-dismisses after the duration', () => {
    vi.useFakeTimers();
    try {
      const Auto = () => {
        const toast = useToast();
        return (
          <button type="button" onClick={() => toast.show('info', 'Hello.', { duration: 1000 })}>
            Fire
          </button>
        );
      };
      render(
        <ToasterProvider>
          <Auto />
        </ToasterProvider>,
      );
      fireEvent.click(screen.getByRole('button', { name: 'Fire' }));
      expect(screen.getByText('Hello.')).toBeInTheDocument();
      act(() => {
        vi.advanceTimersByTime(1000);
      });
      // Exit animation still playing.
      expect(screen.getByText('Hello.')).toBeInTheDocument();
      act(() => {
        vi.advanceTimersByTime(200);
      });
      expect(screen.queryByText('Hello.')).not.toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });
});
