import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Tabs } from './Tabs.js';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'tools', label: 'Tools' },
  { id: 'settings', label: 'Settings', disabled: true },
];

describe('Tabs', () => {
  it('marks the active tab selected', () => {
    render(<Tabs tabs={TABS} value="tools" onChange={() => {}} />);
    expect(screen.getByRole('tab', { name: 'Tools' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'false');
  });

  it('changes tab on click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Tabs tabs={TABS} value="overview" onChange={onChange} />);
    await user.click(screen.getByRole('tab', { name: 'Tools' }));
    expect(onChange).toHaveBeenCalledWith('tools');
  });

  it('moves with arrow keys and skips disabled tabs', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Tabs tabs={TABS} value="overview" onChange={onChange} />);
    const overview = screen.getByRole('tab', { name: 'Overview' });
    overview.focus();
    await user.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenCalledWith('tools');
    expect(screen.getByRole('tab', { name: 'Settings' })).toBeDisabled();
  });
});
