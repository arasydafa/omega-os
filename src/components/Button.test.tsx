import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Plus } from 'lucide-react';
import { Button } from './Button.js';

describe('Button', () => {
  it('renders children with primary styles by default', () => {
    render(<Button>Save</Button>);
    const btn = screen.getByRole('button', { name: 'Save' });
    expect(btn).toHaveClass('bg-navy');
    expect(btn).toHaveClass('h-10');
  });

  it('applies variant and size classes', () => {
    render(
      <Button variant="danger" size="sm">
        Delete
      </Button>,
    );
    const btn = screen.getByRole('button', { name: 'Delete' });
    expect(btn).toHaveClass('bg-maroon');
    expect(btn).toHaveClass('h-8');
  });

  it('renders the lucide icon slot', () => {
    render(<Button icon={<Plus data-testid="plus-icon" />}>Add</Button>);
    expect(screen.getByTestId('plus-icon')).toBeInTheDocument();
  });

  it('shows loading spinner and disables itself', () => {
    render(<Button loading>Save</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toBeDisabled();
    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('fires onClick when enabled and not when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const { rerender } = render(<Button onClick={onClick}>Go</Button>);
    await user.click(screen.getByRole('button', { name: 'Go' }));
    expect(onClick).toHaveBeenCalledTimes(1);
    rerender(
      <Button onClick={onClick} disabled>
        Go
      </Button>,
    );
    await user.click(screen.getByRole('button', { name: 'Go' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
