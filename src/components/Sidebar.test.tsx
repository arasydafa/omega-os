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
    expect(screen.queryByText('VStack')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Tools' }));
    await user.click(screen.getByRole('button', { name: 'VStack' }));
    expect(onSelect).toHaveBeenCalledWith('vstack');
  });

  it('hides labels and submenus when collapsed', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<Sidebar items={ITEMS} collapsed onSelect={onSelect} />);
    expect(screen.queryByText('Tools')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Tools' }));
    // Collapsed parent with children acts as a plain select.
    expect(onSelect).toHaveBeenCalledWith('tools');
    expect(screen.queryByText('VStack')).not.toBeInTheDocument();
  });
});
