import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Avatar } from './Avatar.js';
import { FileViewer } from './FileViewer.js';
import { Image } from './Image.js';

describe('Avatar photo fallback', () => {
  it('falls back to initials when the photo fails', () => {
    render(<Avatar name="Omega Throne" src="https://example.com/missing.png" />);
    expect(screen.queryByText('OT')).not.toBeInTheDocument();
    fireEvent.error(screen.getByRole('img', { name: 'Omega Throne' }).querySelector('img')!);
    expect(screen.getByText('OT')).toBeInTheDocument();
  });
});

describe('Image', () => {
  it('shows a placeholder when the image fails', () => {
    const { container } = render(
      <Image src="https://example.com/missing.png" alt="Cover" fallbackLabel="Cover unavailable" />,
    );
    fireEvent.error(container.querySelector('img')!);
    expect(screen.getByText('Cover unavailable')).toBeInTheDocument();
  });
});

describe('FileViewer', () => {
  const CODE = 'const a = 1;\nconst b = 2;';

  it('renders numbered lines with header actions', async () => {
    const user = userEvent.setup();
    const onCopy = vi.fn();
    render(<FileViewer filename="app.ts" language="ts" code={CODE} onCopy={onCopy} />);
    expect(screen.getByText('app.ts')).toBeInTheDocument();
    expect(screen.getByText('ts')).toBeInTheDocument();
    expect(screen.getByText('const a = 1;')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Copy' }));
    expect(onCopy).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument();
  });
});
