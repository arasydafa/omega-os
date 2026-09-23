import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal.js';

describe('Modal', () => {
  it('renders nothing when closed', () => {
    render(
      <Modal open={false} onClose={() => {}} title="Title">
        Body
      </Modal>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders title, body, and footer when open', () => {
    render(
      <Modal open onClose={() => {}} title="Delete tool?" footer={<button type="button">Delete</button>}>
        Permanent action.
      </Modal>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByText('Delete tool?')).toBeInTheDocument();
    expect(screen.getByText('Permanent action.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });

  it('closes via close button, ESC, and overlay click — but not content click', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} title="Title">
        Body
      </Modal>,
    );
    await user.click(screen.getByText('Body'));
    expect(onClose).not.toHaveBeenCalled();
    await user.click(screen.getByRole('button', { name: 'Close dialog' }));
    expect(onClose).toHaveBeenCalledTimes(1);
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(2);
    // Click the overlay backdrop itself.
    const dialog = screen.getByRole('dialog');
    const overlay = dialog.parentElement!;
    await user.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(3);
  });
});
