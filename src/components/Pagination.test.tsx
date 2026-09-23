import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination, pageSlots } from './Pagination.js';

describe('pageSlots', () => {
  it('lists all pages when they fit', () => {
    expect(pageSlots(1, 3, 5)).toEqual([1, 2, 3]);
  });

  it('uses ellipsis on both sides in the middle', () => {
    expect(pageSlots(5, 10, 5)).toEqual([1, '…', 4, 5, 6, '…', 10]);
  });

  it('clamps to the edges', () => {
    expect(pageSlots(1, 10, 5)).toEqual([1, 2, 3, 4, '…', 10]);
    expect(pageSlots(10, 10, 5)).toEqual([1, '…', 7, 8, 9, 10]);
  });
});

describe('Pagination', () => {
  it('navigates and disables ends', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(<Pagination page={1} totalPages={3} onChange={onChange} />);
    expect(screen.getByRole('button', { name: 'Prev' })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: 'Page 3' }));
    expect(onChange).toHaveBeenCalledWith(3);
    rerender(<Pagination page={3} totalPages={3} onChange={onChange} />);
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Page 3' })).toHaveAttribute('aria-current', 'page');
  });

  it('renders nothing without pages', () => {
    const { container } = render(<Pagination page={1} totalPages={0} onChange={() => {}} />);
    expect(container).toBeEmptyDOMElement();
  });
});
