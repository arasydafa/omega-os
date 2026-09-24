import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
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

  it('toggles a segment from the legend and recomputes', async () => {
    const user = userEvent.setup();
    render(
      <Pie
        data={[
          { label: 'Tools', value: 6 },
          { label: 'Docs', value: 3 },
        ]}
      />,
    );
    expect(screen.getByText('67%')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Toggle Docs' }));
    expect(screen.getByText('100%')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Toggle Docs' })).toHaveAttribute('aria-pressed', 'false');
  });
});

describe('Bar', () => {
  it('scales bars to the maximum value with enter animation', () => {
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
    expect((bars[0] as HTMLElement).className).toContain('ot-chart-grow-up');
  });

  it('toggles bars from the legend with animation', async () => {
    const user = userEvent.setup();
    render(
      <Bar
        data={[
          { label: 'A', value: 10 },
          { label: 'B', value: 5 },
        ]}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Toggle B' }));
    expect(screen.getByRole('button', { name: 'Toggle B' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('rescales survivors to the visible maximum', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Bar
        data={[
          { label: 'A', value: 10 },
          { label: 'B', value: 5 },
        ]}
      />,
    );
    const bars = () => container.querySelectorAll('div[title]');
    expect((bars()[1] as HTMLElement).style.height).toBe('50%');
    await user.click(screen.getByRole('button', { name: 'Toggle A' }));
    expect((bars()[1] as HTMLElement).style.height).toBe('100%');
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
    expect(container.querySelectorAll('circle[style]').length).toBe(3);
    expect(container.querySelector('polyline')).toBeInTheDocument();
    expect(container.querySelector('polyline')).toHaveClass('ot-chart-line-draw');
  });

  it('cancels a pending hide when re-shown mid-fade', () => {
    vi.useFakeTimers();
    try {
      render(
        <Line
          series={[
            { id: 'a', label: 'Alpha', points: [{ x: 'Mon', y: 1 }] },
            { id: 'b', label: 'Beta', points: [{ x: 'Mon', y: 5 }] },
          ]}
        />,
      );
      fireEvent.click(screen.getByRole('button', { name: 'Toggle Beta' }));
      act(() => {
        vi.advanceTimersByTime(100);
      });
      fireEvent.click(screen.getByRole('button', { name: 'Toggle Beta' }));
      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(screen.getByRole('button', { name: 'Toggle Beta' })).toHaveAttribute('aria-pressed', 'true');
    } finally {
      vi.useRealTimers();
    }
  });

  it('supports multiple series with legend toggle and rich tooltip', async () => {
    const user = userEvent.setup();
    render(
      <Line
        series={[
          { id: 'a', label: 'Alpha', points: [{ x: 'Mon', y: 4 }, { x: 'Tue', y: 2 }] },
          { id: 'b', label: 'Beta', points: [{ x: 'Mon', y: 8 }] },
        ]}
      />,
    );
    expect(screen.getByRole('button', { name: 'Toggle Alpha' })).toHaveAttribute('aria-pressed', 'true');
    const before = document.querySelector('polyline')!.getAttribute('points');
    await user.click(screen.getByRole('button', { name: 'Toggle Beta' }));
    expect(screen.getByRole('button', { name: 'Toggle Beta' })).toHaveAttribute('aria-pressed', 'false');
    await waitFor(
      () => {
        expect(document.querySelectorAll('circle').length).toBe(4);
      },
      { timeout: 2500 },
    );
    // Survivors rescale smoothly to the visible domain instead of teleporting.
    expect(document.querySelector('polyline')!.getAttribute('points')).not.toBe(before);
    await user.hover(document.querySelector('circle')!);
    expect(screen.getByRole('tooltip')).toHaveTextContent('Alpha');
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
    expect(container.querySelectorAll('circle[style]').length).toBe(2);
    expect(container.querySelector('title')?.textContent).toContain('Gadget A');
  });

  it('supports series with legend toggle and rich tooltip', async () => {
    const user = userEvent.setup();
    render(
      <Scatter
        series={[
          { id: 'a', label: 'Alpha', points: [{ x: 1, y: 2 }] },
          { id: 'b', label: 'Beta', points: [{ x: 4, y: 8 }] },
        ]}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Toggle Beta' }));
    expect(screen.getByRole('button', { name: 'Toggle Beta' })).toHaveAttribute('aria-pressed', 'false');
    await waitFor(
      () => {
        expect(document.querySelectorAll('circle').length).toBe(2);
      },
      { timeout: 2500 },
    );
    await user.hover(document.querySelector('circle')!);
    expect(screen.getByRole('tooltip')).toHaveTextContent('(1, 2)');
  });
});
