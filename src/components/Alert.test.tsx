import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Alert } from './Alert.js';
import type { AlertTone } from './Alert.js';

describe('Alert', () => {
  it.each(['info', 'warning', 'success', 'danger'] as AlertTone[])(
    'renders role=alert with a default icon for %s',
    (tone) => {
      const { container, unmount } = render(<Alert tone={tone}>Message</Alert>);
      expect(screen.getByRole('alert')).toHaveTextContent('Message');
      expect(container.querySelector('svg')).toBeInTheDocument();
      unmount();
    },
  );

  it('renders the title lead-in', () => {
    render(
      <Alert tone="warning" title="Warning.">
        Unsaved changes.
      </Alert>,
    );
    expect(screen.getByText('Warning.')).toBeInTheDocument();
  });

  it('renders a dismiss button only when onClose is set', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const { rerender } = render(<Alert tone="info">Hi</Alert>);
    expect(screen.queryByRole('button', { name: 'Dismiss' })).not.toBeInTheDocument();
    rerender(
      <Alert tone="info" onClose={onClose}>
        Hi
      </Alert>,
    );
    await user.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
