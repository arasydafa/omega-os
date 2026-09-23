import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Bar } from './Bar.js';
import { Line } from './Line.js';
import { Pie } from './Pie.js';
import { Scatter } from './Scatter.js';

describe('Pie', () => {
  it('renders segments with legend percentages', () => {
    const { container } = render(
      <Pie
        data={[
          { label: 'Tools', value: 6 },
          { label: 'Docs', value: 3 },
          { label: 'Other', value: 1 },
        ]}
      />,
    );
    expect(container.querySelectorAll('circle[style]').length).toBe(3);
    expect(screen.getByText('60%')).toBeInTheDocument();
    // Legend label + screen-reader table row.
    expect(screen.getAllByText('Tools')).toHaveLength(2);
  });

  it('shows empty state without data', () => {
    render(<Pie data={[]} />);
    expect(screen.getByText('No data')).toBeInTheDocument();
  });
});

describe('Bar', () => {
  it('scales bars to the maximum value', () => {
    const { container } = render(
      <Bar
        data={[
          { label: 'A', value: 10 },
          { label: 'B', value: 5 },
        ]}
      />,
    );
    const bars = container.querySelectorAll('div[title]');
    expect(bars.length).toBe(2);
    expect((bars[0] as HTMLElement).style.height).toBe('100%');
    expect((bars[1] as HTMLElement).style.height).toBe('50%');
  });
});

describe('Line', () => {
  it('plots every point', () => {
    const { container } = render(
      <Line
        points={[
          { x: 'Mon', y: 1 },
          { x: 'Tue', y: 3 },
          { x: 'Wed', y: 2 },
        ]}
      />,
    );
    expect(container.querySelectorAll('circle').length).toBe(3);
    expect(container.querySelector('polyline')).toBeInTheDocument();
  });
});

describe('Scatter', () => {
  it('plots every point with labels', () => {
    const { container } = render(
      <Scatter
        points={[
          { x: 1, y: 2, label: 'Gadget A' },
          { x: 4, y: 8, label: 'Gadget B' },
        ]}
      />,
    );
    expect(container.querySelectorAll('circle').length).toBe(2);
    expect(container.querySelector('title')?.textContent).toContain('Gadget A');
  });
});
