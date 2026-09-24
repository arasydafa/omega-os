import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { FileUpload, formatBytes } from './FileUpload.js';

const png = (name: string, size = 100) =>
  new File(['x'.repeat(size)], name, { type: 'image/png' });

describe('formatBytes', () => {
  it('formats B, KB, and MB', () => {
    expect(formatBytes(512)).toBe('512 B');
    expect(formatBytes(2048)).toBe('2 KB');
    expect(formatBytes(5 * 1024 * 1024)).toBe('5 MB');
  });
});

describe('FileUpload', () => {
  it('lists picked files and notifies', async () => {
    const user = userEvent.setup();
    const onFiles = vi.fn();
    render(<FileUpload onFiles={onFiles} />);
    const input = document.querySelector('input[type="file"]')! as HTMLElement;
    await user.upload(input, [png('a.png'), png('b.png')]);
    expect(screen.getByText('a.png')).toBeInTheDocument();
    expect(screen.getByText('b.png')).toBeInTheDocument();
    expect(onFiles).toHaveBeenCalledTimes(1);
    expect(onFiles.mock.calls[0][0]).toHaveLength(2);
  });

  it('rejects oversize and wrong-type files with reasons', () => {
    const onFiles = vi.fn();
    render(<FileUpload accept=".png" maxSize={10} onFiles={onFiles} />);
    const input = document.querySelector('input[type="file"]')!;
    fireEvent.change(input, { target: { files: [png('big.png', 100), new File(['x'], 'doc.txt', { type: 'text/plain' })] } });
    expect(screen.getByText('Exceeds 10 B')).toBeInTheDocument();
    expect(screen.getByText('Type not accepted')).toBeInTheDocument();
    expect(onFiles).not.toHaveBeenCalled();
  });

  it('removes files from the list', async () => {
    const user = userEvent.setup();
    render(<FileUpload />);
    const input = document.querySelector('input[type="file"]')! as HTMLElement;
    await user.upload(input, [png('a.png')]);
    await user.click(screen.getByRole('button', { name: 'Remove a.png' }));
    expect(screen.queryByText('a.png')).not.toBeInTheDocument();
  });
});
