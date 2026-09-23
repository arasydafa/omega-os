import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Sidebar } from './Sidebar.js';

const ITEMS = [
  { id: 'dash', label: 'Dashboard', active: true },
  {
    id: 'tools',
    label: 'Tools',
    children: [
      { id: 'vstack', label: 'VStack' },
      { id: 'lab', label: 'CI-CD lab' },
    ],
  },
  { id: 'docs', label: 'Docs' },
];

describe('Sidebar', () => {
  it('expands submenu and selects a child', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<Sidebar items={ITEMS} onSelect={onSelect} />);
    expect(screen.getByTestId('submenu-tools')).toHaveClass('invisible');
    await user.click(screen.getByRole('button', { name: 'Tools' }));
    expect(screen.getByTestId('submenu-tools')).not.toHaveClass('invisible');
    await user.click(screen.getByRole('button', { name: 'VStack' }));
    expect(onSelect).toHaveBeenCalledWith('vstack');
  });

  it('hides labels and submenus when collapsed', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<Sidebar items={ITEMS} collapsed onSelect={onSelect} />);
    expect(screen.getByText('Tools').parentElement).toHaveClass('opacity-0');
    expect(screen.queryByTestId('submenu-tools')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Tools' }));
    // Collapsed parent with children acts as a plain select.
    expect(onSelect).toHaveBeenCalledWith('tools');
  });
});
