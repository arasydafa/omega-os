import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Navbar } from './Navbar.js';

describe('Navbar', () => {
  it('marks the active link and fires clicks', async () => {
    const user = userEvent.setup();
    const onTools = vi.fn();
    render(
      <Navbar
        brand={<span>OmegaOS</span>}
        links={[
          { label: 'Dashboard', active: true },
          { label: 'Tools', onClick: onTools },
        ]}
        actions={<button type="button">New</button>}
      />,
    );
    expect(screen.getByRole('button', { name: 'Dashboard' })).toHaveAttribute('aria-current', 'page');
    await user.click(screen.getByRole('button', { name: 'Tools' }));
    expect(onTools).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: 'New' })).toBeInTheDocument();
  });

  it('renders navbar dropdown links with nested items', async () => {
    const user = userEvent.setup();
    const onPick = vi.fn();
    render(
      <Navbar
        brand={<span>OmegaOS</span>}
        links={[
          { label: 'Dashboard', active: true },
          {
            label: 'Tools',
            children: [
              { label: 'VStack', onSelect: onPick },
              {
                label: 'More',
                children: [{ label: 'Playground', onSelect: onPick }],
              },
            ],
          },
        ]}
      />,
    );
    await user.click(screen.getByRole('button', { name: /Tools/ }));
    await user.hover(screen.getByText('More'));
    await user.click(screen.getByText('Playground'));
    expect(onPick).toHaveBeenCalledTimes(1);
  });
});
