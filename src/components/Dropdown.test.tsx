import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dropdown } from './Dropdown.js';
import type { DropdownItemDef } from './Dropdown.js';

const ITEMS: DropdownItemDef[] = [
  { label: 'Rename', onSelect: vi.fn() },
  {
    label: 'More',
    children: [
      { label: 'Duplicate', onSelect: vi.fn() },
      {
        label: 'Settings',
        children: [{ label: 'Workspace', onSelect: vi.fn() }],
      },
    ],
  },
  { label: 'Delete', danger: true, onSelect: vi.fn() },
];

describe('Dropdown', () => {
  it('opens on trigger click and picks an item', async () => {
    const user = userEvent.setup();
    render(<Dropdown trigger={<button type="button">Open</button>} items={ITEMS} label="Actions" />);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByRole('menu', { name: 'Actions' })).toBeInTheDocument();
    await user.click(screen.getByText('Rename'));
    expect(ITEMS[0].onSelect).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  it('opens nested flyouts up to three levels and closes on ESC', async () => {
    const user = userEvent.setup();
    render(<Dropdown trigger={<button type="button">Open</button>} items={ITEMS} />);
    await user.click(screen.getByRole('button', { name: 'Open' }));
    await user.hover(screen.getByText('More'));
    expect(screen.getByText('Duplicate')).toBeInTheDocument();
    await user.hover(screen.getByText('Settings'));
    await user.click(screen.getByText('Workspace'));
    expect(ITEMS[1].children![1].children![0].onSelect).toHaveBeenCalledTimes(1);
    await user.keyboard('{Escape}');
    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  it('closes on outside click', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Dropdown trigger={<button type="button">Open</button>} items={ITEMS} />
        <button type="button">Outside</button>
      </div>,
    );
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Outside' }));
    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });
});
