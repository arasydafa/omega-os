import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EmptyState } from './EmptyState.js';
import { Skeleton } from './Skeleton.js';

describe('EmptyState', () => {
  it('renders title, description, and action', () => {
    render(
      <EmptyState
        title="No tools yet"
        description="Create one to get started."
        action={<button type="button">New tool</button>}
      />,
    );
    expect(screen.getByText('No tools yet')).toBeInTheDocument();
    expect(screen.getByText('Create one to get started.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'New tool' })).toBeInTheDocument();
  });
});

describe('Skeleton', () => {
  it('renders a placeholder block', () => {
    const { container } = render(<Skeleton className="h-5 w-24" />);
    const el = container.firstElementChild!;
    expect(el).toHaveAttribute('aria-hidden', 'true');
    expect(el).toHaveClass('motion-safe:animate-pulse');
  });
});
