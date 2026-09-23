import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Checkbox, Radio, Switch } from './Choice.js';

describe('Radio', () => {
  it('toggles via its label', async () => {
    const user = userEvent.setup();
    render(
      <>
        <Radio name="theme" label="Light" />
        <Radio name="theme" label="Dark" />
      </>,
    );
    await user.click(screen.getByText('Dark'));
    expect(screen.getByRole('radio', { name: 'Dark' })).toBeChecked();
  });
});

describe('Checkbox', () => {
  it('toggles via its label and shows description', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Icons only" description="No emoji in UI." />);
    const box = screen.getByRole('checkbox', { name: /Icons only/ });
    expect(screen.getByText('No emoji in UI.')).toBeInTheDocument();
    await user.click(screen.getByText('Icons only'));
    expect(box).toBeChecked();
  });
});

describe('Switch', () => {
  it('flips checked state and notifies', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(<Switch checked={false} onChange={onChange} label="Dark mode" />);
    const sw = screen.getByRole('switch', { name: 'Dark mode' });
    expect(sw).toHaveAttribute('aria-checked', 'false');
    await user.click(sw);
    expect(onChange).toHaveBeenCalledWith(true);
    rerender(<Switch checked onChange={onChange} label="Dark mode" />);
    expect(screen.getByRole('switch', { name: 'Dark mode' })).toHaveAttribute('aria-checked', 'true');
  });
});
