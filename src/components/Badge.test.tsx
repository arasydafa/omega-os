import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Check } from 'lucide-react';
import { Badge } from './Badge.js';
import type { BadgeTone } from './Badge.js';

const TONE_CLASSES: Record<BadgeTone, string> = {
  navy: 'bg-navy-bg',
  grey: 'bg-ot-surface-2',
  info: 'bg-info-bg',
  warning: 'bg-warning-bg',
  success: 'bg-success-bg',
  danger: 'bg-danger-bg',
};

describe('Badge', () => {
  it.each(Object.entries(TONE_CLASSES))('applies %s tone classes', (tone, cls) => {
    const { unmount } = render(<Badge tone={tone as BadgeTone}>{tone}</Badge>);
    expect(screen.getByText(tone)).toHaveClass(cls);
    unmount();
  });

  it('renders the lucide icon slot', () => {
    render(
      <Badge tone="success" icon={<Check data-testid="check-icon" />}>
        Active
      </Badge>,
    );
    expect(screen.getByTestId('check-icon')).toBeInTheDocument();
  });
});
