import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { CommandPalette, fuzzyScore } from './CommandPalette.js';

const ITEMS = [
  { id: 'vstack', label: 'VStack', group: 'Tools', onSelect: vi.fn() },
  { id: 'lab', label: 'CI-CD Lab', group: 'Tools', onSelect: vi.fn() },
  { id: 'docs', label: 'Docs', group: 'Help', onSelect: vi.fn() },
];

describe('fuzzyScore', () => {
  it('ranks prefix and contiguous matches higher', () => {
    expect(fuzzyScore('vs', 'VStack')).toBeGreaterThan(fuzzyScore('vs', 'CI-CD Lab VS Code'));
    expect(fuzzyScore('zzz', 'VStack')).toBe(-1);
    expect(fuzzyScore('', 'Anything')).toBe(1);
  });
});

describe('CommandPalette', () => {
  it('opens, filters, and runs a command with the keyboard', async () => {
    const user = userEvent.setup();
    render(<CommandPalette items={ITEMS} defaultOpen />);
    const box = screen.getByRole('combobox', { name: 'Command palette' });
    await user.type(box, 'vst');
    expect(screen.getByRole('option', { name: 'VStack' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'Docs' })).not.toBeInTheDocument();
    await user.keyboard('{Enter}');
    expect(ITEMS[0].onSelect).toHaveBeenCalledTimes(1);
  });

  it('shows an empty state without matches and closes on ESC', async () => {
    const user = userEvent.setup();
    render(<CommandPalette items={ITEMS} defaultOpen />);
    await user.type(screen.getByRole('combobox'), 'qqqzzz');
    expect(screen.getByText('No matches')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog', { name: 'Command palette' })).not.toBeInTheDocument();
  });
});
