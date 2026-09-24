import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Heatmap } from './Heatmap.js';
import { Treemap, squarifyLayout } from './Treemap.js';
import { WordCloud, wordFontSize } from './WordCloud.js';

describe('squarifyLayout', () => {
  it('preserves total area', () => {
    const rects = squarifyLayout(
      [
        { label: 'A', value: 6 },
        { label: 'B', value: 3 },
        { label: 'C', value: 1 },
      ],
      0,
      0,
      300,
      200,
    );
    const area = rects.reduce((s, r) => s + r.w * r.h, 0);
    expect(rects.length).toBe(3);
    expect(area).toBeCloseTo(300 * 200, 0);
  });
});

describe('Treemap', () => {
  it('renders blocks and selects on click', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <Treemap
        data={[
          { label: 'Tools', value: 6 },
          { label: 'Docs', value: 1 },
        ]}
        onSelect={onSelect}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Tools' }));
    expect(onSelect).toHaveBeenCalledWith('Tools');
  });
});

describe('wordFontSize', () => {
  it('scales monotonically with weight', () => {
    expect(wordFontSize(100, 1, 100)).toBeGreaterThan(wordFontSize(10, 1, 100));
    expect(wordFontSize(10, 1, 100)).toBeGreaterThan(wordFontSize(1, 1, 100));
  });
});

describe('WordCloud', () => {
  it('renders words sized by weight', () => {
    render(
      <WordCloud
        words={[
          { text: 'omega', weight: 10 },
          { text: 'ui', weight: 2 },
        ]}
      />,
    );
    const omega = screen.getByText('omega');
    const ui = screen.getByText('ui');
    expect(parseFloat(omega.style.fontSize)).toBeGreaterThan(parseFloat(ui.style.fontSize));
  });

  it('drags a word to a new offset', () => {
    render(<WordCloud words={[{ text: 'omega', weight: 10 }]} />);
    const word = screen.getByText('omega');
    const zone = screen.getByRole('img');
    fireEvent(
      word,
      new MouseEvent('pointerdown', { clientX: 0, clientY: 0, bubbles: true }),
    );
    fireEvent(
      zone,
      new MouseEvent('pointermove', { clientX: 12, clientY: 8, bubbles: true }),
    );
    fireEvent(zone, new MouseEvent('pointerup', { bubbles: true }));
    expect(word.style.transform).toContain('translate(12px, 8px)');
  });
});

describe('Heatmap', () => {
  const DATA = [
    { x: 'Mon', y: 'CPU', value: 10 },
    { x: 'Tue', y: 'CPU', value: 90 },
    { x: 'Mon', y: 'Mem', value: 50 },
  ];

  it('renders one cell per coordinate with intensity', () => {
    const { container } = render(<Heatmap data={DATA} xLabels={['Mon', 'Tue']} yLabels={['CPU', 'Mem']} />);
    const cells = container.querySelectorAll('[data-intensity]');
    expect(cells.length).toBe(4);
    const intensities = [...cells].map((c) => (c as HTMLElement).dataset.intensity);
    expect(Math.max(...intensities.map(Number))).toBe(1);
    expect(Math.min(...intensities.map(Number))).toBe(0);
  });

  it('selects a cell on click', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<Heatmap data={DATA} onSelect={onSelect} />);
    await user.click(screen.getByRole('button', { name: 'Tue, CPU, value 90' }));
    expect(onSelect).toHaveBeenCalledWith({ x: 'Tue', y: 'CPU', value: 90 });
  });
});
