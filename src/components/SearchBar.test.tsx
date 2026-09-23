import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { SearchBar } from './SearchBar.js';

describe('SearchBar', () => {
  it('types and clears via the clear button', async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    render(<SearchBar onClear={onClear} shortcut="Ctrl K" />);
    const box = screen.getByRole('searchbox', { name: 'Search' });
    expect(screen.getByText('Ctrl K')).toBeInTheDocument();
    await user.type(box, 'vstack');
    expect(box).toHaveValue('vstack');
    expect(screen.queryByText('Ctrl K')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Clear search' }));
    expect(box).toHaveValue('');
    expect(onClear).toHaveBeenCalledTimes(1);
  });

  it('clears on Escape in controlled mode', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onClear = vi.fn();
    render(<SearchBar value="abc" onChange={onChange} onClear={onClear} />);
    const box = screen.getByRole('searchbox');
    box.focus();
    await user.keyboard('{Escape}');
    expect(onChange).toHaveBeenCalledWith('');
    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
