import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { SubmenuBar } from './SubmenuBar.js';

describe('SubmenuBar', () => {
  it('marks the active link with count badge and fires select', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <SubmenuBar
        label="Project"
        onSelect={onSelect}
        links={[
          { id: 'code', label: 'Code', active: true, count: 12 },
          { id: 'issues', label: 'Issues', count: 3 },
        ]}
      />,
    );
    expect(screen.getByRole('button', { name: /Code/ })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByText('12')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /Issues/ }));
    expect(onSelect).toHaveBeenCalledWith('issues');
  });

  it('renders nothing without links', () => {
    const { container } = render(<SubmenuBar links={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
