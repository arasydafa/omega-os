import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TimingBar } from './TimingBar.js';

const SEGMENTS = [
  { id: 'enc', label: 'Encrypt', value: 1, tone: 'navy' as const },
  { id: 'tx', label: 'Transmit', value: 3, tone: 'warning' as const },
  { id: 'dec', label: 'Decrypt', value: 1, tone: 'success' as const },
];

describe('TimingBar', () => {
  it('renders segments with legend and total', () => {
    render(<TimingBar segments={SEGMENTS} />);
    expect(screen.getByRole('img', { name: /Timing breakdown/ })).toBeInTheDocument();
    expect(screen.getByText('Encrypt')).toBeInTheDocument();
    expect(screen.getByText(/Total:/)).toBeInTheDocument();
  });

  it('shows empty state when there is no timing data', () => {
    render(<TimingBar segments={[]} />);
    expect(screen.getByText('No timing data')).toBeInTheDocument();
  });
});
