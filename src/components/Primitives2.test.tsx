import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Accordion } from './Accordion.js';
import { Combobox } from './Combobox.js';
import { CopyButton } from './CopyButton.js';
import { Drawer } from './Drawer.js';
import { Kbd } from './Kbd.js';
import { Progress } from './Progress.js';

describe('CopyButton', () => {
  it('confirms after copying', async () => {
    const user = userEvent.setup();
    const onCopy = vi.fn();
    render(<CopyButton text="hello" onCopy={onCopy} />);
    await user.click(screen.getByRole('button', { name: 'Copy' }));
    expect(onCopy).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument();
  });
});

describe('Kbd', () => {
  it('renders the shortcut', () => {
    render(<Kbd>Ctrl K</Kbd>);
    expect(screen.getByText('Ctrl K')).toBeInTheDocument();
  });
});

describe('Progress', () => {
  it('renders value with progressbar semantics', () => {
    render(<Progress value={25} label="Uploading" />);
    const bar = screen.getByRole('progressbar', { name: 'Uploading' });
    expect(bar).toHaveAttribute('aria-valuenow', '25');
    expect(screen.getByText('25%')).toBeInTheDocument();
  });

  it('renders indeterminate state', () => {
    render(<Progress value={0} indeterminate label="Syncing" />);
    expect(screen.getByRole('progressbar', { name: 'Syncing' })).not.toHaveAttribute('aria-valuenow');
  });
});

describe('Accordion', () => {
  const ITEMS = [
    { id: 'a', title: 'Alpha', content: 'First panel' },
    { id: 'b', title: 'Beta', content: 'Second panel' },
  ];

  it('opens one panel at a time by default', async () => {
    const user = userEvent.setup();
    render(<Accordion items={ITEMS} />);
    await user.click(screen.getByRole('button', { name: 'Alpha' }));
    expect(screen.getByRole('button', { name: 'Alpha' })).toHaveAttribute('aria-expanded', 'true');
    await user.click(screen.getByRole('button', { name: 'Beta' }));
    expect(screen.getByRole('button', { name: 'Alpha' })).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByRole('button', { name: 'Beta' })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('First panel').closest('div.grid')).toHaveClass('invisible');
  });

  it('allows many open panels in multiple mode', async () => {
    const user = userEvent.setup();
    render(<Accordion items={ITEMS} mode="multiple" />);
    await user.click(screen.getByRole('button', { name: 'Alpha' }));
    await user.click(screen.getByRole('button', { name: 'Beta' }));
    expect(screen.getByRole('button', { name: 'Alpha' })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: 'Beta' })).toHaveAttribute('aria-expanded', 'true');
  });
});

describe('Drawer', () => {
  it('opens from the right and closes via ESC', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Drawer open onClose={onClose} title="Details">
        Body
      </Drawer>,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe('Combobox', () => {
  const OPTIONS = [
    { value: 'vstack', label: 'VStack' },
    { value: 'lab', label: 'CI-CD Lab' },
  ];

  it('filters and picks with the keyboard', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Combobox label="Tool" options={OPTIONS} onChange={onChange} />);
    const box = screen.getByRole('combobox', { name: 'Tool' });
    await user.click(box);
    expect(screen.getByRole('option', { name: 'VStack' })).toBeInTheDocument();
    await user.type(box, 'lab');
    expect(screen.queryByRole('option', { name: 'VStack' })).not.toBeInTheDocument();
    await user.keyboard('{ArrowDown}{Enter}');
    expect(onChange).toHaveBeenCalledWith('lab');
  });
});
