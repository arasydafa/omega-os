import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Breadcrumbs } from './Breadcrumbs.js';

describe('Breadcrumbs', () => {
  it('marks the last crumb as current page', () => {
    render(<Breadcrumbs items={[{ label: 'Home' }, { label: 'Tools' }, { label: 'VStack' }]} />);
    const current = screen.getByText('VStack');
    expect(current.closest('[aria-current="page"]')).not.toBeNull();
    expect(current.closest('li')).toHaveClass('font-semibold');
  });

  it('renders links and buttons for earlier crumbs', async () => {
    const user = userEvent.setup();
    const onTools = vi.fn();
    render(
      <Breadcrumbs
        items={[{ label: 'Home', href: '#' }, { label: 'Tools', onClick: onTools }, { label: 'VStack' }]}
      />,
    );
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '#');
    await user.click(screen.getByRole('button', { name: 'Tools' }));
    expect(onTools).toHaveBeenCalledTimes(1);
  });

  it('renders nothing without items', () => {
    const { container } = render(<Breadcrumbs items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
