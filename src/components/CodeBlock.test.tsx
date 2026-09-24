import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { CodeBlock } from './CodeBlock.js';

describe('CodeBlock', () => {
  it('renders a labeled snippet with copy', async () => {
    const user = userEvent.setup();
    const onCopy = vi.fn();
    render(<CodeBlock code={'sub rsp, 8\nmov [rsp], rax'} language="asm" onCopy={onCopy} />);
    expect(screen.getByText('asm')).toBeInTheDocument();
    expect(screen.getByText(/sub rsp, 8/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Copy' }));
    expect(onCopy).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument();
  });

  it('preserves diagram spacing without a language badge', () => {
    render(<CodeBlock code="+---+\n| A |" />);
    expect(screen.queryByText('asm')).not.toBeInTheDocument();
    expect(screen.getByText(/\| A \|/)).toBeInTheDocument();
  });
});
